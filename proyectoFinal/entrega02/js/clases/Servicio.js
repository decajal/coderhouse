import { Producto } from "./Producto.js"

export class Servicio extends Producto {
    constructor(id, nombre, precio) {
        super(id, nombre, precio)
    }
}

// Servicios pre-cargados
let servicio1 = new Servicio(1, "Service Completo", 4200)
let servicio2 = new Servicio(2, "Service Semi-completo", 2500)
let servicio3 = new Servicio(3, "Mantenimiento Preventivo", 2800)
let servicio4 = new Servicio(4, "Instalación de nuevos repuestos", 1500)
let servicio5 = new Servicio(5, "Diagnostico del Problema", 2300)

export const servicios = [servicio1, servicio2, servicio3, servicio4, servicio5] // Listado de servicios

