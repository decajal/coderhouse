/*
    nodeJS
    Clase 02 07-06-2002

*/

function mostrar()
{
    let saludo = "Hola, buen día !";
    return saludo
}

console.log(mostrar());

const suma = function(a, b)
{
    return a + b
}
console.log(suma(8, 4))

function mostrarSaludo(nombre)
{
    const signos = "!!!!"
    return function()
    {
        // instrucciones
        console.log(`${nombre} ${signos}`)
    }
}

mostrarSaludo("Diego")

// esta funcion la paso Pablo
// (function (...args) {
//     if (args.length > 0) {
//       args.forEach((el) => console.log(el));
//     } else {
//       console.log("Lista Vacia");
//     }
//   })(1,2,3);

// clases y objetos
class Persona
{
    constructor(nombre, edad)
    {
        this.nombre = nombre
        this.edad = edad
    }

    static saludoCorto = "Hola" // "static" se puede acceder a ella sin necesidad de instanciar un objeto a la clase

    saludoCompleto()
    {
        console.log(`buenaaaassss, soy ${this.nombre}`)
    }

    saludoEstatico()
    {
        console.log(persona.saludoCorto)
    }
}

class Juego
{
    static cant_jugadores = 0;
    static enemigos = 19;
    constructor(vidas, traje, nivel, puntos, coins)
    {
        this.vidas = vidas;
        this.traje = traje;
        this.nivel = nivel;
        this.puntos = puntos;
        Juego.cant_jugadores++;
        this.coins = coins;
    }

}

console.log(Juego.cant_jugadores);
let jugador1 = new Juego(3, 'rojo', 0, 0, 3, 0)
console.log(Juego.cant_jugadores);

class Contador
{
    static contGlobal = 0;
    constructor(nombre_responsable, cuent_indiv)
        {
            this.nombre_responsable = nombre_responsable;
            this.cuent_indiv = cuent_indiv;
            Contador.incrementar_global(); // cada vez que se crea un objeto incrementa la cuenta de las instancias creadas
        }
    static incrementar_global()
    {
        Contador.contGlobal++;
    }

    incrementar_ind()
    {
        this.cuent_indiv++;
    }

    static mostrarGlobal()
    {
        return Contador.contGlobal;
    }

    obtenerIndiv()
    {
        return this.cuent_indiv;
    }
}

let rrhh = new Contador("julian");
let it = new Contador("Pablo");
console.log(`Nuestro contador global es: ${ Contador.mostrarGlobal() }`)