// add in stats FPS
(function(){
  var script=document.createElement('script');
  script.onload=function(){
      var stats=new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop(){
          stats.update();
          requestAnimationFrame(loop)
      });
  };
  script.src='/jsm/stats.min.js';
  document.head.appendChild(script);
})()

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

reverse_multiplier = 1;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x -= 0.02;
  cube.rotation.y += 0.01;
  console.log(camera.position.y)

  // bring camera away and close repeat
  if (camera.position.y > 11) {
    reverse_multiplier = -1;
  }
  else if (camera.position.y < 3) {
    reverse_multiplier = 1;
  }
  camera.position.y +=0.03 * reverse_multiplier;
  camera.lookAt(0,0,0);
  renderer.render( scene, camera );
}
animate();