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
  socket.on('left', function() {return _this.onLeft(this)});
  socket.on('forward', function() {return _this.onForward(this)});
  socket.on('reverse', function() {return _this.onReverse(this)});
  socket.on('brake', function() {return _this.onBrake(this)});

};


Controller.prototype.onRight = function(socket) {
  if (this.board.isReady) {
    this.motors[0].forward();
    this.motors[3].reverse();
    this.motors[1].reverse();
    this.motors[2].forward();
    socket.emit("right");
  };
}

Controller.prototype.onLeft = function(socket) {
  if (this.board.isReady) {
    this.motors[0].reverse();
    this.motors[3].forward();
    this.motors[1].forward();
    this.motors[2].reverse();
    socket.emit("left");
  };
}

Controller.prototype.onForward = function(socket) {
  if (this.board.isReady) {
    this.motors[0].forward();
    this.motors[3].reverse();
    this.motors[1].forward();
    this.motors[2].reverse();
    socket.emit("forward");
  };
}

Controller.prototype.onReverse = function(socket) {
  if (this.board.isReady) {
    this.motors[0].reverse();
    this.motors[3].forward();
    this.motors[1].reverse();
    this.motors[2].forward();
    socket.emit("reverse");
  };
}

Controller.prototype.onBrake = function(socket) {
  console.log('Brake hadi')
  if (this.board.isReady) {
    this.motors[0].stop();
    this.motors[3].stop();
    this.motors[1].stop();
    this.motors[2].stop();
    socket.emit("brake");
  };
}




module.exports = Controller;