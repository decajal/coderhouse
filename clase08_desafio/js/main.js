/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Desafio: incorporar array
    Fecha 23/05/2022
    Enunciado: Traslada al proyecto integrador el concepto de objetos, visto en la clase de hoy. En función del
        tipo de simulador que hayas elegido deberás:
            - Crear elementos manipulando el DOM a partir de la información de tus objetos.
            - Modificar etiquetas existentes en función del resultado de operaciones.
*/
import {Par, Impar, Primo} from "./clases.js"
let divMuestra = document.getElementById('divMuestra')

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
console.log(`Primer número ingresado: ${primerNumero} y el segundo número ingresado: ${segundoNumero}`)
divMuestra.innerHTML += `<p>Primer número ingresado: ${primerNumero} y el segundo número ingresado: ${segundoNumero}</p>`
console.log(`La suma es de los números es ${suma(primerNumero, segundoNumero)} y su producto es ${producto(primerNumero, segundoNumero)}`)
divMuestra.innerHTML += `<p>La suma es de los números es ${suma(primerNumero, segundoNumero)} y su producto es ${producto(primerNumero, segundoNumero)}</p>`

let mayor = primerNumero
let menor = segundoNumero
let iguales = false

if (segundoNumero > primerNumero) {
    mayor = segundoNumero
    menor = primerNumero
} else if (primerNumero === segundoNumero)
    iguales = true

let numIntermedios = []
    if (iguales == true) {
        console.log("Se ingresó el mismo número, su resta da 0 y su división 1")    
        divMuestra.innerHTML += `<p>Se ingresó el mismo número, su resta da 0 y su división 1</p>`
    }
else {
    let contar = 0
    for (let i = menor+1; i < mayor; i++) {
        contar++
        numIntermedios.push(i)
    }
    console.log(`De los números ingresados, ${mayor} es mayor que ${menor} y en medio hay ${contar} números`)
    divMuestra.innerHTML += `<p>De los números ingresados, ${mayor} es mayor que ${menor} y en medio hay ${contar} números</p>`

    let numPares = []
    let numImpares = []
    let numPrimos = []
       
    // recorremos la lista de elementos
    console.log(`Números intermedios: ${numIntermedios.join("-")}`)
    divMuestra.innerHTML += `<p>Números intermedios: ${numIntermedios.join("-")}</p>`
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
    divMuestra.innerHTML += `<p>De ellos, ${numPares.length} son PARES, ${numImpares.length} son IMPARES y ${numPrimos.length} son PRIMOS.</p>`
    
    //================================================
    const numParesOriginal = {...numPares}    
    divMuestra.innerHTML += `<p>Números Pares (listado original):<ul>`
    Object.keys(numParesOriginal).forEach(function(x) {
        let element = numParesOriginal[x]
        console.log(`Número: ${element.valor}`) // muestra por consola
        divMuestra.innerHTML += `<li>Número: ${element.valor}</li>` // lo manda al DOM
    });
    // éste código da error en todas las pruebas y no encontré la forma de solucionarlo: el error lo da sobre el listado "numParesOriginal"

    // numParesOriginal.forEach(x => {
    //     divMuestra.innerHTML += `<li>Número: ${x.valor}</li>`
    // });

    //numParesOriginal.forEach(x => divMuestra.innerHTML += `<li>${x.valor}</li>`)
    
    // for(let num in numPares) {
    //     divMuestra.innerHTML += `<li>${num.valor}</li>`;
    //     //console.log(x.valor)
    // }   
    divMuestra.innerHTML += `</ul></p>`
    //================================================
        
    let eliminado = numPares.shift().valor
    console.log("Eliminamos el primero elemento de la lista: " + eliminado)
    divMuestra.innerHTML += `<p>Eliminamos el primero elemento de la lista: ${eliminado}<ul>`
    console.log(numPares)
    numPares.forEach(x => {
        divMuestra.innerHTML += `<li>Número: ${x.valor}</li>`
    });
    divMuestra.innerHTML += "</ul></p>"

    console.log("Números Impares:")
    divMuestra.innerHTML += "<p>Números Impares:<ul>"
    numImpares.reverse()
    numImpares.forEach(x => x.identidad())
    numImpares.forEach(x => {
        divMuestra.innerHTML += `<li>Número: ${x.valor}</li>`
    });
    divMuestra.innerHTML += "</ul></p>"
    
    console.log("Números Primos:")
    divMuestra.innerHTML += "<p>Números Primos:<ul>"
    numPrimos.forEach(x => x.identidad())
    numPrimos.forEach(x => {
        divMuestra.innerHTML += `<li>Número: ${x.valor}</li>`
    });
    divMuestra.innerHTML += "</ul></p>"
}