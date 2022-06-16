const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const routerPersonas = require('./routes/routerPersonas');
app.use('/personas', routerPersonas);

const routerMascotas = require('./routes/routerMascotas');
app.use('/mascotas', routerMascotas);

app.listen(port), () =>
{
    console.log(`Escuchando el puerto: ${port}`);
}