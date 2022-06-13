const express = require('express');
const app = new express();

let countVisitas = 0;
app.get('/', (req, res) =>
{
    res.send('<h1 style="color: blue">Bienvenidos al servidor Express</h1>')
})
app.get('/visitas', (req, res) =>
{
    countVisitas++;
    res.send(`<p>La cantidad de Visitas es ${countVisitas}</p>`);
})
app.get('/fyh', (req, res) =>
{
    countVisitas++;
    res.send(`<p>La cantidad de Visitas es ${countVisitas}</p>`);
})

const server = app.listen(8080, () =>
{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor ${error}`));

