document.ontouchmove = function (event) {
    event.preventDefault();
};

var node = document.getElementById('liveslide');

var app = Elm.LiveSlide.embed(node);