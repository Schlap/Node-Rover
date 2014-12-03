function Controller()
{
  this.keys = [65, 68, 82, 83, 87];
}

Controller.prototype.init = function(socket) {
  this.listenOnMotors(socket);
  this.listenOnClaw(socket);
  // this.listenOnVision(socket);
  this.onKeyPress(socket);
  this.onKeyUp(socket);

  // this.gyroControl(socket);
};

Controller.prototype.listenOnMotors = function(socket) {
  this.onRightClick(socket);
  this.onLeftClick(socket);
  this.onForwardClick(socket);
  this.onReverseClick(socket);
  this.onBrakeClick(socket);
};

Controller.prototype.listenOnClaw = function(socket) {
  this.onClawUp(socket);
  this.onClawDown(socket);
  this.onClawPinch(socket);
  this.onClawRelease(socket);
};

// Controller.prototype.listenOnVision = function(socket) {
//   this.onLookRight(socket);
//   this.onLookLeft(socket);
//   this.onLookUp(socket);
//   this.onLookDown(socket);
// };
  
Controller.prototype.onRightClick = function(socket) {
  console.log(socket)
  $(document).on('mousedown touchstart', '#move-right', function(){
    socket.emit('right');
  });
};

Controller.prototype.onLeftClick = function(socket) {
  $(document).on('mousedown touchstart', '#move-left', function() {
    socket.emit('left');
  });
};

Controller.prototype.onForwardClick = function(socket) {
  $(document).on('mousedown touchstart', '#move-forward', function() {
    socket.emit('forward');
  });
};

Controller.prototype.onReverseClick = function(socket) {
  $(document).on('mousedown touchstart', '#move-backward', function() {
    socket.emit('reverse');
  });
};

Controller.prototype.onBrakeClick = function(socket) {
  $(document).on('mouseup touchend', function() {
    socket.emit('brake');
  });
};

Controller.prototype.onClawUp = function(socket) {
  $(document).on('mousedown touchstart', '#claw-up', function() {
    socket.emit('claw-up');
  });
};

Controller.prototype.onClawDown = function(socket) {
  $(document).on('mousedown touchstart', '#claw-down', function() {
    socket.emit('claw-down');
  });
};

Controller.prototype.onClawPinch = function(socket) {
  $(document).on('mousedown touchstart', '#claw-pinch', function() {
    socket.emit('claw-pinch');
  });
};

Controller.prototype.onClawRelease = function(socket) {
  $(document).on('mousedown touchstart', '#claw-release', function() {
    socket.emit('claw-release');
  });
};

// Controller.prototype.onLookRight = function(socket) {
//   $(document).on('mousedown touchstart', '#look-right', function() {
//     socket.emit('look-right');
//   });
// };

// Controller.prototype.onLookLeft = function(socket) {
//   $(document).on('mousedown touchstart', '#look-left', function() {
//     socket.emit('look-left');
//   });
// };

// Controller.prototype.onLookLeft = function(socket) {
//   $(document).on('mousedown touchstart', '#look-up', function() {
//     socket.emit('look-left');
//   });
// };

// Controller.prototype.onLookLeft = function(socket) {
//   $(document).on('mousedown touchstart', '#look-down', function() {
//     socket.emit('look-down');
//   });
// };

Controller.prototype.onKeyPress = function(socket) {
  _this = this;
  $(document).on('keydown', function(event) {
    var key = event.which;
    if (_this.keys.indexOf(key) > -1) {
      console.log("made it here")
      socket.emit('keypress', key);
    }
  });
}

Controller.prototype.onKeyUp = function(socket) {
  _this = this;
  $(document).on('keyup', function(event) {
    var key = event.which;
    if (_this.keys.indexOf(key) > -1) {
      socket.emit('brake');
    }
  });
}

Controller.prototype.gyroControl = function(socket) {
  var status = 0;
  var x;
  var y;
  gyro.startTracking(function(o) {
    x = o.x * 5;
    z = o.z * 5;
    if (z > -14 && z < 14 && x > -14 && x < 14) {
      socket.emit('brake');
    }
    else if(x > 14) { 
      status = 2;
      socket.emit('left')
    }
    else if(x < -14) {   
     status = 1;
     socket.emit('right');
    }
    else if (z > 14) {
      status = 4;
      socket.emit('forward');
    }
    else if (z < 14) {
      status = 5;
      socket.emit('reverse');
    }       
    else {   
        status = 3;
        socket.emit('brake')
    }
  })
}

