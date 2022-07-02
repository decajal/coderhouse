import { getData } from './dbProductos.js';
import { administrador } from '../../index.js';

export const get = (req, res) => {
    const id = req.params.id ?? null;
    try {
        const db = getData();
        if (id) {
            const reg = db.data.productos.find(x => x.id === parseInt(id));
            if (!reg) return res.status(404).json({message: 'Registro no encontrado'});
            res.status(200).json(reg);
        } else {
            res.status(200).json(db.data.productos);
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const autorizar = (path, metod) =>
{
    if (!administrador)
        return {error: -1, descripcion: `ruta \'${path}\' método \'${metod}\' no autorizada`}
}

export const post = async (req, res) => {
    const auth = autorizar(req.originalUrl, req.method);
    if (auth != null) return res.status(401).json(auth);

    const newReg = {
        timestamp: +new Date(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock,
    }
    try {
        const db = getData();
        let newId = 1;       
        if (db.data.productos.length > 0) {
            // Encontrar el maxId del arreglo y sumarle uno generando un nuevo id
            const arr = db.data.productos.map(x => x.id);
            newId = Math.max(...arr);
            newId++;
        }
        newReg.id = newId;
        db.data.productos.push(newReg);
        await db.write();
        res.status(201).json({message: 'Nuevo registro creado'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const put = async (req, res) => {
    const auth = autorizar(req.originalUrl, req.method);
    if (auth != null) return res.status(401).json(auth);

    const id = req.params.id;
    try {
        const db = getData();
        const regFound = db.data.productos.find(x => x.id === parseInt(id));
        if (!regFound) return res.status(404).json({message: 'Registro no encontrado'});
        regFound.nombre = req.body.nombre;
        regFound.descripcion = req.body.descripcion;
        regFound.codigo = req.body.codigo;
        regFound.foto = req.body.foto;
        regFound.precio = req.body.precio;
        regFound.stock = req.body.stock;

        db.data.productos.map(x => (x.id === parseInt(id)) ? regFound : x);
        await db.write();
        res.status(200).json({message: 'Registro actualizado'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const del = async (req, res) => {
    const auth = autorizar(req.originalUrl, req.method);
    if (auth != null) return res.status(401).json(auth);

    const id = req.params.id;
    try {
        const db = getData();
        const regFound = db.data.productos.find(x => x.id === parseInt(id));
        if (!regFound) return res.status(404).json({message: 'Registro no encontrado'});
        
        const newArray = db.data.productos.filter(x => x.id !== parseInt(id));
        db.data.productos = newArray;
        await db.write();
        res.status(200).json({message: 'Registro eliminado'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}