import { divContainer, divTitles } from "../main.js"

export function mostrarDescripcion()
{
    divTitles.innerHTML = htmlTitle()
    descripcion()
}

function htmlTitle()
{
    let title = `<h3>Proyecto final</h3>`
    return title
}

function descripcion()
{
    let html =
    `
    <figure>
        <blockquote class="blockquote">
            <p class="mb-0">Curso JS [coderhouse] - Personal de Teco</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            Diego Cajal <a href="mailto:decajalperez@teco.com.ar">decajalperez@teco.com.ar</a> 
            <cite>Entrega Final</cite>
        </figcaption>
    </figure>
    <p><strong>Descripción: </strong>
        Módulo de Taller de un sistema en producción (el sistema original cuenta con módulos adicionales que para el caso no se modelan)<br>
        Se plantea el ingreso de elementos que son para su mantenimiento/reparación en el taller.<br>
        Se cuenta con lo siguiente:
        <ul>
            <li>Formulario de Ingreso, el cual registra un ticket</li>
            <li>Clientes habituales (listado)</li>
            <li>Servicios (listado) que brinda el taller</li>
            <li>Un mecánico único</li>
        </ul>
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detalla el problema a solicitar, lo que sería la "solicitud del cliente"
    </p>
    <p>En el <cite>"Home"</cite> de la aplicación se agregó: Mini weatherApp que consulta el clima en la/s ciudades seleccionadas y las registra en el Local Storage</p>
    `
    divContainer.innerHTML = html;
}