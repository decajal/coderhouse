/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Desafio integrador del módulo 1
    Fecha 13/05/2022
    Enunciado: debe incluir los temas vistos en las clases 1, 2, 3, 4
*/
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
console.log(`Primer número ingresado: ${primerNumero}`)
console.log(`Segundo número ingresado: ${segundoNumero}`)
console.log(`La suma es de los números es ${suma(primerNumero, segundoNumero)} y su producto es ${producto(primerNumero, segundoNumero)}`)

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
    for (let i = menor; i < mayor; i++) {
        contar = contar + 1
    }
    console.log(`De los números ingresados, ${mayor} es mayor que ${menor} y en medio hay ${contar} números`)
}
