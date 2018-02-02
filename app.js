var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist/'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/present', function(req, res) {
    res.sendFile(__dirname + '/presenter.html');
});

app.post('/view', function(req, res) {
    res.redirect('/view/' + req.body.presentationID);
});

app.get('/view/:id', function(req, res) {
    res.sendFile(__dirname + '/viewer.html');
});

io.on('connection', function(socket) {
    socket.on('prev', function(msg) {
        io.emit('prev');
    });

    socket.on('next', function(msg) {
        io.emit('next');
    });
});

http.listen(3000, function() {
    console.log("Server running on *:3000");
});