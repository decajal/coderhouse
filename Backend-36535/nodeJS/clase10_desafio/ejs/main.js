const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
const productos = require('./models/modelProductos');

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
{
    // debe cargar el formulario
    const cargarForm = true;
    const errors = false;
    res.render('index', { cargarForm, errors });
});

app.get('/productos', (req, res) =>
{
    // debe cargar los datos
    const cargarForm = false;
    const tieneElementos = (productos.length > 0) ? true : false;
    res.render('index', { cargarForm, productos, tieneElementos });
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
            // debe cargar el formulario
            const cargarForm = true;
            const valores = req.body;
            const errorsArray = errors.array();
            return res.render('index', { cargarForm, errorsArray, valores, errors: true });
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