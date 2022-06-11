import { divTitles, divContainer } from "../main.js"

const apiKey = "32abd15bcea93fcab327aa0fc93f6ee8"; // mi API key de openWeather

export function weather()
{
    divTitles.innerHTML = htmlTitle()
    divContainer.innerHTML = ``
    htmlTitle()
    crearForm()

    let arr = chequearCities()
    if (arr.length > 0)
    {
        // acá listar las ciudades del LS
        arr.forEach(element => {
            let inputVal = element.id
            const msg = document.querySelector('.formWeather .msg')
            const divContainerCity = document.querySelector('.result .container-cities')
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
            
            promesa(url, msg, divContainerCity, 0) // 0: no las mete al localStorage
        });
    }
}

// Crea el titulo
function htmlTitle()
{
    let html = `<h3>Mini weatherApp</h3>`
    html += `<p class="lead">El cima en tu ciudad y/o en las ciudades que te interesan</p>`
    return html
}

// crea el formulario para el clima
function crearForm()
{
    divContainer.innerHTML = htmlForm()
    const formWeather = document.querySelector('.formWeather form')
    const msg = document.querySelector('.formWeather .msg')
    const divContainerCity = document.querySelector('.result .container-cities')

    formWeather.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        msg.textContent = ""
        let data = new FormData(e.target)
        const inputVal = data.get('inputVal')
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
         //console.log(`Ciudad: ${inputVal}`)
         //console.log(`URL: ${url}`)
        
        const list = divContainerCity.querySelectorAll('.result .card')
        const cities = Array.from(list)
        if (cities.length > 0)
        {
            // Existe una loista de ciudades, hay que buscar en la lista
            const filter = buscarCiudad(inputVal, cities)
            if (filter.length > 0)
            {
                //la ciudad ya se encuentra en el listado, no hay que qgregar
                msg.textContent = `Ya se muestra el clima para ${ filter[0].querySelector('.card span').textContent.toLowerCase() }
                    ... por favor, sea más específico. Gracias !`
                formWeather.reset()
                return
            }
        }
        // Agregamos la ciudad al listado
        promesa(url, msg, divContainerCity, 1)
        formWeather.reset();
    })
}

// escribe el html del form meterlo al DOM
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
        <div class="container-cities card-body row"></div>
    </section
     `
    return form
}

// Realiza la consulta/promesa al sitio openWeather
function promesa(url, msg, divContainerCity, agregarLS)
{
    fetch(url)
        .then(response => response.json())
        .then(data => 
            {
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                const divCard = document.createElement('div')
                divCard.classList.add('card')
                divCard.setAttribute('id', `${name}, ${sys.country}`)
                divCard.setAttribute('style', 'width: 18rem; margin-top: 5px; margin-right: 5px;')
                divCard.innerHTML =
                    `
                    <div class="card-body">
                        <h5 class="card-title">
                            <span>${name}</span><sup>${sys.country}</sup>
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">${weather[0]["description"]}</h6>
                        <p class="card-text">${Math.round(main.temp)}<sup>°C</sup></p>
                        <p><img class="city-icon" src=${icon} alt=${weather[0]["main"]}></p>
                        <a href="#" class="card-link">Quitar</a>
                    </div>
                `
                divContainerCity.appendChild(divCard)
                
                if (agregarLS === 1) agregarCity(`${name}, ${sys.country}`)

                divCard.querySelector('.card-link').addEventListener('click', () =>
                { 
                    quitarCity(`${name}, ${sys.country}`, divCard.id)
                    divCard.remove()
                 })
                msg.textContent = "";
            })
        .catch(() =>
        {
            msg.textContent = "Por favor, introduzca una ciudad válida para realizar la búsqueda. Gracias !"
        })

}

// Busca una ciudad para no repetirla
// Parámteros: 
//  - inputVal: es el valor de búsqueda, lo que se ingresa por el formulario
//  - cities: array, listado de ciudades
function buscarCiudad(inputVal, cities)
{
    const filter = cities.filter(x => 
        {
            let filterText = ""
            if (inputVal.includes(','))
            {
                // Forma: salta, argentina
                if (inputVal.split(',')[1].length > 2)
                {
                    // Forma: salta, argentina <-- el país tiene más de dos letras
                    inputVal = inputVal.split(',')[0];
                    filterText = x.querySelector('.card span').textContent.toLowerCase();
                }
                else filterText = x.querySelector('.card').dataset.id.toLowerCase();
            }
            else
            {
                // Forma: salta
                filterText = x.querySelector('.card span').textContent.toLowerCase();
            }
            return filterText == inputVal.toLowerCase();
        })
    return filter;
}

// Cheque el arreglo de las ciudades en LS
const CITIES_LS = 'citiesWAPP' // El nombre del arreglo que uso en el LS
function chequearCities()
{
    let arr = []
    if (localStorage.getItem(CITIES_LS))
        arr = JSON.parse(localStorage.getItem(CITIES_LS))
    else
        setearCities([])

    return arr
}

// Setea el arreglo de Cities en el LS
function setearCities(arr)
{
    localStorage.setItem(CITIES_LS, JSON.stringify(arr))
}

// Agregar la ciudad al localStorage
function agregarCity(newVal)
{
    let newCity = { id: `${newVal}` }
    let arr = chequearCities()
    arr.push(newCity)
    setearCities(arr)
}

// Quitar la ciudad del localStorage
function quitarCity(oldVal, oldCard)
{
    let arr = chequearCities()   
    let index = arr.findIndex(x => { oldVal == oldCard })
    arr.splice(index, 1)
    setearCities(arr)
    // ============================================

}