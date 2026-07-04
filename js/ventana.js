



function mostrarVentana(titulo, icono, mensaje, textoBoton = "Aceptar", accion = null) {

    const ventana = document.createElement("div");

    ventana.className = "ventanaEmergente";

    ventana.innerHTML = `

        <div class="barraTitulo">

            ${titulo}

        </div>

        <div class="contenidoVentana">

            <div class="mensajeVentana">

                <div class="iconoVentana">

                    ${icono}

                </div>

                <p>${mensaje}</p>

            </div>

            <button id="botonVentana">

                ${textoBoton}

            </button>

        </div>

    `;

    document.body.appendChild(ventana);

    document.getElementById("botonVentana").onclick = () => {

        ventana.remove();
        const foto = document.getElementById("ventanaImagen");

        if (foto) {

            foto.remove();

        }

        if (accion) {

            accion();

        }

    };

}


function mostrarImagen(ruta) {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP";

    ventana.id = "ventanaImagen";

    ventana.innerHTML = `

        <div class="barraTitulo">

            📷 Recuerdo

        </div>

        <div class="contenidoImagen">

            <img src="${ruta}">

        </div>

    `;

    document.body.appendChild(ventana);

}



function mostrarImagenMemoria(ruta, izquierda) {

    const ventana = document.createElement("div");

    ventana.className = "ventanaXP ventanaMemoriaImagen";

    ventana.innerHTML = `

        <div class="barraTitulo">

            📷 Recuerdo

        </div>

        <div class="contenidoImagen">

            <img src="${ruta}">

        </div>

    `;

    ventana.style.top = "50%";

    ventana.style.transform = "translateY(-50%)";

    if (izquierda) {

        ventana.style.left = "4%";

    } else {

        ventana.style.right = "4%";

    }

    document.body.appendChild(ventana);

    return ventana;

}


const esPantallaPequena = window.innerWidth < 1200;


function mostrarRecuerdos(imagenes) {

    ventanasRecuerdos = [];

    const esPantallaPequena = window.innerWidth < 1400;

    let filas, columnas;

    if (imagenes.length === 4) {
        filas = 2;
        columnas = 2;
    } else {
        if (esPantallaPequena) {
            filas = 3;
            columnas = 2;   // Laptop: 2 columnas x 3 filas
        } else {
            filas = 2;
            columnas = 3;   // Monitor: 3 columnas x 2 filas
        }
    }

    const margenX = 40;
    const margenY = 40;

    const anchoVentana = esPantallaPequena ? 220 : 320;
    const altoVentana = 250;

    const espacioX =
        (window.innerWidth - anchoVentana * columnas - margenX * 2) /
        (columnas - 1 || 1);

    const espacioY =
        (window.innerHeight - altoVentana * filas - margenY * 2) /
        (filas - 1 || 1);

    for (let i = 0; i < imagenes.length; i++) {

        const fila = Math.floor(i / columnas);
        const columna = i % columnas;

        const ventana = document.createElement("div");

        ventana.className = "ventanaXP ventanaRecuerdo";

        ventana.style.position = "fixed";

        ventana.style.width = anchoVentana + "px";

        ventana.style.left =
            margenX + columna * (anchoVentana + espacioX) + "px";

        ventana.style.top =
            margenY + fila * (altoVentana + espacioY) + "px";

        ventana.style.opacity = "0";

        ventana.style.transition = "opacity .35s";

        ventana.innerHTML = `
            <div class="barraTitulo">
                📷 Recuerdo
            </div>

            <div class="contenidoImagen">
                <img src="${imagenes[i]}">
            </div>
        `;

        document.body.appendChild(ventana);

        ventanasRecuerdos.push(ventana);

        setTimeout(() => {
            ventana.style.opacity = "1";
        }, i * 120);
    }
}



function cerrarRecuerdos(callback = null) {

    ventanasRecuerdos.forEach((ventana, i) => {

        ventana.style.opacity = "0";

        ventana.style.transform = "scale(.9)";

        setTimeout(() => {

            ventana.remove();

        }, 300);

    });

    ventanasRecuerdos = [];

    setTimeout(() => {

        if (callback) {

            callback();

        }

    }, 350);

}


function mostrarVentanaGrande(titulo, icono, mensaje, textoBoton = "Continuar", accion = null) {

    const ventana = document.createElement("div");

    ventana.className = "ventanaGrande";

    ventana.innerHTML = `

        <div class="barraTitulo">

            ${titulo}

        </div>

        <div class="contenidoVentanaGrande">

            <div class="iconoVentana">

                ${icono}

            </div>

            <div class="textoVentanaGrande">

                ${mensaje}

            </div>

            <button id="botonVentanaGrande">

                ${textoBoton}

            </button>

        </div>

    `;

    document.body.appendChild(ventana);

    document.getElementById("botonVentanaGrande").onclick = () => {

        ventana.style.animation = "desaparecerVentana .25s ease-in forwards";

        setTimeout(() => {

            ventana.remove();

            if (accion) {

                accion();

            }

        }, 250);

    };

}