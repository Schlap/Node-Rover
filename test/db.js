var expect = require('chai').expect;
var assert = require('chai').assert;
var mongoose = require('mongoose');
var env = require('../config/dev_database');
var app = require('../server');
var User = require('../lib/models/User');
var Browser = require('zombie');

var port = process.env.PORT || 8080
var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/noderover_development'

before(function(done) {
  if (mongoose.connection.db) return mongoose.connection.close(function() {
            mongoose.connect(dbUri, done) });
        mongoose.connect(dbUri, done);
  });

after(function(done) {
                mongoose.connection.close(done);
    });

 it('should save user', function(done) {
            new User({username: "rover", email: "rover@rover.com",
                      full_name: "Tars", password: "noderover"}).save(done);
});
