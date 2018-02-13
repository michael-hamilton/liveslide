var Presentation = require('./models/Presentation.js');
var Presenter = require('./Presenter.js');

module.exports = {
    findPresentation: function (req, res, next) {
        Presentation.findOne({ presentationID: req.params.presentationID }, function(err, presentation) {
            req.presentation = presentation;
            next()
        });
    },

    presentationStarterSubmit: function(req, res, next) {
        res.redirect('/present/' + req.body.presentationID);
        next();
    },

    startPresenter: function(req, res, next) {
        if(req.presentation) {
            presentations.push(new Presenter(io, req.presentation.presentationID, req.presentation.slideCount));
        }
        else {
            req.flash('danger', 'could not find a presentation with that id');
            res.redirect('/present');
        }
        next();
    },

    renderPresentationStarter: function(req, res, next) {
        res.render('presentation-starter', {
            active:'present',
            user: req.user
        });
        next();
    },

    renderPresenter: function(req, res, next) {
        res.render('presenter', {
            presentation: {
                nsp: req.presentation.presentationID,
                name: req.presentation.presentationName,
                slideCount: req.presentation.slideCount
            },
            active: 'present',
            user: req.user
        });
    }
};