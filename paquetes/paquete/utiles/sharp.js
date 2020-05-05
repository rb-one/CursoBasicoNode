// Librería para el manejo de imágenes
const sharp = require('sharp');


sharp('original.png')
    .resize(80)
    .grayscale()
    .toFile('resized.png')
