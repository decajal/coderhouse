/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Proyecto Final: Desafío Complementario - Optimización
    Fecha 27/05/2022

    Consigna: Optimizarás tu proyecto final a través de la puesta en práctica de lo visto en esta clase según sea conveniente en cada caso
*/
import {Mecanico, Cliente, Servicio, Producto, Elemento, Ticket} from "./clases.js"
let form = document.getElementById('formIngreso')

let mecanico = new Mecanico(1, "Juan", "Perez", 22888999, 3876448833)

// clientes pre-cargados
//let cliente0 = new Cliente(0, "Desconocido", "Desconocido", 0, 0) // Saco éste elemento para incorporar operador Ternario
let cliente1 = new Cliente(1, "Andres", "Perez", 40555666, 3876554114)
let cliente2 = new Cliente(2, "Ernesto", "Benitez", 16555666, 3886554114)
let cliente3 = new Cliente(3, "Fabian", "Estevanez", 28555666, 3816554114)
let cliente4 = new Cliente(4, "Cecilia", "Arriaga", 29555666, 3885668899)
let cliente5 = new Cliente(5, "Fabiana", "Mendez", 23777888, 3516554114)
let cliente6 = new Cliente(6, "Diego", "Cajal", 25165369, 3876830473)

let clientes = [cliente1, cliente2, cliente3, cliente4, cliente5, cliente6] // listado de clientes

// Servicios pre-cargados
let servicio1 = new Servicio(1, "Service Completo", 4200)
let servicio2 = new Servicio(2, "Service Semi-completo", 2500)
let servicio3 = new Servicio(3, "Mantenimiento Preventivo", 2800)
let servicio4 = new Servicio(4, "Instalación de nuevos repuestos", 1500)
let servicio5 = new Servicio(5, "Diagnostico del Problema", 2300)

let servicios = [servicio1, servicio2, servicio3, servicio4, servicio5] // Listado de servicios

// Productos pre-cargados
let producto1 = new Producto(1, "Producto1", "Marca1", 1500, 12)
let producto2 = new Producto(2, "Producto2", "Marca2", 3800, 50)
let producto3 = new Producto(3, "Producto3", "Marca1", 1200, 250)
let producto4 = new Producto(4, "Producto4", "Marca3", 5500, 25)
let producto5 = new Producto(5, "Producto5", "Marca2", 1300, 90)
let producto6 = new Producto(6, "Producto6", "Marca1", 2800, 5)
let producto7 = new Producto(7, "Producto7", "Marca3", 8900, 10)
let producto8 = new Producto(8, "Producto8", "Marca2", 6250, 33)
let producto9 = new Producto(9, "Producto9", "Marca3", 2350, 28)

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9] // Listado de productos, todavía sin uso, pero se va a usar
let tickets = []
let numero = 1

let divResultados = document.getElementById('divResultados')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let iElemento, iCliente, iProblema

    let dataForm = new FormData(e.target)
    iElemento = dataForm.get('ingresoElemento')
    iCliente = dataForm.get('ingresoCliente')
    iProblema = dataForm.get('problema')
    const html = validarIngreso(iElemento, iCliente, iProblema)
    if (html.length != 0) {
        divResultados.innerHTML = html
        return    
    }
    divResultados.innerHTML = ""
    registrarElemento(iElemento)
    cliente = buscarCliente(iCliente)

    let hoy = new Date()
    registrarTicket(iProblema, hoy)
    form.reset()
    
    //divResultados.innerHTML = hoy.toLocaleString('es-ES', { timeZone: 'UTC' })
})

function validarIngreso(iElemento, iCliente, iProblema) {
    let html = ""
    html += iElemento.length == 0 ? "<p>No ingresó ningún elemento.</p>" : ""
    html += iCliente.length == 0 ? "<p>No ingresó ningún cliente.</p>" : ""
    html += iProblema.length == 0 ? "<p>No ingresó la descripción del problema. Esto es importante, el mecánico utilizará ésta información para su resolución.</p>" : ""
    return html
}

let elemento
function registrarElemento(iElemento) {
    elemento = new Elemento(iElemento)
}

let cliente
function buscarCliente(iCliente) {
    return cliente = clientes.find(x => x.nombre == iCliente)
}

function registrarTicket(iProblema, fecha) {
    let ticket = new Ticket(numero, cliente, elemento, iProblema, mecanico, fecha)
    tickets.push(ticket)
    numero++
}

let btMostrar = document.getElementById('btMostrar')
let divTickets = document.getElementById('divTickets')

btMostrar.addEventListener('click', (e) => {
    e.preventDefault()
    divResultados.innerHTML = ""
    divTickets.innerHTML = ""

    tickets.forEach((e, i) => {
        divTickets.innerHTML += `
            <div class="card" id="t${i}" style="width: 18rem; padding: 0px">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-2"><small>Num: ${e.numero}</small></div>
                        <div class="p-2"><small>${ formatDate(e.fecha)}</small></div>
                    </div>
                </div>
                <div class="card-body"">    
                    <h5 class="card-title">Ticket de Taller</h5>
                    <p class="card-text">Pedido del Cliente: ${e.problema}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Elemento: ${e.elemento.nombre}</li>
                        <li class="list-group-item">Cliente: ${e.cliente?.mostrarNombres() || "Cliente no cargado"}</li>
                        <li class="list-group-item">Mecánico: ${e.mecanico.mostrarNombres()}</li>
                    </ul>
                </div>
                <div class="card-footer">
                    <a href="#" class="card-link">Procesar</a>
                    <a href="#" class="card-link">Retitar Elemento</a>
                </div>
            </div>
    `        
    });
})

const formatDate = (currentDate) => {
    let month = currentDate.getMonth() + 1
    return currentDate.getDate() + "-" + (month < 10 ? `0${month}` : month) + "-" + currentDate.getFullYear()
}

