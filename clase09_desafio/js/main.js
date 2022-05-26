/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Desafio: Incorporar Eventos
    Fecha 24/05/2022
    Enunciado: Con lo que vimos sobre DOM ahora puedes sumarlo a tu proyecto para interactuar entre los
        elementos HTML y JS. Es decir, asociar los eventos que buscarmos controlar sobre los elementos de
        la interfaz de nuestro simulador.
        
        Aspectos a incluir en el entregable:
            Archivo HTML y JS, referenciado en el HTML por etiqueta <script type="module" src="js/miarchivo.js"></script>,
            que incluya la definición de un algoritmo en JS que opere sobre el DOM manejando eventos.
        Ejemplo:
            - Cuando un usuario completa algún dato, por ejemplo cantidad de cuotas, se captura ese dato y se agregan elementos
                al DOM mediante JS
            - Capturar la tecla ENTER para confirmar alguna acción.
*/
import {Par, Impar, Primo} from "./clases.js"
let form = document.getElementById('formNumeros')
const divResultados = document.getElementById('divResultados')

const cualEsmayor = () => {
    if (segundoNumero > primerNumero) {
        mayor = segundoNumero
        menor = primerNumero
    } else if (primerNumero === segundoNumero) {
        mayor = primerNumero
        menor = primerNumero
    }
}

const esPar = (numero) => {
    if (numero % 2 == 0) return "PAR"
    else return "IMPAR"
}

const esPrimo = (numero) => {
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
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let dataForm = new FormData(e.target)

    primerNumero = parseInt(dataForm.get('numero1'))
    segundoNumero = parseInt(dataForm.get('numero2'))

    if (!isNaN(primerNumero) && !isNaN(segundoNumero)) {
        divResultados.innerHTML = ""
        // alert(`Usted inmgresó un ${primerNumero} y un ${segundoNumero}. Gracias !!`)
        main()
    }
    else {
        // alert("Por favor ingrese números válidos")
        divResultados.innerHTML = "<p>Por favor ingrese números enteros, gracias !!</p>"
    }        
    form.reset()
})

let mayor = 0
let menor = 0
let numPares = []
let numImpares = []
let numPrimos = []
let numIntermedios = []
let contar = 0

function main() {
    mayor = primerNumero
    menor = segundoNumero
    cualEsmayor()

    let listados = ""
    let resultadoParcial = `
        <h6>Análisis previo</h6>
        <p>El primer número ingresado es: ${primerNumero} y el segundo número ingresado es: ${segundoNumero}</p>
        <p>La suma es ${suma(primerNumero, segundoNumero)} y el producto nos da ${producto(primerNumero, segundoNumero)}</p>
        `
    // cuando ya voy a poner los resultados por pantalla ver donde se agregaran
    if (mayor != menor) {  // iguales != true
        detNumerosIntermedios()
        resultadoParcial += `<p>El mayor es ${mayor} y, por lo tanto, el menor es ${menor}. En medio hay ${contar} números</p>`
        resultadoParcial += `<p>Números intermedios: ${numIntermedios.join("-")}</p>`
        determinarNumeros()
        resultadoParcial += `<p>De ellos: ${numPares.length} son PARES, ${numImpares.length} son IMPARES y ${numPrimos.length} son PRIMOS.</p>`

        listados = mostrarPares()
        listados += mostrarImpares()
        listados += mostrarPrimos()
    } else {
        resultadoParcial += `<p>Se ingresó dos veces el mismo número, su resta da 0 y su división 1</p>`
    }
    
    divResultados.innerHTML += `
        <div class="card">
            <div class="card-body" style="margin:5px">${resultadoParcial}</div>
        </div>
    `
    if (mayor != menor) {
        divResultados.innerHTML += listados
        for (let i = 1; i <= 3; i++) {
            let card = document.getElementById(`list${i}`)
            let bt = card.lastElementChild.lastElementChild
            bt.addEventListener("click", () => {
                card.remove()
            })
        }    
    }
    blanquear()
}

function detNumerosIntermedios() {
    for (let i = menor+1; i < mayor; i++) {
        contar++
        numIntermedios.push(i)
    }
}

function determinarNumeros() {
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
}

function mostrarPares() {
    let result = `
    <div id="list1" class="card" style="width: 18rem; margin:5px">
        <div class="card-body">
            <h5 class="card-title">Números Pares</h5>
            <p class="card-text">Listado</p>
            <ul>
    `
    Object.keys(numPares).forEach(function(x) {
        let e = numPares[x]
        result += `<li>Número: ${e.valor} </li>`
    })
    result += `
            </ul>
            <button class="btn btn-danger">Quitar Listado</button>
        </div>
    </div>
    `
    return result
}

function mostrarImpares() {
    numImpares.reverse()
    let result = `
    <div id="list2" class="card" style="width: 18rem; margin:5px">
        <div class="card-body">
            <h5 class="card-title">Números Impares (inverso)</h5>
            <p class="card-text">Listado</p>
            <ul>
    `
    Object.keys(numImpares).forEach(function(x) {
        let e = numImpares[x]
        result += `<li>Número: ${e.valor} </li>`
    })
    result += `
            </ul>
            <button class="btn btn-danger">Quitar Listado</button>
        </div>
    </div>
    `
    return result
}

function mostrarPrimos() {
    let result = `
    <div id="list3" class="card" style="width: 18rem; margin:5px">
        <div class="card-body">
            <h5 class="card-title">Números Primos</h5>
            <p class="card-text">Listado</p>
            <ul>
    `
    Object.keys(numPrimos).forEach(function(x) {
        let e = numPrimos[x]
        result += `<li>Número: ${e.valor} </li>`
    })
    result += `
            </ul>
            <button class="btn btn-danger">Quitar Listado</button>
        </div>
    </div>
    `
    return result
}

const blanquear = () => {
    mayor = 0
    menor = 0
    numPares = []
    numImpares = []
    numPrimos = []
    numIntermedios = []
    contar = 0
}
