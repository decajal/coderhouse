const express = require('express');
const handlebars = require('express-handlebars');
const { engine } = handlebars;
const app = express();
const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    }));

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) =>
{
    //res.send('Hola Mundo !');
    res.render('formulario');
});

app.post('/productos', [
    body('nombre', 'Mensaje de error').exists().isLength({min: 5}),
    body('precio', 'Mensaje de Error').exists().isNumeric(),
], (req, res) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nombre, precio, url } = req.body;
        
        res.redirect('/'); // <-- lo vuelve a mandar al formulario
        
        
    });

const server = app.listen(8080, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));

