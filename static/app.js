const socket = io('http://localhost:8080');

socket.on('userSentMessage', (message) => {
  alert('Another user sent a message!')
});

$('#userSubmit').on('click', () => {
  socket.emit('sendMessage', $('#userInput').val());
});
