var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function(){
  var claw = new five.Servo({
    pin: 10,
    range: [0, 160],
    center: true
  });

  var arm = new five.Servo({
    pin: 11,
    range: [0, 180],
    center: true
  });

  this.repl.inject({
    claw: claw,
    arm: arm
  });
// control through command line
});