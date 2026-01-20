import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// =======================
// ESCENA
// =======================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// =======================
// CÁMARA
// =======================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 6);
camera.lookAt(0, 1, 0);

// =======================
// RENDERER
// =======================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// =======================
// CONTROLES
// =======================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// =======================
// LUCES
// =======================
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// =======================
// LOADER GLB
// =======================
const loader = new GLTFLoader();

loader.load(
    'models/blender.glb', 
        function (gltf) {
        scene.add(gltf.scene);
        const model = gltf.scene;

        
        model.scale.set(1, 1, 1);     
        model.position.set(0, -2.5, 0);
        scene.add(model);
    },
    undefined,
    (error) => {
        console.error('❌ Error cargando GLB:', error);
    }
);

// =======================
// ANIMACIÓN
// =======================
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// =======================
// RESIZE
// =======================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});