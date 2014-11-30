function Motor (){}

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