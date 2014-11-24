var express = require('express');
var app = express();
var server = require('http').createServer(app)
var five = require('johnny-five');
var board = new five.Board();
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  

  socket.on('led-switch', function(msg, callback){

    callback = callback || function() {};

    console.log('on')
    socket.emit('led-switch', msg);
    console.log(msg)
    if (board.isReady) {
      var led = new five.Led(6);
      led.on()
    };

    callback(null, "Done.");
  });

  socket.on('led-switch-off', function(){

    console.log('off')
    if(board.isReady) {var led = new five.Led(6);
      led.off()}
  });
});



server.listen(3000)
console.log("Listening to port: *3000")

module.exports = server;