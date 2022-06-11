// estos es un comentario de una sola linea

/*
    Esto es un comentario de múltiples lineas
    se puede usar de muchas maneras, es muy útil
*/

// console.log("Esto es una prueba")

/*

let numero = parseInt(prompt("Ingrese un número"))

if (!isNaN(numero)) {
    console.log("Es un numero")
} else {
    console.log("No es un número, verifique la información ingresada")
}

for(let i = 0; i < 11; i++) {
    console.log(i)
}

for(let i = 0; i <= 100; i++) {
    if (i == 3) continue // si esto se cumple saltea esta ejecución y no se ejecuta las líneas siguientes a ella
    
    if (i % 2 == 0)
        console.log(i + " es número PAR")
    else
        console.log(`${i} es número IMPAR`) // esta es otra forma de concatenar strings: backticks

    if (i == 7) break // funciona como en C#, en switch esta obligada
}

// mostrar los números primos
function esPrimo(numero) {
    for (let i = 2; i < numero; i++) {
        if (numero % 2 === 0) return false
    }
    return true
}

for (let i = 2; i < 100; i++) {
    if(esPrimo(i))
        console.log(`${i} es número PRIMO`)
}

*/

/*
let repetir = true

while(repetir) {
    let nombre = prompt("Ingrese un nombre")
    console.log(nombre)
    let consulta = prompt("Desea ingresar otro nombre ?").toLowerCase()
    if (consulta == 'no')
        repetir = false
}
*/

/*
let repetir
do {
    let nombre = prompt("Ingrese un nombre: ")
    console.log(nombre)
    let consulta = prompt("Desea ingresar otro nombre ?").toLowerCase()

    if (consulta == "no") repetir = false

} while(repetir != false)
*/


// una calculadora
let numero1, numero2, operacion
do {
    numero1 = parseFloat(prompt("Ingrese un número: "))
    numero2 = parseFloat(prompt("Ingrese otro número: "))
    operacion = prompt("Ingrese una operación matemática (+, -, *, /): ")

    if (isNaN(numero1) || isNaN(numero2))
        alert("Por favor ingrese un número valido.")

    if (numero2 == 0 && operacion == "/")
        alert("No se puede dividir por cero.")


} while(isNaN(numero1) || isNaN(numero2) || (numero2 == 0 && operacion == "/"))

switch(operacion) {
    case "+":
        alert(numero1 + numero2)
        break
    case "-":
        alert(numero1 - numero2)
        break
    case "*":
        alert(numero1 * numero2)
        break
    case "/":
        alert(numero1 / numero2)
        break
    default:
        alert("Operación no valida")
        break
}

