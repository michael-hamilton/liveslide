var Presentation = require('./models/Presentation.js');

module.exports = {
    findPresentation: function (req, res, next) {
        Presentation.findOne({ presentationID: req.params.presentationID }, function(err, presentation) {
            if(presentation) {
                req.presentation = presentation;
                if (presentations.find(p => p.presentationID == req.presentation.presentationID)) {
                    next();
                }
            else {
                    req.flash('danger', 'could not find a presentation with that id');
                    res.redirect('/view');
                }
            }
        });
    },

    presentationFinderSubmit: function(req, res, next) {
        res.redirect('/view/' + req.body.presentationID);
        next();
    },

    renderViewer: function(req, res, next) {
        res.render('viewer', {
            presentation: {
                nsp: req.presentation.presentationID,
                presentationName: req.presentation.presentationName,
                slideData: req.presentation.slideData
            },
            user: req.user
        });
        next();
    },

    renderPresentationFinder: function(req, res, next) {
        res.render('presentation-finder', {
            active:'view',
            user: req.user
        });
        next();
    }
};