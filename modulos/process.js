// const process = require('process');

//detectar cuando el programa termina
process.on('beforeExit', () => {
    console.log('El proceso va a terminar');
});

// AL ejecutarse exit nos desconectamos del hilo principal
process.on('exit', () => {
    console.log('El proceso termino');
    //aunque se delegue esta funcion a otro hilo
    // ya no podemos ver su respuesta, el hilo 
    //principal ya esta muerto
    setTimeout(() => {
        console.log('Esto no se va a ver nunca');
        
    }, 0)
});

// puedes combinarlo con file system para escribir un fichero
process.on("uncaughtException", (err, origen) => {
    console.error('Vaya se nos ha olvidado capturar un error');
    setTimeout(() => {
        console.log('Esto viene de las excepciones');

    }, 0)
});
funcionQueNoExiste()

process.on('')