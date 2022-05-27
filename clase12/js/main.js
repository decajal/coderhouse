/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 12: Operadores y Condicionales Avanzados
    Fecha 27/05/2022

    + Sugar Syntax: (operadores y condicionales avanzados) Simplifican tareas más complejas
        - Operador ++:
            numero = numero + 1
            numero += 1
            numero++ <-- éste es el conocido como operador sugar
        - Operador Ternario if:
            if en una sóla línea
            Por ejemplo:
            let numero = 5
            if (numero == 5) {
                console.log("Numero igual a 5")
            } else {
                console.log("El número no es igual a 5")
            }

            (numero == 5) ? console.log("Numero igual a 5") : console.log("El número no es igual a 5")
        - Operador Nullish ??:
            se lo usa mucho en lo que son variables de control
            [objeto]?
    + Alias: (desustructuración)
        + Obnejtos
            - Copiar partes o todo de un objeto, es muy útil y se usa a diario

        + Arrays
            - vendría a ser lo msimo sólo que en vez de obejtos, se desestructura arrays, la diferencia es que acá entra en juego la posición dentro del array.
                No se recomienda con arreglos muy grandes, ya que tenés que recordar la posición exacta de los objetos o elementos
    + Spread: nos permite "desparramar" (como su nombre lo indica) un array o un objeto. Cambiar la forma en la que presentamos un array u objeto
        de Arrays:
        de Objetos:
*/
let numero = 6
let otroNumero = (numero == 5) ? console.log("Numero igual a 5") : console.log("El número no es igual a 5") // éste es el operador ternario

let operacion = "+"
let resultado = (operacion == "+") ? (() => (5 + 5))() : () => 5 - 5 // ejemplo muy específico, se ve en la parte de true de la función
console.log(resultado)

let nombres = ["Pamela", "Maria", "Franco", "Diego"]
let persona = nombres.find(persona => persona == "Sebastian") ?? "La persona no existe en el Array"
console.log(persona)

let peronas = JSON.parse(localStorage.getItem('personas')) ?? [] // se no existe se devuelve sólo un arreglo vacío, si no existe local storage se crea un array vacío

let producto = null
//console.log(producto.nombre) // ésto da ERROR !
console.log(producto?.nombre || "No existe") // en éste caso devuelve: "No existe"