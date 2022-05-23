/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 09: Venetos en el DOM
    Fecha 23/05/2022

    Eventos:
        + click (Mouse)
            - mousedown/mouseup
            - mouseover/mouseout
            - mousemove
            - click
            - scroll: como que no se lo considera como tal
        - dblclick
        - input
        - change: tiene lugar al presionar enter o un click
        - submit: envía información mediante el uso de formularios
*/


/*
let boton1 = document.getElementById('boton1')
// De esta forma se puede hacer varios click y se van a ejecutar todos: uno siguiente a otro en el orden de ejecución de JS
// ésta es una forma:
boton1.addEventListener('click', () => {
    console.log("Click uno: primera ejecución !!")
})

boton1.addEventListener('click', () => {
    console.log("Click uno: segunda ejecución !!")
})

// ésta es otra forma:
// en este caso si se hacen varios se ejecuta sólo el último, la última asignación
boton1.onclick = () => {
    console.log("Le diste click desde onClick")
}

boton1.onclick = () => {
    console.log("Le diste click desde un segundo onClick")
}

let input1 = document.getElementById('input1')
/*
input1.addEventListener('input', () => {
    console.log(input1.value)
})
*/
/*
input1.addEventListener('change', () => { // el evento change ocurre cuando se hace click o enter
    console.log(input1.value)
})

let inputColor = document.getElementById('inputColor')
inputColor.addEventListener('input', () => {
    console.log(inputColor.value)
    document.body.style.backgroundColor = inputColor.value
})
*/
class Persona {
    constructor(nombre, apellido, edad, sueldo) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.edad = edad,
        this.sueldo = sueldo
    }
}
const personas = []

let form = document.getElementById('formPersona')
form.addEventListener('submit', (e) => {
    e.preventDefault() // evita que la página se RE-CARGUE, que es el comportamiento normal de un formulario anteo un evento submit
    console.log("Información Enviada !!")
    let nombre = document.getElementById('inputNombre') // esto es usando el id de input en el formulario: práctica no recomendada, el ingreso de input de forma indiscriminada


    
})