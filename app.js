const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '/public')));

let messages = []; // Aquí se almacenarán los mensajes en memoria

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Enviar la lista de mensajes existentes al cliente que se conecta
  socket.emit('messageList', messages);

  // Escuchar mensajes nuevos enviados desde el cliente
  socket.on('newMessage', (message) => {
    messages.push(message); // Guardar el mensaje en la lista
    io.emit('newMessage', message); // Emitir el mensaje a todos los clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});