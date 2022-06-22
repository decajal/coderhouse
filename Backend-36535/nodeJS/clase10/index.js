const express = require('express');
const app = express();
const port = 8080;
const indexRouter = require('./routes/indexRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');
app.use('/datos', indexRouter);

app.listen(port), () => { console.log(`Escuchando el puerto: ${port}`); }
app.on('error', error => console.log(`Error en el servidor ${error}`));