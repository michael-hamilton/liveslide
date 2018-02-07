class Presentation {
    constructor(io, id, slideCount) {
        this._io = io;
        this.presentationID = id;
        this.nsp = this._io.of(id);
        this.clients = 0;
        this.slideCount = slideCount;
        this.currentSlide = 0;
        this.ready = false;
        this.paused = false;

        const self = this;

        this.nsp.on('connection', function (socket) {
            self.clients++;

            if(!self.paused) {
                self.resume();
            }

            self.nsp.emit('clients', self.clients);

            self.loadCurrentSlide();

            socket.on('ready', function() {
                self.ready = true;
                self.nsp.emit('ready');
                self.paused ? self.nsp.emit('pause') : self.nsp.emit('resume');
            });

            socket.on('prev', function() {
                self.previousSlide();
            });

            socket.on('next', function() {
                self.nextSlide();
            });

            socket.on('pause', function() {
                self.pause();
            });

            socket.on('resume', function() {
                self.resume();
            });

            socket.on('reset', function() {
                self.resetPresentation();
            });

            socket.on('disconnect', function () {
                self.clients--;
                self.nsp.emit('clients', self.clients);
            });
        });
    }

    loadCurrentSlide() {
        this.nsp.emit('index', this.currentSlide);
    }

    pause() {
        this.paused = true;
        this.nsp.emit('pause');
    }

    resume() {
        this.paused = false;
        this.nsp.emit('resume');
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