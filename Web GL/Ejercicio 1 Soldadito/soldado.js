import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --------------------
// ESCENA
// --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202030);

// --------------------
// CÁMARA
// --------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 6);

// --------------------
// RENDERER
// --------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --------------------
// LUCES
// --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --------------------
// SOLDADITO (GROUP)
// --------------------
const soldado = new THREE.Group();

// Material sencillo (plomo)
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.6,
    metalness: 0.9
});

// Cabeza
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    material
);
cabeza.position.y = 2;
soldado.add(cabeza);

//sombrero
const sombrero = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.2, 0.9, 32),
    material
);
sombrero.position.y = 2.43;
soldado.add(sombrero);

// Cuerpo
const cuerpo = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.2, 0.4),
    material
);
cuerpo.position.y = 1;
soldado.add(cuerpo);

// Brazo izquierdo
const brazoIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1),
    material
);
brazoIzq.position.set(-0.4, 1.1, 0);
brazoIzq.rotation.z = Math.PI / 1;
soldado.add(brazoIzq);

// Brazo derecho
const brazoDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1),
    material
);
brazoDer.position.set(0.4, 1.1, 0);
brazoDer.rotation.z = Math.PI / 1;
soldado.add(brazoDer);

// Pierna izquierda
const piernaIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 2),
    material
);
piernaIzq.position.set(-0.2, 0, 0);
soldado.add(piernaIzq);

// Pierna derecha
const piernaDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 2),
    material
);
piernaDer.position.set(0.2, 0, 0);
soldado.add(piernaDer);

// Añadimos el soldado a la escena
scene.add(soldado);

// --------------------
// CONTROLES
// --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
let tiempo = 0;
// --------------------
// ANIMACIÓN
// --------------------
function animate() {
    requestAnimationFrame(animate);

    tiempo += 0.05;

    // Movimiento de brazos arriba y abajo
    brazoIzq.rotation.x = Math.PI / 1 + Math.sin(tiempo) * 0.3;
    brazoDer.rotation.x = Math.PI / 1 - Math.sin(tiempo) * 0.3;

    // Giro suave del soldado
    //soldado.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}


animate();

// --------------------
// RESIZE
// --------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
