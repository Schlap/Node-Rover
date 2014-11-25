var express = require('express');
var http = require('http')
var five = require('johnny-five');
var io = require('socket.io')



function Server() {
  this.app = express()
  this.board = new five.Board();
  this.server = http.createServer(this.app);
  this.io = io(this.server)
  this.app.use(express.static(__dirname + '/public'));

  this.app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
}

Server.prototype.init = function() {
  this.setEventHandlers(); 
};

Server.prototype.listen = function(port) {
  this.init();
  this._server = this.server.listen(port, function() {
    console.log("listening on " + port);
  });
};

Server.prototype.run = function(port) {
  var _this = this;
  before(function(done) {
    _this.listen(port);
    setTimeout(done, 6000);
  })
  
  after(function(done) {
    _this.destroy(done);
  });
};


Server.prototype.destroy = function(cback) {
  console.log(this._server)
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
  socket.on('led-switch', function(msg) {return _this.onLedSwitch(msg, this, _this)});
  socket.on('led-switch-off', function(msg) {return _this.onLedOff(msg, this, _this)});
}

Server.prototype.onLedSwitch = function(msg, socket, _this) {
  if (_this.board.isReady) {
      var led = new five.Led(6);
      led.on();
      console.log('On')
      socket.emit('led-switch', msg);
  };
}

Server.prototype.onLedOff = function(msg, socket, _this) {
  if(this.board.isReady) {
    var led = new five.Led(6);
    led.off();
    console.log('off')
  };
}

var port = process.env.PORT || 3000

module.exports = Server;

if (!module.parent) {
    new Server().listen(port)
}

