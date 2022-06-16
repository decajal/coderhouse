const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/indexRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(8080), () =>
{
    console.log('Escuchando el puerto 8080');
}