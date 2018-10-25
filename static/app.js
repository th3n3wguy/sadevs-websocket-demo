const socket = io('http://localhost:8080');

socket.on('userSentMessage', (message) => {
  $('#user-messages').append(`<p>${message}</p>`);
});

$('#userSubmit').on('click', () => {
  socket.emit('sendMessage', $('#userInput').val());
});
