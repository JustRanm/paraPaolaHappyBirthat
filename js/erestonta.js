
let intensidadEscape = 25;
let intentosNo = 0;
let indiceMensaje = 0;
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let escaparActivo = false;

const frases = [

    "Di la verdad.",

    "Aceptalo ya.",

    "Muchos intentos no crees.",

    "YAAAA.",

    "Rindeteee."

];


function iniciarJuegoEresTonta() {

    setTimeout(() => {

        mostrarVentanaEresTonta();

    }, 2000);

}

function mostrarVentanaEresTonta() {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP";

    ventana.id = "ventanaTonta";

    ventana.innerHTML = `

        <div class="barraTitulo">

            Pregunta importante

        </div>

        <div class="contenidoJuego">

            <p>

                ¿Eres tonta?

            </p>

            <div class="botonesJuego">

                <button id="botonSi">

                    Sí

                </button>

                <button id="botonNo">

                    No

                </button>

            </div>

        </div>

    `;

    document.body.appendChild(ventana);

    ventana.style.left = posX + "px";
    ventana.style.top = posY + "px";

    document.getElementById("botonSi").onclick = responderSi;

    document.getElementById("botonNo").onclick = responderNo;

}


function responderSi() {
    document.getElementById("ventanaTonta").remove();

    let mensaje;

    if (intentosNo == 0) {

        mensaje = "Oye lo aceptastes de una, como le sabes, y Aunque lo seas un poquitito, eres increible enana, no dejes que nada ni nadie te venga a romper, no seas tan tonta, mira aca estas tu antes de que fueras bien tonta y cayeras";

    } else if (intentosNo == 1) {

        mensaje = "Bueno lo aceptastes relativamente rapido, enhorabuena que lo aceptes y Aunque lo seas un poquitito, eres increible enana, no dejes que nada ni nadie te venga a romper, no seas tan tonta, mira aca estas tu antes de que fueras bien tonta y cayeras.";

    } else if (intentosNo == 2) {

        mensaje = "Oye casi que no lo aceptas bro, tanto escapas de la realidad jajajaja y aunque lo seas un poquitito, eres increible enana, no dejes que nada ni nadie te venga a romper, no seas tan tonta, mira aca estas tu antes de que fueras bien tonta y cayeras.";

    } else {

        mensaje = "Casi que no te rindes bobita, hasta que al final aceptas, y aunque lo seas un poquitito, eres increible enana, no dejes que nada ni nadie te venga a romper, no seas tan tonta, mira aca estas tu antes de que fueras bien tonta y cayeras.";

    }


    mostrarImagen("fotos/miniJuego1/pao1.jpeg");


    mostrarVentana(
        "Aceptado",
        "👁️​",
        mensaje,
        "Continuar",
        siguienteEtapa
    );

}

function responderNo() {

    intentosNo++;

    switch (intentosNo) {

        case 1:

            moverPoquito();

            break;

        case 2:

            saltarEsquina();

            break;

        case 3:

            activarEscapeMouse();
            setTimeout(() => {

                intensidadEscape = 15;

            }, 20000);

            setTimeout(() => {

                intensidadEscape = 8;

            }, 30000);
            break;

        case 4:

            crecerVentana();

            mostrarVentana(
                "Mensaje",
                "😈",
                "No puedes escapar.",
                "..."
            );

            break;

        default:

            mensajesLocos();

    }

}


function moverPoquito() {

    const ventana = document.getElementById("ventanaTonta");

    posX += -intensidadEscape + Math.random() * (intensidadEscape * 2);
    posY += -intensidadEscape + Math.random() * (intensidadEscape * 2);

    const margen = 170;

    posX = Math.max(margen, Math.min(window.innerWidth - margen, posX));
    posY = Math.max(margen, Math.min(window.innerHeight - margen, posY));

    ventana.style.transition = "left 0.25s ease, top 0.25s ease";

    ventana.style.left = posX + "px";
    ventana.style.top = posY + "px";

}


function saltarEsquina() {

    const ventana = document.getElementById("ventanaTonta");

    const esquinas = [

        [120, 120],

        [window.innerWidth - 180, 120],

        [120, window.innerHeight - 120],

        [window.innerWidth - 180, window.innerHeight - 120]

    ];

    const e = esquinas[Math.floor(Math.random() * 4)];

    posX = e[0];

    posY = e[1];

    ventana.style.left = posX + "px";

    ventana.style.top = posY + "px";

}


function activarEscapeMouse() {

    if (escaparActivo) return;

    escaparActivo = true;

    document.addEventListener("mousemove", escaparMouse);

}

function escaparMouse(event) {
    console.log("Escape activado")
    const boton = document.getElementById("botonNo");

    if (!boton) return;

    const rect = boton.getBoundingClientRect();

    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const dx = event.clientX - centroX;
    const dy = event.clientY - centroY;

    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 100) {

        moverPoquito();

    }

}

function crecerVentana() {

    const ventana = document.getElementById("ventanaTonta");

    ventana.style.transition = "all .25s";

    ventana.style.width = "430px";

    setTimeout(() => {

        ventana.style.width = "330px";

    }, 250);

}

function mensajesLocos() {

    if (indiceMensaje >= frases.length)
        indiceMensaje = frases.length - 1;

    mostrarVentana(

        "🤨",

        "😒",

        frases[indiceMensaje],

        "Ok"

    );

    if (indiceMensaje < frases.length - 1)
        indiceMensaje++;

}