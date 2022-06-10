/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Proyecto Final - Entrega Final
    Fecha 10/06/2022
    Descripción: Una parte de un sistema existente, la parte de taller.
        Se tiene el ingreso de elementos que son para su mantenimiento/reparación en un taller.
        Se cuenta con lo siguiente
            + Un sólo mecánico
            + Clientes habituales (listado)
            + Servicios (listado)
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detallan los servicios aplicados y/o repuestos instalados
        Una vez finalizada la reparación o mantenimiento se cierra el ticket y el elemento queda listo para ser retirado.
*/

import { listarTickets, crearFormulario } from "./utilidades/utilTickets.js"
import { listarServicios } from "./utilidades/utilServicios.js"
import { mostrarDescripcion } from "./utilidades/utilDescripcion.js"
import { listarClientes } from "./utilidades/utilClientes.js"
import { tickets } from "./utilidades/utilTickets.js"
import { weather } from "./utilidades/utilWeather.js"

export const divTitles = document.getElementById('divTitles')
export const divContainer = document.getElementById('divContainer')


let panelTickets = false // Para saber si me encuentro parado en el listado de Tickets, si es true debe actualizar esa página
export let tParseados = [] // Arreglo usado en el localStorage, los tickets parseados para retirar
controlLS()

const taller = document.getElementById('taller')
taller.addEventListener('click', (e) =>
{
    // quisiera que al ingresar al proyecto este se dispare
    e.preventDefault()
    panelTickets = false
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    mostrarDescripcion()
})

const home = document.getElementById('home')
home.addEventListener('click', (e) =>
{
    e.preventDefault()
    panelTickets = false
    weather()
})

const ingresoElemento = document.getElementById('ingresoElemento')
ingresoElemento.addEventListener('click', (e) =>
{
    e.preventDefault()
    panelTickets = false
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    crearFormulario()
})

const listadoTickets = document.getElementById('listadoTickets')
listadoTickets.addEventListener('click', (e) =>
{
    e.preventDefault()
    panelTickets = true
    listarTickets()
})

const listadoServicios = document.getElementById('listadoServicios')
listadoServicios.addEventListener('click', (e) =>
{
    e.preventDefault()
    panelTickets = false
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    listarServicios()
})

const listadoClientes = document.getElementById('listadoClientes')
listadoClientes.addEventListener('click', (e) => 
{
    e.preventDefault()
    panelTickets = false
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    listarClientes()
})

// Crea un mensaje de Alerta como resultado o advertencia de una acción. Tiene botón de cierre
export function crearAlerta(html, tipo)
{
    const divAlert = document.createElement('div')
    divAlert.setAttribute('id', 'liveAlertPlaceholder')

    const alert = (message, type) =>
    {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')  
        divAlert.append(wrapper)
    }
    divMensaje.appendChild(divAlert)
    alert(html, tipo)
}

// Crea un msjs y lo muestra (sin botón de cierre)
export function crearMensaje(html, tipo)
{
    const divAlert = document.createElement('div')
    divAlert.setAttribute('class', `alert alert-${tipo}`)
    divAlert.setAttribute('role', 'alert')
    divAlert.innerHTML = html
    divMensaje.appendChild(divAlert)
}

// variable usada en la ventana modal
//let modalBody = document.getElementsByClassName('modal-body')[0]
const modalBody = document.querySelector('#modalCarrito .modal-body')
// Botón "Zona de Entrega" que tiene los Tickets de los elementos que están retirando del Taller
//  Es para quitarlos del Carrito.
document.getElementById('btSalida').addEventListener('click', () => 
{
    let totalCarrito = 0
    const arregloLocalStorage = JSON.parse(localStorage.getItem('tParseados'))
    modalBody.innerHTML = ""
    if (arregloLocalStorage.lenght != 0)
    {
        const ticketsEfectivo = []
        arregloLocalStorage.forEach(eLS =>
        {
            const ticketLS = tickets.find(x => x.numero == eLS.numero)
            if (typeof ticketLS != 'undefined')
            {
                let elemento = {numero: ticketLS.numero}
                const totalTicket = ticketLS.getTotalPrice()
                ticketsEfectivo.push(elemento)
                totalCarrito += totalTicket
                modalBody.innerHTML +=
                `
                <div class="card" id="modal-${ticketLS.numero}" style="width: 18rem; margin-top:5px;">
                    <div class="card-body"">    
                        <h5 class="card-title">Ticket Num: ${ticketLS.numero}</h5>
                        <p class="card-text">
                            <span class="fw-light">Cliente: </span>
                            ${ticketLS.cliente?.mostrarNombres() || "Cliente no cargado"}
                        </p>
                        <p class="card-text">
                            <span class="fw-light">Elemento: </span>${ticketLS.elemento.nombre}
                        </p>
                        <p class="card-text text-end">
                            <span class="fw-light">Total-ticket: $ </span>
                            <span class="totalTicket">${totalTicket}</span>
                        </p>
                        <button class="btn btn-danger">Quitar</button>
                    </div>
                </div>
                `
            }
        });
        modalBody.innerHTML += 
        `
        <p class="text-end">
            <span class="fw-light">Total: $</span><span class="totalCarrito">0</span>
        </p>
        `
        ticketsEfectivo.forEach(eC => 
        {
            document.getElementById(`modal-${eC.numero}`).lastElementChild.lastElementChild.addEventListener('click', () => 
            {
                const ticket = tickets.find(x => x.numero == eC.numero)
                const totalTicket = ticket.getTotalPrice()
                totalCarrito -= totalTicket

                document.getElementById(`modal-${eC.numero}`).remove()
                ticketsEfectivo.splice(eC.index, 1)
                localStorage.setItem('tParseados', JSON.stringify(ticketsEfectivo))
                modalBody.querySelector('.totalCarrito').textContent = totalCarrito
            })
        })
        modalBody.querySelector('.totalCarrito').textContent = totalCarrito
    }
})

// Botón confirmar del "Carrito"
const btConfirmar = document.getElementById('btConfirmar')
btConfirmar.addEventListener('click', () =>
{
    const arregloLocalStorage = JSON.parse(localStorage.getItem('tParseados'))
    if (arregloLocalStorage.length != 0 && tickets.length != 0)
    {
        arregloLocalStorage.forEach(element => {
            document.getElementById(`modal-${element.numero}`).remove()
            let index = tickets.findIndex(x => x.numero == element.numero)
            tickets.splice(index, 1)
        });
        let arr = []
        localStorage.setItem('tParseados', JSON.stringify(arr))
        if (panelTickets == true)
            listarTickets()
        
        Swal.fire(
            'Good job!', // <-- Me gustó el título como final ! por eso lo dejé xD
            'El pago se registró exitosamente.',
            'success'
            )
    }
})

// "Carrito": se tiener un carrito que no es carrito, es decir, los elementos una vez reparados se los tiene que retirar...
//      entonces, al presionar el botón de "Preparar Retiro" va a ese carrito, digamos que el elemento ya fue reparado y
//      el cliente se encuentra en el local pidiendo para retirarlo.
//      con este botón lo dejamos en carrito de salida.
//      Es diferente que un carrito normal porque debe quitar el elemento de todos lados.
function controlLS()
{
    if (tickets.length == 0)
        blanquearLS()
    else
    {
        if (localStorage.getItem('tParseados'))
        {
            let arr = JSON.parse(localStorage.getItem('tParseados'))
            arr.forEach(element => {
                let index = tickets.findIndex(x => x.numero == element.numero)
                if (index == -1)
                {
                    // El local Storage no coincide con los Tickets
                    // El elemento del LS no existe en en el mundo real, por así decirlo
                    arr.splice(element.index, 1)
                }
            });
            localStorage.setItem('tParseados', JSON.stringify(arr))
        }
        else
            blanquearLS()    
    }
}

// Blanquea el localStorage
function blanquearLS()
{
    const arr = []
    localStorage.setItem('tParseados', JSON.stringify(arr))
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarDescripcion()});