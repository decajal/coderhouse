import { Servicio } from "./Servicio.js"
export class Ticket {
    constructor(numero, cliente, elemento, problema, mecanico, fecha)
    {    
        this.numero = numero,
        this.cliente = cliente,
        this.elemento = elemento,
        this.problema = problema,
        this.mecanico = mecanico,
        this.fecha = fecha,
        this.servicios = []
    }

    addServices(servicios)
    {
        this.servicios = servicios
    }

    getServices()
    {
        return this.servicios
    }
    
    getTotalPrice()
    {
        let total = 0
        this.servicios.forEach(element => {
            total += element.precio
        });
        return total
    }
}