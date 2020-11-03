// make image global so we can access its dimensions
var img;

// this is the scaling factor for the height of the mesh
var height_scale = 50;

function addLights() {
 var ambientLight = new THREE.AmbientLight(0x444444);
 ambientLight.intensity = 0.0;
 scene.add(ambientLight);

 var directionalLight = new THREE.DirectionalLight(0xffffff);

 directionalLight.position.set(900, 400, 0000).normalize();
 scene.add(directionalLight);
}

function setupCamera() {
  camera.position.z = 2000;
  camera.position.y = 3040;
  camera.position.x = 700;
  camera.lookAt(0,0,0);
  camera.lookAt(new THREE.Vector3(0,0,0));
}

// draw image onto the html canvas and then get the pixels. r,g,b,a
function getTerrainPixelData()
{
  img = document.getElementById("terrain-image");
  var canvas = document.getElementById("canvas");
  
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

  var data = canvas.getContext('2d').getImageData(0,0, img.width, img.height).data;
  var normPixels = []

  for (var i = 0, n = data.length; i < n; i += 4) {
    // get average value of R, G, and B 
    normPixels.push((data[i] + data[i+1] + data[i+2]) / 3);
  }

  return normPixels;
}

function addGround() {
  terrain = getTerrainPixelData();  

  //var geometry = new THREE.PlaneGeometry(2400, 2400*img.width/img.height, img.height-1, img.width-1);
  var geometry = new THREE.PlaneGeometry(2400*img.width/img.height, 2400, img.width-1, img.height-1);
  var material = new THREE.MeshLambertMaterial({
    color: 0xccccff,
    wireframe: false
  });

  for (var i = 0, l = geometry.vertices.length; i < l; i++)
  {
    var terrainValue = terrain[i] / 255;
    geometry.vertices[i].z = geometry.vertices[i].z + terrainValue * height_scale ;
  }
  
// free up the data
  terrain = null;

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var plane = new THREE.Mesh(geometry, material);

  plane.position = new THREE.Vector3(0,0,0);
  // rotate the plane so up Y

  var q = new THREE.Quaternion();
  q.setFromAxisAngle( new THREE.Vector3(-1,0,0), 90 * Math.PI / 180 );
  plane.quaternion.multiplyQuaternions( q, plane.quaternion );

  scene.add(plane)
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


// construct the scene, camera, render, and orbit controls
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );

// run helper functions from above to setup each respectively
setupCamera();
addLights();
addGround();

// render to the entire window
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
render();
