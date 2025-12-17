const palabras = ["CASA", "PERRO", "GATOS", "ARBOL", "LIBRO"];
const hoy = new Date().toDateString();
const palabraDelDia = palabras[hoy.length % palabras.length];
console.log("Palabra del día:", palabraDelDia);

const maxLetras = 5;
const maxIntentos = 6;
let intentoActual = 0;
let texto = "";

const pantalla = document.querySelector(".pantalla");
const tecladoDiv = document.querySelector(".teclado");

// Crear 6 filas con 5 casillas cada una
let filas = [];
for (let i = 0; i < maxIntentos; i++) {
    const fila = document.createElement("div");
    fila.className = "fila";
    pantalla.appendChild(fila);
    const casillas = [];
    for (let j = 0; j < maxLetras; j++) {
        const casilla = document.createElement("div");
        casilla.className = "casilla";
        fila.appendChild(casilla);
        casillas.push(casilla);
    }
    filas.push(casillas);
}

// Crear teclado
for (let ascii = 65; ascii <= 90; ascii++) {
    const letra = String.fromCharCode(ascii);
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.className = "tecla";
    btn.onclick = () => escribir(letra);
    tecladoDiv.appendChild(btn);
}

// Función escribir letra
function escribir(letra) {
    if (texto.length < maxLetras) {
        filas[intentoActual][texto.length].textContent = letra;
        texto += letra;
    }
}

// Botón borrar
document.getElementById("borrar").onclick = () => {
    if (texto.length > 0) {
        texto = texto.slice(0, -1);
        filas[intentoActual][texto.length].textContent = "";
    }
};

// Botón comprobar
document.getElementById("comprobar").onclick = () => {
    if (texto.length < maxLetras) {
        alert("Debes escribir 5 letras");
        return;
    }
    evaluarIntento();
};

// Evaluar intento y dar feedback
function evaluarIntento() {
    const fila = filas[intentoActual];
    const palabraArray = palabraDelDia.split("");
    const textoArray = texto.split("");

    // Animar flip
    fila.forEach((c, i) => {
        c.classList.add("flip");
        setTimeout(() => {
            c.classList.remove("flip");

            if (textoArray[i] === palabraArray[i]) {
                c.classList.add("correcta");
                actualizarTecla(textoArray[i], "correcta");
                palabraArray[i] = null;
                textoArray[i] = null;
            }
        }, i * 300);
    });

    // Parciales y incorrectas después del flip
    setTimeout(() => {
        fila.forEach((c, i) => {
            if (!c.classList.contains("correcta")) {
                if (textoArray[i] && palabraArray.includes(textoArray[i])) {
                    c.classList.add("parcial");
                    actualizarTecla(textoArray[i], "parcial");
                    palabraArray[palabraArray.indexOf(textoArray[i])] = null;
                } else if (textoArray[i]) {
                    c.classList.add("incorrecta");
                    actualizarTecla(textoArray[i], "incorrecta");
                }
            }
        });

        if (texto === palabraDelDia) {
            setTimeout(() => alert("🎉 ¡Correcto!"), 500);
            return;
        }

        intentoActual++;
        if (intentoActual >= maxIntentos) {
            setTimeout(() => alert("❌ Has perdido. La palabra era: " + palabraDelDia), 500);
            return;
        }

        texto = "";
    }, maxLetras * 300);
}

// Actualizar color de tecla
function actualizarTecla(letra, estado) {
    const btn = Array.from(tecladoDiv.children).find(b => b.textContent === letra);
    if (!btn) return;

    if (estado === "correcta") btn.className = "tecla correcta";
    else if (estado === "parcial" && !btn.classList.contains("correcta")) btn.className = "tecla parcial";
    else if (estado === "incorrecta" && !btn.classList.contains("correcta") && !btn.classList.contains("parcial")) btn.className = "tecla incorrecta";
}