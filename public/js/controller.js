function Controller()
{
  this.keys = [65, 68, 82, 83, 87];
}

Controller.prototype.init = function(socket) {
  this.onRightClick(socket);
  this.onLeftClick(socket);
  this.onForwardClick(socket);
  this.onReverseClick(socket);
  this.onBrakeClick(socket);
  this.onKeyPress(socket);
  this.onKeyUp(socket);
  // this.gyroControl(socket);
};

Controller.prototype.onRightClick = function(socket) {
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

Controller.prototype.onKeyPress = function(socket) {
  _this = this;
  $(document).on('keydown', function(event) {
    var key = event.which;
    if (_this.keys.indexOf(key) > -1) {
      // event.preventDefault();
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
    socket.emit('accel', o);
    if(status == 0) { 
      status = 3;
      socket.emit('brake')
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

