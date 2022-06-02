import { clientes } from "../clases/Cliente.js"

export function listarClientes()
{
    divTitles.innerHTML = htmlTitle()
    listar()
}

// Creación del Listado en una tabla
//  se vale de una librería: https://datatables.net/
function listar()
{
    divContainer.innerHTML = htmlTable()
    const $tablaClientes = $("#tablaClientes").DataTable({
        ordering: true,
        searching: true,
        data: clientes,
        columns:
        [
            {data: "id"},
            {data: "nombre"},
            {data: "apellido"},
            {data: "dni"},
            {data: "celular"},
        ]
    })
}

// Creación y Colocación del titúlo
function htmlTitle()
{
    let html = `<h3>Clientes</h3>`
    html += `<p class="lead">Listado de personas que con Clientes Habituales de nuestro Taller</p>`
    return html
}

// creación de la tabla
function htmlTable()
{
    let html = `<table id="tablaClientes"  class="table table-hover">`
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
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">DNI</th>
                <th scope="col">Celular</th>
            </tr>
        </thead>
    `
    return html
}
