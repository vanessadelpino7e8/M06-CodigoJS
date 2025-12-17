
// VARIABLES

let app = document.getElementById("app");

let texto = "";
let maxLetras = 5;

let palabras = ["CASA", "PERRO", "GATOS", "ARBOL, ROMEO"];
let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
console.log("Palabra:", palabraRandom);


// PANTALLA

let pantalla = document.createElement("div");
pantalla.style.border = "5px solid black";
pantalla.style.width = "200px";
pantalla.style.height = "40px";
pantalla.style.fontSize = "24px";
pantalla.style.textAlign = "center";
pantalla.style.marginBottom = "10px";

app.appendChild(pantalla);


// CONTENEDOR TECLADO

let teclado = document.createElement("div");
teclado.style.display = "grid";
teclado.style.gridTemplateColumns = "repeat(7, 40px)";
teclado.style.gap = "15px";

app.appendChild(teclado);


// CREAR TECLADO ALFABÉTICO A-Z
// ASCII 65 - 90

for (let ascii = 65; ascii <= 90; ascii++) {

    let letra = String.fromCharCode(ascii);

    let boton = document.createElement("button");
    boton.textContent = letra;
    boton.style.height = "40px";

    // VOCAL O CONSONANTE
    if ("AEIOU".includes(letra)) {
        boton.style.backgroundColor = "lightcoral";
    } else {
        boton.style.backgroundColor = "lightgray";
    }

    boton.onclick = function () {
        escribir(letra);
    };

    teclado.appendChild(boton);
}


// FUNCIÓN ESCRIBIR
// MÁXIMO 5 LETRAS

function escribir(letra) {
    if (texto.length < maxLetras) {
        texto += letra;
        pantalla.textContent = texto;
    }
}

// ==============================
// BOTÓN BORRAR
// ==============================
let btnBorrar = document.createElement("button");
btnBorrar.textContent = "Borrar";
btnBorrar.style.marginTop = "10px";

btnBorrar.onclick = function () {
    texto = texto.slice(0, -1);
    pantalla.textContent = texto;
};

app.appendChild(btnBorrar);


// BOTÓN COMPROBAR

let btnComprobar = document.createElement("button");
btnComprobar.textContent = "Comprobar";
btnComprobar.style.marginLeft = "10px";

btnComprobar.onclick = function () {

    if (texto.length < maxLetras) {
        alert("Escribe 5 letras");
        return;
    }

    let palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];

    if (texto === palabraRandom) {
        alert("¡Correcto!");
    } else {
        alert("Incorrecto. La palabra era " + palabraRandom);
    }

    // Reiniciar
    texto = "";
    pantalla.textContent = "";
};

app.appendChild(btnComprobar);