/*
    Curso Coderhouse Back-End - Personal de Teco
    Nombre: Diego Cajal (decajalperez@teco.com.ar)
    Proyecto Final - Segunda Entrega
    Fecha 01/06/2022
    Descripción: Una parte de un sistema existente, la parte de taller.
        Se tiene el ingreso de elementos que son para su mantenimiento/reparación en un taller.
        Se cuenta con lo siguiente
            + Un sólo mecánico
            + Clientes habituales (listado)
            + Productos (repuestos) que se pueden utilizar en el mantenimineto o reparación. Los mismos pueden ser nuevos o usados
            + Servicios (listado)
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detallan los servicios aplicados y/o repuestos instalados
        Una vez finalizada la reparación o mantenimiento se cierra el ticket y el elemento queda listo para ser retirado.
*/

import { listarTickets, crearFormulario } from "./utilidades/utilTickets.js"
import { listarServicios } from "./utilidades/utilServicios.js"
import { mostrarDescripcion } from "./utilidades/utilDescripcion.js"
import { listarClientes } from "./utilidades/utilClientes.js"

let divContainer = document.getElementById('divContainer')
let divTitles = document.getElementById('divTitles')

const taller = document.getElementById('taller')
taller.addEventListener('click', (e) =>
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
})

const home = document.getElementById('home')
home.addEventListener('click', (e) =>
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    mostrarDescripcion()
})

const ingresoElemento = document.getElementById('ingresoElemento')
ingresoElemento.addEventListener('click', (e) =>
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    crearFormulario()
})

const listadoTickets = document.getElementById('listadoTickets')
listadoTickets.addEventListener('click', (e) =>
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    listarTickets()
})

const listadoServicios = document.getElementById('listadoServicios')
listadoServicios.addEventListener('click', (e) =>
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    listarServicios()
})

const listadoClientes = document.getElementById('listadoClientes')
listadoClientes.addEventListener('click', (e) => 
{
    e.preventDefault()
    divTitles.innerHTML = ``
    divContainer.innerHTML = ``
    listarClientes()
})
