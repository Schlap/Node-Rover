var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Server = require('../server');
var socket = require('socket.io');
var io = require('socket.io-client');
var net = require('net');

var url = 'http://localhost:5000';

describe('Server should receive and action socket emissions', function (){

  var options = {
    'transports' : ['websocket']
  };
  var client = net.connect({ port: 1337 })

  this._server = new Server().testRun(5000, client);

  it('should emit right', function(done){
    var socket = io.connect(url, options);
    socket.once('connect', function(){
       socket.once('right', function(msg){
        expect(msg).to.eql('turning right');
        done();
    });
    socket.emit('start');
    socket.emit('right');
    });
   
  });

  it('should emit left', function(done){
    var socket = io.connect(url, options);
        socket.once('left', function(msg){
          expect(msg).to.eql('turning left');
          done();
      });
      socket.emit('left');
    });

  it('should emit forward', function(done){
  var socket = io.connect(url, options);
      socket.once('forward', function(msg){
        expect(msg).to.eql('moving forward');
        done();
    });
    socket.emit('forward');
  });

  it('should emit reverse', function(done){
  var socket = io.connect(url, options);
      socket.once('reverse', function(msg){
        expect(msg).to.eql('reversing');
        done();
    });
    socket.emit('reverse');
  });

  it('should emit brake', function(done){
  var socket = io.connect(url, options);
      socket.once('brake', function(msg){
        expect(msg).to.eql('braking');
        done();
    });
    socket.emit('brake');
  });

  it('should emit claw up', function(done){
  var socket = io.connect(url, options);
      socket.once('claw-up', function(msg){
        expect(msg).to.eql('clawup');
        done();
    });
    socket.emit('claw-up');
  });

  it('should emit claw-down', function(done){
  var socket = io.connect(url, options);
      socket.once('claw-down', function(msg){
        expect(msg).to.eql('clawdown');
        done();
    });
    socket.emit('claw-down');
  });

  it('should emit claw-pinch', function(done){
  var socket = io.connect(url, options);
      socket.once('claw-pinch', function(msg){
        expect(msg).to.eql('clawpinch');
        done();
    });
    socket.emit('claw-pinch');
  });

  it('should emit claw-release', function(done){
  var socket = io.connect(url, options);
      socket.once('claw-release', function(msg){
        expect(msg).to.eql('clawrelease');
        socket.disconnect();
        done();
    });
    socket.emit('claw-release');
  });
});