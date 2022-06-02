import { Producto } from "./Producto.js"

export class Servicio extends Producto {
    constructor(id, nombre, precio) {
        super(id, nombre, precio)
    }
}

// Servicios pre-cargados
let servicio1 = new Servicio(1, "Service Completo Premium", 10200)
let servicio2 = new Servicio(2, "Service Completo Estándar", 4500)
let servicio3 = new Servicio(3, "Service Completo Light", 2500)
let servicio4 = new Servicio(4, "Mantenimiento Preventivo", 2800)
let servicio5 = new Servicio(5, "Instalación de nuevos repuestos", 1500)
let servicio6 = new Servicio(6, "Diagnostico del Problema", 2000)
let servicio7 = new Servicio(7, "Limpieza Completa", 1900)
let servicio8 = new Servicio(8, "Limpieza Superficial", 1000)

export const servicios = [servicio1, servicio2, servicio3, servicio4, servicio5, servicio6, servicio7, servicio8] // Listado de servicios

