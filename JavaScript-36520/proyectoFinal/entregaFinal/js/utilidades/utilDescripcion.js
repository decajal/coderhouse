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
            Ing. Diego Cajal <a href="mailto:decajalperez@teco.com.ar">decajalperez@teco.com.ar</a> 
            <cite>Entrega Final - Junio 2022</cite>
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
        Cada vez que un elemento ingresa se registra la llegada y se crea un ticket, se detalla el problema a solicitar, lo que sería la "solicitud del cliente"<br>
        En el formulario de ingrerso se pide el DNI del cliente habitual y el sistema busca en si lista de clientes habituales y si lo encuentra lo asocia al ticket,
        si no lo encuentra informa de esta situación. Si el cliente no es habitual, podemos ingresar nombre y apellido (por convención se recomienda que el orden sea Apellido y Nombre)
        y el sistema creará un objeto temporal con estos datos y le coloca la leyenda <cite>Cliente no habitual</cite>, finalmente lo asocia al ticket.<br>
    </p>
    <p>
        El listado de tickets se puede consultar en la opción de <cite>Tickets</cite> del menú superior de la página.<br>
        A cada ticket se le puede aplicar un proceso; consiste en seleccionar uno (o más) servicios que el taller proporciona. Los mismos se agregan al ticket y suman el importe del servicio seleccionado.<br>
    </p>
    <p>
        El sistema es capaz de mostrar los importes individuales de cada ticket (procesado o no) y en la <cite>Zona de Entrega</cite> (con una funcionalidad parecida a la de un carrito de compras)
        el total de los tickets de salida, el importe total a abonar por un cliente que retirar uno o varios elementos que se encontraban en el taller.
    </p>
    <p>En el <cite>"Home"</cite> de la aplicación se agregó: Mini weatherApp que consulta el clima en la/s ciudades seleccionadas y las registra en el Local Storage</p>
    <p>La opción <cite>Servicios</cite> muestra un listado de los Servicios que proporciona el taller</p>
    <p>La opción <cite>Clientes</cite> muestra un listado de los clientes habituales del taller</p>
    `
    divContainer.innerHTML = html;
}