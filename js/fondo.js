let intervaloFondo;
let tiempoMin = 500;
let tiempoMax = 3000;

const posicionesX = [];

function crearVentana() {

    const ventana = document.createElement("img");


    const imagenAleatoria = ventanas[Math.floor(Math.random() * ventanas.length)];

    ventana.src = "fotos/Ventanas/" + imagenAleatoria;

    ventana.classList.add("ventana");

    const tamaño = Math.floor(Math.random() * 120) + 180;

    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    const x = Math.floor(Math.random() * (anchoPantalla - tamaño));
    const y = Math.floor(Math.random() * (altoPantalla - tamaño));

    ventana.style.width = tamaño + "px";
    ventana.style.left = x + "px";
    ventana.style.top = y + "px";


    document.getElementById("fondo").appendChild(ventana);

}
function crearVentanaPosicion(x, y) {

    const ventana = document.createElement("img");
    ventana.className = "ventana ventanaEvento";

    const imagenAleatoria = ventanas[Math.floor(Math.random() * ventanas.length)];

    ventana.src = "fotos/Ventanas/" + imagenAleatoria;

    ventana.classList.add("ventana");

    const tamaño = Math.floor(Math.random() * 120) + 180;


    ventana.style.width = tamaño + "px";
    ventana.style.left = x + "px";
    ventana.style.top = y + "px";


    document.getElementById("fondo").appendChild(ventana);

}



function eliminarVentana() {

    const ventanas = document.querySelectorAll(".ventana");

    if (ventanas.length == 0) return;

    const indice = Math.floor(Math.random() * ventanas.length);

    const ventana = ventanas[indice];

    ventana.style.animation = "desaparecer .35s forwards";

    setTimeout(() => {

        ventana.remove();

    }, 350);

}
function ejecutarEvento() {


    const evento = Math.random();

    if (evento < 0.55) {

        eventoNormal();

    } else if (evento < 0.60) {

        eventoDoble();

    } else if (evento < 0.65) {

        eventoCaotico();

    } else if (evento < 0.70) {

        eventoLimpieza();

    } else if (evento < 0.84) {

        eventoExplosion();

    } else if (evento < 0.93) {

        desaparecerAlgunasVentanas();

    } else if (evento < 0.965) {

        formaX();

    } else {

        formaCuadrada();

    }

}
function eventoNormal() {

    eliminarVentana();

    setTimeout(() => {

        crearVentana();

    }, 400);

}

function eventoDoble() {

    eliminarVentana();

    eliminarVentana();

    setTimeout(() => {

        crearVentana();

        crearVentana();

    }, 400);

}

function eventoCaotico() {

    eliminarVentana();

    setTimeout(eliminarVentana, 150);

    setTimeout(eliminarVentana, 300);

    setTimeout(crearVentana, 600);

    setTimeout(crearVentana, 850);

    setTimeout(crearVentana, 1100);

}

function eventoExplosion() {

    crearVentana();

    setTimeout(crearVentana, 120);

    setTimeout(crearVentana, 240);

    setTimeout(crearVentana, 360);

}

function eventoLimpieza() {

    eliminarVentana();

    setTimeout(eliminarVentana, 120);

    setTimeout(eliminarVentana, 240);

    setTimeout(eliminarVentana, 360);

    setTimeout(eliminarVentana, 480);

}

function detenerFondo() {

    clearTimeout(intervaloFondo);

}


function siguienteCambio() {

    const tiempo = Math.floor(Math.random() * (tiempoMax - tiempoMin)) + tiempoMin;

    intervaloFondo = setTimeout(() => {
        ejecutarEvento();

        siguienteCambio();

    }, tiempo);

}


function sobrecarga() {

    for (let i = 0; i < 250; i++) {

        setTimeout(() => {

            crearVentana();

        }, i * 15);

    }

}

function destruccionTotal(callback = null) {

    const ventanas = document.querySelectorAll(".ventana");

    ventanas.forEach((ventana, i) => {

        setTimeout(() => {

            ventana.style.opacity = "0";
            ventana.style.transform = "scale(0.8)";

            setTimeout(() => {

                ventana.remove();

                if (i == ventanas.length - 1 && callback) {

                    callback();

                }

            }, 300);

        }, i * 25);

    });

}

function generarFormaX() {

    posicionesX.length = 0;

    const cantidad = 50;

    for (let i = 0; i < cantidad; i++) {

        posicionesX.push({

            x: i * (window.innerWidth / cantidad),

            y: i * (window.innerHeight / cantidad)

        });

        posicionesX.push({

            x: i * (window.innerWidth / cantidad),

            y: window.innerHeight - i * (window.innerHeight / cantidad)

        });

    }

}

function formaX() {

    generarFormaX();

    posicionesX.forEach((p, i) => {

        setTimeout(() => {

            crearVentanaPosicion(p.x, p.y);

        }, i * 35);


    });
    setTimeout(() => {

        destruirEvento();

    }, 3000);

}

const posicionesCuadrado = [];

function generarFormaCuadrado() {

    posicionesCuadrado.length = 0;

    const paso = 80;

    for (let x = 0; x < window.innerWidth; x += paso) {

        posicionesCuadrado.push({ x, y: 0 });

        posicionesCuadrado.push({ x, y: window.innerHeight - 90 });

    }

    for (let y = paso; y < window.innerHeight - paso; y += paso) {

        posicionesCuadrado.push({ x: 0, y });

        posicionesCuadrado.push({

            x: window.innerWidth - 180,

            y

        });

    }

}

function formaCuadrada() {

    generarFormaCuadrado();

    posicionesCuadrado.forEach((p, i) => {

        setTimeout(() => {

            crearVentanaPosicion(p.x, p.y);

        }, i * 35);

    });
    setTimeout(() => {

        destruirEvento();

    }, 3500);

}

function destruirEvento() {

    const ventanas = document.querySelectorAll(".ventanaEvento");

    ventanas.forEach((v, i) => {

        setTimeout(() => {

            v.style.opacity = "0";
            v.style.transform = "scale(0.8)";

            setTimeout(() => {

                v.remove();

            }, 300);

        }, i * 20);

    });

}


function desaparecerAlgunasVentanas() {

    const ventanas = [...document.querySelectorAll(".ventana")];

    const cantidad = Math.min(5, ventanas.length);

    for (let i = 0; i < cantidad; i++) {

        const indice = Math.floor(Math.random() * ventanas.length);

        const ventana = ventanas.splice(indice, 1)[0];

        ventana.style.transition = "opacity .3s, transform .3s";
        ventana.style.opacity = "0";
        ventana.style.transform = "scale(0.8)";

        setTimeout(() => {

            ventana.remove();

        }, 300);

    }

}

function transicionFondo() {

    detenerFondo();

    sobrecarga();

    setTimeout(() => {

        destruccionTotal(() => {

            iniciarFondo();

        });

    }, 2000);

}

let intervaloSobrecargaFinal = null;

function sobrecargaFinal() {

    intervaloSobrecargaFinal = setInterval(() => {

        for (let i = 0; i < 8; i++) {

            crearVentana();

        }

    }, 15);

}


function iniciarFondo() {

    console.log("Iniciando fondo");
    for (let i = 0; i < 60; i++) {

        setTimeout(() => {

            crearVentana();

        }, i * 200);

    }

    setTimeout(() => {

        siguienteCambio();

    }, 9000);

}

