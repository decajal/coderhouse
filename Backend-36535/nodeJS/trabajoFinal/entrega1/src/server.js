import express from 'express';
import routerProductos from './routers/routerProductos.js';
import routerCarritos from './routers/routerCarritos.js';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/productos/', routerProductos);
server.use('/api/carrito/', routerCarritos);
server.use((req, res) => {
    const path =  req.originalUrl;
    const metodo = req.method;
    res.status(404).json({error: -2, descripcion: `ruta \'${path}\' método \'${metodo}\' no implementada`});
});

export default server;