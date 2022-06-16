const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => 
{
    res.render('index.ntl', {title: 'hey', message: 'Hello there'}); // index.ntl o index sólo funciona de las dos formas
})

app.engine('ntl', (filePath, options, callback) =>
{
    fs.readFile(filePath, (err, content) =>
    {
        if (err)
            return callback(err);
        const rendered = content.toString()
                            .replace('#title#','' + options.title + '')
                            .replace('#message#','' + options.message + '');
        return callback(null, rendered);
    });
});

app.set('views', './views'); // especificando el directorio de view
app.set('view engine', 'ntl');


app.use(express.static('public'));


const server = app.listen(8080, () =>
                    {
                        console.log(`Servidor escuchando en el puerto ${server.address().port}`);
                    });
server.on('error', error => console.log(`Error en el servidor ${error}`));
