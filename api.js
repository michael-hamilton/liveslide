var express = require('express');
var router = express.Router();
var makeLib = require('./lib/make');
var userLib = require('./lib/user');

router.get('/make/:presentationID', makeLib.findPresentation, makeLib.sendPresentation);
router.post('/make/:presentationID', makeLib.updatePresentation, userLib.addPresentationToUser, makeLib.sendPresentation);

module.exports = router;