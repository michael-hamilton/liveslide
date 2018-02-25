var User = require('./models/User.js');
var Presentation = require('./models/Presentation.js');
var passport = require('passport');
var crypto = require('crypto');

module.exports = {
    addPresentationToUser: (req, res, next) => {
        User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $addToSet: {
                    presentations: req.presentation._id
                }
            },
            { upsert: true },
            (err, user) => {
                req.user = user;
                next();
            }
        );
    },

    getUserPresentations: (req, res, next) => {
        Presentation.find({} , (err, presentations) => {
             req.presentations = presentations;
             next();
        });
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
            user: req.user,
            presentations: req.presentations
        });
        next();
    }
};