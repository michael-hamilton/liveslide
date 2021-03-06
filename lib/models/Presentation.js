var mongoose = require('mongoose');

var Presentation = mongoose.Schema({
    presentationID: String,
    presentationName: String,
    slideCount: Number,
    slideData: Object,
    isActive: Boolean
});

module.exports = mongoose.model('Presentation', Presentation, 'Presentation');