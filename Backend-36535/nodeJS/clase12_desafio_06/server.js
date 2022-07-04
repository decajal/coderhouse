const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
port = 3000;

const { Contenedor } = require('./src/contenedor');
const productos = new Contenedor('./models/productos.json');
const mensajes = new Contenedor('./models/mensajes.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

httpServer.listen(port, () => console.log(`Server ON, Port: ${port}`))

io.on('connection', async (socket) =>
{
    console.log('Se conectó un nuevo cliente');

    const listaProductos = await productos.getAll();
    socket.emit('productos', listaProductos);

    socket.on('nuevo-Producto', async (nuevoProducto) => 
    {
        // nuevo producto
        const listaProductos = await productos.save(nuevoProducto);
        io.sockets.emit('productos', listaProductos);
    });

    const listaMensajes = await mensajes.getAll();
    socket.emit('mensajes', listaMensajes);

    socket.on('nuevo-Mensaje', async (nuevoMensaje) =>
    {
        // nuevo mensaje
        const listaMensajes = await mensajes.save(nuevoMensaje);
        io.sockets.emit('mensajes', listaMensajes);
    });
});