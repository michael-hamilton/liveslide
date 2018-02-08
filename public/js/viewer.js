Reveal.initialize({
    transition: 'fade',
    transitionSpeed: 'slow',
    controls: false,
    touch: false,
    progress: false,
    keyboard: false
});

Reveal.togglePause(true);

var socket = io('/' + document.getElementById('namespace').value);

socket.emit('connected', {clientType: 'viewer'});

socket.on('ready', function() {
    Reveal.togglePause(false);
});

socket.on('pause', function() {
    Reveal.togglePause(true);
});

socket.on('resume', function() {
    Reveal.togglePause(false);
});

socket.on('prev', function(msg) {
    Reveal.prev();
});

socket.on('next', function(msg) {
    Reveal.next();
});

socket.on('index', function(msg) {
    Reveal.slide(msg);
});