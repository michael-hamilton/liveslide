var Presentation = require('./Presentation.js');

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
                upsert:true
            },
            function(err, presentation) {
                if(err) {
                    req.flash('error', 'error creating presentation');
                }
                else {
                    req.flash('success', 'successfully created presentation');
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