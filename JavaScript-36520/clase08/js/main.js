/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 08: DOM Document Object Model (Modelo de Objeto de Documento)
    Fecha 20/05/2022
*/

// Agregar concepto de NODO

/*
Tipos de NODOS:
===============

    + Document
    + Element
    + Attr
    + Text
    + Comment

    Son los 5 nodos más utilizado en el DOM

    Formas de Acceder al DOM (3 formas):
        + ID: se recomienda acceder a los elementos por el id, mucho más directo y las acciones suelen ser únicas
        + CLASE: Te devuwelde un HtmlCollection, con lo cual se puede acceder a un elemento por su índice en la lista y de ahí se puede consultar a sus hijos
                por "children"
        + TAG: se consulta por la etiquetas, por ejemplo "p". Sería el que menos utilicemos

*/

/*
console.log(document.getElementById('parrafo1'))
console.log(document.getElementsByClassName('divParrafos')[0].children[0])
console.log(document.getElementsByTagName('p'))

let parrafo4 = document.getElementById('parrafo4')
parrafo4.innerText = "Buenos dias!"

/*
Para agregar se puede hacer de dos formas:
    + innerHTML
    + construyendo y agregando el nodo
*/
/*


let divParrafos = document.getElementById('idDivParrafos')
//divParrafos.innerHTML += "<p>Buenos días !</p>"
//console.log(divParrafos)

let parrafo = document.createElement('p')

parrafo.id = "parrafo5"
parrafo.innerText = "Buenos dias !"
parrafo.className = "parrafos"

//divParrafos.prepend(parrafo) // lo agrega al principio, como último elemento hijo
divParrafos.append(parrafo) // lo agrega al final, como último elemento hijo
console.log(document.body)

// QuerySelector
console.log(document.querySelector('#parrafo3')) // el # es para acceder por ID
console.log(document.querySelector('.divParrafos')) // el . es para acceder por CLASE, devuelve un solo elemento el que cumple con la condición

console.log(document.querySelectorAll('.divParrafos')) // el . es para acceder por CLASE, me devuelve todos los elementos que cumplan con la condición

// se puede eliminar un elemento
divParrafos.removeChild(parrafo) // se remueve el hijo parado desde el padre

let parrafoAeliminar = document.getElementById('parrafo1')
parrafoAeliminar.remove() // se elimina directamente el elemento seleccionado (se busco el elemento a eliminar)

//divParrafos.innerHTML = "" // limpia (elimina todos los elementos) todo el contenido del elemento seleccionado

*/

// práctica: una tienda parecida a la tienda del BANCO NACION
class Producto {
    constructor(nombre, marca, precio, stock) {
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.stock = stock
    }

}

const producto1 = new Producto("Arroz", "Arrozin", 120, 10)
const producto2 = new Producto("Cafe", "Cafecin", 420, 20)
const producto3 = new Producto("Fideos", "Fidein", 80, 15)
const producto4 = new Producto("Te", "Tecin", 150, 22)
const producto5 = new Producto("Alfajor", "Alfajin", 40, 50)
const producto6 = new Producto("Lentejas", "Lentejin", 140, 12)

const productos = [producto1, producto2, producto3, producto4, producto5, producto6]

// ya tenemos creados una lista de productos, en este caso tenemos 6, lo que queremos hacer es mostrarlos en el HTML
// Para este caso, como el curso es JS y no HTML ni CSS nos vamos a vales de Bootstrap

/*
// debemos recorrer este arreglo de productos
let divProductos = document.getElementById('divProductos')
productos.forEach((producto, indice) => {
    divProductos.innerHTML += `
        <div class="card" id="producto${indice}" style="width: 18rem; margin: 3px">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Marca: ${producto.marca}</p>
                <p class="card-text">Stock: ${producto.stock}</p>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
    `
})
así como está ya funciona, lo que se va agregando más abajo son formas de consultar los elementos, por eso
originalmente dejo esta construcción como tal
*/

let divProductos = document.getElementById('divProductos')
productos.forEach((producto, indice) => {
    divProductos.innerHTML += `
        <div class="card" id="producto${indice}" style="width: 18rem; margin: 3px">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Marca: ${producto.marca}</p>
                <p class="card-text">Stock: ${producto.stock}</p>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-danger" id="boton${indice}">Eliminar</button>
            </div>
        </div>
    `
})
console.log("Consulta por el 'id' del Botón directamente")
productos.forEach((x, i) => {
    console.log(document.getElementById(`boton${i}`)) // se consulta directamente al elemento a través de su id
});
console.log("Consulta por 'LastChild' del padre:")
productos.forEach((x, i) => {
    console.log(document.getElementById(`producto${i}`).lastElementChild.lastElementChild) // el primer LastChild trae el CARD-BODY, el segundo LastChild ya trae el botón
});
console.log("Consulta por 'querySelector' a la clase 'btn-danger' a la cual pertenece el botón:")
productos.forEach((x, i) => {
    console.log(document.querySelectorAll('.btn-danger')[i])
});