/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Desafio: incorporar array
    Fecha 17/05/2022
    Enunciado: Traslada al proyecto integrador el concepto de objetos, visto en la clase de hoy. A partir de los
        ejemplos mostrados la primera clase, y en función del tipo de simulador que hayas elegido, deberás:
            - Incorporar al menos un Array en tu proyecto.
            - Utilizar algunos de los métodos o propiedades vistos en la clase.
*/
import {Par, Impar, Primo} from "./clases.js"

function esPar(numero) {
    if (numero % 2 == 0) return "PAR"
    else return "IMPAR"
}

function esPrimo(numero) {
    if (numero == 0 || numero == 1 || numero == 4) return false
    for (let i = 2; i < numero; i++) {
        if (numero % i == 0) return false
    }
    // Si no se pudo dividir por ninguno de los de arriba, sí es primo
    return true
}

const suma = (num1, num2) => num1 + num2
const producto = (num1, num2) => num1 * num2

let primerNumero, segundoNumero
let carga = false
do {
    primerNumero = parseInt(prompt("Ingrese un número Entero"))
    segundoNumero = parseInt(prompt("Ingrese otro número Entero"))
    
    if (isNaN(primerNumero) || isNaN(segundoNumero))
        alert("Por favor ingrese números válidos")
    else carga = true

} while (!carga)
console.log(`Primer número ingresado: ${primerNumero} y segundo número ingresado: ${segundoNumero}`)
console.log(`La suma es de los números es ${suma(primerNumero, segundoNumero)} y su producto es ${producto(primerNumero, segundoNumero)}`)

let mayor = primerNumero
let menor = segundoNumero
let iguales = false

if (segundoNumero > primerNumero) {
    mayor = segundoNumero
    menor = primerNumero
} else if (primerNumero === segundoNumero)
    iguales = true

let numIntermedios = []
    if (iguales == true) console.log("Se ingresó el mismo número, su resta da 0 y su división 1")
else {
    let contar = 0
    for (let i = menor+1; i < mayor; i++) {
        contar++
        numIntermedios.push(i)
    }
    console.log(`De los números ingresados, ${mayor} es mayor que ${menor} y en medio hay ${contar} números`)
    let numPares = []
    let numImpares = []
    let numPrimos = []
       
    // recorremos la lista de elementos
    console
    console.log(`Números intermedios: ${numIntermedios.join("-")}`)
    let orden = 1
    for (let i = 0; i<numIntermedios.length; i++) {
        if (esPar(numIntermedios[i]) == "PAR") {
            const num = new Par(numIntermedios[i], orden)
            numPares.push(num)
        } else {
            const num = new Impar(numIntermedios[i], orden)
            numImpares.push(num)
        }
        if (esPrimo(numIntermedios[i]) == true) {
            const num = new Primo(numIntermedios[i], orden)
            numPrimos.push(num)
        }
        orden++
    }
    console.log(`De ellos, ${numPares.length} son PARES, ${numImpares.length} son IMPARES y ${numPrimos.length} son PRIMOS.`)    
    console.log("Números Pares:")
    const numParesOriginal = {...numPares}
    console.log(numParesOriginal)
    console.log("Eliminamos el primero elemento de la lista: " + numPares.shift().valor)
    console.log(numPares)
    console.log("Números Impares:")
    numImpares.reverse()
    numImpares.forEach(x => x.identidad())
    console.log("Números Primos:")
    numPrimos.forEach(x => x.identidad())   
}



