module.exports = function (io) {

    var express = require('express');
    var router = express.Router();
    var Presenter = require('./Presenter.js');
    var Presentation = require('./Presentation.js');

    router.get('/', function (req, res) {
        res.render('presentation-finder', {active:'view'});
    });

    router.get('/view', function (req, res) {
        res.render('presentation-finder', {active:'view'});
    });

    router.post('/view', function (req, res) {
        res.redirect('/view/' + req.body.presentationID);
    });

    router.get('/view/:presentationID', function (req, res) {
        Presentation.findOne({ presentationID: req.params.presentationID }, function(err, presentation) {
            if(presentation) {
                if (presentations.find(p => p.presentationID == presentation.presentationID)) {
                    res.render('viewer', {nsp: presentation.presentationID, slideData: presentation.slideData});
                }
                else {
                    req.flash('error', 'could not find a presentation with that id');
                    res.redirect('/view');
                }
            }
            else {
                req.flash('error', 'could not find a presentation with that id');
                res.redirect('/view');
            }
        });
    });

    router.get('/present', function (req, res) {
        res.render('presentation-starter', {active:'present'});
    });

    router.post('/present', function (req, res) {
        res.redirect('/present/' + req.body.presentationID);
    });

    router.get('/present/:presentationID', function (req, res) {
        Presentation.findOne({ presentationID: req.params.presentationID }, function(err, presentation) {
            if(presentation) {
                presentations.push(new Presenter(io, presentation.presentationID, presentation.slideCount));
                res.render('presenter', {nsp: presentation.presentationID});
            }
            else {
                req.flash('error', 'could not find a presentation with that id');
                res.redirect('/present');
            }
        });
    });

    router.get('/make', function (req, res) {
        res.render('maker', {});
    });

    router.get('/make2', function (req, res) {
        res.render('maker2', {active:'make'});
    });

    router.post('/make2', function (req, res) {
        Presentation.update(
        {
            presentationID: req.body.presentationID,
        },
        {
            presentationID: req.body.presentationID,
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
            res.render('maker2', {});
        });
    });

    return router;
};