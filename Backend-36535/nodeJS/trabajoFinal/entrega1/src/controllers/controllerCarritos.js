import { getData } from "./dbCarritos.js";
import { getData as getProductos } from './dbProductos.js'

// Acciones sobre el carrito
// Crea un nuevo carrito
export const postCart = async (req, res) => {
    const newReg = {
        timestamp: +new Date(),
        productos: [],
    }
    try {
        const db = getData();
        let newId = 1;       
        if (db.data.carritos.length > 0) {
            // Encontrar el maxId del arreglo y sumarle uno generando un nuevo id
            const arr = db.data.carritos.map(x => x.id);
            newId = Math.max(...arr);
            newId++;
        }
        newReg.id = newId;
        db.data.carritos.push(newReg);
        await db.write();
        res.status(201).json({id: newId});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const delCart = async (req, res) => {
    // "vacía" el carrito (no se entiende que se pide en ese punto)
    // Elimina el carrito
    const idCart = req.params.id;

    try {
        const db = getData();
        const cartFound = db.data.carritos.find(x => x.id === parseInt(idCart));
        if (!cartFound) return res.status(404).json({message: 'Carrito no encontrado'});

        const newArray = db.data.carritos.filter(x => x.id !== parseInt(idCart));
        db.data.carritos = newArray;
        await db.write();
        
        res.status(200).json({message: 'Carrito eliminado'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// Acciones sobre los productos del carrito
// Lista los productos del carrito, el id es del carrito
export const getProd = (req, res) => {
    const idCart = req.params.id;
    try {
        const db = getData();
        const cartFound = db.data.carritos.find(x => x.id === parseInt(idCart));
        if (!cartFound) return res.status(404).json({message: 'Carrito no encontrado'});
        
        res.status(200).json(cartFound.productos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const postProd = async (req, res) => {
    const idCart = req.params.id;
    try {
        const db = getData();
        const cartFound = db.data.carritos.find(x => x.id === parseInt(idCart));
        if (!cartFound) return res.status(404).json({message: 'Carrito no encontrado'});
        
        const arrProductsIds = req.body.productos;
        const dbProductos = getProductos();

        arrProductsIds.forEach(idProducto => {
            const regFound = dbProductos.data.productos.find(x => x.id === idProducto);
            if (regFound) {
                // agregar ese registro al arreglo
                cartFound.productos.push(regFound);
            }
        });
        db.data.carritos.map(x => (x.id === parseInt(idCart)) ? cartFound : x);
        await db.write();
        
        res.status(200).json({message: 'Productos agregados'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    //res.json('Post de carritos');
}

export const delProd = async (req, res) => {
    const idCart = req.params.id;
    try {
        const db = getData();
        const cartFound = db.data.carritos.find(x => x.id === parseInt(idCart));
        if (!cartFound) return res.status(404).json({message: 'Carrito no encontrado'});

        const idToDelete = req.params.id_prod;
        const newArray = cartFound.productos.filter(x => x.id !== parseInt(idToDelete));
        cartFound.productos = newArray;

        db.data.carritos.map(x => (x.id === parseInt(idCart)) ? cartFound : x);
        await db.write();        
        res.status(200).json({message: 'Producto eliminado del carrito'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

