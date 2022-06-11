import { crearAlerta, crearMensaje, divContainer, divTitles } from "../main.js"
import { Elemento } from "../clases/Elemento.js"
import { Cliente, clientes } from "../clases/Cliente.js"
import { Ticket } from "../clases/Ticket.js"
import { mecanicoUnico } from "../clases/Mecanico.js"
import { servicios } from "../clases/Servicio.js"

export const tickets = [] // Listado de Tickets del Taller
let numero = 1 // Número de Tickets

let cliente // cliente habitual
let elemento // elemento que ingresa al taller para su reapración


export function listarTickets()
{
    divContainer.innerHTML = ``
    divTitles.innerHTML = ``
    //divTitles.innerHTML = htmlTitleList()
    htmlTitleList()
    if (tickets.length > 0)
        listar()
    else
    {
        if (localStorage.getItem('tParseados'))
        {
            const arr = []
            localStorage.setItem('tParseados', JSON.stringify(arr))
        }
        divContainer.innerHTML += `<div id="divMensaje" style="margin-top:10px;"></div>`
        crearMensaje('Actualmente no hay tickets cargados. Gracias', 'primary')
    }
        
}

// Crea el titulo
function htmlTitleList()
{
    const h3 = document.createElement('h3')
    h3.textContent = "Tickets"
    divTitles.appendChild(h3)
    const p = document.createElement('p')
    p.classList.add('lead')
    p.textContent = "Listado de Tickets en el Taller"
    divTitles.appendChild(p)
}

function listar()
{
    crearHtmlModal() // Crea la ventana "#modal-Card" en el DOM
    crearTicketsDOM()
}

// Modal: Ventana de Proceso
// En esta ventana se muestra el listado de servicios a aplicar en un ticket
function crearHtmlModal()
{
    divContainer.innerHTML = 
    `
    <div class="modal fade" id="modal-Card" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel
                        aria-labelledby="exampleModalLabel" 
                        aria-hidden="true">
                        
                        Ventana de proceso
                    </h5>
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
            
                </div>
          
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">
                        
                        Listo
                    </button>
                </div>
            </div>
        </div>
    </div>
`
}

// Recorre el listado de Tickets y crea uno a uno en el DOM y le da funcionalidad a los botones de la card
function crearTicketsDOM()
{
    const divCardBody = document.createElement('div')
    divCardBody.classList.add('card-body')
    divCardBody.classList.add('row')
    divCardBody.setAttribute('id', 'divTickets')   
    
    tickets.forEach(ticket =>
    {        
        let divCard = crearCardDOM(ticket)
        // dar funcionalidad a los botones
        // btn-primary: Procesar ticket
        divCard.querySelector('.card-footer .btn-primary').addEventListener('click', () =>
        {
            btnProcesarTicket(ticket)
        });

        // btn-secondary: A zona de Entrega
        divCard.querySelector('.card-footer .btn-secondary').addEventListener('click', () =>
        {
            btnZonaDeEntrega(ticket)
        });

        divCardBody.appendChild(divCard); // al DOM
    });
    divContainer.appendChild(divCardBody);
}

// Crea una Card y muestra el ticket en el DOM
function crearCardDOM(ticket)
{
    const divCard = document.createElement('div')
    divCard.classList.add('card')
    divCard.setAttribute('id', `t${ticket.numero}`)
    divCard.setAttribute('style', 'width:18rem; padding:0px; margin:3px')

    const htmlCard=
    `
        <div class="card-header">
            <div class="d-flex justify-content-between">
                <div class="p-2"><small>Num: ${ticket.numero}</small></div>
                <div class="p-2"><small>${ formatDate(ticket.fecha)}</small></div>
            </div>
        </div>
        
        <div class="card-body"">    
            <h5 class="card-title">Ticket de Taller</h5>
            <p class="card-text">
                <span class="fw-light">Pedido del Cliente:</span> ${ticket.problema}
            </p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span class="fw-light">Elemento:</span> ${ticket.elemento.nombre}
                </li>
                <li class="list-group-item">
                    <span class="fw-light">Cliente:</span> ${ticket.cliente?.mostrarNombres() || noCliente}
                </li>
                <li class="list-group-item">
                    <span class="fw-light">Mecánico:</span> ${ticket.mecanico.mostrarNombres()}
                </li>
            </ul>
            <p class="card-text text-end">
                <span class="fw-light">Total: $ </span>
                <span class="totalProceso">${ticket.getTotalPrice()}</span>
            </p>
        </div>
        
        <div class="card-footer">
            <button type="button"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modal-Card">

                Procesar ticket
            </button>
            <button type="button"
                class="btn btn-secondary btn-sm">
                
                A zona de Entrega
            </button>
        </div>
    `
    divCard.innerHTML = htmlCard
    return divCard
}

// Funcionalidad del botón "Procesar ticket" de la Card
function btnProcesarTicket(ticket)
{
    let accTotal = ticket.getTotalPrice() // acumulador para el precio de los servicios en la Card
    let arrServicios = ticket.getServices() // arreglo de Servicios, los seleccionados en el checkbox

    let html = `<p><span class="fw-light">Ticket Num:</span> ${ticket.numero}</p>`
    html += `<p><span class="fw-light">Elemento:</span> ${ticket.elemento.nombre}</p>`
    html += `<p class="text-decoration-underline"><span class="fw-light">Servicios a aplicar:</span></p>`
    const divModalBody = divContainer.querySelector('.modal-body')
    divModalBody.innerHTML = html
    const serviciosTicket = ticket.getServices()
    servicios.forEach((s) =>
    {
        
        const index = serviciosTicket.findIndex(x => x.id == s.id)
        let checked = (index != -1) ? "checked" : ""
        const divFormCheck = document.createElement('div')
        divFormCheck.classList.add('form-check')
        
        divFormCheck.innerHTML =
        `
            <input class="form-check-input" type="checkbox" id="chk-${s.id}" value="${s.id}"
                name="servicio" data-precio="${s.precio}" ${checked}>

            <label class="form-check-label" for="chk-${s.id}">
                ${s.nombre} - $ ${s.precio}
            </label>
        `
        divModalBody.appendChild(divFormCheck)
    })
    html = `<p class="text-end">Total: $ <span class="totalProceso">${accTotal}</span></p>`
    divModalBody.innerHTML += html

    const arr = document.querySelectorAll('.form-check-input')
    arr.forEach(element => {
       element.addEventListener('click', (e) =>
       {
            // colocando el precio de los servicios seleccionados al final del ticket
            let checkbox = e.target
            let precio = parseInt(checkbox.getAttribute('data-precio')) // convierte el precio en un INT

            // buscar el servicio en el arreglo de servicios
            const idServicio = parseInt(checkbox.getAttribute('value'))
            const servActual = servicios.find(x => x.id == idServicio)
            if (checkbox.checked)
            {
                // agrega el servicio seleccionado al arreglo de servicios seleccionados
                arrServicios.push(servActual)
                // suma al acumulador, de precio (total) del ticket, el precio del servicio seleccionado
                accTotal += precio
            }
            else
            {
                // quita el servicio seleccionado del arreglo de servicios seleccionados
                const index = arrServicios.findIndex(x => x.id == idServicio)
                arrServicios.splice(index, 1)
                // resta del acumulador, de precio (total) del ticket, el precio del servicio seleccionado
                accTotal-= precio
            }               
            ticket.addServices(arrServicios)
            divModalBody.querySelector('.totalProceso').textContent = accTotal
            divContainer.querySelector(`#t${ticket.numero} .totalProceso`).textContent = accTotal
       });
    })
}

function btnZonaDeEntrega(ticket)
{
    const tListos = JSON.parse(localStorage.getItem('tParseados'))
    let indice = tListos.findIndex(x => x.numero == ticket.numero)
    if (indice == -1)
    {
        // No existe, entonces lo agregamos
        let elementoQueRetira = { numero: ticket.numero }
        tListos.push(elementoQueRetira) 
        localStorage.setItem('tParseados', JSON.stringify(tListos))

        Toastify({
            text: "Elemento listo para entrega...",
            duration: 3000,
            gravity: "bottom",
            }).showToast();
    }
}

// Formatea una fecha a la forma dd/mm/yyyy
export const formatDate = (currentDate) =>
{
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    return (day < 10 ? `0${day}` : day) + "-" + (month < 10 ? `0${month}` : month) + "-" + currentDate.getFullYear()
}

// ============================================================================================================
// ===================== Formulario de Ingreso
export function crearFormulario()
{
    divTitles.innerHTML = htmlTitleForm()
    crear()
}

// FORMULARIO DE INGRESO DE ELEMENTOS
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
            crearAlerta(html, 'danger')

            return    
        }

        registrarElemento(iElemento)
        //cliente = buscarCliente(iCliente)
    
        let fechaIngreso = new Date()
        registrarTicket(iProblema, fechaIngreso)
    
        form.reset()
        Toastify({
            text: "Se registró el ingreso al taller",
            duration: 3000,
            gravity: "bottom",
            }).showToast();
    })
}

// crea el Título
function htmlTitleForm()
{
    let title = `<h3>Formulario</h3>`
    title += `<p class="lead">Ingreso de Elementos al Taller, generación de Tickets</p>`
    return title
}

// Crea el formulario para meter al DOM
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
                <label class="form-label" for="cliente">Cliente (si es habitual ingrese el DNI si no ingrese apellido y nombre)</label>
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
    <div id="divMensaje" style="margin-top:10px;"></div>
    `
    return form
}

// Valida ingreso de los datos al formulario
function validarIngreso(iElemento, iCliente, iProblema)
{
    
    let html = ""
    html += iElemento.length == 0 ? "<p>No ingresó ningún elemento.</p>" : ""

    //html += iCliente.length == 0 ? "<p>No ingresó ningún cliente</p>" : ""
    if (iCliente.length == 0)
        html += "<p>No ingresó ningún cliente</p>"
    else
    {
        const dni = validarEntero(iCliente)
        if (dni != "")
            cliente = buscarCliente(dni)        
        else
        {
            cliente = new Cliente(0, iCliente + " (No Habitual)", "", 0, 0)
        }
    }
    html += iProblema.length == 0 ? "<p>No ingresó la descripción del problema. Esto es importante ya que el mecánico la utilizará para su resolución.</p>" : ""
    return html
}

function validarEntero(valor){
    //intento convertir a entero.
   //si era un entero no le afecta, si no lo era lo intenta convertir
   valor = parseInt(valor)

    //Compruebo si es un valor numérico
    if (isNaN(valor))
          //entonces (no es numero) devuelvo el valor cadena vacia
          return ""
    else
          //En caso contrario (Si era un número) devuelvo el valor
          return valor
}

// crea la Clase Elemento según el ingresado por Formulario
function registrarElemento(iElemento)
{
    elemento = new Elemento(iElemento)
}

// Busca el cliente en el arreglo de clientes
// parametro: dni
function buscarCliente(dni)
{
    return cliente = clientes.find(x => x.dni == dni)
}

// registra el ticket con la información proporcionada
function registrarTicket(iProblema, fecha)
{
    let ticket = new Ticket(numero, cliente, elemento, iProblema, mecanicoUnico, fecha)
    tickets.push(ticket)
    numero++
}
