const socket = io();

function sendMessage() {
  const message = document.getElementById('messageInput').value
  socket.emit('newMessage', message);
}

function appendMessage(socketId, message) {
    const messageList = document.getElementById('messageList')
    const newMessage = document.createElement('p')
    newMessage.textContent = `${socketId}: ${message}`
    messageList.appendChild(newMessage)
}

socket.on('messageList', (messages) => {
    const messageList = document.getElementById('messageList')
    messageList.innerHTML=""
    messages.forEach((message) => {
        appendMessage(
            message.socketId, 
            message.message
        )
    }
    )
})

socket.on('newMessage'), (data) => {
    appendMessage(data.socketId, data.message)
}
 
//ejecuto node app.js
//voy a la url localhost:3000 me tiene que imprimir en consola que alguien se contect
//si escribo los mensajes se tienen que guardar dentro del div del html