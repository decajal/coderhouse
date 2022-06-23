const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// middleware de archivos
app.use(express.static('./public')); // indicamos que queremos cargar los archivos estáticos que se encuentran en esta carpeta

const mensajes = [];

io.on('connection', (socket) => // * connection se ejecuta la primera vez, cuando se abre la conección
{
    console.log('¡ Nuevo cliente conectado !'); // * Se muestra sólo la primera vez
    socket.emit('mensajes', mensajes);

    // Para escuchar los mensajes enviados por el cliente y propagarlo a todos
    socket.on('new-message', (data) =>
    {
        mensajes.push(data);
        socket.emit('mensajes', mensajes);
    });
});

const port = 3000;

httpServer.listen(port, () =>
{
    // ! Arranca el servidor con http.listen (y no con app.listen como antes)
    console.log('Server ON, Port:', httpServer.address().port)
});

