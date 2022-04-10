let socket = io.connect();
socket.on('mensaje', data => {
    console.log(data);
    render(data);
})

const render = (data) => {
    let html = data.map((element, index) => {
        return (`<div>
    <strong>${element.author}</strong>
    <em>${element.text}</em>
    </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

const addMensaje = () => {
    let mensaje = {
        author: document.getElementById('userName').value,
        text: document.getElementById('mensaje').value
    };
    socket.emit('new-mensaje', mensaje);

    document.getElementById('mensaje').value = '';
    document.getElementById('mensaje').focus();

    return false;
}