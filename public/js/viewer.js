Reveal.initialize({
    transition: 'fade',
    transitionSpeed: 'slow',
    controls: false,
    touch: false,
    progress: false
});

var socket = io('/' + document.getElementById('namespace').value);

socket.on('prev', function(msg) {
    Reveal.prev();
});

socket.on('next', function(msg) {
    Reveal.next();
});

socket.on('index', function(msg) {
    Reveal.slide(msg);
});