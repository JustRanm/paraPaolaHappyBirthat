const cartas = [

    {
        imagen: "almohada1.jpeg",
        pareja: 0
    },

    {
        imagen: "almohada2.jpg",
        pareja: 0
    },

    {
        imagen: "Banano1.jpeg",
        pareja: 1
    },

    {
        imagen: "Banano2.jpeg",
        pareja: 1
    },

    {
        imagen: "Camisa1.jpeg",
        pareja: 2
    },

    {
        imagen: "Camisa2.jpeg",
        pareja: 2
    },

    {
        imagen: "sonrisa1.png",
        pareja: 3
    },

    {
        imagen: "sonrisa2.jpg",
        pareja: 3
    },

    {
        imagen: "dibujillo.jpeg",
        pareja: 4
    },

    {
        imagen: "dibujillo1.jpeg",
        pareja: 4
    },

    {
        imagen: "secta.jpeg",
        pareja: 5
    },

    {
        imagen: "secta1.jpg",
        pareja: 5
    }

];
const errores = [

    { icono: "⚠️", titulo: "Advertencia", mensaje: "Piénsalo otra vez niña." },

    { icono: "❌", titulo: "Error", mensaje: "Nanai." },

    { icono: "❌", titulo: "Error", mensaje: "Eje no es enanilla." },

    { icono: "Nop", titulo: "Nop", mensaje: "y Nop" },

    { icono: "🫰​", titulo: "Recordatorio", mensaje: "Mmm... casi, toca leer un poquito mas bro." },

    { icono: "🧠", titulo: "Neurona.exe", mensaje: "JAJAJAJ que lenta." },

    { icono: "💾", titulo: "Archivo", mensaje: "Archivo equivocado, ponga a camellar esas neuronas porfa." }

];


let primeraCarta = null;
let segundaCarta = null;

let primeraVentana = null;
let segundaVentana = null;

let primeraElemento = null;
let segundoElemento = null;

let bloqueado = false;

const MARCA_CORRECTA = "👹";

let parejasEncontradas = 0;


function iniciarMemoria() {

    mostrarVentanaMemoria();

}

function mostrarVentanaMemoria() {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP";

    ventana.id = "ventanaMemoria";

    ventana.innerHTML = `

        <div class="barraTitulo">

            Memoria

        </div>

        <div id="tableroMemoria">

        </div>

    `;

    document.body.appendChild(ventana);
    mezclarCartas();
    crearCartas();

}

function crearCartas() {

    const tablero = document.getElementById("tableroMemoria");

    for (let i = 0; i < cartas.length; i++) {

        const carta = document.createElement("div");
        carta.className = "carta";
        carta.innerHTML = "?";
        carta.dataset.usada = "false";
        carta.dataset.indice = i;
        carta.onclick = seleccionarCarta;

        tablero.appendChild(carta);

    }

}

function mezclarCartas() {

    for (let i = cartas.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];

    }

}

function seleccionarCarta() {

    if (bloqueado) {

        return;

    }
    if (this.dataset.completada === "true") {

        return;

    }

    if (this === primeraElemento) {

        return;

    }

    this.style.transform = "scale(0.92)";

    setTimeout(() => {

        this.style.transform = "scale(1)";

    }, 120);

    const indice = this.dataset.indice;

    const datos = cartas[indice];



    if (primeraCarta == null) {

        primeraCarta = datos;

        primeraVentana = mostrarImagenMemoria("fotos/minijuego2/" + datos.imagen, true);

        primeraElemento = this;

        return;

    }
    segundaCarta = datos;
    segundoElemento = this;
    segundaVentana = mostrarImagenMemoria("fotos/minijuego2/" + datos.imagen, false);

    bloqueado = true;

    setTimeout(compararCartas, 1200);
}

function compararCartas() {

    if (primeraCarta.pareja == segundaCarta.pareja) {

        parejasEncontradas++;

        if (parejasEncontradas == 6) {

            //ventana.remove();

            detenerFondo();

            destruccionTotal();

            setTimeout(() => {

                finalizarMemoria();

            }, 1200);

        }



        primeraElemento.innerHTML = MARCA_CORRECTA;
        segundoElemento.innerHTML = MARCA_CORRECTA;

        primeraElemento.dataset.completada = "true";
        segundoElemento.dataset.completada = "true";

        primeraElemento.style.background = "#7ad67a";
        segundoElemento.style.background = "#7ad67a";

        primeraElemento.onclick = null;
        segundoElemento.onclick = null;

        primeraVentana.style.transition = "all .25s";
        segundaVentana.style.transition = "all .25s";

        primeraVentana.style.opacity = "0";
        segundaVentana.style.opacity = "0";

        setTimeout(() => {

            primeraVentana.remove();
            segundaVentana.remove();

        }, 250);
        switch (primeraCarta.pareja) {

            case 1:

                eventoEspecial1();

                break;

            case 3:

                eventoEspecial2();

                break;

        }


    } else {

        primeraVentana.style.transition = "all .25s";
        segundaVentana.style.transition = "all .25s";

        primeraVentana.style.opacity = "0";
        segundaVentana.style.opacity = "0";

        primeraVentana.style.transform = "scale(0.8)";
        segundaVentana.style.transform = "scale(0.8)";

        setTimeout(() => {

            primeraVentana.remove();
            segundaVentana.remove();

        }, 250);
        mostrarErrorAleatorio();

    }
    primeraCarta = null;

    segundaCarta = null;

    primeraVentana = null;

    segundaVentana = null;

    bloqueado = false;

}

function eventoEspecial1() {

    bloqueado = true;

    mostrarVentana(

        "Un recuerdo 💾",

        "🍌",

        "JAJAJAJ recuerdas tiempo atras que te mantenia enviado fotos con ese filtrooo y te molestaba para que lo hicieras tambien, hasta que lo hicistes en forma de banano, eso fue apenas nos conocimos casi, pues bueno realmente esos meses, si lo piensas hemos pasado por mucho, donde ambos hemos cambiado en cierta manerapero la confianza se ah intensificado.",

        "Continuar",

        () => {

            mostrarRecuerdos([

                "fotos/miniJuego2/Banano/Banano3.jpeg",
                "fotos/miniJuego2/Banano/Banano4.jpeg",
                "fotos/miniJuego2/Banano/Banano5.jpeg",
                "fotos/miniJuego2/Banano/Banano6.jpeg",
                "fotos/miniJuego2/Banano/Banano7.jpeg",
                "fotos/miniJuego2/Banano/Banano8.jpeg"

            ]);
            mostrarVentana(

                "❤️",

                "💨",

                "Continuemos.",

                ".someunitonC",

                () => {

                    cerrarRecuerdos();

                    bloqueado = false;
                }

            );
        }
    );
}

function eventoEspecial2() {

    bloqueado = true;

    mostrarVentana(

        "Otro recuerdo 👨‍🦽‍➡️​",

        "🥸​",

        "NO pierdas esa sonrisa bonita que tienes, ahora quizas no sean los mejores tiempos, yo lo eh presenciado como esa sonrisa se ah apagado, por todo lo que ha pasado, y sobre todo ahora esta sucediendo por estos dias, sin embargo se que esa sonrisa volvera y quisiera poderlo presenciar, no dejes que nada ni nadie se salga con la suya, corazon.",

        "Continuar",

        () => {
            mostrarRecuerdos([
                "fotos/miniJuego2/sonrisa/sonrisa3.png",
                "fotos/miniJuego2/sonrisa/sonrisa4.png",
                "fotos/miniJuego2/sonrisa/sonrisa5.png",
                "fotos/miniJuego2/sonrisa/sonrisa6.jpg"
            ]);
            mostrarVentana(

                " 💋 Muah",

                "🤯",

                "Seguimos?.",

                ".someunitonC",

                () => {

                    cerrarRecuerdos();

                    bloqueado = false;
                }

            );
        }
    );
}


function mostrarErrorAleatorio() {

    const error = errores[
        Math.floor(Math.random() * errores.length)
    ];

    mostrarVentana(

        error.titulo,

        error.icono,

        error.mensaje,

        "Aceptar"

    );

}

function finalizarMemoria() {

    bloqueado = true;

    mostrarVentanaGrande(

        "Lo lograste ❤️",

        "🎉",

        "Si ya estas aquí, significa que ya has logrado restaurar todos los archivos jajajaja, ay bro, no pierdas tu escancia que te hace única, que te hace tu, ciertas veces veo que dudas de quien eres y eso esta bien porque constantemente cambiamos, pero no dejes que esas dudas ni que los sentimientos provocados por cosas ajenas a ti interfieran en tu escancia, la base de todo, tus semblantes, no puedes dudar de ti, porque aunque no es así al final tu eres la que se tiene así misma, solo tu puedes superar todo eso que estas sintiendo, ah superar me refiero a aguantar mija, lo que has hecho muy bien y admiro, porque estas cargada de sentimientos negativos, ah discursos que cuestionan quien eres ahora por parte de tu circulo mas cercano, tu propia familia, no digo que seas inmune pero te mantienes, lo sufres si, lo lloras también, pero sigues, y asi bro  con el tiempo las cosas se convertirán en esto, recuerdos de un pasado, vivencias ya vividas jajajaj, esa escritura,... todo queda en eso, en momentos que luego recordaras por si sola o usando huellas digitalizadas como estas y veras de una manera distinta, por que como mencione al principio estamos en cambio constante, solo a su debido tiempo cambia la perspectiva y eso te hará ver esos recuerdos desde otra perspectiva, sin perder igual lo que son, no debes olvidar, porque esos recuerdos eres tu, forman parte de tu pasado de quien eres ahora, no intentes olvidar los recuerdos que te producen sentimientos negativos asumelos enfrentalos, siéntelos, que luego con el tiempo se convertirán solo en huellas de tu corazon que quedaran asociadas a las demás huellas digitales y físicas, y a un recuerdo.",

        "Continuar",

        iniciarTransicionDisparos()



    );

}

