$(document).ready(function(){
  var controller = new Controller();
  var socket = io();
  controller.init(socket);
});