$(document).ready(function() {
    var socket = io();

    $('#control-prev').click(function() {
        socket.emit('prev');
    });

    $('#control-next').click(function() {
        socket.emit('next');
    });

    $('#control-reset').click(function() {
        socket.emit('reset');
    });

    socket.on('users', function(msg) {
        $('#user-count').text(msg);
    });

    socket.on('index', function(msg) {
        $('#current-slide').text(msg+1);
    });
});