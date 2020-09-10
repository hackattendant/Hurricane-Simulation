import numpy as np
import pandas as pd
import seaborn as sns
from img_viz.eoa_viz import EOAImageVisualizer
import matplotlib.pyplot as plt
from os.path import join

import xarray as xr

viz_obj = EOAImageVisualizer()

def data_summary(ds):
    print("------------- Data summary ---------------------")
    print(ds.head())
    df = ds.to_dataframe()
    print(df.describe())

def access_data(ds):
    """ Examples in how to access data. """
    # In this example we have two variables (tmin, tmax) with two dimensions each (time:731, location:3)

    X = range(len(ds["time"]))

    # http://xarray.pydata.org/en/stable/indexing.html
    # --- access by index (single var, all times)----
    Y = ds["tmin"][:,0]
    viz_obj.plot_1d_data_np(X, [Y], title="Single var and dim")
    # --- access by name (single var, all times)----
    Y = ds["tmin"].loc[:,"IA"]
    viz_obj.plot_1d_data_np(X, [Y], title="Single var and dim (by name)")
    # --- access dimension by name (single var, all times)----
    Y = ds.sel(location="IA")["tmin"]
    viz_obj.plot_1d_data_np(X, [Y], title="Single var and dim (location by name)")

    # -- Grouping Awesome stuff
    # Mean by dimension
    Y = ds.mean(dim='location')["tmin"]
    viz_obj.plot_1d_data_np(X, [Y], title="Mean tmin from all locations")

    # --------------------- Automatic Masking (cool stuff) -----------
    # http://xarray.pydata.org/en/stable/indexing.html#masking-with-where
    Y = ds.where(ds.time.isin(pd.date_range("2001-11-01", "2001-12-31", name="time"))).sel(location="IA")["tmin"]
    viz_obj.plot_1d_data_np(X, [Y], title="Masked dimension (few dot somewhere)")

    # --------------------- INTERPOLATION Select non existing dimension values by interpolating --------------------
    # --- Nearest neighb, not really interpolation.
    method = 'nearest'  # It can be 'nearest, pad, backfill,
    Y1 = ds.sel(lat=[1], method=method)["ozmax"]
    Y2 = ds.sel(lat=[1.5], method=method)["ozmax"]
    viz_obj.plot_1d_data_np(X, [Y1, Y2], title="Interpolating by dim NNeigh")

    # --- Real interpolation
    method = 'linear'  # 'linear, nearest, zero, slinear, quadratic, cubic'
    Y2i = ds.interp(lat=[1.5], method=method)["ozmax"]
    viz_obj.plot_1d_data_np(X, [Y1, Y2, Y2i], labels=['time1', 'time 1.5', 'time 1.5 NN'], title="Interpolating by dim Linear")

def adding_and_dropping(ds):
    # Drop dimensions
    data_summary(ds.drop_dims('lat'))

def create_datasets():
    # Fro crating single variables with dimensions (data arrays)
    temp = xr.DataArray([[1, 2], [3, 4]], dims=['lat', 'lon'])

    # Creates a date range
    times = pd.date_range("2000-01-01", "2001-12-31", name="time")
    annual_cycle = np.sin(2 * np.pi * (times.dayofyear.values / 365.25 - 0.28))

    base = 10 + 15 * annual_cycle.reshape(-1, 1)
    tmin_values = base + 3 * np.random.randn(annual_cycle.size, 3)
    tmax_values = base + 10 + 3 * np.random.randn(annual_cycle.size, 3)

    ds = xr.Dataset(
        {
            "tmin": (("time", "location"), tmin_values),
            "tmax": (("time", "location"), tmax_values),
            "ozmax": (("time", "lat"), tmax_values),
        },
        {"time": times, "location": ["IA", "IN", "IL"], "lat": [1, 2, 3]},
    )

    data_summary(ds)
    # --- Access a single variable
    access_data(ds)

    # --- Add and drop stuff
    adding_and_dropping(ds)

    # df = ds.to_dataframe()
    # sns.pairplot(df.reset_index(), vars=ds.data_vars)

def edit_datasets():
    ds = xr.tutorial.open_dataset("air_temperature")
    data_summary(ds)

    # viz_obj.plot_3d_data_xarray_map(ds, var_names=['air'], timesteps=[0], title='2D example')
    # -------- Modifying values of a region with a subset of the dimensions (there are more options)
    # http://xarray.pydata.org/en/stable/indexing.html#more-advanced-indexing
    lon = ds.coords["lon"]
    lat = ds.coords["lat"]
    # ds['air'].loc[dict(lon=lon[(lon > 220) & (lon < 260)], lat=lat[(lat > 20) & (lat < 60)])] = 290
    viz_obj.plot_3d_data_xarray_map(ds, var_names=['air'], timesteps=[0], title='Modified data 2D example')

    # -------- Changeging an index
    air = ds['air']
    air_small = air[:20, : 20]

def read_write():
    data_path = join('..','data')
    file_name = join(data_path,'GFSTodayReduced.nc')
    ds = xr.load_dataset(file_name)
    only_temp = ds['temp_surf']
    # Shows temp at time 0
    plt.imshow(only_temp[0])
    plt.show()

    new_ds = only_temp.to_dataset()
    data_summary(new_ds)

    new_ds.to_netcdf(join(data_path,'OnlyTemp.nc'))


if __name__ == "__main__":
    # create_datasets()
    # edit_datasets()
    read_write()
