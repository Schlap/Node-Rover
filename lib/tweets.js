var Twit = require('twit');
var config1 = require('../node_modules/twit/config1');

function TwitterControl(arduino) {
  this.arduino = arduino;
  this.controls = controls = ['left', 'right', 'forward', 'reverse', 'brake'];
  this.twit = new Twit(config1);
  this.stream = this.twit.stream('statuses/filter', { track: '@TarsNode' });

};

TwitterControl.prototype.init = function() {
  this.listenOnStreams();
};

TwitterControl.prototype.listenOnStreams = function() {
  _this = this;
  this.stream.on('tweet', function (tweet, err) {
    for (var i = 0; i < _this.controls.length; i++) {
      var command = tweet.text.match(new RegExp(_this.controls[i]))
      if (command) {
        _this.controlFinder(command[0]); break;
      }
    }
  });
};

TwitterControl.prototype.controlFinder = function(tweet) {
  if(tweet === 'forward') _this.transmitToArduino('w');
  else if(tweet === 'left') _this.transmitToArduino('a');
  else if(tweet === 'right') _this.transmitToArduino('d');
  else if(tweet === 'reverse') _this.transmitToArduino('s');
  else if(tweet === 'brake') _this.transmitToArduino('r');
};

TwitterControl.prototype.transmitToArduino = function(char) {
  this.arduino.write(char);
};

module.exports = TwitterControl;
