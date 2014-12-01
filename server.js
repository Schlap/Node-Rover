var util = require('util');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server)
var Controller = require('./lib/controller');
var net = require('net');
var PeerServer = require('peer').ExpressPeerServer;

var port = process.env.PORT || 3000
var arduinoTcp = null;
var options = {
  debug: true
}

app.use('/peerjs', PeerServer(server, options))

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function Server() {
  this.sockets = [];
  this.app = app; 
  this.controller = null
  this.server = server
 }

Server.prototype.init = function(port) {
  this.setEventHandlers();
  this._server = this.server.listen(port, function() {
    console.log("listening on " + port);
  });   
};

Server.prototype.run = function(port) {
  var _this = this;
  before(function(done) {
    _this.listen(port);

    setTimeout(done(), 4000);
  })
  
  after(function(done) {
    _this.destroy(done);
  });
};


Server.prototype.destroy = function(cback) {
  this._server.close(cback || function() {})
}


Server.prototype.setEventHandlers = function() {
  var _this = this;
  io.on('connection', function(socket) {
    return _this.onSocketConnection(socket, _this);
  });
};

Server.prototype.onSocketConnection = function(socket, _this) {
  util.log('Person has connected ' + socket.id)
  socket.on('start', function() { return _this.onNewPerson(this, _this)});  
  socket.on("disconnect", function() {return _this.onClientDisconnect(this, _this)});
};

Server.prototype.onNewPerson = function(socket, _this) {
  if (_this.sockets.length === 0) _this.controller = new Controller(arduinoTcp);
  _this.addPerson(socket, _this);
};

Server.prototype.addPerson = function(socket, _this) {
  _this.sockets.push(socket);
  _this.controller.addNewPerson(socket);
};

Server.prototype.onClientDisconnect = function(socket, _this) {
  util.log("Person has disconnected: " + socket.id);
  _this.sockets.splice(_this.sockets.indexOf(socket.id), 1);
};


if (!module.parent) {
  new Server().init(port)
}

// TCP server for arduino
var tcpServer = net.createServer(function (socket) {
  console.log('tcp server running on port 1337');
});

tcpServer.on('connection', function (socket) {
  console.log('num of connections on port 1337: ' + tcpServer.getConnections);
  arduinoTcp = socket;

  socket.on('data', function (mydata) {
    console.log('received on tcp socket:' + mydata);

  });
});

tcpServer.listen(1337);

module.exports = Server;



