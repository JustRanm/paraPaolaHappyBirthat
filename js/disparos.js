let puntaje = 0;

const objetivos = [

    { imagen: "enemigos/D1.Jpeg", tipo: "ex", puntos: 25 },
    { imagen: "enemigos/D2.jpeg", tipo: "ex", puntos: 17 },
    { imagen: "enemigos/DY.jpeg", tipo: "ex", puntos: 18 },
    { imagen: "enemigos/DY2.jpeg", tipo: "ex", puntos: 11 },
    { imagen: "enemigos/i.jpeg", tipo: "ex", puntos: 35 },
    { imagen: "enemigos/R.jpeg", tipo: "ex", puntos: 12 },
    { imagen: "enemigos/R2jpeg.jpeg", tipo: "ex", puntos: 10 },
    { imagen: "enemigos/D2.jpeg", tipo: "ex", puntos: 13 },
    { imagen: "enemigos/l1.jpeg", tipo: "ex", puntos: 28 },
    { imagen: "enemigos/l2.jpeg", tipo: "ex", puntos: 9 },
    { imagen: "enemigos/C.png", tipo: "ex", puntos: 45 },
    { imagen: "enemigos/C1.jpeg", tipo: "ex", puntos: 28 },
    { imagen: "enemigos/C2.png", tipo: "ex", puntos: 31 },

    { imagen: "aliados/A.jpeg", tipo: "gata", puntos: -40 },
    { imagen: "aliados/A2.jpeg", tipo: "gata", puntos: -30 },
    { imagen: "aliados/A3.jpeg", tipo: "gata", puntos: -20 },

    { imagen: "aliados/P.jpeg", tipo: "perro", puntos: -20 },
    { imagen: "aliados/P1.jpeg", tipo: "perro", puntos: -15 },
    { imagen: "aliados/P3.jpeg", tipo: "perro", puntos: -15 },
    { imagen: "aliados/KA.jpeg", tipo: "perro", puntos: -25 },
    { imagen: "aliados/KA1.jpeg", tipo: "perro", puntos: -15 },
    { imagen: "aliados/KA2.jpeg", tipo: "perro", puntos: -20 },
    { imagen: "aliados/KA3.jpeg", tipo: "perro", puntos: -15 },
    { imagen: "aliados/KA4.jpeg", tipo: "perro", puntos: -15 },
    { imagen: "aliados/spike.jpeg", tipo: "perro", puntos: -99 },


];



function iniciarDisparos() {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP";
    ventana.id = "ventanaDisparos";
    ventana.style.width = "500px";
    ventana.style.height = "600px";
    ventana.style.position = "absolute";

    ventana.style.left = "50%";
    ventana.style.top = "50%";

    ventana.style.transform = "translate(-50%, -50%)";
    ventana.innerHTML = `

        <div class="barraTitulo">

            🎯 Eliminando recuerdos

        </div>

        <div class="contenidoDisparos">

            <div id="puntaje">

                Puntaje: 0 / 218

            </div>

            <div id="tableroDisparos">

            </div>

        </div>

    `;

    document.body.appendChild(ventana);

    crearHuecos();
    iniciarObjetivos();
}

function crearHuecos() {

    const tablero = document.getElementById("tableroDisparos");

    for (let i = 0; i < 9; i++) {

        const hueco = document.createElement("div");

        hueco.className = "hueco";

        hueco.dataset.ocupado = "false";

        hueco.dataset.tipo = "";

        hueco.onclick = seleccionarHueco;

        tablero.appendChild(hueco);

    }

}

function aparecerObjetivo() {

    const huecos = document.querySelectorAll(".hueco");

    const libres = [];

    huecos.forEach(h => {

        if (h.dataset.ocupado == "false") {

            libres.push(h);

        }

    });

    if (libres.length == 0) {

        return;

    }
    const hueco = libres[Math.floor(Math.random() * libres.length)];
    const objetivo = objetivos[Math.floor(Math.random() * objetivos.length)];
    hueco.dataset.ocupado = "true";
    hueco.dataset.tipo = objetivo.tipo;
    hueco.dataset.puntos = objetivo.puntos;

    hueco.innerHTML = `

    <img src="fotos/minijuego3/${objetivo.imagen}" class="objetivo">

    `;
    setTimeout(() => {

        hueco.innerHTML = "";

        hueco.dataset.ocupado = "false";

        hueco.dataset.tipo = "";

    }, 700);
}

let intervaloObjetivos = null;

function iniciarObjetivos() {

    generarObjetivos();

}

function generarObjetivos() {

    aparecerObjetivo();

    if (Math.random() < 0.55) {

        aparecerObjetivo();

    }

    if (Math.random() < 0.20) {

        aparecerObjetivo();

    }

    const tiempo = 500 + Math.random() * 700;

    intervaloObjetivos = setTimeout(generarObjetivos, tiempo);

}
function seleccionarHueco() {

    if (this.dataset.ocupado == "false") {

        return;

    }

    puntaje += parseInt(this.dataset.puntos);

    document.getElementById("puntaje").innerHTML =
        "Puntaje: " + puntaje + " / 218";

    this.innerHTML = "";

    this.dataset.ocupado = "false";
    this.dataset.tipo = "";
    this.dataset.puntos = "";


    if (puntaje >= 218) {

        clearTimeout(intervaloObjetivos);

        transicionFinal();

    }

}
function transicionFinal() {

    const ventana = document.getElementById("ventanaDisparos");

    ventana.style.transition = "opacity .6s, transform .6s";

    ventana.style.opacity = "0";

    ventana.style.transform = "translate(-50%,-50%) scale(.9)";

    setTimeout(() => {

        ventana.remove();

        mostrarCargaFinal();

    }, 600);

}
function mostrarCargaFinal() {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP";
    ventana.id = "ventanaCargaFinal";

    ventana.style.width = "430px";
    ventana.style.position = "absolute";
    ventana.style.left = "50%";
    ventana.style.top = "50%";
    ventana.style.transform = "translate(-50%, -50%)";
    ventana.style.zIndex = "999999999";

    ventana.innerHTML = `

        <div class="barraTitulo">

            ⚠ Administrador de recuerdos

        </div>

        <div style="padding:20px;">

            <p>
                Detectando una cantidad excesiva de recuerdos...
            </p>

            <p>
                Intentando organizar los archivos...
            </p>

            <div id="barraCargaExterior">

                <div id="barraCargaInterior"></div>

            </div>

            <p id="porcentajeCarga">

                0%

            </p>

        </div>

    `;

    document.body.appendChild(ventana);

    iniciarCargaFinal();

}

function iniciarCargaFinal() {

    let progreso = 0;

    const barra = document.getElementById("barraCargaInterior");

    const porcentaje = document.getElementById("porcentajeCarga");

    function avanzar() {

        progreso++;

        barra.style.width = progreso + "%";

        porcentaje.innerHTML = progreso + "%";

        if (progreso == 10) {

            sobrecargaFinal();

        }

        // Se queda "pensando" en el 90%
        if (progreso == 90) {

            setTimeout(avanzar, 2000);

            return;

        }

        if (progreso >= 100) {

            document.getElementById("ventanaCargaFinal").remove();

            clearInterval(intervaloSobrecargaFinal);

            pantallazoAzul();

            return;

        }

        // Del 91 al 100 va muchísimo más rápido
        if (progreso >= 91) {

            setTimeout(avanzar, 40);

        } else {

            setTimeout(avanzar, 60);

        }

    }

    avanzar();

}

function pantallazoAzul() {
    document.querySelectorAll(".ventana").forEach(v => v.remove());
    document.querySelectorAll(".ventanaXP").forEach(v => v.remove());
    document.body.innerHTML = `

        <div id="pantallaAzul">

            <h1>:(</h1>

            <h2>

                SYSTEM_MEMORY_OVERFLOW

            </h2>

            <p>

                Se encontraron demasiados recuerdos.

            </p>

            <p>

                Recopilando información...

            </p>

        </div>

    `;

    setTimeout(() => {

        iniciarFinal();

    }, 3000);

}
