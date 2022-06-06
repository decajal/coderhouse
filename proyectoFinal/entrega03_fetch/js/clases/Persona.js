export class Persona
{
    constructor(id, nombre, apellido, dni, celular)
    {
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.dni = dni,
        this.celular = celular
    }

    mostrarNombres()
    {
        return `${this.apellido}, ${this.nombre}`
    }
}
