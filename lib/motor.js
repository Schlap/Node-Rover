var five = require('johnny-five');

function Motor(pwm, dir) {
  this.motor = new five.Motor({
    pins: {
      pwm: pwm,
      dir: dir
    }
  });
}

Motor.prototype.forward = function() {
  this.motor.forward(255)
}

Motor.prototype.reverse = function() {
  this.motor.reverse(255);
}

Motor.prototype.stop = function() {
  this.motor.stop();
}

module.exports = Motor;