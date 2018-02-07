$(document).ready(function() {

    var socket = io('/' + document.getElementById('namespace').value);

    socket.emit('ready');

    $('#control-prev').click(function() {
        socket.emit('prev');
    });

    $('#control-next').click(function() {
        socket.emit('next');
    });

    $('#control-reset').click(function() {
        socket.emit('reset');
    });

    $('#control-pause').click(function() {
        socket.emit('pause');
    });

    $('#control-resume').click(function() {
        socket.emit('resume');
    });

    socket.on('clients', function(msg) {
        $('#client-count').text(msg);
    });

    socket.on('index', function(msg) {
        $('#current-slide').text(msg+1);
    });

    $(document).keypress(function(e) {
        switch(e.which) {
            case 32: //space (not working on ios)
                socket.emit('prev');
            break;

            case 13: //return
                socket.emit('next');
            break;

            default: return;
        }
        e.preventDefault();
    });
});