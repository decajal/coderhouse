/*  Clase 04: 13/05/2022
    Funciones: todos los parametros en JS son opcionales, cuando no se lo pasa es solamente un UNDEFINED
    se puede poner un valor por defecto a un parámetro en caso que el usaurio no ingrese nada para ese parámetro
    
    function saludar(mensaje = "HOLA", numero = 1) <== son valores por defecto que entran en juego solamente
        cuando el usuario no envía parámetros

*/

/*
function saludar(mensaje ="Hola", numero = 1) {
    console.log(`${mensaje}`)
    console.log(numero)
}

saludar()
saludar("Buenos días")
saludar(undefined, 5)
*/

/*
function saludar(mensaje ="Hola", numero = 1) {
    console.log(numero)

    return (`El mensaje que se intridujo es : ${mensaje}`)
}

let mensaje = saludar("Que pasen un lindo día", -4)
console.log(mensaje)
*/

/*
// SCOPE: el ámbito global y local
const IVA = 1.21 // se recomienda, en el uso de las variables globales, que sean constantes ! y como buena práctica a las constantes son MAYUSCULAS
function calcularImpuestos(precio) {
    return precio * IVA
}

console.log(calcularImpuestos(100))
*/

/*
// Funciones anónimas
const suma = function(num1, num2) {return num1 + num2}
const resta = function(num1, num2) {return num1 - num2}
const producto = function(num1, num2) {return num1 * num2}
const division = function(num1, num2) {return num1 / num2}

console.log(suma(5, 10))
*/


// Funciones anónimas (flechas)
// Se recomienda que el valor retornado de la función flecha se guarde en constantes
const suma = (num1, num2) => num1 + num2
const resta = (num1, num2) => num1 - num2
const producto = (num1, num2) => num1 * num2
const division = (num1, num2) => num1 / num2
/*
console.log(suma(5, 10))
console.log(resta(5, 10))
console.log(producto(5, 10))
console.log(division(5, 10))
*/

// Ejemplo: Calculadora
let num1, num2, operacion
do {
    num1 = parseFloat(prompt("Ingrese un número"))
    num2 = parseFloat(prompt("Ingrese otro número"))
    operacion = prompt("Ingrese una operación matemática (+, -, *, /")

    if (isNaN(num1) || isNaN(num2))
        alert("Por favor ingrese un número válido")

    if (num2 === 0 && operacion == "/")
        alert("No se puede dividir por cero")
} while((isNaN(num1) || isNaN(num2)) || (num2 === 0 && operacion == "/"))

if (operacion == "+")
    alert(`El resultado de la suma es ${suma(num1, num2)}`)
else if (operacion == "-")
    alert(`El resultado de la resta es ${resta(num1, num2)}`)
else if (operacion == "*")
    alert(`El resultado del producto es ${producto(num1, num2)}`)
else if (operacion == "/")
    alert(`El resultado de la division es ${division(num1, num2)}`)