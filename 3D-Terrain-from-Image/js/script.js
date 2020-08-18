// create the scene
var scene = new THREE.Scene();
// create the camera
var camera = new THREE.PerspectiveCamera(75,
										 window.innerWidth / window.innerHeight,
										 0.1,
										 10000);
// set the renderer to be webgl
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// init camera
function camera_config() {
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}


// add a  geometry
function add_geometry() {
	var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
	// var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var material = new THREE.MeshLambertMaterial({
	    color: 0xccccff,
   		wireframe: true
	});
	var plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	// return plane for use in animation
	return plane;
}


function animate() {
	requestAnimationFrame( animate );
	plane.rotation.x += 0.01;
	plane.rotation.y += 0.01;
	renderer.render(scene, camera);
}

camera_config();
var plane = add_geometry();

// add axis helper
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// add lights to scene
var light = new THREE.AmbientLight(0x444444);
light.intensity = 1.0;
scene.add(light);


animate();