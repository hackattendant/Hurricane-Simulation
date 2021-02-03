// import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const axesHelper = new THREE.AxesHelper( 50 );
// scene.add( axesHelper );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


// move camera back
camera.position.z = 100;
camera.position.y = 100;
camera.position.z = 100;
camera.lookAt(0, 0, 0);

// to hold all objects
var cubes = [];

// random colors
var colors = [new THREE.Color(0xff0000),
              new THREE.Color(0xff9900),
              new THREE.Color(0x0000ff),
              new THREE.Color(0x00cc00),
              new THREE.Color(0xffffff),
              new THREE.Color(0xffff00),
              ];

const color1 = new THREE.Color( 0xff0000 );

function animate() {

  // stats.begin();
  // cube.rotation.x -= 0.02;
  // cube.rotation.y += 0.01;

  // add a cube
  var geometry = new THREE.BoxGeometry();
  var colorForCube = colors[Math.floor(Math.random()*colors.length)];
  var material = new THREE.MeshBasicMaterial( { color: colorForCube } );
  var new_cube = new THREE.Mesh( geometry, material );
  scene.add(new_cube);
  cubes.push(new_cube);

  // for random negative or positive
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  cubes.forEach(function(cube) {

    cube.position.z += Math.random() * plusOrMinus;
    cube.position.y += Math.random() * plusOrMinus;
    cube.position.x += Math.random() * plusOrMinus;
    cube.rotation.x += Math.random() * plusOrMinus;
    cube.rotation.y += Math.random() * plusOrMinus;
    cube.position.z += Math.random() * plusOrMinus;


    // cube.position.y += Math.random() - 0.5;
    // cube.position.x += Math.random() - 0.5;




    // cube.rotation.x += Math.random() - 0.5;
    // cube.rotation.y += Math.random()- 0.5;
  });
  var numCubes = scene.children.length;
  var text2 = document.createElement('div');
  text2.style.position = 'absolute';
  //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  text2.style.width = 100;
  text2.style.height = 100;
  text2.style.backgroundColor = "blue";
  text2.innerHTML = numCubes;
  text2.style.top = 200 + 'px';
  text2.style.left = 200 + 'px';
  document.body.appendChild(text2);


  // stats.end();
  // camera.position.z +=0.05;
  // camera.position.y +=0.03;
  // camera.lookAt(0,0,0);
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();