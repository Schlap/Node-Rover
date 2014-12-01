var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server)
var Controller = require('./lib/controller');
var net = require('net');

var arduinoTcp = null;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function Server() {
  this.app = app; 
  this.controller = new Controller 
  this.server = server
  this.io = io
 }

Server.prototype.init = function() {
  this.setEventHandlers(); 
};

Server.prototype.listen = function(port) {
  this._server = this.server.listen(port, function() {
    console.log("listening on " + port);
  });
   this.init();
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
  _this = this;
  this.io.on('connection', function(socket) {
    return _this.onSocketConnection(socket, _this);
  });
};

Server.prototype.onSocketConnection = function(socket, _this) {
  console.log('connected ' + socket.id)
  _this.controller.init(socket, arduinoTcp)
}

//TCP server for arduino
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

var port = process.env.PORT || 3000

module.exports = Server;

if (!module.parent) {
    new Server().listen(port)
}
