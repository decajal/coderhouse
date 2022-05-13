/*
    Curso Coderhouse Back-End - Personal de Teco
    Desafio de la clase número 3
    Fecha 12/05/2022
    Enunciado: Crear un algoritmo utilizando un ciclo
*/

let primerNumero = parseInt(prompt("Ingrese un número Entero"))
let segundoNumero = parseInt(prompt("Ingrese otro número Entero"))

if (isNaN(primerNumero) || isNaN(segundoNumero))
    console.log("Uno, o ambos números ingresos no son números enteros, no se pueden hacer operaciones.")
else {
    let suma = primerNumero + segundoNumero
    let producto = primerNumero * segundoNumero
    console.log(`La suma es de los números es ${suma} y su producto es ${producto}`)
    let mayor = primerNumero
    let menor = segundoNumero
    let iguales = false
    if (segundoNumero > primerNumero) {
        mayor = segundoNumero
        menor = primerNumero
    } else if (primerNumero === segundoNumero)
        iguales = true

    if (iguales == true) console.log("Se ingresó el mismo número, su resta da 0 y su división 1")
    else {
        let contar = -1
        for(let i = menor; i < mayor; i++) {
            contar = contar + 1
        }
        console.log(`De los números ingresados, ${mayor} es mayor que ${menor} y en medio hay ${contar} números`)
    }
}