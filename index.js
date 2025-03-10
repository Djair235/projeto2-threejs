import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import HolographicMaterial from "./HolographicMaterial.js";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js";


const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement)


const fov = 75;
const aspectRatio = w / h;
const near = 0.1;
const far = 30;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.y = 2.5;
const scene = new THREE.Scene();


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 4);
const mat = new HolographicMaterial({
        fresnelAmount: 0.3,
        fresnelOpacity: 0,
        hologramBrightness: 0.20,
        scanlineSize: 0,
        signalSpeed: 0,
        hologramColor: "black",
        hologramOpacity: 1.0,
        blinkFresnelOnly: true,
        enableBlinking: true,
        enableAdditive: true,
        side: THREE.FrontSide,
})
const bola = new THREE.Mesh(geo, mat)
scene.add(bola);


const edges = new THREE.EdgesGeometry(geo);
const edgesMaterial = new THREE.LineBasicMaterial({
    color: "#4294BD",   
    linewidth: 2,         
    opacity: 0.33,         
    transparent: true,   
    depthWrite: false
});


const linhas = new THREE.LineSegments(edges, edgesMaterial); 
bola.add(linhas);

function animate() {
    requestAnimationFrame(animate);
    bola.rotation.z += 0.001
    renderer.render(scene, camera);
    controls.update();
    mat.update();
}


animate();

