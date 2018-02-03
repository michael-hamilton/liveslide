class Presentation {
    constructor(io, id, slideCount) {
        this._io = io;
        this.presentationID = id;
        this.nsp = this._io.of(id);
        this.clients = 0;
        this.slideCount = slideCount;
        this.currentSlide = 0;

        const self = this;

        this.nsp.on('connection', function (socket) {
            self.clients++;

            socket.emit('clients', self.clients);

            self.loadCurrentSlide();

            socket.on('prev', function() {
                self.previousSlide();
            });

            socket.on('next', function() {
                self.nextSlide();
            });

            socket.on('reset', function() {
                self.resetPresentation();
            });

            socket.on('disconnect', function () {
                self.clients--;
                socket.emit('clients', self.clients);
            });
        });
    }

    loadCurrentSlide() {
        this.nsp.emit('index', this.currentSlide);
    }

    previousSlide() {
        this.currentSlide > 0 ? this.currentSlide-- : false;
        this.nsp.emit('index', this.currentSlide);
    }

    nextSlide() {
        this.currentSlide < this.slideCount - 1 ? this.currentSlide++ : false;
        this.nsp.emit('index', this.currentSlide);
    }

    resetPresentation() {
        this.currentSlide = 0;
        this.nsp.emit('index', this.currentSlide);
    }
}

module.exports = Presentation;