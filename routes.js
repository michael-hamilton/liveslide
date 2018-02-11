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

router.get('/present', presentLib.renderPresentationStarter);

router.post('/present', presentLib.presentationStarterSubmit);

router.get('/present/:presentationID', presentLib.findPresentation, presentLib.startPresenter, presentLib.renderPresenter);

router.get('/make', makeLib.renderMaker);

router.get('/make/:presentationID', makeLib.findPresentation, makeLib.sendPresentation);

router.post('/make', makeLib.updatePresentation);

router.get('/login', loginLib.login);

module.exports = router;