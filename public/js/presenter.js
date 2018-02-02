$(document).ready(function() {
    var socket = io();

    $('#control-prev').click(function() {
        socket.emit('prev');
    });

    $('#control-next').click(function() {
        socket.emit('next');
    });
});