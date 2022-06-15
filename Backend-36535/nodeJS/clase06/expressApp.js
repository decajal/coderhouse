const express = require('express');
const app = new express();

let countVisitas = 0;
app.get('/', (req, res) =>
{
    res.send('<h1 style="color: blue">Bienvenidos al servidor Express</h1>')
})
app.get('/visitas', (req, res) =>
{
    countVisitas++;
    res.send(`<p>La cantidad de Visitas es ${countVisitas}</p>`);
})
app.get('/fyh', (req, res) =>
{
    const fecha = formatDate(new Date());
    res.send(`<p> ${ fecha } </p>`);
})



const server = app.listen(8080, () =>
{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor ${error}`));


const formatDate = (currentDate) =>
{
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hora = currentDate.getHours();
    const minutos = currentDate.getMinutes();
    const segundos = currentDate.getSeconds();

    return (day < 10 ? `0${day}` : day) 
            + "-" + (month < 10 ? `0${month}` : month) + "-" 
            + currentDate.getFullYear() + " "
            + (hora < 10 ? `0${hora}` : hora) + ":" 
            + (minutos < 10 ? `0${minutos}` : minutos) + ":" 
            + (segundos < 10 ? `0${segundos}` : segundos);
}

