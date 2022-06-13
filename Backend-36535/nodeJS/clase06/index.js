const http = require('http');
//const port = '8080'; // esta es información sensible que no se muestra, para fines de seguridad y privacidad

const server = http.createServer((peticion, respuesta) =>
{
    respuesta.end('hola mundo');
})

// hacemos que el servidor escuche por un puerto especifico
const conectedServer = server.listen(8080, () =>  // en realidad no se escribe así en crudo el puerto
{
    console.log(`Servidor escuchando en el puerto ${conectedServer.address().port}`);
})

const fechaAhora = new Date();
const hora = fechaAhora.getHours();

if (hora >= 6 && hora <= 12)
    console.log('Buenos días!');
else if(hora <= 19)
    console.log('Buenas tardes!');
else
    console.log('Buenas noches');