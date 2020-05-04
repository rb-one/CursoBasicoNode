#Curso de Fundamentos de Node JS
- [Entender los módulos del core](#entender-los-m%c3%b3dulos-del-core)
  - [11 Globals](#11-globals)
  - [12 File System](#12-file-system)
  - [Console](#console)
  - [14 Errores (try/catch)](#14-errores-trycatch)
  - [15 Procesos hijo](#15-procesos-hijo)
  - [16 Modulos nativos en C++](#16-modulos-nativos-en-c)
  - [17 HTTP](#17-http)
  - [18 OS](#18-os)
  - [19 Process](#19-process)
- [Utilizar los módulos y paquetes externos](#utilizar-los-m%c3%b3dulos-y-paquetes-externos)
  - [20 Utilizar los módulos y paquetes externos](#20-utilizar-los-m%c3%b3dulos-y-paquetes-externos)
  - [21 Construyendo modulos: Require e Import](#21-construyendo-modulos-require-e-import)


### 01 Node: orígenes y filosofía

Node js es una formas mas rápidas de desarrollar, ejecutar y corer código en servidor de forma  escalable.

Node es un entorno de ejecución de javascript fuera del  navegador, see crea en 2009.

**Conceptos clave**

**Concurrencia**

* Mono-hilo, con entradas y salidas asíncronas
* Un proceso por cada núcleo del procesador

Node corre sobre el *motor V8* de google, escrito en c++ convierte el  código js a código maquina.

Node funciona en base a módulos, todo lo que no sea sintaxis de programación son módulos.

Muchos módulos viene por defecto en el paquete de node pero puedes crear tus propios módulos.

Node esta Orientado a eventos.

Hay un bucle de eventos que se ejecuta constantemente.

Puedes orientar tu código de forma reactiva. (Cuando suceda esto, realiza esto otro)


### 02 EventLoop: asíncrona por diseño

EventLoop: asíncrona por diseño

¿Que es el Event Loop?

Es un proceso con un bucle (como un while) que gestiona, de forma asíncrona, todos los eventos de tu aplicación.

Los eventos se gestionaran desde la cola de eventos llamada Event Queue

![notes](./assets/01.-eventloop.png)

En caso de que no pueda resolver de forma inmediata el eventLoop enviara los procesos al Thread Pool

![notes](./assets/02.-Threadpool.png)


Quien a su vez gestiona cada uno de esos procesos abriendo un hilo como su nombre indica para cada tarea o proceso en forma paralela, cuando la tarea termina vuelve al thread pool,y después al event Queue que la devuelve al Event Loop para que e ejecute la petición o la tarea.

![notes](./assets/03.-Threadpool.png)

### 03 Monohilo: implicaciones en diseño y seguridad

La parte mas importante, al correr en un solo hilo es que debemos estar al pendiente de nuestros parámetros y nuestras funciones, ya que al momento de presentar un error se rompe el código y deja de funcionar todo lo demás.  

```
console.log('Hola mundo');

let i = 0;
setInterval(function(){
    console.log(i)
    i++

    // if (i === 5){
    //     console.log('Forzamos error')
    //     var a = 3 + z;
    // }


}, 1000);

console.log('Segunda Instrucción')
```

Iniciamos la ejecución en terminal `nodejs monohilo.js`
```
Hola mundo
Segunda Instrucción
0
1
2
```

### 04 Variables de entorno
Variables de entorno nos permite traer información desde fuera de nuestro programa y ejecutar esa información en tiempo real

Pasar directamente la variable de entorno en la consola

```
let nombre = process.env.NOMBRE ||'Sin nombre'
let web = process.env.WEB ||'no tengo web'

console.log('Hola ' + nombre);
```
Ejecutamos en terminal `NOMBRE=Rusbel nodejs entorno.js` y obtenemos el resultado al pasar directamente la variable de entorno
```
Hola Rusbel
no tengo web
```

### 05 Herramientas para ser más felices: Nodemon y PM2

**Nodemon**. Herramienta de desarrollo que cada vez que detecte cambios en el código que ejecutamos o sus dependencias vuelve a ejecutar el código de forma automática 

Instalación
```
npm install -g nodemon
```
para usarlo vamos a la terminal
```
nodemon entorno.js
```


**PM2**  Herramienta en Producción, similar a nodemon,  con opciones mucho  más avanzadas para monitorización y automatización.

Instalación
```
npm install -g pm2
```

Algunos comandos de pm2
```
// comandos disponibles básicos
pm2

// Status sencillo de lo que corre
pm2 status

// Detener un proceso por su ID
pm2 stop 0 

// Iniciar un proceso o reiniciar por su ID
pm2 start 0


// Logs de procesos corriendo
pm2 log
```

### 07 Callbacks


```
function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, ' + nombre)
        miCallback(nombre)
    }, 1000);
}

function adios(nombre, otroCallback) {
    setTimeout(function () {
        console.log('Adios, ' + nombre)
        otroCallback()
    }, 1000);
}

console.log('Iniciando proceso...')
hola('Rusbel', function (nombre) {
    adios(nombre, function () {
        console.log('Terminando proceso...')
    })
})
```
[output]
```
Iniciando proceso...
Hola, Rusbel
Adios, Rusbel
Terminando proceso...
```

### 08 Callback Hell: refactorizar o sufrir

Tomamos el código anterior y creamos una funcion intermedia para poder evitar el callback hell, esta funcion es recursiva. 

```
function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, ' + nombre)
        miCallback(nombre)
    }, 1000);
}

function hablar(callbackHablar) {
    setTimeout(function () {
        console.log('Bla bla bla bla bla...')
        callbackHablar();
    }, 1000)
}

function adios(nombre, otroCallback) {
    setTimeout(function () {
        console.log('Adios, ' + nombre)
        otroCallback()
    }, 1000);
}

// Creamos una funcion intermedia recursiva para
// evitar el callback hell
function conversation(nombre, veces, callback) {
    if (veces >= 0) {
        hablar(function () {
            conversation(nombre, --veces, callback)
        })
    } else {
        adios(nombre,callback);
    }
}

console.log('Iniciando proceso...')
hola('Rusbel', function (nombre) {
    conversation(nombre, 3, function() {
        console.log('Proceso Terminado')
    });
});
```

### 09 Promesas

```
function hola(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, ' + nombre)
            resolve(nombre)
        }, 1000);
    });
}

function hablar(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Bla bla bla bla bla...')
            // resolve(nombre);
            reject('Hay un error');
        }, 1000)
    })
}

function adios(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Adios, ' + nombre)
            resolve(nombre)
        }, 1000);
    })
}
console.log('Iniciando el proceso')
hola('Rusbel')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then( () => {
        console.log('Terminando el proceso')
    })
    .catch(error => {
        console.error('Ha habido un error');
        console.error(error);
    })
```


### 10 Async-await

```
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

```

## Entender los módulos del core

### 11 Globals

En esta clase observamos los módulos globales de node.js en su documentación oficial. Realiza los siguientes ejemplos

```
console.log(globals)
```

**Uso de setInterval y clearInterval**

Este ejemplo lo podemos utilizar para gestionar el número de intentos a una conexión de un api o una base de datos
```
let i = 0;
let intervalo = setInterval(function () {
    console.log('Hola');
    if (i === 3) {
        clearInterval(intervalo);
    }
    i++;
}, 1000)
```

**setImmediate**

```
setImmediate(function() {
    console.log('Hola')
});
```

Obtén datos de la consola y los procesos con **process**

```
console.log(process)
```

Obtener el nombre de nuestro archivo con **__filename**

```
console.log(__filename)
```

Declarar variables globales
```
global.miVariable = 2
```

### 12 File System

El File System es uno de los módulos principales que nos ofrece Node, este modulo es aquel que nos permite operar directamente con los archivos de nuestro sistema, permitiéndonos crear, leer, editar o eliminar archivos de nuestra índole.
Es mu importante tener en cuenta que la mayoría de métodos de este modulo son asíncronos, pero también nos ofrecen su versión síncrona, la cual es muy poco recomendable a la hora de usar ya que puede bloquear el evento loop de Node.
Para poder usar este modulo lo debemos importar con require en una constante con el mismo nombre del módulo:


```
// Importamos nuestro módulo
const fs = require('fs');

function leer(ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        cb(data.toString());
    })
}

function escribir (ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function(err) {
    if (err) {
        console.log('No he podido escribirlo', err);
    } else {
        console.log('Se ha escrito correctamente')
    }
    })
}

function borrar (ruta, cb) {
    fs.unlink(ruta, cb);
}

// leer(__dirname + '/archivo.txt', console.log)
// escribir(__dirname + '/archivo1.txt', 'soy un archivo nuevo :D', console.log)
borrar(__dirname + '/archivo1.txt', console.log)

```

### Console

Esta clase muestra el modulo console de node, con console podemos imprimir todo tipo de valores por
nuestra terminal.

**console.log:** recibe cualquier tipo y lo muestra en el consola.
**console.info:** es equivalente a log pero es usado para informar.
**console.error:** es equivalente a log pero es usado para errores.
**console.warn:** es equivalente a log pero es usado para warning.
**console.table:** muestra una tabla a partir de un objeto.
**console.count:** inicia un contador autoincremental.
**console.countReset:** reinicia el contador a 0.
**console.time:** inicia un cronometro en ms.
**console.timeEnd:** Finaliza el cronometro.
**console.group:** permite agrupar errores mediante indentation.
**console.groupEnd:** finaliza la agrupación.
**console.clear:** Limpia la consola.

Para mayor referencia del modulo aquí la documentación https://nodejs.org/dist/latest-v12.x/docs/api/console.html


Mensajes de la consola

```
console.log('algo')

//sinónimo de log
console.info('algo')
```

Mostrar errores en consola
```
console.error('algo')
console.warn('algo')
```


Crear una tabla a partir de los datos de un objeto
```
var tabla = [
    {
        a: 1,
        b: 'z',
    },
    {
        a: 2,
        b: 'y',
    }
]
console.table(tabla)
```


Agrupando mensajes de la consola
```
console.log('otros datos')

console.group('Conversación:')
console.log('Hola')
console.log('Bla bla bla')
console.log('Bla bla bla')
console.log('Bla bla bla')
console.log('Adios')
console.groupEnd('Conversación')

console.log('otros datos')

```

Ejemplo 2
```
function function1() {
    console.group('function 1')
    console.log('Esto es de la funcion 1')
    console.log('Esto también')
    console.log('Esto también')
    console.log('Esto también')
    function2()
    console.log('he vuelto a la funcion1')
    console.groupEnd('function 1')
}

function function2() {
    console.group('function 2')
    console.log('Ahora estamos en de la funcion 2')
    console.groupEnd('function 2')
}

console.log('empezamos')
function1()

```

Utilizando contadores
```
console.count('Veces')
console.count('Veces')
console.countReset('Veces')
console.count('Veces')
console.count('Veces')
```


### 14 Errores (try/catch)


```
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
```

### 15 Procesos hijo

Procesos hijo

Node nos permite ejecutar varios hilos de procesos desde el suyo propio, sin importar de que sea este proceso, es decir, puede ejecutar procesos de Python, otros procesos de Node u otro proceso que tengamos en nuestro sistema.

Para poder usar estos procesos usamos el modulo de child-process, este trae dos métodos que nos permitirá ejecutar los procesos que deseemos. El método **exec** y el método **spawn**.

El método **exec** nos permite ejecutar un comando en nuestro sistema, recibe como parámetros el comando entero que deseemos y como segundo parámetro un callback con tres parámetros, un error, un stdout y un stderr.

El método **spawn** es parecido al método exec pero un poco más complejo, permitiéndonos conocer su estado y que datos procesa en cada momento del estado de comando ejecutado.


```
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
```

Ejemplo con spawn

```
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
```

### 16 Modulos nativos en C++

1. Instala `node-gyp`. Hay que hacerlo de forma global. Para eso, ejecuta:

    ```npm i -g node-gyp```

    _Dependiendo del sistema de archivos, y los permisos, puede que tengas que usar sudo en linux y mac, o ejecutar como administrador en windows_

2. Crea tu archivo fuente. Un ejemplo lo puedes encontrar en [la documentación de node](https://nodejs.org/api/addons.html#addons_hello_world)
3. Crea un `binding.gyp` en la raíz del modulo.
4. En la carpeta raíz del modulo, ejecuta:

    ```node-gyp configure```

5. Se habrá generado un directorio build.
6. En la carpeta raiz del modulo, ejecuta:

    ```node-gyp build```

7. El modulo se compilar y podras importarlo en javascript. Puedes revisar que exista el archivo `build/Release/addon.node` _(es un binario, asÃ­ que no podras abrirlo)_
8. Para usarlo, crea un archivo js. Para importarlo:

    ```const addon = require('./build/Release/addon');```

    y para usarlo:

    ```addon.hola()```

    deberá imprimir `mundo`

El código para mayor referencia debe tomarse de la documentación de node. 

### 17 HTTP

```
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

```

### 18 OS

Un modulo bastante divertido

```
const os = require('os')

// console.log(os.arch());
// console.log(os.platform());

// console.log(os.cpus().length);
// console.log(os.constants);

// const SIZE = 1024;
// function kb(bytes) { return bytes / SIZE}
// function mb(bytes) { return kb(bytes) / SIZE}
// function gb(bytes) { return mb(bytes) / SIZE}

// console.log(os.freemem());
// console.log(kb(os.freemem()))
// console.log(gb(os.freemem()))

// console.log(os.totalmem());

// console.log(os.homedir());
// console.log(os.tmpdir());
// console.log(os.hostname());
console.log(os.networkInterfaces());

```

### 19 Process

El proceso de node, entender lo que sucede, escuchar los eventos, puedes encontrar mas información en la documentación https://nodejs.org/dist/latest-v12.x/docs/api/process.html
```
//No requiere importarlo ya que esta desde los modulos globales
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

```

## Utilizar los módulos y paquetes externos


### 20 Utilizar los módulos y paquetes externos

Esta clase da un repaso a la pagina de npm y su gestión de paquetes.


Para ello creamos la ruta `./paquetes/npm` e inicializamos proyecto 

```
npm init -y
```

Instalamos una dependencia 

```
npm install is-odd
```

Probamos su funcionamiento en un archivo index.js
```
const isOdd =require('is-odd');

console.log(isOdd(2));

```

### 21 Construyendo modulos: Require e Import


Construimos nuestra la ruta `./paquete/modulos` y creamos dentro los `index.js` y `modulo.js`.

**modulo.js** En el realizamos el export en el esquema ES5, ES6 aun no es soportado por node en forma nativa

```
function saludar() {
    console.log('Hola mundo!!!');
    
}

// exportamos nuestra funcion como  un objeto
module.exports = { 
    saludar };
```

**index.js** 

```
// Traer nuestro modulo
const modulo = require('./modulo');

// Ejecutar una funcion del modulo
// console.log(modulo);
modulo.saludar()
```

Ejemplo 2 usando la sintaxis ES6 con las opciones experimentales de node, implementamos la ruta `paquete/modulo/es6`

Creamos el archivo `modulo.mjs`

```
function saludar() {
    console.log('Hola mundo!!!');

}

//Usando la sintaxis de export default
export default {
    saludar,
    prop1: 'soy un objeto experimental',
};

```

archivo `index.mjs`

```
import modulo from './modulo.mjs'

modulo.saludar()
console.log(modulo.prop1);

```

Corremos desde la terminal
```
nodemon --experimental-modules modulo/es6/index.mjs
```
