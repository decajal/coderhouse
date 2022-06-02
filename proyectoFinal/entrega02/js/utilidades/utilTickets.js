import { Elemento } from "../clases/Elemento.js"
import { clientes } from "../clases/Cliente.js"
import { Ticket } from "../clases/Ticket.js"
import { mecanicoUnico } from "../clases/Mecanico.js"


export function listarTickets()
{
    divTitles.innerHTML = htmlTitleList()
    listar()
}

function listar()
{
    let html = `<div class="card-body row" id="divTickets" style="margin: 3px">`
    tickets.forEach((e, i) => {
        html += htmlCard(e, i)
    });
    html += `</div>`
    divContainer.innerHTML = html;
}

function htmlTitleList()
{
    let title = `<h3>Tickets</h3>`
    title += `<p class="lead">Listado de Tickets en el Taller</p>`
    return title
}

function htmlCard(e, i)
{
    const card =
    `
        <div class="card" id="t${i}" style="width: 18rem; padding: 0px" style="margin: 3px">
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
    return card
}

const formatDate = (currentDate) =>
{
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    return (day < 10 ? `0${day}` : day) + "-" + (month < 10 ? `0${month}` : month) + "-" + currentDate.getFullYear()
}

//===================== Formulario de Ingreso
export function crearFormulario()
{
    divTitles.innerHTML = htmlTitleForm()
    crear()
}

function crear()
{
    divContainer.innerHTML = htmlForm()

    let form = document.getElementById('formIngreso')
    form.addEventListener('submit', (e) => 
    {
        e.preventDefault()

        let iElemento, iCliente, iProblema
        let dataForm = new FormData(e.target)
        
        iElemento = dataForm.get('ingresoElemento')
        iCliente = dataForm.get('ingresoCliente')
        iProblema = dataForm.get('problema')
    
        const html = validarIngreso(iElemento, iCliente, iProblema)
        const divMensaje = document.getElementById('divMensaje')
        divMensaje.innerHTML = ""
        if (html.length != 0) {
            divMensaje.innerHTML = html
            return    
        }

        registrarElemento(iElemento)
        cliente = buscarCliente(iCliente)
    
        let fechaIngreso = new Date()
        registrarTicket(iProblema, fechaIngreso)
    
        form.reset()
        mjsNuevoTicket()
    })
}

function htmlTitleForm()
{
    let title = `<h3>Formulario</h3>`
    title += `<p class="lead">Ingreso de Elementos al Taller, generación de Tickets</p>`
    return title
}

function htmlForm()
{
    const form = 
    `
    <div class="formulario">
        <form id="formIngreso">
            <div class="mb-3">
                <label class="form-label" for="elemento">Elemento</label>
                <input id="elemento" class="form-control" type="text" placeholder="Ingrese el elemento que necesita reparar"
                    aria-label="Ingrese el elemento que necesita reparar" name="ingresoElemento">
            </div>
            <div class="mb-3">
                <label class="form-label" for="cliente">Cliente</label>
                <input id="cliente" class="form-control" type="text" placeholder="Ingrese el cliente"
                    aria-label="Ingrese el cliente" name="ingresoCliente">
            </div>
            <div class="mb-3">
                <label class="form-label" for="problema">Problema</label>
                <textarea id="problema" class="form-control" aria-label="With textarea" placeholder="Ingrese la descripción del problema"
                    name="problema"></textarea>
            </div>                
            <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
    </div>
    <div id="divMensaje" ></div>
    `
    return form
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

const tickets = []
let numero = 1
function registrarTicket(iProblema, fecha)
{
    let ticket = new Ticket(numero, cliente, elemento, iProblema, mecanicoUnico, fecha)
    tickets.push(ticket)
    numero++
}

const mjsNuevoTicket = () =>
{
    Swal.fire(
        "Ingreso registrado",
        "Nuevo ticket generado",
        "success",
      )
}

