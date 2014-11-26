var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var five = require('johnny-five');
var assert = chai.assert
var Browser = require('zombie');
var Server = require('../server');
var socket = require('socket.io');
var io = require('socket.io-client');

describe('Basic Rover Movements', function(){

  var socket;
  var browser = null;

  _this = this;
  this.app = new Server()
  this.board = this.app.board
  this._server = this.app.run(5000)

  beforeEach(function(done) {

    socket = io.connect('http://localhost:5000', {
          'reconnection delay' : 0,
          'reopen delay' : 0,
          'forceNew' : true
    });
    socket.connect()
    done();
  });
 
  it('should turn right', function(done) {
    socket.once("right", function () { 
      expect(_this.board.pins['5']['value']).to.be.above(0);
      stop(5);
      socket.disconnect();
      done();
    });
    socket.emit("right");
    
  });

});

function stop(pin) {
  new five.Motor({pin: pin})
}