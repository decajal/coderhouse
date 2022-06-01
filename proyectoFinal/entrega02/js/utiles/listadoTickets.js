export function mostrarTickets(listado)
{
    let divContainer = document.getElementById('divContainer')
    let html = ""
    listado.forEach((e, i) => {
        html +=
        `
        <div class="card" id="t${i}" style="width: 18rem; padding: 0px">
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
    });
    divContainer.innerHTML = html;
}

const formatDate = (currentDate) =>
{
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    return (day < 10 ? `0${day}` : day) + "-" + (month < 10 ? `0${month}` : month) + "-" + currentDate.getFullYear()
}
