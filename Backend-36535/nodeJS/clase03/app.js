/*

    Clase 03
    Fecha: 08/06/2022
    Programación sincrónica y asincrónica
*/

// Callbacks: Funciones anónimas

const operacion = (a, b, op) =>
{
    return op(a, b)
}

const suma = (a, b) =>
{
    return a + b;
}

const resta = (a, b) =>
{
    return a - b;
}

const multiplicacion = (a, b) =>
{
    return a * b;
}

const division = (a, b) =>
{
    return a / b;
}

const modulo = (a, b) =>
{
    return a % b
}

console.log(operacion(2, 5, suma));
console.log(operacion(2, 5, resta));
console.log(operacion(2, 5, multiplicacion));
console.log(operacion(2, 5, division));
console.log(operacion(2, 5, modulo));
// por convención el callbacks siempre es la última llamada, esto es por convención
// la función llama al callback al finalizar todas sus operaciones

// un ejemplo clásico de lo que es un llamado de callback
// const ejemploCallback = (error, resultado) =>
// {
//     if (error)
//     {
//         // se hace algo con ese error
//     }
//     else
//     {
//         // se hace algo con ese resultado !!
//     }
// }

