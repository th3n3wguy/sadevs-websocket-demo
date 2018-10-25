const socket = io('http://localhost:8080');

const app = new Vue({
  el: '#app',
  data: {
    userMessages: [],
    userInput: null
  },
  mounted() {
    socket.on('userSentMessage', (message) => {
      this.userMessages.push(message);
    });
  },
  methods: {
    sendMessage() {
      socket.emit('sendMessage', this.userInput, () => {
        this.userMessages.push(this.userInput);
        this.userInput = null;
      });
    }
  }
});
