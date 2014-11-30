var Motor = require('./motor');

function Controller() {
  this.arduino = null;
}

Controller.prototype.init = function(socket, arduino) {
  this.arduino = arduino;
  this.listenOnDirections(socket);
};

Controller.prototype.listenOnDirections = function(socket) {
  _this = this;
  socket.on('right', function() {return _this.onRight(this, _this)});
  socket.on('left', function() {return _this.onLeft(this, _this)});
  socket.on('forward', function() {return _this.onForward(this, _this)});
  socket.on('reverse', function() {return _this.onReverse(this, _this)});
  socket.on('brake', function() {return _this.onBrake(this, _this)});

};

Controller.prototype.onRight = function(socket, _this) {
  _this.arduino.write('d');
  socket.emit('right', 'turning right');
}

Controller.prototype.onLeft = function(socket, _this) {
 _this.arduino.write('a');
 socket.emit('left', 'turning left');
}

Controller.prototype.onForward = function(socket, _this) {
  _this.arduino.write('w');
  socket.emit('forward', 'moving forward');
}

Controller.prototype.onReverse = function(socket, _this) {
  _this.arduino.write('r');
  socket.emit('reverse', 'reversing');
}

Controller.prototype.onBrake = function(socket, _this) {
 _this.arduino.write('s');
 socket.emit('brake', 'braking')
}

module.exports = Controller;