import { crearAlerta, divContainer, divTitles } from "../main.js"
import { servicios } from "../clases/Servicio.js"

export function listarServicios()
{
    divTitles.innerHTML = htmlTitle()
    listar()
}

// Creación del Listado en una tabla
//  se vale de una librería: https://datatables.net/
function listar()
{  
    divContainer.innerHTML = htmlTable()
    const $tablaServicios = $("#tablaServicios").DataTable({
        ordering: true,
        searching: true,
        data: servicios,
        columns:
        [
            {data: "id"},
            {data: "nombre"},
            {data: "precio"}
        ]
    })
}

// Creación y Colocación del titúlo
function htmlTitle()
{
    let html = `<h3>Servicios</h3>`
    html += `<p class="lead">Listado de Servicios que proporciona el Taller</p>`
    return html
}

// creación de la tabla
function htmlTable()
{
    let html = `<table id="tablaServicios"  class="table table-hover">`
    html += htmlTableThead()
    html += `</table>`
    return html
}

// Arma la cabecera de la Tabla
function htmlTableThead()
{
    let html = 
    `
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Servicio</th>
                <th scope="col">Precio</th>
            </tr>
        </thead>
    `
    return html
}

/* ============== PARA ELIMINAR ==============

// POR EL USO DE LA LIBRERIA ESTA RUTINA QUEDA OBSOLETA
// Arma cada fila
// function htmlTableTr(e)
// {
//     let html =
//     `
//         <tr scope="row">
//             <th scope="row">${e.id}</th>
//             <td>${e.nombre}</td>
//             <td>$ ${e.precio}</td>
//         </tr>
//     `
//     return html
// }

*/