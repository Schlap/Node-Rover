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

var url = 'http://localhost:5000';

var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/noderover_test'

describe('Users', function() {

    new Server().init(5000);
    var browser = null;

    process.on('SIGTERM', function(err) {
        console.log(err);
    });

    before(function(done) {
        browser = Browser.create({site: url});
         if (mongoose.connection.db) return mongoose.connection.close(function() {
            mongoose.connect(dbUri, done) });
        mongoose.connect(dbUri, done);
    });

    after(function(done) {
            browser.close
            mongoose.connection.db.dropDatabase(function() {
                mongoose.connection.close(done);
        });
    });


    it('should save user', function(done) {
        new User({username: "test", email: "test@test.com",
                  full_name: "tester tesing", password: "test"}).save(done);
    });

    it('should be able to sign in', function() {
        browser.visit('/').then(function() {
            browser
                .fill('email', 'test@test.com')
                .fill('password', 'test')
            }).then(function() {
                return browser.pressButton("submit")
            }).then(function() {
                browser.assert.success();
                assert.equal(browser.text('Release'));
            })
    });

    it('should not be able to sign in if no user', function() {
        browser.visit('/').then(function() {
            browser
                .fill('email', 'nottest@test.com')
                .fill('password', 'test')
            }).then(function() {
                return browser.pressButton("submit")
            }).then(function() {
                browser.assert.success();
                assert.equal(browser.text('Release'));
            })
    });
});