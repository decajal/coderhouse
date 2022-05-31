/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Proyecto Final: Preview de Segunda Entrega
    Fecha 31/05/2022
    Descripción: Una parte de un sistema existente, la parte de taller.
        Se tiene el ingreso de elementos que son para su mantenimiento/reparación en un taller.
        Se cuenta con lo siguiente
            + Un sólo mecánico
            + Clientes abituales (listado)
            + Productos (repuestos) que se pueden utilizar en el mantenimineto o reparación. Los mismos pueden ser nuevos o usados
            + Servicios (listado)
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detallan los servicios aplicados y/o repuestos instalados
        Una vez finalizada la reparación o mantenimiento se cierra el ticket y el elemento queda listo para ser retirado.
*/

import { mecanicoUnico } from "./clases/Mecanico.js"
import { Cliente, clientes } from "./clases/Cliente.js"
import { Repuesto, repuestos } from "./clases/Repuesto.js"
import { Servicio, servicios } from "./clases/Servicio.js"
import { Elemento } from "./clases/Elemento.js"
import { Ticket } from "./clases/Ticket.js"

const tickets = []
let numero = 1

const form = document.getElementById('formIngreso')
const btIngresar = document.getElementById('btIngresar')
const divResultados = document.getElementById("divResultados")

form.addEventListener('submit', (e) =>
{
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

    let fechaIngreso = new Date()
    registrarTicket(iProblema, fechaIngreso)

    form.reset()
    mjsNuevoTicket() // <= nueva librería usada
})

const mjsNuevoTicket = () =>
{
    Swal.fire(
        "Ingreso registrado",
        "Nuevo ticket generado",
        "success",
      )
}

function validarIngreso(iElemento, iCliente, iProblema)
{
    let html = ""
    html += iElemento.length == 0 ? "<p>No ingresó ningún elemento.</p>" : ""
    html += iCliente.length == 0 ? "<p>No ingresó ningún cliente.</p>" : ""
    html += iProblema.length == 0 ? "<p>No ingresó la descripción del problema. Esto es importante, el mecánico utilizará ésta información para su resolución.</p>" : ""
    return html
}

let elemento
function registrarElemento(iElemento)
{
    elemento = new Elemento(iElemento)

    
}

let cliente
function buscarCliente(iCliente)
{
    return cliente = clientes.find(x => x.nombre == iCliente)
}

function registrarTicket(iProblema, fecha)
{
    let ticket = new Ticket(numero, cliente, elemento, iProblema, mecanicoUnico, fecha)
    tickets.push(ticket)
    numero++
}

let btMostrar = document.getElementById('btMostrar')
let divTickets = document.getElementById('divTickets')

btMostrar.addEventListener('click', (e) => 
{
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

const formatDate = (currentDate) =>
{
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    return (day < 10 ? `0${day}` : day) + "-" + (month < 10 ? `0${month}` : month) + "-" + currentDate.getFullYear()
}

