const productos = require('../models/modelProductos');

// GET
const listar = (req, res) =>
{
    try
    {
        res.status(200).json(productos);
    }
    catch (error) { res.status(500).json(error.message); }
}

// GET
const buscar = (req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const productoEncontrado = productos.find(x => x.id === id);
    
        res.status(200).json(productoEncontrado);
    }
    catch (error) { res.status(500).json(error.message); }    
}

// POST
const agregar = (req, res) =>
{
    try
    {
        const { title, price, thumbnail } = req.body;
        if (title === "" || price === "" || thumbnail === "")
                throw new Error(res.status(400).json({error: 'Error en el ingreso de los datos.'}));
        
        let idNew = maxId();
        idNew++;
        const newProduct = { title, price, thumbnail, id: idNew };
        productos.push(newProduct);
    
        res.status(201).json(
            {
                mensaje: 'Producto creado exitosamente !',
                newProduct
            });
    }
    catch (error) { res.status(500).json(error.message); }
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

// PUT
const actualizar = (req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const { title, price, thumbnail } = req.body;
        const index = productos.findIndex(x => x.id === id);
        productos.splice(index, 1);
        const updateProduct = {title, price, thumbnail, id};
        productos.push(updateProduct);
        
        res.status(201).json(
            {
                mensaje: 'Producto actualizado exitosamente !',
                updateProduct
            });
    }
    catch (error) { res.status(500).json(error.message); }    
}

// DELETE
const eliminar = (req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const index = productos.findIndex(x => x.id === id);
        productos.splice(index, 1);

        res.status(200).json('Producto eliminado exitosamente !');
    }
    catch (error) { res.status(500).json(error.message); }
}

module.exports = { listar, buscar, agregar, actualizar, eliminar };