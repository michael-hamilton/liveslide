var Presentation = require('./models/Presentation.js');

module.exports = {

    findPresentation: function (req, res, next) {
        Presentation.findOne({ presentationID: req.params.presentationID }, function(err, presentation) {
            if(presentation) {
                req.presentation = presentation;
            }
            next();
        });
    },

    updatePresentation: function(req, res, next) {
        Presentation.findOneAndUpdate(
            {
                presentationID: req.params.presentationID
            },
            {
                presentationID: req.body.presentation.presentationID,
                presentationName: req.body.presentation.presentationName,
                slideCount: req.body.presentation.slideData.length,
                slideData: req.body.presentation.slideData
            },
            {
                upsert: true, returnNewDocument: true
            },
            function(err, presentation) {
                req.presentation = presentation;
                next();
            }
        );
    },

    sendPresentation: function(req, res, next) {
        res.status(200).send(req.presentation);
        next();
    },

    renderMaker: function(req, res, next) {
        res.render('maker', {
            active: 'make',
            presentationID: req.params.presentationID,
            user: req.user
        });
        next();
    }
};