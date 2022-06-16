const mascotas = require('../models/modelMascotas');

const listar = (req, res) =>
{
    res.status(200).json(mascotas);
}

const agregar = (req, res) => 
{
    const newMascota = req.body;
    mascotas.push(newMascota);
    
    res.status(201).json(
    {
        mensage: "Mascota creada exitosamente!",
        newMascota
    });
}

module.exports = { listar, agregar }

