const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const serveStatic = require('serve-static');
const _ = require('lodash');
const bodyParser = require('body-parser');

const express = require('express');
const server = express();

const socketMessageHandlers = require('./socket-messages');

server.use(serveStatic(path.join(__dirname, 'static')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const httpServer = http.Server(server);
const io = socketIO(httpServer);

io.on('connection', function onSocketConnection(socket) {
  console.log(`User connected: ${socket.id}`);

  return _.chain(socketMessageHandlers)
    .keys()
    .map((socketMessage) => socket.on(socketMessage, (...args) => socketMessageHandlers[socketMessage].call(socket, socket, ...args)))
    .value();
});

httpServer.listen(8080, () => console.warn(`Http server listening on :8080`));
