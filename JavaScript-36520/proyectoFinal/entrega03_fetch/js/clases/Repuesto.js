import { Producto } from "./Producto.js"

export class Repuesto extends Producto {
    constructor(id, nombre, marca, precio, stock) {
        super(id, nombre, precio)       
        this.marca = marca,
        this.stock = stock
    }
}

// Productos/Repuestos pre-cargados
let repuesto1 = new Repuesto(1, "Producto1", "Marca1", 1500, 12)
let repuesto2 = new Repuesto(2, "Producto2", "Marca2", 3800, 50)
let repuesto3 = new Repuesto(3, "Producto3", "Marca1", 1200, 250)
let repuesto4 = new Repuesto(4, "Producto4", "Marca3", 5500, 25)
let repuesto5 = new Repuesto(5, "Producto5", "Marca2", 1300, 90)
let repuesto6 = new Repuesto(6, "Producto6", "Marca1", 2800, 5)
let repuesto7 = new Repuesto(7, "Producto7", "Marca3", 8900, 10)
let repuesto8 = new Repuesto(8, "Producto8", "Marca2", 6250, 33)
let repuesto9 = new Repuesto(9, "Producto9", "Marca3", 2350, 28)

export const repuestos = [repuesto1, repuesto2, repuesto3, repuesto4, repuesto5, repuesto6, repuesto7, repuesto8, repuesto9] // Listado de repuestos
