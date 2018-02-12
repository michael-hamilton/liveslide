var express = require('express');
var router = express.Router();
var makeLib = require('./lib/make');

router.get('/make/:presentationID', makeLib.findPresentation, makeLib.sendPresentation);
router.post('/make/:presentationID', makeLib.updatePresentation, makeLib.sendPresentation);

module.exports = router;