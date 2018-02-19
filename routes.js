var express = require('express');
var router = express.Router();
var viewLib = require('./lib/view');
var presentLib = require('./lib/present');
var makeLib = require('./lib/make');
var loginLib = require('./lib/login');

router.get('/', viewLib.renderPresentationFinder);

router.get('/view', viewLib.renderPresentationFinder);

router.post('/view', viewLib.presentationFinderSubmit);

router.get('/view/:presentationID', viewLib.findPresentation, viewLib.renderViewer);

router.get('/present', loginLib.authenticateRoute, presentLib.renderPresentationStarter);

router.post('/present', loginLib.authenticateRoute, presentLib.presentationStarterSubmit);

router.get('/present/:presentationID', loginLib.authenticateRoute, presentLib.findPresentation, presentLib.startPresenter, presentLib.renderPresenter);

router.get('/make', loginLib.authenticateRoute, makeLib.renderMaker);

router.get('/make/:presentationID', loginLib.authenticateRoute, makeLib.findPresentation, makeLib.renderMaker);

router.post('/make', loginLib.authenticateRoute, makeLib.updatePresentation);

router.get('/login', loginLib.render);

router.post('/login', loginLib.authenticate);

router.get('/app', function(req, res) {
    res.render('index');
});

module.exports = router;