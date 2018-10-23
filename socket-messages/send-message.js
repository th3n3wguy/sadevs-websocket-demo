const _ = require('lodash');

module.exports = function sendMessage(socket, message, callback = () => {}) {
  console.log('sendMessage', message);
  return verifyMessageValidity(socket, message)
    .then(broadcastMessage)
    .then(callback)
    .catch(callback);
};

function verifyMessageValidity(socket, message) {
  return new Promise((resolve, reject) => {
    return _.isNil(message) || !_.isString(message)
      ? reject(new Error('The "message" provided must be a defined, non-null String.'))
      : resolve(socket, message);
  });
}

function broadcastMessage(socket, message) {
  console.log('broadcastMessage', message);
  return new Promise((resolve, reject) => {
    socket.broadcast.emit('userSentMessage', message);

    return resolve();
  });
}
