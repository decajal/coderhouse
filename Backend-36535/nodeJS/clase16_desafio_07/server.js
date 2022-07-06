require('dotenv').config();
const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { getAllMessages, addMessage } = require('./src/controllerMensajes');
const { getAllProducts, addProduct } = require('./src/controllerProductos');

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const port = process.env.PORT || 8080;

httpServer.listen(port, () => console.log(`Server ON, Port: ${port}`));

io.on('connection', async (socket) => 
{
    console.log('Nueva conexión');

    const productos = await getAllProducts();
    socket.emit('productos', productos);

    socket.on('nuevo-producto', async (newProduct) => {
        await addProduct(newProduct);
        const productos = await getAllProducts();
        io.sockets.emit('productos', productos);
    });
    
    const mensajes = await getAllMessages();
    socket.emit('mensajes', mensajes);

    socket.on('nuevo-mensaje', async (newMessage) => {
        await addMessage(newMessage);
        const mensajes = await getAllMessages();
        io.sockets.emit('mensajes', mensajes);
    });
});

