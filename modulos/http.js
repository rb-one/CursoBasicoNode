const http = require('http');

function router(req, res) {
    console.log('Nueva petición')
    console.log(req.url)
    
    switch (req.url) {
        case '/hola':
            res.write('Hola, que tal')
            res.end();
            break;
            
        default:
            res.write('Error 404, No se lo que quieres')
            res.end();
    }

    res.writeHead(201, { 'Content-Type': 'text/plain' })
    //Escribir respuesta al usuario

}

http.createServer(router).listen(8000);
console.log('Escuchando http en el puerto 8000')