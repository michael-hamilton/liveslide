var express = require('express');
var router = express.Router();
var viewLib = require('./lib/view');
var presentLib = require('./lib/present');
var makeLib = require('./lib/make');
var userLib = require('./lib/user');
var loginLib = require('./lib/login');

router.route('/')
    .get(viewLib.renderPresentationFinder)
;

router.route('/view')
    .get(viewLib.renderPresentationFinder)
    .post(viewLib.presentationFinderSubmit)
;

router.route('/view/:presentationID')
    .get(viewLib.findPresentation, viewLib.renderViewer)
;

router.route('/present')
    .get(loginLib.authenticateRoute, presentLib.renderPresentationStarter)
    .post(loginLib.authenticateRoute, presentLib.presentationStarterSubmit)
;

router.route('/present/:presentationID')
    .get(loginLib.authenticateRoute, presentLib.findPresentation, presentLib.startPresenter, presentLib.renderPresenter)
;

router.route('/make')
    .get(loginLib.authenticateRoute, makeLib.renderMaker)
    .post(loginLib.authenticateRoute, makeLib.updatePresentation, userLib.addPresentationToUser)
;

router.route('/make/:presentationID')
    .get(loginLib.authenticateRoute, makeLib.findPresentation, makeLib.renderMaker)
;

router.route('/user/:userID/account')
    .get(loginLib.authenticateRoute, userLib.renderAccountForm)
;

router.route('/user/:userID/presentations')
    .get(loginLib.authenticateRoute, userLib.getUserPresentations, userLib.renderPresentationList)
;

router.route('/login')
    .get(loginLib.redirectIfLoggedIn, loginLib.render)
    .post(loginLib.authenticate)
;

router.route('/logout')
    .get(loginLib.logout)
;

module.exports = router;