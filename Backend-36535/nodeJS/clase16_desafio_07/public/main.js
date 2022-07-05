const socket = io();

document.querySelector('#formMensajes').addEventListener('submit', (e) =>
{
    e.preventDefault();
    const data = new FormData(e.target);
    const newMessage =
    {
        autor: data.get('autor'),
        mensaje: data.get('mensaje'),
    }
    socket.emit('nuevo-mensaje', newMessage);
    document.querySelector('#mensaje').value = '';
});

const renderMensajes = async (mensajes) =>
{
    console.log(mensajes);

    const template = await fetch('/layouts/listaMensajes.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ mensajes });

    document.querySelector('#divCardBody').innerHTML = html;
}

socket.on('mensajes', (data) => renderMensajes(data));