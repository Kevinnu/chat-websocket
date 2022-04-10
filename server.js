const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let mensaje = [];

app.use(express.static('public'));

io.on('connection', socket => {
    console.log('Usuario conectado');
    socket.emit('mensaje', mensaje);

    socket.on('new-mensaje', data => {
        mensaje.push(data);
        io.sockets.emit('mensaje', mensaje);
    })
})

const PORT = 8080;

const srv = server.listen(PORT, () => { console.log('Escuchando en puerto 8080') })

srv.on('error', error => { console.log('Erro en servidor: ' + error) })