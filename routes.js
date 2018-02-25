var express = require('express');
var router = express.Router();
var viewLib = require('./lib/view');
var presentLib = require('./lib/present');
var makeLib = require('./lib/make');
var userLib = require('./lib/user');
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

router.post('/make', loginLib.authenticateRoute, makeLib.updatePresentation, userLib.addPresentationToUser);

router.get('/user/:userID/account', loginLib.authenticateRoute, userLib.renderAccountForm);

router.get('/user/:userID/presentations', loginLib.authenticateRoute, userLib.getUserPresentations, userLib.renderPresentationList);

router.get('/login', loginLib.redirectIfLoggedIn, loginLib.render);

router.post('/login', loginLib.authenticate);

router.get('/logout', loginLib.logout);

module.exports = router;