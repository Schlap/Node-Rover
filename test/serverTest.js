var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Browser = require('zombie');
var server = require('../server.js');
var socket = require('socket.io');
var five = require('johnny-five');
var io = require('socket.io-client');

describe('Homepage', function(){

 

  // it('should say hello you', function(done){

  //   browser.visit('/', function(error){
  //       assert.ifError

  //   expect(browser.text('h1')).to.eql('Hello you');
  //   done();

  //   });
  // });

  // it('should include a button that says light on', function(done){

  //   browser.visit('/', function(error){
  //       assert.ifError

  //   expect(browser.text('#light-on')).to.eql('Light on')
  //   done();
  //   });
  // });

  describe('turning on and off the light', function(){

    var socket;

    var browser = null;

    before(function(done){
      this.server = server.listen(5000);
      browser = Browser.create({site: "http://localhost:5000"})
      done();
    });

    after(function(done){
      this.server.close(done)
    });

    beforeEach(function(done){

      socket = io.connect('http://localhost:5000', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
      });

      socket.connect();
      done();
    });
   
    it('should emit message', function(done) {
      socket.once("led-switch", function (message) {
        expect(message).to.eql("Guten Tag!")
        socket.disconnect();
        done();
      });

      socket.emit("led-switch", "Guten Tag!");
      
    });

  });
});