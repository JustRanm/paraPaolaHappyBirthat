const ojos = [

    "ojo1.png",
    "ojo2.png",
    "ojoA1.png",
    "ojoA2.png",
    "ojos.png",
    "ojos1.png",
    "ojoE.png",
    "ojoE1.png",
    "ojoD2.png",
    "iris.png",
    "iris1.png",
    "iris2.png"

];

const app = document.getElementById("app");

let intentos = 0;

function iniciarLogin() {

    app.innerHTML = `

    <div id="pantallaLogin">

        <div id="fondoOjos"></div>

        <div id="contenedorLogin"></div>

    </div>

    `;
    iniciarMotorOjos()
    setTimeout(() => {

        mostrarVentanaLogin();

    }, 5000);
}

function mostrarVentanaLogin() {

    const contenedor = document.getElementById("contenedorLogin");

    contenedor.innerHTML = `

        <div class="ventanaXP">

            <div class="barraTitulo">
                Inicio de sesión
            </div>

            <div class="contenidoLogin">

                <label>Usuario</label>

                <input id="usuario" type="text">

                <label>PIN</label>

                <input id="pin" type="password" maxlength="3">

                <button onclick="verificarLogin()">
                    Entrar
                </button>

            </div>

        </div>

    `;
    document.getElementById("usuario").focus();
    document.getElementById("pin").addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            verificarLogin();

        }

    });

}

function verificarLogin() {

    const usuario = document.getElementById("usuario").value.trim();

    const pin = document.getElementById("pin").value.trim();

    if (usuario.toLowerCase() !== "paola") {

        mostrarMensajeError();

        return;

    }

    if (pin !== "218") {


        mostrarMensajeError();

        return;

    }

    mostrarMensajeBienvenida();

}

function mostrarMensajeError() {

    let mensaje;

    if (intentos == 0) {

        mensaje = "Mmmmmmmmm, no eres quien busco";

    } else if (intentos == 1) {

        mensaje = "Ya te dije que no eres quien busco.";

    } else if (intentos == 2) {

        mensaje = "Enserio?, sigues aca intentando aun?";

    } else {

        mensaje = "Denegado, fuera, largo, definitivamente no eres";

    }

    mostrarVentana(
        "Error", "❌",
        mensaje,
        "Intentar otra vez"
    );
    intentos++

}




function mostrarMensajeBienvenida() {

    let mensaje;

    if (intentos == 0) {

        mensaje = "Si eressss, y al primer intento , Felizz cumpleañossssss perrita esto es pa ti <3";

    } else if (intentos == 1) {

        mensaje = "Bueno al segundo, pero si eres Felizzzzz cumpleañossszzszsz perrita esto es pa ti <3";

    } else if (intentos == 2) {

        mensaje = "Casi que no mera lenta, pero si eres Feliz cumpleaños perrita esto es pa ti <3 😂.";

    } else {

        mensaje = "Enserio? , casi que no le atinas, te tomo resto que pene, igual si eres pao Feliz cumpleaños perrita esto es pa ti ❤️.";

    }

    mostrarVentana(
        "Bienvenida",
        "❤️",
        mensaje,
        "Continuar",
        iniciarCarga
    );

}


function crearOjo() {

    const fondo = document.getElementById("fondoOjos");

    const ojo = document.createElement("img");
    ojo.style.opacity = 0.15 + Math.random() * 0.35;
    const duracion = 6 + Math.random() * 5;

    ojo.style.animationDuration = duracion + "s";

    const rotacion = -10 + Math.random() * 20;
    ojo.style.transform = `rotate(${rotacion}deg)`;

    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    ojo.style.left = Math.random() * ancho + "px";
    ojo.style.top = Math.random() * alto + "px";
    let tamaño;

    if (Math.random() < 0.20) {

        tamaño = 220 + Math.random() * 120;

    } else {

        tamaño = 70 + Math.random() * 130;

    }


    ojo.style.width = tamaño + "px";

    const imagen = ojos[Math.floor(Math.random() * ojos.length)];

    ojo.src = "fotos/ojos/" + imagen;

    ojo.className = "ojo";

    fondo.appendChild(ojo);
    if (Math.random() < 0.35) {

        moverOjo(ojo);

    }
    if (Math.random() < 0.60) {

        const blur = Math.random() * 1.5;

        ojo.style.filter = `blur(${blur}px)`;

    }



    return ojo;
}

function moverOjo(ojo) {
    const tipo = Math.random();
    let distancia;

    if (tipo < 0.40) {

        distancia = 10;

    } else if (tipo < 0.70) {

        distancia = 35;

    } else if (tipo < 0.90) {

        distancia = 70;

    } else {

        distancia = 120;

    }
    const moverX = -distancia + Math.random() * (distancia * 2);
    const moverY = -distancia + Math.random() * (distancia * 2);
    ojo.animate([

        {
            transform: "translate(0px,0px)"
        },

        {
            transform: `translate(${moverX}px,${moverY}px)`
        }

    ], {

        duration: 2500 + Math.random() * 3000,

        fill: "forwards",

        easing: "ease-in-out"

    });

}

function siguienteOjo() {

    if (Math.random() < 0.30) {

        const cantidad = 2 + Math.floor(Math.random() * 6);

        for (let i = 0; i < cantidad; i++) {

            crearOjo();

        }

    } else {

        crearOjo();

    }

    const tiempo = 800 + Math.random() * 2500;

    setTimeout(siguienteOjo, tiempo);

}


function iniciarCarga() {

    document.getElementById("pantallaLogin").innerHTML = `

        <div id="pantallaCarga">

            <div class="textoCarga">
                Iniciando sistema...
            </div>

            <div class="barraCarga">

                <div id="progresoCarga"></div>

            </div>

        </div>

    `;

    animarCarga();

}

function animarCarga() {

    const barra = document.getElementById("progresoCarga");

    let progreso = 0;

    const intervalo = setInterval(() => {

        progreso += Math.random() * 10;

        if (progreso > 100)
            progreso = 100;

        barra.style.width = progreso + "%";

        if (progreso >= 100) {

            clearInterval(intervalo);

            continuarHistoria();

        }

    }, 120);

}


function iniciarPantallaCarga(callback) {

    const carga = document.createElement("div");

    carga.id = "pantallaCarga";

    carga.innerHTML = `

        <div class="textoCarga">

            Cargando...

        </div>

        <div class="barraCarga">

            <div id="progresoCarga"></div>

        </div>

    `;

    document.body.appendChild(carga);

    let progreso = 0;

    const barra = document.getElementById("progresoCarga");

    const intervalo = setInterval(() => {

        progreso += 5;

        barra.style.width = progreso + "%";

        if (progreso >= 100) {

            clearInterval(intervalo);

            carga.remove();

            iniciarFondo();

            callback();

        }

    }, 80);

}


function iniciarMotorOjos() {

    crearOjo();

    siguienteOjo();


}

