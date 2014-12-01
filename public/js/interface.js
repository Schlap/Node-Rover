$(document).ready(function(){
  var controller = new Controller();
  var socket = io.connect("http://localhost", {'forceNew': true});
  controller.init(socket);
  socket.emit('start');
});