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
};

Controller.prototype.onRightClick = function(socket) {
  $('#move-right').on('mousedown touchstart', function(){
    socket.emit('right');
  });
};

Controller.prototype.onLeftClick = function(socket) {
  $('#move-left').on('mousedown touchstart', function() {
    socket.emit('left');
  });
};

Controller.prototype.onForwardClick = function(socket) {
  $('#move-forward').on('mousedown touchstart', function() {
    socket.emit('forward');
  });
};

Controller.prototype.onReverseClick = function(socket) {
  $('#move-backward').on('mousedown touchstart', function() {
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
      event.preventDefault();
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

