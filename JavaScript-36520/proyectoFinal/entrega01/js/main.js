/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Proyecto Final: Primera Entrega
    Fecha 24/05/2022
    Descripción: Una parte de un sistema existente, la parte de taller.
        Se tiene el ingreso de elementos que son para su mantenimiento/reparación en un taller.
        Se cuenta con lo siguiente
            + Un mecánico
            + Clientes abituales (listado)
            + Productos (repuestos) que se pueden utilizar en el mantenimineto o reparación. Los mismos pueden ser nuevos o usados
            + Servicios (listado)
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detallan los servicios aplicados y/o repuestos instalados
        Una vez finalizada la reparación o mantenimiento se cierra el ticket y el elemento queda listo para ser retirado.
*/
import {Mecanico, Cliente, Servicio, Producto, Elemento, Ticket} from "./clases.js"
let form = document.getElementById('formIngreso')

let mecanico = new Mecanico(1, "Juan", "Perez", 22888999, 3876448833)

// clientes pre-cargados
let cliente0 = new Cliente(0, "Desconocido", "Desconocido", 0, 0)
let cliente1 = new Cliente(1, "Andres", "Perez", 40555666, 3876554114)
let cliente2 = new Cliente(2, "Ernesto", "Benitez", 16555666, 3886554114)
let cliente3 = new Cliente(3, "Fabian", "Estevanez", 28555666, 3816554114)
let cliente4 = new Cliente(4, "Cecilia", "Arriaga", 29555666, 3885668899)
let cliente5 = new Cliente(5, "Fabiana", "Mendez", 23777888, 3516554114)

let clientes = [cliente0, cliente1, cliente2, cliente3, cliente4, cliente5] // listado de clientes

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

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9] // Listado de productos
let tickets = []
let numero = 1

let divResultados = document.getElementById('divResultados')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let ingresoElemento, ingresoCliente, problema

    let dataForm = new FormData(e.target)
    ingresoElemento = dataForm.get('ingresoElemento')
    if (ingresoElemento.length == 0) {
        divResultados.innerHTML = "<p>No ingresó ningún elemento.</p>"
        return
    }
    ingresoCliente = dataForm.get('ingresoCliente')
    if (ingresoCliente.length == 0) {
        divResultados.innerHTML = "<p>No ingresó ningún cliente.</p>"
        return
    }
    problema = dataForm.get('problema')
    if (problema == 0) {
        divResultados.innerHTML = "<p>No ingresó la descripción del problema. Esto es importante, el mecánico utilizará ésta información para su resolución.</p>"
        return
    }
    divResultados.innerHTML = ""
    registrarElemento(ingresoElemento)
    cliente = buscarCliente(ingresoCliente)

    registrarTicket(problema)
    form.reset()
})

let elemento
function registrarElemento(ingresoElemento) {
    elemento = new Elemento(ingresoElemento)
}

let cliente
function buscarCliente(ingresoCliente) {
    let cliente = clientes.find(x => x.nombre == ingresoCliente)
    if (cliente != null) {
        return cliente
    } return clientes.find(x => x.id == 0)
}

function registrarTicket(problema) {
    let ticket = new Ticket(numero, cliente, elemento, problema, mecanico)
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
            <div class="card" id="t${i}" style="width: 18rem; margin:5px">
                <div class="card-body">
                    <h5 class="card-title">Número: ${e.numero}</h5>
                    <p class="card-text">Elemento: ${e.elemento.nombre}</p>
                    <p class="card-text">Problema: ${e.problema}</p>
                    <p class="card-text">Cliente: ${e.cliente.apellido}, ${e.cliente.nombre}</p>
                    <p class="card-text">Mecanico: ${e.mecanico.apellido}, ${e.mecanico.nombre}</p>
                <!-- <button class="btn btn-danger" >Eliminar Persona </button>  -->
                </div>
            </div>    
    `        
    });
})