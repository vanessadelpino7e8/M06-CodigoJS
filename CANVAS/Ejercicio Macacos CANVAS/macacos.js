// === ENEMIGO ROJO (tipo 1) ===
const rojo1 = [
  [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,0]
];

const rojo2 = [
  [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,0,1,1,0,1,0,1,1,0,1,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0]
];

// === ENEMIGO VERDE (tipo 2) ===
const verde1 = [
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,0,1,0,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,0,1,1,1,1,1,0,1,1,0,0],
  [0,0,1,1,0,1,0,1,1,1,0,1,0,1,1,0],
  [0,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1]
];

const verde2 = [
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,0,1,0,1,0,1,1,1,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1],
  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
];

// === ENEMIGO LILA (tipo 3) ===
const lila1 = [
  [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,0,1,1,1,1,1,0,1,1,0,0],
  [0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0]
];

const lila2 = [
  [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,0],
  [0,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1],
  [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0]
];

// === Agrupar enemigos y colores ===
const enemigos = [
  { id: "enemigoRojo", color: "rgba(255, 50, 50, 1)", frames: [rojo1, rojo2] },
  { id: "enemigoVerde", color: "rgba(50, 255, 50, 1)", frames: [verde1, verde2] },
  { id: "enemigoLila", color: "rgba(220, 100, 255, 1)", frames: [lila1, lila2] }
];

// === Función genérica para dibujar un enemigo ===
function dibujaEnemigo(canvasId, color, frames, frameActual) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const size = 10; // tamaño de cada píxel
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const matriz = frames[frameActual];
  const rows = matriz.length;
  const cols = matriz[0].length;

  // Calcular ancho y alto reales del sprite
  const anchoReal = cols * size;
  const altoReal = rows * size;

  // Calcular desplazamiento para centrar
  const offsetX = (canvas.width - anchoReal) / 2;
  const offsetY = (canvas.height - altoReal) / 2;

  // Dibujar el sprite centrado
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (matriz[y][x] === 1) {
        ctx.fillStyle = color;
        ctx.fillRect(offsetX + x * size, offsetY + y * size, size, size);
      }
    }
  }
}

// === Control de frames ===
let frame = 0;
function animar() {
  enemigos.forEach(e => dibujaEnemigo(e.id, e.color, e.frames, frame));
  frame = (frame === 0) ? 1 : 0; // alterna entre frame 0 y 1
}

// === Iniciar animación ===
function init() {
  setInterval(animar, 500); // cada 0.5s cambia el frame
}

window.onload = init;
