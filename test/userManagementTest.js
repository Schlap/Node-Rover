var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert
var Browser = require('zombie');
var Server = require('../server');
var socket = require('socket.io');
var io = require('socket.io-client');
var net = require('net');
var Browser = require('zombie');
var mongoose = require('mongoose');
var User = require('../lib/models/User');

var url = 'http://localhost:3000';

var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/noderover_test'

describe('Users', function() {

    new Server().init(3000);

    before(function(done) {
        browser = new Browser;
        if (mongoose.connection.db) return mongoose.connection.close(function() {
            mongoose.connect(dbUri, done) });
        mongoose.connect(dbUri, done);
    });

    after(function(done) {
            browser.close()
        //     mongoose.connection.db.dropDatabase(function() {
        //         mongoose.connection.close(done);
        // });
    });


    it('should save user', function(done) {
        new User({username: "test", email: "test@test.com",
                  full_name: "tester tesing", password: "test"}).save(done);
    });

    it('There should be a sign in form', function(done) {
        browser.visit(url, function() {
            browser.wait().then(function() {
                assert.ok(browser.query("#popupLogin"))
            }).then(done);
        })
    });

    it('Should be able to sign in', function(done) {
        browser.visit(url, function() {
            browser.fill('#email', 'test@test.com')
            browser.fill('#password', 'test')
            browser.pressButton("#submit")
            browser.wait().then(function() {
                assert.ok(browser.query("#popupLogin"))
            }).then(function() {
                done()});
        });
    });
});