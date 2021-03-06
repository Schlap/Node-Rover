var Twit = require('twit');
var config1 = require('../node_modules/twit/config1');

function TwitterControl() {
  this.arduino = null;
  this.controls = ['left', 'right', 'forward', 'reverse', 'brake'];
  this.twit = new Twit(config1);
  this.stream = this.twit.stream('statuses/filter', { track: '@TarsNode' });
};

TwitterControl.prototype.init = function() {
  console.log(this.arduino)
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
  else if(tweet === 'reverse') _this.transmitToArduino('r');
  else if(tweet === 'brake') _this.transmitToArduino('s');
};

TwitterControl.prototype.transmitToArduino = function(char) {
  this.arduino.write(char);
};

module.exports = TwitterControl;
