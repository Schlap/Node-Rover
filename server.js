var util = require('util');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server)
var Controller = require('./lib/controller');
var TwitterControl = require('./lib/tweets.js');
var net = require('net');
var models = require('./lib/models');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var database = require('./config/dev_database');
var expressLayouts = require('express-ejs-layouts');

var port = process.env.PORT || 3000
var dbUri = process.env.MONGOHQ_URL || database.url;
var db = mongoose.connect(dbUri);

app.use(function(req, res, next) {
    if (!models.User) return next('No models.');
    req.models = models;
    return next();
});

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser("this is super secret"));
app.use(session({secret: "this is also quite secret"}));
app.use(function (req, res, next) {
    res.locals.login = req.session.user;
    next();
});

require('./lib/routes.js')(app);


function Server() {
  this.sockets = [];
  this.app = app; 
  this.controller = null
  this.twitterControl = new TwitterControl();
  this.server = server
  this.arduinoTcp = null;
  this.tcpServer = null;
 }

Server.prototype.init = function(port) {
  this.setEventHandlers();
  this._server = this.server.listen(port, function() {
    console.log("listening on " + port);
  });
  this.tcpServerSetup();   
};

Server.prototype.testRun = function(port, client) {
  var _this = this;
  before(function(done) {
    _this.setEventHandlers();
  _this._server = _this.server.listen(port, function() {
    console.log("listening on " + port);
  });
    setTimeout(done(), 4000);
  })
  
  after(function(done) {
    _this.destroy(done);
  });
};

Server.prototype.destroy = function(cback) {
  this._server.close(cback || function() {})
}

Server.prototype.setEventHandlers = function() {
  var _this = this;
  io.on('connection', function(socket) {
    return _this.onSocketConnection(socket, _this);
  });
};

Server.prototype.onSocketConnection = function(socket, _this) {
  util.log('Person has connected ' + socket.id)
  socket.on('start', function() { return _this.onNewPerson(this, _this)});
  socket.on('accel', function(data) {console.log(data)}) 
  socket.on("disconnect", function() {return _this.onClientDisconnect(this, _this)});
};

Server.prototype.onNewPerson = function(socket, _this) {
  if (_this.sockets.length === 0) _this.controller = new Controller(this.arduinoTcp);
  _this.addPerson(socket, _this);
};

Server.prototype.addPerson = function(socket, _this) {
  _this.sockets.push(socket);
  _this.controller.addNewPerson(socket);
};

Server.prototype.onClientDisconnect = function(socket, _this) {
  util.log("Person has disconnected: " + socket.id);
  _this.sockets.splice(_this.sockets.indexOf(socket.id), 1);
};

Server.prototype.tcpServerSetup = function() {
  this.tcpServer = net.createServer(function (socket) {
    console.log('tcp server running on port 1337');
  });
  this.tcpServerListen();
}

Server.prototype.tcpServerListen = function() {
  _this = this
  this.tcpServer.on('connection', function (socket) {
    if (_this.tcpServer) {
      console.log('num of connections on port 1337: ' + _this.tcpServer.getConnections);
      _this.arduinoTcp = socket;
      _this.twitterControl.arduino = _this.arduinoTcp
      _this.twitterControl.init();
      if(_this.controller) _this.controller.arduino = _this.arduinoTcp

    socket.on('data', function (mydata) {
      console.log('received on tcp socket:' + mydata);
    });
    }
  });
  this.tcpServer.listen(1337);
}

if (!module.parent) {
  new Server().init(port)
}

module.exports = Server;

