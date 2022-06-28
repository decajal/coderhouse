const socket = io.connect(); // con esto ya podemos comenzar a usar los sockets desde el cliente

socket.on('mensajes', (data) =>
{
    escrbirMensajes(data);
});

const addMessage = ( () =>
{
    const mensaje = {
        author: document.getElementById('inputAuthor').value,
        text: document.getElementById('inputMensaje').value,
    };
    document.getElementById('inputMensaje').value = '';
    socket.emit('new-message', mensaje);
    return false;
});

const escrbirMensajes = ((data) =>
{
    const html = data.map((element) =>
    {
        return (`<div>
            <strong>${element.author}</strong>
            <em>${element.text}</em>
            </div>`)
    }).join(' ');
    document.getElementById('divCardBody').innerHTML = html;
});