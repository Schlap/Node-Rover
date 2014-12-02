var Twit = require('twit');
var config1 = require('../node_modules/twit/config1');

function TwitterControl(arduino) {
  this.arduino = arduino;
  this.controls = controls = ['left', 'right', 'forward', 'reverse', 'break'];
  this.twit = new Twit(config1);
  this.stream = this.twit.stream('statuses/filter', { follow : ['2901404693'] });
}

TwitterControl.prototype.init = function() {
  this.listenOnStreams();
}

TwitterControl.prototype.listenOnStreams = function() {
  _this = this;
  this.stream.on('tweet', function (tweet, err) {
    console.log(tweet.text);
    for (var i = 0; i < _this.controls.length; i++) {
      if (_this.controls[i] === tweet.text.toLowerCase()) {
        _this.transmitToArduino(tweet.text); break;
      }
    }
  });
}

TwitterControl.prototype.transmitToArduino = function(tweet) {
  if(tweet === 'forward') _this.transmitToArduino('w');
  else if(tweet === 'left') _this.transmitToArduino('a');
  else if(tweet === 'right') _this.transmitToArduino('d');
  else if(tweet === 'reverse') _this.transmitToArduino('s');
  else if(key === 'stop') _this.transmitToArduino('r');
}

module.exports = TwitterControl;
