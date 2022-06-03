/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 10: Storage & JSON
    Fecha 24/05/2022

    Storage: nos permite almacenar datos de manera local del navegador sin necesidad de un servidor o de conexión con una BD.
    No manda mensajes al servidor (las cookies si por ejemplo) Storage y cookies son dos conceptos diferentes.
    Guarda información en mi navegador, entonces no se debe guardar información SENSIBLE.
    Lo que se guarda es información NO SENSIBLE que solo sirve para la interacción con el usuario.

    Los datos que se guardan en sesion y local son datos string
    + localStorage:
    + sessionStorage: son datos para la sesion de usuario nada más, no se almacenan ni se envían al servidor, ayudan al usuario
        en la navegación
*/

/*
// con setitem lo que hacemos es asignar
localStorage.setItem('producto', 'arroz')
sessionStorage.setItem('saludar', 'hola')

// con getItem los consultamos
let valor = localStorage.getItem('producto')
// ojo que voya ir PISANDO los valores del local y sessionStorage
// la KEY en este caso debe ser UNICA (en este caso 'producto' y es case sensitive, no es lo mismo producto que Producto)
// KEY: producto
// VALOR: arroz


JSON (JavaScript Object Notation) me permite guardar objetos en un formato plano, para representar datos estructurados con la sistaxis de Objetos de JavaScript

Se usa JSON como intermediario para guardar información (objetos) en el local storage
    + localStorage.setItem('keyDelValor', JSON.stringify(valor)) --> pasar de Objeto a JSON
    + JSON.parse(localStorage.getItem('keyDelValor')) --> pasar de JSON a Objecto
*/
// vamos a hacer un selector de Dark a Light mode
let btDarkMode = document.getElementById('btDarkMode')
let btLightMode = document.getElementById('btLightMode')

let darkMode
if (localStorage.getItem('darkMode')) {
    darkMode = localStorage.getItem('darkMode')
} else {
    localStorage.setItem('darkMode', 'light')
}

if (darkMode == "dark") {
    document.body.classList.add('darkMode')
}

/*
// 1ra forma de hacerlo
btDarkMode.addEventListener('click', () => {
    // para no hacer de esta forma se hace en un archivo CSS
    document.body.style.backgroundColor = "#000000"
    document.body.style.color = "#ffffff"
})

btLightMode.addEventListener('click', () => {
    // para no hacer de esta forma se hace en un archivo CSS
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "#000000"
})
*/

/*
// 2da forma de hacerlo
btDarkMode.addEventListener('click', () => {
    document.body.classList.add("darkMode")
    localStorage.setItem('darkMode', 'dark')
})

btLightMode.addEventListener('click', () => {
    document.body.classList.remove("darkMode")
    localStorage.setItem('darkMode', 'light')
})
*/

class Cliente {
    constructor(id, nombre, apellido, dni, email, sueldo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.sueldo = sueldo;
    }

    saludar() {
        console.log("Hola")
    }
}

let formProducto = document.getElementById('formProducto')
let divProductos = document.getElementById('divProductos')

let productos = []

if(localStorage.getItem('productos')){
    productos = JSON.parse(localStorage.getItem('productos'))
} else {
    localStorage.setItem('productos', JSON.stringify(productos))
}


formProducto.addEventListener('submit', (e) => {
    e.preventDefault()
    let datForm = new FormData(e.target)

    const producto = {nombre: datForm.get('nombre'), marca: datForm.get('marca'), precio: datForm.get('precio'), stock: datForm.get('stock')}

    productos.push(producto)

    localStorage.setItem('productos', JSON.stringify(productos))

    formProducto.reset()
})

document.getElementById('botonMostrar').addEventListener('click', () => {
    let productosParseados = JSON.parse(localStorage.getItem('productos'))
    divProductos.innerHTML = ""
    if(productosParseados.length != 0) {
        productosParseados.forEach((producto, indice) => {
            divProductos.innerHTML += `
                <div class="card" id="producto${indice}" style="width: 18rem;margin:3px">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Marca: ${producto.marca}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>
                        <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `
        })

        productosParseados.forEach((producto, indice) => {
           document.getElementById(`producto${indice}`).lastElementChild.lastElementChild.addEventListener('click', () => {
              document.getElementById(`producto${indice}`).remove()
              let index = productos.findIndex(productoA => productoA.nombre == producto.nombre)
              productos.splice(index,1) 
              localStorage.setItem('productos', JSON.stringify(productos))
           })
        })
    } else {
        divProductos.innerHTML = "<p>No se cargaron productos en el carrito</p>"
    }
})
