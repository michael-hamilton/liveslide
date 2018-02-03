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

    router.get('/view/:presentationID', function (req, res) {
        res.render('viewer', {nsp:req.params.presentationID});
    });

    router.get('/present', function (req, res) {
        res.render('presentation-starter', {});
    });

    router.post('/present', function (req, res) {
        res.redirect('/present/' + req.body.presentationID);
    });

    router.get('/present/:presentationID', function (req, res) {
        presentation = new Presentation(io, req.params.presentationID, 5);
        res.render('presenter', {nsp:req.params.presentationID});
    });

    return router;
};