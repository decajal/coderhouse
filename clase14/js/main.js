/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Clase 14: Promises & Async
    Fecha 31/05/2022

*/
// son ejecuciones independientes
// ahora, JS es sincrónico, ya que debido a su call stack, es un lenguaje "single thread"
// las llamadas pueden ser async pero su ejecución es implicitamente sincrónica

/*
setTimeout(() => {
    let tiempo = new Date()
    console.log(`Buenos días ! tiempo de ejecución ${tiempo}`)
}, 3000)

setTimeout(() => {
    console.log("Buenos tardes !")
}, 3000)

setTimeout(() => {
    console.log("Buenos noches !")
}, 2999)
*/

/*
    Ahora, las promesas báscicamente se usan en las consultas a la Base de Datos
    Tiene estados:
        + Promesa pendiente
        + Promesa resuelta
        + promesa rechazada

    Las promesas se usan como medio de transporte de la información. Es el formato recomendado a la hora de hacer
    éstas consultas, como es diferente al tiempo, puedo usar el asyncronismo de una forma más precisa, sin el
    tiempo como primer instancia sino más bien como el resultado de la consulta. Por eso viene el termino de
    "Promesa"
    Una promesa siempre tiene un resultado a través de la consulta de su estado.

    Es un concepto muy simple pero muy poderoso, nos permite el async sin estar sujeto al tiempo a menos que surja algún
    factor externo que afecte directamente la promesa

    ========================= [Acá vendría el ejemplo de Francisco en Clase] =========================

    Vamos a usar promesas para consultar una API y dar un resultado
    API: Application Programming Interface ("interfaz de programación de aplicaciones")
    En este caso vamos a usar la API de DolarHoy

    Para usar el asyncronismo (promesas) en el código se usa "fetch"
*/
