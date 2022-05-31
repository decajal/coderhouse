import { Persona } from "./Persona.js"

export class Cliente extends Persona {
    constructor(id, nombre, apellido, dni, celular) {
        super(id, nombre, apellido, dni, celular)
    }
}

let cliente1 = new Cliente(1, "Andres", "Perez", 45, 3876554114)
let cliente2 = new Cliente(2, "Ernesto", "Benitez", 16, 3886554114)
let cliente3 = new Cliente(3, "Fabian", "Estevanez", 28, 3816554114)
let cliente4 = new Cliente(4, "Cecilia", "Arriaga", 29, 3885668899)
let cliente5 = new Cliente(5, "Fabiana", "Mendez", 23, 3516554114)
let cliente6 = new Cliente(6, "Diego", "Cajal", 25, 3876830473)

export const clientes = [cliente1, cliente2, cliente3, cliente4, cliente5, cliente6] // listado de clientes

