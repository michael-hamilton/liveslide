var slideController = function(io) {
    var users = 0;
    var currentSlide = 0;
    var slideCount = 5;

    io.on('connection', function (socket) {
        users++;
        io.emit('users', users);

        socket.emit('index', currentSlide);

        socket.on('reset', function (msg) {
            currentSlide = 0;
            io.emit('index', currentSlide);
        });

        socket.on('prev', function (msg) {
            currentSlide > 0 ? currentSlide-- : false;
            io.emit('index', currentSlide);
        });

        socket.on('next', function (msg) {
            currentSlide < slideCount - 1 ? currentSlide++ : false;
            io.emit('index', currentSlide);
        });

        socket.on('disconnect', function () {
            users--;
            io.emit('users', users);
        });
    });
};

module.exports = slideController;