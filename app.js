var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js')(io);
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var sessionStore = new session.MemoryStore;

var presentations = [];
global.presentations = presentations;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser(process.env.cookie_secret));
app.use(session({
    cookie: { maxAge: 60000},
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.cookie_secret
}));

app.use(flash());

app.use('/', routes);

http.listen(process.env.PORT, function() {
    console.log("Server running on *:" + process.env.PORT);
});