const personas = require('../models/modelPersonas')

const listar = (req, res) =>
{
    res.status(200).json(personas);
}

const agregar = (req, res) => 
{
    const newPersona = req.body;
    personas.push(newPersona);
    
    res.status(201).json(
    {
        mensage: "Persona creada exitosamente!",
        newPersona
    });
}

module.exports = { listar, agregar }