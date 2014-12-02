$(document).ready(function(){
  var controller = new Controller();
  var socket = io.connect();
  controller.init(socket);
  socket.emit('start');
});