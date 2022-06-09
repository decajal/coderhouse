import { crearAlerta, crearMensaje, divContainer, divTitles } from "../main.js"
import { Elemento } from "../clases/Elemento.js"
import { clientes } from "../clases/Cliente.js"
import { Ticket } from "../clases/Ticket.js"
import { mecanicoUnico } from "../clases/Mecanico.js"
import { servicios } from "../clases/Servicio.js"

export const tickets = [] // Listado de Tickets del Taller
let numero = 1 // Número de Tickets

export function listarTickets()
{
    divContainer.innerHTML = ``
    divTitles.innerHTML = htmlTitleList()
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
    let title = `<h3>Tickets</h3>`
    title += `<p class="lead">Listado de Tickets en el Taller</p>`
    return title
}

// escribe el listado de tickets (si es que hay un listado que mostrar)
function listar()
{
    // Acá debería de crear el modal que usaría para mostrar la card con el lilstado de servicios y productos
    // https://getbootstrap.com/docs/5.2/components/modal/#content
    // de esa rul sacar el modal y el ejemplo

    divContainer.innerHTML = htmlModal()


    const divCardBody = document.createElement('div')
    divCardBody.classList.add('card-body')
    divCardBody.classList.add('row')
    divCardBody.setAttribute('id', 'divTickets')

    // Esto es para determinar el listado de los checkbox ==============================================
    divContainer.querySelector('#modal-Card .btn-primary').addEventListener('click', () =>
    {
        const listServicio = document.querySelectorAll('input[name="servicio"]:checked')
        // console.log(listServicio);
        // const listServiciosArray = Array.from(listServicio)
        // console.log(listServiciosArray);
        // //const prec = document.querySelector('.text-end span').textContent = listServicio.length
        // alert(`Total Seleccionado: ${listServicio.length}`)
        listServicio.forEach((checkbox) => {

            console.log(checkbox.value);
        
        });    
    })
    // =================================================================================================

    tickets.forEach((e) => {
        let divCard = htmlCard(e)

        divCard.querySelector('.card-footer .btn-primary').addEventListener('click', () =>
        {
            // Mostrar el ticket en el Modal
            //divContainer.querySelector('.modal-header h5').textContent = `Procesando Ticket Num ${e.numero}`
            const divModalBody = divContainer.querySelector('.modal-body')
            //divModalBody.innerHTML = ``
            let html = `<p><strong>Ticket Num:</strong> ${e.numero}</p>`
            html += `<p><strong>Elemento:</strong> ${e.elemento.nombre}</p>`
            html += `<p class="text-decoration-underline"><strong>Servicios a aplicar:</strong></p>`
            
            //html += `<div class="form-check">`
            servicios.forEach(s => {
                html +=
                `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="${s.id}">
                    <label class="form-check-label" for="${s.id}">
                        ${s.nombre} - $ ${s.precio}
                    </label>
                </div>
                `
            });
            //html += "</div>"
            
            html += `<p class="text-end">Total: $ <span class="totalProceso">0</span></p>`
            divModalBody.innerHTML = html
        })
        divCard.querySelector('.card-footer .btn-secondary').addEventListener('click', () =>
        {
            // A zona de Entrega
            const tListos = JSON.parse(localStorage.getItem('tParseados'))
            let indice = tListos.findIndex(x => x.numero == e.numero)
            if (indice == -1)
            {
                // No existe, entonces lo agregamos
                let elementoQueRetira = { numero: e.numero }
                tListos.push(elementoQueRetira) 
                localStorage.setItem('tParseados', JSON.stringify(tListos))
            }
        })
        divCardBody.appendChild(divCard);
    });  
    divContainer.appendChild(divCardBody);
}

// crea el modal que mostrará el ticket para su proceso
function htmlModal()
{
    let html =
    `
        <!-- ===== modal-Card ===== -->
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
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">
                            
                            Cancelar
                        </button>
                        
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===== Modal ===== -->
    `
    return html
}

// Crea una Card para mostrar el Ticket seleccionado en ella
function htmlCard(e)
{
    const divCard = document.createElement('div')
    divCard.classList.add('card')
    divCard.setAttribute('id', `t${e.numero}`)
    divCard.setAttribute('style', 'width:18rem; padding:0px; margin:3px')
    
    const card =
    `
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
    divCard.innerHTML = card;

    return divCard
}

// Formatea una fecha a la forma dd/mm/yyyy
export const formatDate = (currentDate) =>
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
        cliente = buscarCliente(iCliente)
    
        let fechaIngreso = new Date()
        registrarTicket(iProblema, fechaIngreso)
    
        form.reset()
        crearAlerta('Nuevo ticket generado', 'success')
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
    <div id="divMensaje" style="margin-top:10px;"></div>
    `
    return form
}

// Valida ingreso de los datos al formulario
function validarIngreso(iElemento, iCliente, iProblema)
{
    let html = ""
    html += iElemento.length == 0 ? "<p>No ingresó ningún elemento.</p>" : ""
    html += iCliente.length == 0 ? "<p>No ingresó ningún cliente</p>" : ""
    html += iProblema.length == 0 ? "<p>No ingresó la descripción del problema. Esto es importante ya que el mecánico la utilizará para su resolución.</p>" : ""
    return html
}

// crea la Clase Elemento según el ingresado por Formulario
let elemento
function registrarElemento(iElemento)
{
    elemento = new Elemento(iElemento)
}

// Busca el cliente en el arreglo de clientes
// parametro: nombre
let cliente
function buscarCliente(iCliente)
{
    return cliente = clientes.find(x => x.nombre == iCliente)
}

// registra el ticket con la información proporcionada
function registrarTicket(iProblema, fecha)
{
    let ticket = new Ticket(numero, cliente, elemento, iProblema, mecanicoUnico, fecha)
    tickets.push(ticket)
    numero++
}
