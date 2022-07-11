const socket = io();

const formProductos = document.querySelector('#formProductos');
formProductos.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const data = new FormData(e.target);
    const newProduct =
    {
        title: data.get('title'),
        price: data.get('price'),
        thumbnail: data.get('thumbnail'),
    }
    socket.emit('nuevo-producto', newProduct);
    formProductos.reset();
});

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

const renderProductos = async (productos) =>
{
    const template = await fetch('/layouts/tablaProductos.hbs');
    const textTemplate = await template.text();
    const tieneElementos = (productos.length > 0) ? true : false;
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ productos, tieneElementos });

    document.querySelector('#divProductos'). innerHTML = html;
}

const renderMensajes = async (mensajes) =>
{
    const template = await fetch('/layouts/listaMensajes.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ mensajes });

    document.querySelector('#divCardBody').innerHTML = html;
}
socket.on('productos', (data) => renderProductos(data));
socket.on('mensajes', (data) => renderMensajes(data));