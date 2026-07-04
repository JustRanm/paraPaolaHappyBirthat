const fs = require("fs");
const path = require("path");

// Carpeta donde están las imágenes
const carpeta = path.join(__dirname, "../fotos/Ventanas");

// Lee todos los archivos
const archivos = fs.readdirSync(carpeta);

// Solo deja imágenes
const imagenes = archivos.filter(nombre => {
    return /\.(png|jpg|jpeg|webp)$/i.test(nombre);
});

// Crea el contenido del archivo JS
const contenido =
    `const ventanas = ${JSON.stringify(imagenes, null, 4)};`;

// Guarda el archivo
fs.writeFileSync(
    path.join(__dirname, "../js/imagenesVentanas.js"),
    contenido
);

console.log("Lista creada correctamente.");