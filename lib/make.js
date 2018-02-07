var Presentation = require('./models/Presentation.js');

module.exports = {
    updatePresentation: function(req, res, next) {
        Presentation.update(
            {
                presentationID: req.body.presentationID
            },
            {
                presentationID: req.body.presentationID,
                presentationName: req.body.presentationName,
                slideCount: req.body.slideCount,
                slideData: req.body.slideData
            },
            {
                upsert: true
            },
            function(err, presentation) {
                let modifierPhrase = (presentation.nModified > 0 ? 'updated' : 'created');
                if(err) {
                    req.flash('danger', 'there was an error');
                }
                else {
                    req.flash('success', 'successfully ' + modifierPhrase + ' presentation');
                }
                next();
            }
        );
    },

    renderMaker: function(req, res, next) {
        res.render('maker', {
            active: 'make'
        });
        next();
    }
};