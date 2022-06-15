/*
    Diego Cajal - Personal de Teco
    decajalperez@teco.com.ar
    Desafío clase 04 - nodeJS

    Consigna: Implementar programa que tenga una clase Contenedor que reciba el nombre del archivo
    con el que va a trabajar e implemente los siguientes métodos:
        + save(object): number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        + getById(number): object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        + getAll(): Object[] - Devuelve un array con todos los objetos presentes en el archivo.
        + deleteById(number): void - Elimina del archivo el objeto con el id Buscado.
        + deleteAll(): void - Elimina todos los objetos presentes en el archivo.
*/
const { Contenedor } = require('./Contenedor.js');

const cont = new Contenedor('./src/productos.txt');

const product =
    {
        title: 'Cuaderno de notas',
        price: 789,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    }
cont.save(product)
    .then(data =>
        {
            console.log(data);
        })
    .catch(err =>
        {
             console.log(err);
        });
cont.getAll()
    .then(data => 
        {
            console.log(data);
        })
    .catch(err => 
        {
            console.log(err);
        });
cont.getById(1)
    .then(data => 
        {
            console.log(data);
        })
        .catch(err => 
        {
            console.log(err);
        });
cont.deleteById(5)
    .then(data => 
        {
            console.log(data);
        })
    .catch(err => 
        {
            console.log(err);
        });
cont.delelteAll()
    .then(data =>
        {
            console.log(data);
        })
    .catch(err =>
        {
             console.log(err);
        });
