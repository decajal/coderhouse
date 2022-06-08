import { Persona } from "./Persona.js"

class Mecanico extends Persona
{
    constructor(id, nombre, apellido, dni, celular)
    {
        super(id, nombre, apellido, dni, celular)
    }
}

export const mecanicoUnico = new Mecanico(1, "Juan", "Perez", 24, 3876448833)

