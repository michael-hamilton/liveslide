/* liveslide
 * http://liveslide.xyz
 * Copyright © 2018 - Michael Hamilton
 */


//Module requires
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');


//Set port specified in environment variable `port`, or 3000 by default
const port = process.env.PORT || 3000;


//Set global variables
var presentations = [];
global.presentations = presentations;
global.io = io;


//Connect to MongoDB via mongoose
mongoose.connect(process.env.MONGODB_URL);


//Set view engine
app.set('view engine', 'pug');


//Middleware to expose public routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


//Middleware to enable bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//Middleware to enable Express flash messages
app.use(flash());


//Middleware to enable cookieParser
app.use(cookieParser(process.env.cookie_secret));


//Initialize session store and enable Express session
var sessionStore = new session.MemoryStore;

app.use(session({
    cookie: { maxAge: 60000},
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: process.env.cookie_secret
}));


//Middleware to enable routes.js
app.use('/', routes);


//Start HTTP server on specified port
http.listen(port, function() {
    console.log("Server running on *:" + port);
});