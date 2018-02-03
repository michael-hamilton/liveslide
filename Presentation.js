class Presentation {
    constructor(io, id, slideCount) {
        this._io = io;
        this._socket;
        this.presentationID = id;
        this.clients = 0;
        this.slideCount = slideCount;
        this.currentSlide = 0;
    }

    loadCurrentSlide(socket) {
        socket.emit('index', this.currentSlide);
    }

    previousSlide() {
        this.currentSlide > 0 ? this.currentSlide-- : false;
        this._io.emit('index', this.currentSlide);
    }

    nextSlide() {
        this.currentSlide < this.slideCount - 1 ? this.currentSlide++ : false;
        this._io.emit('index', this.currentSlide);
    }

    resetPresentation() {
        this.currentSlide = 0;
        this._io.emit('index', this.currentSlide);
    }

    connection(cb) {
        const self = this;

        self._io.on('connection', function (socket) {
            self._socket = socket;
            self.clients++;
            self._io.emit('clients', self.clients);

            self.loadCurrentSlide(self._socket);

            self._socket.on('disconnect', function () {
                self.clients--;
                self._io.emit('clients', self.clients);
            });
            if(typeof cb == 'function') cb();
        });
    }

    presenter() {
        const self = this;

        self._socket.on('prev', function() {
            self.previousSlide();
        });

        self._socket.on('next', function() {
            self.nextSlide();
        });

        self._socket.on('reset', function() {
            self.resetPresentation();
        });
    }
}

module.exports = Presentation;