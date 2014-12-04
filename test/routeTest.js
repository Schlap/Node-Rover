var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Server = require('../server');
var socket = require('socket.io');
var io = require('socket.io-client');
var net = require('net');
var http = require('http');
var request = require('request');

describe('Hello world', function(){

  it('Status code of / should be 200', function(done){
    http.get('http://localhost:3000/', function(res){
      assert(200, res.statusCode)
      done()
    })
  })

  it('Status code of sessions should be 200', function(done) {
    request.post('http://localhost:3000/sessions', function(err, res, body) {
      assert(200, res.statusCode);
      done();
    });
  });
})