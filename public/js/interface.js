$(document).ready(function(){
  var controller = new Controller();
  var socket = io();
  controller.onRightClick(socket);
  controller.onLeftClick(socket);
  controller.onForwardClick(socket);
  controller.onReverseClick(socket);
  controller.onBrakeClick(socket);
});