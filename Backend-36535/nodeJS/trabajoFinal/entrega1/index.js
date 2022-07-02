import 'dotenv/config';
import server from './src/server.js'
import { getConnection as getProductos } from './src/controllers/dbProductos.js';
import { getConnection as getCarritos } from './src/controllers/dbCarritos.js';

const port = process.env.PORT || 8080;

getProductos();
getCarritos();

server.listen(port, () => console.log(`Server ON, port: ${port}`));
server.on('error', (error) => console.log(`Server Error, description: ${error}`));