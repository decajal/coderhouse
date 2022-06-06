import { divTitles, divContainer } from "../main.js"

export function weather()
{
    divTitles.innerHTML = htmlTitle()
    divContainer.innerHTML = ``
    htmlTitle()
    crearForm()
}

function htmlTitle()
{
    let html = `<h3>Mini weatherApp</h3>`
    html += `<p class="lead">El cima en tu ciudad y/o en las ciudades que te interesan</p>`
    return html
}

function crearForm()
{
    divContainer.innerHTML = htmlForm()
    const formWeather = document.querySelector('.formWeather form')
    const msg = document.querySelector('.formWeather .msg')

    formWeather.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        let data = new FormData(e.target)
        const inputVal = data.get('inputVal')
        promesa(inputVal)
    })
}

// crea el formulario para meter al DOM
function htmlForm()
{
    const form =
    `
    <section class="formWeather">
        <form class="row gy-1 gx-2 align-items-center">
            <div class="col-auto">
                <label class="visually-hidden" for="inputVal">Ciudad</label>
                <input type="text" class="form-control" name="inputVal" placeholder="Ciudad, Pais">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary">Aceptar</button>
            </div>
            <div class="col-auto">
                <span class="msg"></span>
            </div>
        </form>
    </section>
    <section class="result">
        <div class="container-cities"></div>
    </section
     `
    return form
}

function promesa(inputVal)
{
    
    const APPI_KEY = "32abd15bcea93fcab327aa0fc93f6ee8"; // mi API key de openWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${APPI_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => 
            {
                const {main, name, sys, weather} = data
            })
}