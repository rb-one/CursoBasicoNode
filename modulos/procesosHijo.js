const { exec, spawn } = require('child_process')

//exec usa el comando como string, y un cb con tres parámetros
exec('ls -lh', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(stdout)
})

exec('node globales/consola.js', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(stdout)
})

exec('python3 globales/holaMundo.py', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(stdout)
})

// Para complejos mar largos y complejos que un exec
// o invocar u proceso nuevo y ver que sucede con el usamos spawn
// Ello permite invocar un proceso nuevo de nodejs


let proceso = spawn('ls', ['-la'])

console.log(proceso.pid)
console.log(proceso.connected)

// evento on cuando pase algo en la salida
proceso.stdout.on('data', function (dato) {
    console.log(proceso.killed);
    console.log(dato.toString())
})

proceso.on('exit', function (dato) {
    console.log('El proceso termino')
    console.log(proceso.killed);
})
