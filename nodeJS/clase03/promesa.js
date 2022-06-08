/*
Promise.resolve(30)
.then( x => x + 1 )
.then( x => x * 2 )
.then( x => 
    {
        if (x == 22) throw 'Error'
        else return 80
    })
.then( x => 30 ) // Siempre ussará el valor 30 cuando llegue a este paso, ya el 80 no lo usará
.then(  x => x / 2)
.then( console.log )
.catch( console.log )
*/


// Asincronismo: Fetch

function hacerTarea(num, callBack)
{
    console.log(`Haciendo la tarea: ${num}`);
    setTimeout( callBack, 100);
}

console.log('inicio de tareas');
hacerTarea(1, () => 
{
    hacerTarea(2, () =>
    {
        console.log('fin de tarea');
    })
})

console.log('otras tareas');