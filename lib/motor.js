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
  this.motor.forward()
}

module.exports = Motor;