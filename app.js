var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js')(io);

var presentations;
global.presentation = presentations;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', routes);

http.listen(3000, function() {
    console.log("Server running on *:3000");
});