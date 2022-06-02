import { servicios } from "../clases/Servicio.js"

export function listarServicios()
{
    divTitles.innerHTML = htmlTitle()
    listar()
}

function listar()
{
    let html = `<table class="table table-hover">`
    html += htmlTableThead()
    html += `<tBody>`
    servicios.forEach(e => {
        html += htmlTableTr(e)
    });
    html += `<tBody></table>`
    divContainer.innerHTML = html;
}

function htmlTitle()
{
    let title = `<h3>Servicios</h3>`
    title += `<p class="lead">Listado de Servicios que proporciona el Taller</p>`
    return title
}

function htmlTableThead()
{
    let head = 
    `
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Servicio</th>
                <th scope="col">Precio</th>
            </tr>
        </thead>
    `
    return head
}

function htmlTableTr(e)
{
    let tr =
    `
        <tr scope="row">
            <th scope="row">${e.id}</th>
            <td>${e.nombre}</td>
            <td>$ ${e.precio}</td>
        </tr>
    `
    return tr
}
