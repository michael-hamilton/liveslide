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
        Presentation.update(
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
                upsert: true
            },
            function(err, presentation) {
                let modifierPhrase = (presentation.nModified > 0 ? 'updated' : 'created');
                if(err) {
                    res.status(500);
                }
                else {
                    res.status(200).send('successfully ' + modifierPhrase + ' presentation');
                }
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