function otraFuncion() {
    seRompe()
}


function seRompe() {
    return 3 + z;
}

function seRompeAsincrona(cb) {
    setTimeout(function () {
        try {
            return 3 + z;
        } catch (err) {
            console.error('Error en mi funcion asincrona');
            cb(err)
            
        }
    }, 1000)
}

try {
    // otraFuncion()
    seRompeAsincrona(function () {
        console.log('Hay error')
    })
} catch (err) {
    console.log('Vaya, algo se ha roto...')
    console.error(err.message)
    console.log('Pero no pasa nada, lo hemos capturado')
}