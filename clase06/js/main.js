/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 06: Array
    Fecha 17/05/2022
*/

/*
// La declaración de un array en exactamente como un objeto, se puede declarar con let, const
const array = ["Hola", "Chau, 1, true"]
const array2 = [3, 5]

array2 = array // como ambas son constantes esto da error
console.log(array)
console.log(array2)
*/

/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

array2 = array // ésta igualación si se permite, está declarado por let, pero lo hace por referencia
console.log(array)
console.log(array2)
*/

/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

array2.push(...array)   // este es el operador (los 3 puntos dentro del parentesis y antes del objeto) para copiar los elementos al último del arreglo
                        // el operador push agrega un elemento al final del arreglo
console.log(array)
console.log(array2)

/*
for (let i = 0; i < array2.length; i++) {
    console.log(array2[i])
}
*/
/*
// ojo que JS ter permite agregar datos al arreglo en una posición negativa
array2[-1] = "Buenos días"
for (let i = -1; i < array2.length; i++) {
    console.log(array2[i])
}
// ojo porque en este caso el array2.length no te cuenta el índice negativo, no lo cuenta como elemento
// y no tan solo negativos, el índice puede ser "a" y JS no va a dar error
*/

/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

array2.unshift(...array) // el operador unshift agrega un elemento al principio del arreglo, normalmente no se utiliza
console.log(array)
console.log(array2)

for (let i = 0; i < array2.length; i++) {
    console.log(array2[i])
}
*/

// Para quitar elementos del array hay dos formas: shift el primero y pop el último elemento
/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

array2.shift() // el operador shift quita el primer elemento del arreglo
console.log(array)
console.log(array2)

for (let i = 0; i < array2.length; i++) {
    console.log(array2[i])
}
*/

/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

array2.pop()
console.log(array)
console.log(array2)

for (let i = 0; i < array2.length; i++) {
    console.log(array2[i])
}
*/

/*
const array = ["Hola", "Chau, 1, true"]
let array2 = [3, 5]

console.log(array2.pop())   // el operador pop quita el último elemento del arreglo
console.log(array2.shift()) // el operador shift quita el primer elemento del arreglo
*/

/*
const personas = ["Juan", "Manuel", "Maria", "Lucas", "Ana", "Lucia", "Paola"]
personas.splice(4, 1)   // para eliminar SOLAMENTE la posición 4 (1 dice los elementos a eliminar a partir de la posición 4
                        // en este ejemplo es para eliminar a "Ana" que se encuentra en índice número 4 (comenzando desde el 0) sería la posición 5
// Es el método más utilizado para elimiar elementos dentro de un arreglo
*/

/*
// El método JOIN: devuelve un solo string donde concatena los elementos uno por uno separador por un operador que le ingreso
const personas = ["Juan", "Manuel", "Maria", "Lucas", "Ana", "Lucia", "Paola"]
console.log(personas.join("-"))
*/

/*
// para concatenar array's:
const personas1 = ["Juan", "Manuel", "Maria", "Lucas", "Ana", "Lucia", "Paola"]
const personas2 = ["Diego", "Gustavo"]
const personas3 = personas1.concat(personas2) // al arreglo personas1 le concatena el arreglo personas2 en personas3

/*
console.log(personas3)
console.log(personas3.slice(2, 5)) // es una consulta a los elemetos: desde hasta (donde el 'hasta' no se incluye en la muestra)

let nombreABuscar = prompt("Ingrese un nombre: ")
let indice = personas3.indexOf(nombreABuscar)

if (indice != -1) {
    let personaEliminada = personas3.splice(indice, 1)
    console.log(`Persona eliminada: ${personaEliminada}`)
} else console.log("Persona no encontrada")
// el métod INCLUDES es para consultar si existe un elemento dentro del array
console.log(personas3.includes("Diego")) // devuelve TRUE ó FALSE
*/

/*
// Ordena el arreglo de forma contraria a la ordenación anterior: INVERTIR EL ORDEN
console.log(personas3)
console.log(personas3.reverse())
*/


// Array's de Objetos: es lo más utilizado, siempre usaremos este tipo de arreglos
class Persona {
    constructor(nombre, apellido, edad, peso) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.edad = edad,
        this.peso = peso
    }
}

const persona1 = new Persona("Francisco", "Pugh", 50, 70)
const persona2 = new Persona("Gonzalo", "Ledesma", 20, 71)
const persona3 = new Persona("Alfredo", "Jesus", 21, 72)
const personas = [persona1, persona2, persona3]
// para recorrer los elementos
/*
for (let persona of personas) 
    console.log(persona)
*/

/*
personas.forEach(x => {
    console.log(x)
});

personas.forEach((x, i) => {
    console.log(x)
    console.log(i)
});

personas.forEach((elemento, indice, array) => { // los parámetros indice y array son opcionales
    console.log(elemento)
    console.log(indice)
    console.log(array)
});
*/

// como se puede copiar un objeto en otro sin hacer la referencia a la memoria (la igualación hace referencia a la memoria)
const persona4 = {...persona1}
console.log(persona1)
persona1.nombre = "Diego"
persona1.apellido = "Cajal"
console.log(persona1)
console.log(persona4)