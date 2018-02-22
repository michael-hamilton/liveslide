var User = require('./models/User.js');
var passport = require('passport');
var crypto = require('crypto');

module.exports = {
    addPresentationToUser: (req, res, next) => {
        User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $set: {
                    'presentations.$._id': req.presentation._id,
                    'presentations.$.presentationID': req.presentation.presentationID,
                    'presentations.$.presentationName': req.presentation.presentationName
                }
            },
            { upsert: true },
            (err, user) => {
                console.log(err, user);
                req.user = user;
                next();
            }
        );
    },

    renderAccountForm: (req, res, next) => {
        res.render('account', {
            active:'account',
            user: req.user
        });
        next();
    },

    renderPresentationList: (req, res, next) => {
        res.render('presentations', {
            active:'presentations',
            user: req.user
        });
        next();
    }
};