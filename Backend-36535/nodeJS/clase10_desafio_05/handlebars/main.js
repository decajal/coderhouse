const express = require('express');
const handlebars = require('express-handlebars');
const { engine } = handlebars;
const app = express();
const { body, validationResult } = require('express-validator');
const productos = require('./models/modelProductos');

const port = 8080;

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
    res.render('formulario');
});

app.get('/productos', (req, res) =>
{
    const tieneElementos = (productos.length > 0) ? true : false;   
    res.render('datos', { productos, tieneElementos });
});

app.post('/productos',
[
    body('nombre', 'Ingrese un nombre de producto válido (mínimo 5 caracteres)')
        .exists().isLength({min: 5}),
    body('precio', 'Ingrese un monto válido')
        .exists().isNumeric(),
], (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        {
            const valores = req.body;
            const errorsArray = errors.array();
            return res.render('formulario', { errorsArray, valores, errors: true });
        }
    }
    const { nombre, precio, url } = req.body;
    addProduct(nombre, precio, url);

    res.redirect('/');
});  

const addProduct = (title, price, thumbnail) =>
{
    let idNew = maxId();
    idNew++;
    const newProduct = { title, price, thumbnail, id: idNew };
    productos.push(newProduct);
}

const maxId = () =>
{
    let maxId = 0;
    productos.forEach(element => {
        if (element.id > maxId)
            maxId = element.id;
    });
    return maxId;
}

const server = app.listen(port, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));

