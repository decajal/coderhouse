/* 
 Profesor: Fabian Mateo Beltran Valencia
 typescrip es un super-conjunto de JS que lo vuelve super tipado
 lo que nos recomienda este nuevo profesor es ir familiarizandonos con él

 https://www.hackerrank.com/

 Una de las virtudes de JS es el asincronismo



 file system: fs
 Es un módulo nativo es posible manipular archivos a través de fs: crear, leer, modificar, etc

*/
const fs = require('fs')

fs.writeFile('./data1.txt', 'hola comision', (error) => 
{
    if (error)
    {
        console.log(error);
        return;
    }
})
fs.readFile('./data1.txt', 'utf-8', (err, data) => 
{
    if (err)
    {
        console.log(err);
        return;
    }
    console.log(data);
});
