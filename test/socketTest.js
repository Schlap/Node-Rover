var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Browser = require('zombie');
var Server = require('../server');
var socket = require('socket.io');
var io = require('socket.io-client');

var url = 'http://localhost:5000';

describe('Socket transmission', function (){

  var options = {
    'transports' : ['websocket']
  };

  _this = this;
  this.app = new Server
  this._server = this.app.run(5000)


  it('should emit right', function(done){
    var socket = io.connect(url, options);
    socket.once('connect', function(){
       socket.once('right', function(msg){
        expect(msg).to.eql('turning right');
        done();
    });
       console.log(_this._server);
    socket.emit('right')
    });
   
  });

  it('should emit left', function(done){
    var socket = io.connect(url, options);
        socket.once('left', function(msg){
          expect(msg).to.eql('turning left');
          done();
      });
      socket.emit('left')
    });

  it('should emit forward', function(done){
  var socket = io.connect(url, options);
      socket.once('forward', function(msg){
        expect(msg).to.eql('moving forward');
        done();
    });
    socket.emit('forward')
  });

  it('should emit reverse', function(done){
  var socket = io.connect(url, options);
      socket.once('reverse', function(msg){
        expect(msg).to.eql('reversing');
        done();
    });
    socket.emit('reverse')
  });

  it('should emit brake', function(done){
  var socket = io.connect(url, options);
      socket.once('brake', function(msg){
        expect(msg).to.eql('braking');
        done();
    });
    socket.emit('brake')
  });
});