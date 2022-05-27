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

// 2da forma de hacerlo
btDarkMode.addEventListener('click', () => {
    document.body.classList.add("darkMode")
    localStorage.setItem('darkMode', 'dark')
})

btLightMode.addEventListener('click', () => {
    document.body.classList.remove("darkMode")
    localStorage.setItem('darkMode', 'light')
})
