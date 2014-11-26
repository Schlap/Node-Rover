var five = require('johnny-five');
var Motor = require('./motor');

function Controller(board) {
  this.motors = {};
  this.board = board;
}

Controller.prototype.init = function(socket) {
  this.kickstartMotors();
  this.listenOnDirections(socket);
};

Controller.prototype.kickstartMotors = function() {
  if(this.board.isReady) {
    this.motors[0] = new Motor(5, 4)
    this.motors[1] = new Motor(3, 2)
    this.motors[2] = new Motor(6, 7)
    this.motors[3] = new Motor(9, 8)
    console.log(this.motors)
  }
}

Controller.prototype.listenOnDirections = function(socket) {
  _this = this;
  socket.on('right', function() {return _this.onRight(this)});
};


Controller.prototype.onRight = function(socket) {
  if (this.board.isReady) {
    this.motors[0].forward()
    socket.emit("right");
  };
}

module.exports = Controller;