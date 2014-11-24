var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index')
});

app.listen(3000)
console.log("Listening to port: *3000")

module.exports = app