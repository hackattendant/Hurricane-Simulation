// import * as THREE from "/jsm/three.js";
// import { OrbitControls } from '/jsm/OrbitControls.js';

// define some variables to use in the rendering pipeline
var camera, scene, renderer;

// run init function to setup scene
init();
// run renderer animation
animate();

function init() {
    // create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    // create renderer and add to the dom
    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // move camera and set camera to look at center
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 40, 50, 60 );
    camera.lookAt( 0, 0, 0 );

    // TODO: remove axes helper
    var axesHelper = new THREE.AxesHelper( 50 );
    scene.add( axesHelper );

    // TODO: implement control motion controls
    // currently only panning around scene works
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    // add plane to represent landscape for now
    var geometry = new THREE.PlaneGeometry( 20, 60, 1, 1 );
    var material = new THREE.MeshLambertMaterial({
        color: "rgb(255, 255, 255)",
           wireframe: true
    });
    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    // add lights to scene
    var light = new THREE.AmbientLight( 0xffffff );
    light.intensity = 1.0;
    scene.add(light);

}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render( scene, camera );
}