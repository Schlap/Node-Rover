function Controller()
{
}

Controller.prototype.onRightClick = function(socket){
  $('#right').on('mousedown touchstart', function(){
    socket.emit('right');
  });
};

Controller.prototype.onLeftClick = function(socket){
  $('#left').on('mousedown touchstart', function(){
    socket.emit('left');
  });
};

Controller.prototype.onForwardClick = function(socket){
  $('#forward').on('mousedown touchstart', function(){
    socket.emit('forward');
  });
};

Controller.prototype.onReverseClick = function(socket){
  $('#reverse').on('mousedown touchstart', function(){
    socket.emit('reverse');
  });
};

Controller.prototype.onBrakeClick = function(socket){
  $(document).on('mouseup touchend', function(){
    socket.emit('brake');
  });
};
