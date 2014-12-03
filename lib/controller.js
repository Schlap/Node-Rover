var Motor = require('./motor');

function Controller(arduino) {
  this.sockets = {}
  this.arduino = arduino;
}

Controller.prototype.addNewPerson = function(socket) {
  this.sockets[socket.id] = socket;
  this.listenOnDirections(socket);
}

Controller.prototype.listenOnDirections = function(socket) {
  this.listenOnMotors(socket);
  this.listenOnClaw(socket);
}
  
Controller.prototype.listenOnMotors = function(socket) {
  var _this = this;
  socket.on('right', function() {return _this.onRight(this, _this)});
  socket.on('left', function() {return _this.onLeft(this, _this)});
  socket.on('forward', function() {return _this.onForward(this, _this)});
  socket.on('reverse', function() {return _this.onReverse(this, _this)});
  socket.on('brake', function() {return _this.onBrake(this, _this)});
  socket.on('keypress', function(key) {return _this.onKeyPress(this, _this, key)});
}

Controller.prototype.listenOnClaw = function(socket) {
  var _this = this;
  socket.on('claw-up', function(key) {return _this.onClawUp(this, _this)});
  socket.on('claw-down', function(key) {return _this.onClawDown(this, _this)});
  socket.on('claw-pinch', function(key) {return _this.onClawPinch(this, _this)});
  socket.on('claw-release', function(key) {return _this.onClawRelease(this, _this)});
};

Controller.prototype.onRight = function(socket, _this) {
  _this.transmitToArduino('d');
  socket.emit('right', 'turning right');
}

Controller.prototype.onLeft = function(socket, _this) {
 _this.transmitToArduino('a');
 socket.emit('left', 'turning left');
}

Controller.prototype.onForward = function(socket, _this) {
  _this.transmitToArduino('w');
  socket.emit('forward', 'moving forward');
}

Controller.prototype.onReverse = function(socket, _this) {
  _this.transmitToArduino('r');
  socket.emit('reverse', 'reversing');
}

Controller.prototype.onBrake = function(socket, _this) {
 _this.transmitToArduino('s');
 socket.emit('brake', 'braking')
}

Controller.prototype.onClawUp = function(socket, _this) {
  _this.transmitToArduino('p');
  socket.emit('claw-up', 'clawup');
};

Controller.prototype.onClawDown = function(socket, _this) {
  _this.transmitToArduino('o');
  socket.emit('claw-down', 'clawdown');
};

Controller.prototype.onClawPinch = function(socket, _this) {
  _this.transmitToArduino('9');
  socket.emit('claw-pinch', 'clawpinch');
}

Controller.prototype.onClawRelease = function(socket, _this) {
  _this.transmitToArduino('0');
  socket.emit('claw-release', 'clawrelease');
};

Controller.prototype.onKeyPress = function(socket, _this, key) {
  if(key === 87) _this.transmitToArduino('w')
  else if(key === 65) _this.transmitToArduino('a')
  else if(key === 68) _this.transmitToArduino('d')
  else if(key === 82) _this.transmitToArduino('s')
  else if(key === 83) _this.transmitToArduino('r')
};

Controller.prototype.transmitToArduino = function(char) {
  if (this.arduino)
    this.arduino.write(char);
};

module.exports = Controller;
