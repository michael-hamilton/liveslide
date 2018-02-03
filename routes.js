module.exports = function (io) {

    var express = require('express');
    var router = express.Router();
    var Presentation = require('./Presentation.js');

    router.get('/', function (req, res) {
        res.render('presentation-finder', {});
    });

    router.post('/view', function (req, res) {
        res.redirect('/view/' + req.body.presentationID);
    });

    router.get('/view/:id', function (req, res) {
        res.render('viewer', {});
        presentation.connection();
    });


    router.get('/present', function (req, res) {
        res.render('presentation-starter', {});
    });

    router.post('/present', function (req, res) {
        res.redirect('/present/' + req.body.presentationID);
    });

    router.get('/present/:id', function (req, res) {
        presentation = new Presentation(io, req.body.id, 5);
        presentation.connection(function() {
            presentation.presenter();
        });
        res.render('presenter', {});
    });

    return router;
};