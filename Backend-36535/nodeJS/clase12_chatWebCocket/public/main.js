const socket = io.connect();

const render = ((data) =>
{
    const html = data.map((element) =>
    {
        return (`<div>
            <strong>${element.author}</strong>
            <em>${element.text}</em>
            </div>`)
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
});

socket.on('messages', data =>
{
    render(data);
});

function addMessage(e)
{
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
    };
    // new-message debe ser el mismo que se escribió en el servidor, cosa que el servidor escuche ese evento
    socket.emit('new-message', mensaje);
    return false;
}