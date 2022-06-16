const express = require('express');
const app = express();
app.use(express.static('public'));


const server = app.listen(8080, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));
