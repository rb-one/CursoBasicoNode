async function hola(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, ' + nombre)
            resolve(nombre)
        }, 1000);
    });
}

async function hablar(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Bla bla bla bla bla...')
            resolve(nombre);
            // reject('Hay un error');
        }, 1000)
    })
}

async function adios(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Adios, ' + nombre)
            resolve(nombre)
        }, 1000);
    })
}

async function main() {
    let nombre = await hola('Rusbel')
    await hablar()
    await hablar()
    await hablar()
    await hablar()
    await adios(nombre)
}

console.log('Inicia el proceso')
main()
console.log('Termina el proceso')