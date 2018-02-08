class Presentation {
    constructor(io, id, slideCount) {
        this._io = io;
        this.presentationID = id;
        this.slideCount = slideCount;
        this.nsp = this._io.of(id);
        this.presenter;
        this.clients = [];
        this.currentSlide = 0;
        this.ready = false;
        this.paused = false;

        const self = this;

        this.nsp.on('connection', function (socket) {
            self.paused ? false : self.resume();

            self.loadCurrentSlide();

            self.initListeners(socket);

            socket.on('disconnect', function () {
                self.clients.splice(self.clients.indexOf(socket), 1);
                self.updateClientCount();
            });
        });
    }

    initListeners(socket) {
        const self = this;

        socket.on('connected', function(msg) {
            if (msg.clientType == 'presenter') {
                self.presenter = socket;
            }
            else {
                self.clients.push(socket);
            }
            self.updateClientCount();
        });

        socket.on('ready', function(msg) {
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
    }

    updateClientCount() {
        this.nsp.emit('clients', this.clients.length);
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