// 05-06-2022
// Ejemplo del uso de fetch, URL: https://webdesign.tutsplus.com/es/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893


const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
// Variables para la solicitud a la API
const apiKey = "32abd15bcea93fcab327aa0fc93f6ee8"; // mi API key de openWeather


form.addEventListener("submit", e =>
{
    e.preventDefault();
    let dataForm = new FormData(e.target)

    // const inputVal = input.value;
    let inputVal = dataForm.get('input-val')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    //console.log(`URL: ${url}`)
    //console.log(`apiKey: ${apiKey}`)
    //console.log(`inputVal: ${inputVal}`)
    
    
    // control que no exista ya en la lista
    //1
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);
    
    if (listItemsArray.length > 0)
    {
        //2
        const filteredArray = listItemsArray.filter(el => {
        let content = "";
            //athens,gr
            if (inputVal.includes(",")) {
            //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
            if (inputVal.split(",")[1].length > 2) {
                inputVal = inputVal.split(",")[0];
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            } else {
                content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
            } else {
            //athens
            content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        
        //3
        if (filteredArray.length > 0)
        {
            msg.textContent = `You already know the weather for ${
            filteredArray[0].querySelector(".city-name span").textContent
            } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }    
    
    // consulta por el clima en la ciudad solicitada
    fetch(url)
    .then(response => response.json())
    .then(data =>
        {
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
            </div>
            <figure>
                <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
            // Restableciendo las cosas
            msg.textContent = "";
            form.reset();
            input.focus();
        })
    .catch(() =>
    { 
        msg.textContent = "Please search for a valid city 😩"; 
    });

});



