var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var users = 0;
var currentSlide = 0;
var slideCount= 5;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('presentation-finder', {});
});

app.get('/present', function(req, res) {
    res.render('presenter', {});
});

app.post('/view', function(req, res) {
    res.redirect('/view/' + req.body.presentationID);
});

app.get('/view/:id', function(req, res) {
    res.render('viewer', {});
});

io.on('connection', function(socket) {
    users++;
    io.emit('users', users);

    socket.emit('index', currentSlide);

    socket.on('reset', function(msg) {
        currentSlide = 0;
        io.emit('index', currentSlide);
    });

    socket.on('prev', function(msg) {
        currentSlide>0 ? currentSlide-- : false;
        io.emit('index', currentSlide);
    });

    socket.on('next', function(msg) {
        currentSlide<slideCount-1 ? currentSlide++ : false;
        io.emit('index', currentSlide);
    });

    socket.on('disconnect', function() {
        users--;
        io.emit('users', users);
    });
});

http.listen(3000, function() {
    console.log("Server running on *:3000");
});