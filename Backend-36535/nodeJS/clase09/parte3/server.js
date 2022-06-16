const express = require('express');
const handlebars = require('express-handlebars');
const {engine} = handlebars;
const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    }));

app.set('views', './views'); // especificando el directorio de view
app.set('view engine', 'hbs');

app.get('/', (req, res) => 
{
    res.render('datos', {nombre: 'Diego', apellido: 'Cajal'});
})

app.use(express.static('public'));


const server = app.listen(8080, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));
