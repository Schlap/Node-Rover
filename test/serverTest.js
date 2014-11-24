var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Browser = require('zombie');
var server = require('../server.js')


describe('Homepage', function(){

  var browser = null;

  before(function(done){
    this.server = server.listen(5000);
    browser = Browser.create({site: "http://localhost:5000"})
    done();
  });

  after(function(done){
    this.server.close(done)
  });

  it('should say hello you', function(done){

    browser.visit('/', function(error){
        assert.ifError

    expect(browser.text('h1')).to.eql('Hello you');
    done();

    });
  });

  it('should include a button that says light on', function(done){

    browser.visit('/', function(error){
      assert.ifError

    expect(browser.text('button')).to.eql('Light on')
    done();
    });
  });
});