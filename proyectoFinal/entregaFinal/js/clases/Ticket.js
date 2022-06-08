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

    agregarServicio(servicio)
    {
        this.servicios.push(servicio)
    }
    
    precioTotal()
    {
        let total = 0
        this.servicios.forEach(element => {
            total += element.precio
        });
        return total
    }
}