const express = require ('express');
const app = express();

// para que el servidor pueda interpretar en forma automática mensajes tipo JSON en formato urlencoded al recibirlos
// se debe indicar en forma explicita agregando estas dos líneas de código:
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended: true --> precisa que el objeto "req.body" contendrá valores de cualquier tipo en lugar de sólo cadenas.
// si esa lpínea el servidor no sabrá como interpretar los msjs recibidos !!

// Tomamos el "path" para la configuración de los directorios
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // configuracion del directorio "static"

const frase = "Hola mundo como están";

app.get('/.', (req, res) =>
{
    res.sendFile('index.html');
});
app.get('/api/frase', (req, res) =>
{
    res.send(frase);
});
app.get("/api/letras/:num", (req, res) =>
{
    if (isNaN(req.params.num))
    {
        res.send({error: "El parámetro no es un número"});
    }
    else
    {
        if (req.params.num > frase.length)
            res.send({error: "El parámetro está fuera de rango"});
        res.send(frase[parseInt(req.params.num)-1]);
    }
});
app.get("/api/palabras/:num", (req, res) =>
{
    const arr = frase.split(" ");
    if (parseInt(req.params.num) <= arr.length)
      res.send(frase.split(" ")[parseInt(req.params.num) - 1]);
    else
      res.send('Parametro mal ingresado');
});

app.get("/api/sumar/:valor1/:valor2/", (req, res) => {
    const valor1 = parseInt(req.params.valor1);
    const valor2 = parseInt(req.params.valor2);
    res.json({ valor1: valor1, valor2: valor2, resultado: valor1 + valor2 });
  });
  
  app.get("/api/sumar/", (req, res) => {
    const valor1 = parseInt(req.query.valor1);
    const valor2 = parseInt(req.query.valor2);
    res.json({ valor1: valor1, valor2: valor2, resultado: valor1 + valor2 });
  });
  
  app.get("/api/operacion/:parametro", (req, res) => {
    const parametro = req.params.parametro;
    const resultado = eval(parametro);
    res.json({ resultado });
  });
  
app.post('/', (req, res) =>
{
    let data = req.body;
});


app.listen(3000, () =>
{
    console.log('escuchando puerto 3000');
});
