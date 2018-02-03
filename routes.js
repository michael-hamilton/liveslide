var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('presentation-finder', {});
});

router.post('/view', function(req, res) {
    res.redirect('/view/' + req.body.presentationID);
});

router.get('/view/:id', function(req, res) {
    res.render('viewer', {});
});


router.get('/present', function(req, res) {
    res.render('presentation-starter', {});
});

router.post('/present', function(req, res) {
    res.redirect('/present/' + req.body.presentationID);
});

router.get('/present/:id', function(req, res) {
    res.render('presenter', {});
});

module.exports = router;