/*
    Profesor Luis Navas
*/
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const messages = [
    {author: 'juan', text: '!hola! que tal?'},
    {author: 'juan', text: '!muy bien'},
    {author: 'Ana', text: '!Genial!'}
];

app.use(express.static('./public'));

// connection es el evento
io.on('connection', (socket) =>
{
    console.log('¡ Nuevo usuario conectado !');
    socket.emit('mensaje', messages); // 'messages' es un array de mensajes

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

const port = 8080;
const serv = server.listen(port, () =>
{
    console.log('Listening on port: ', serv.address().port);
});
server.on('error', err => console.error('Listening on port', err));
