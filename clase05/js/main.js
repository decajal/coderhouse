/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 05: Objetos
    Fecha 16/05/2022
*/

// Ojeto Literales
// ===============

/*
let persona1 = {
    nombre: "Francisco",
    apellido: "Pugh",
    cargo: "Profesor"
}

console.log(persona1)
console.log(persona1.nombre)
console.log(persona1["nombre"]) // ambas formas son válidas, solo que ésta forma no es recomendada
*/

/*
Un objeto se puede declarar con let y con const
una declaración con let permite cambiar la estructura del objeto
Ejemplo

let persona1 = {
    nombre: "Francisco",
    apellido: "Pugh",
    cargo: "Profesor"
}

let persona2 = {
    nombre: "Gonzalo",
    apellido: "Ledesma",
    cargo: "Tutor",
    edad: 20
}

persona1 = persona2 // <== si se permite hacer

una declaración con const no permite modificar la estructura del objeto
Ejemplo

const persona1 = {
    nombre: "Francisco",
    apellido: "Pugh",
    cargo: "Profesor"
}

const persona2 = {
    nombre: "Gonzalo",
    apellido: "Ledesma",
    cargo: "Tutor",
    edad: 20
}

persona1 = persona2 // <== no se permite, porque le cambia la estructura, persona2 tiene un campo más en su estructura
Peeeeeeeeeeero
Si queremos agregar una nueva propiedad de la siguiente forma SI PERMITE
persona1.edad = "20"

En ambas declaraciones si se pueden modificar los VALORES de las propiedades

Con la nueva versión de JS se van a agregar el uso de propiedades privadas
*/

/*
console.log(persona1)
persona1.nombre = "Pepito"
console.log(persona1.nombre)
*/

/*
    Funciones Constructoras
    =======================
    Las funciones constructoras tienen un inconveniente que las propiedades no lo son propeamente dichas, sino que son
        atributos
*/

/*
function Producto(nombre, marca, precio, stock) {
    this.nombre = nombre,
    this.marca = marca,
    this.precio = precio,
    this.stock = stock,
    this.categoria = 1
    this.modificarStock = (nuevoStock) => this.stock -= nuevoStock // en este caso no es un método propiamente, sino un atributo
}

const Producto1 = new Producto("Yerba Mate", "La Yerbita", 450, 20)
console.log(Producto1)
Producto1.modificarStock(10)
console.log(Producto1)
*/

/*
    Métodos y Operaciones con Objetos
    =================================

*/

/*
for (let propiedad in Producto1) { // Muestra listado de los nombres de las propiedades del Objeto
    console.log(propiedad)
}

for (let propiedad in Producto1) { // Muestra listado de los valores que contienen las propiedad
    console.log(Producto1[propiedad])
}

console.log(Object.entries(Producto1)) // Me devuelve un arreglo, un par ordenado, con el nombre de la propiedad y su valor
*/

/*
    Clases
    ======
*/

/*
class Animal { // dentro de las clases de JS solo puedo tener un, y sólo un, constructor en JS
    constructor(nombre, raza, peso, color) {
        this.nombre = nombre,
        this.raza = raza,
        this.peso = peso,
        this.color = color
    }

    MostrarDatos() { // Esto SI ES UN METODO PROPIAMENTE DICHO
        console.log(`${this.nombre} ${this.raza} ${this.peso} ${this.color}`)
    }
}

const animal1 = new Animal("Felipe", "Persa", 3.4, "Negro")
console.log(animal1)
*/

class Animal { // dentro de las clases de JS solo puedo tener un, y sólo un, constructor en JS
    constructor(nombre, peso = 3, color = "Gris") {
        this.nombre = nombre,
        this.peso = peso,
        this.color = color
    }

    MostrarDatos() { // Esto SI ES UN METODO PROPIAMENTE DICHO
        console.log(`${this.nombre} ${this.peso} ${this.color}`)
    }
}

class Gato extends Animal {
    constructor(nombre, peso, color, raza, edad) {
        super(nombre, peso, color)
        this.raza = raza,
        this.edad = edad
    }

    Maulla() {
        console.log("Miauuuuuuuuuuuu")
    }
}

const animal1 = new Animal("Felipe", "Persa", 3.4, "Negro")
console.log(animal1)
