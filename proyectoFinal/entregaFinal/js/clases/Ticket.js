export class Ticket {
    constructor(numero, cliente, elemento, problema, mecanico, fecha, servicios)
    {    
        this.numero = numero
        this.cliente = cliente
        this.elemento = elemento
        this.problema = problema
        this.mecanico = mecanico
        this.fecha = fecha
    }

    precioTotal()
    {
        let total = 0
        servicios.forEach(element => {
            total += element.precio
        });
        return total
    }
}