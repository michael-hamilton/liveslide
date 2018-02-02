$(document).ready(function() {
    var socket = io();

    $('#control-prev').click(function() {
        socket.emit('prev');
    });

    $('#control-next').click(function() {
        socket.emit('next');
    });

    socket.on('users', function(msg) {
        console.log(msg);
        $('#user-count').text(msg);
    });
});