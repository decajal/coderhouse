/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 07: Funciones de Orden Superior
    Fecha 19/05/2022
*/

// Las funciones de Orden superior es llamar a funciones desde funciones
/*
const IVA = 1.21
function impuestos(impuesto = "Extraordinario") {
    let valor = 1.10
    if (impuesto == "IVA")
        valor = IVA
    if (impuesto == "Dolar")
        valor = 1.65
    
    return (producto) => producto * valor
}

let impuestoIVA = impuestos("IVA")
let impuestoDolar = impuestos("Dolar")
let impuestoExt = impuestos()

console.log(impuestoIVA(100))
console.log(impuestoDolar(100))
console.log(impuestoExt(100))

// Falta la delcaración de la función que llama a las funciones y así queda todo modularizado
*/

import personas from './clases.js' // como importo una sola cosa no se usan las llaves para decir cuales son los elementos a importar
//console.log(personas)

// métodos
personas.forEach(persona => { // esto se usa para hacer una iteración general, se recorre el arreglo entero
    console.log(persona)
})
console.log(personas.find(persona => persona.sueldo == 10000)) // si lo encuentra me devuelve el objeto, y si no lo encuentra me devuelve "undefined"
// si hay más de un objeto con el mismo valor devuelve el primero que cumpla con la condición

// para buscar varios elementos buscamos con filter, este devuelve un nuevo arreglo con los elementos que cumplan con esa condicion
let personasFiltradas = personas.filter(persona => persona.sueldo == 10000 && persona.edad > 30) // si no encuentra elementos entonces devuelve un arreglo VACIO
if (personasFiltradas.length != 0)
    console.log(personasFiltradas)
else console.log("No se encontraron personas que cumplan con esa condición")

// some(): devuelve VERDADERO si encuentra el elemento o al menos uno que cumnpla con la condición, y FALSO si no lo encuentra
// es una función que es muy rápida
console.log(personas.some(persona => persona.edad < 40))

// map(): crea un nuevo array con cada uno de los datos originales MODIFICADOS, los transforma según la operación que envío como parámetro
console.log(personas.map(persona => persona.edad))
console.log(personas.map(x => x.sueldo))
console.log(personas.map(x => x.sueldo > 10000))
console.log(personas.map(x => x = { sueldo: x.sueldo, edad: x.edad }))

// reduce(): para obtener un único valor tras la iteración del array
const sueldos = personas.map(x => x.sueldo)
console.log(sueldos)
// en este caso me devuelve la suma de los sueldos
console.log(sueldos.reduce((prev, act) => prev + act, 0)) // en cero es el valor inicial del acumulador
// al valor previo le sumo el valor actual DEL SUELDO, y arranca desde cero ==> como resultado tenemos la SUMA DE LOS VALORES DE SUELDOS
console.log(sueldos.reduce((prev, act) => prev - act, 0)) // la resta
console.log(sueldos.reduce((prev, act) => prev * act, 1))

const sueldo = (personas.map(x => x.sueldo).reduce((prev, act) => prev + act, 0))
console.log(sueldo)
// o también
console.log(personas.map(x => x.sueldo).reduce((prev, act) => prev + act, 0)) // anidamiento de las funciones, es como LINQ

// sort(): ordena un array por valor numérico o por cadena alfabética, es un método DESTRUCTIVO del array original, entonces para usarlo se hace una copia del original y se ordena
const arrayOrdenadoAs = [...personas]
console.log(arrayOrdenadoAs.sort((a, b) => a.sueldo - b.sueldo)) // orden ascendente
const arrayOrdenadoDe = [...personas]
console.log(arrayOrdenadoDe.sort((a, b) => b.sueldo - a.sueldo)) // orden descendente
const arrayOrdAlfAsc = [...personas]
console.log(arrayOrdAlfAsc.sort((a, b) => {
    if (a.nombre > b.nombre) return 1
    if (a.nombre < b.nombre) return -1
    return 0
})) // orden alfabetico asc: esta comparación es por UNICIODE directamente
const arrayOrdAlfDesc = [...personas]
console.log(arrayOrdAlfDesc.sort((a, b) => {
    if (a.nombre < b.nombre) return 1
    if (a.nombre > b.nombre) return -1
    return 0
})) // orden alfabetico asc: esta comparación es por UNICIODE directamente