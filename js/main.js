window.onload = () => {

    console.log("Proyecto iniciado");
    iniciarLogin();

};

function continuarHistoria() {

    const pantalla = document.getElementById("pantallaLogin");

    pantalla.style.opacity = "0";

    setTimeout(() => {

        pantalla.remove();

        app.innerHTML = `
            <div id="fondo"></div>
        `;

        iniciarFondo();

        setTimeout(() => {

            iniciarJuegoEresTonta();

        }, 7000);

    }, 800);

}

function siguienteEtapa() {

    transicionFondo();
    setTimeout(() => {

        iniciarMemoria()

    }, 4000);

}

function iniciarTransicionDisparos() {

    const ventana = document.getElementById("ventanaMemoria");

    if (ventana) {

        ventana.style.transition = "opacity .5s, transform .5s";
        ventana.style.opacity = "0";
        ventana.style.transform = "scale(0.9)";

        setTimeout(() => {

            ventana.remove();

        }, 500);

    }

    setTimeout(() => {
        iniciarFondo()
        iniciarDisparos();

    }, 10000);
}

function iniciarFinal() {

    setTimeout(() => {

        pantallaRecuperacion();

    }, 3000);



}
