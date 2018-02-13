var passport = require('passport');
var crypto = require('crypto');

module.exports = {
    authenticate: passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
        failureMessage: "Invalid username or password"
    }),

    hashPassword: function(password) {
        const hash = crypto.createHmac('sha256', password)
            .update(process.env.cookie_secret)
            .digest('hex');
        return hash;
    },

    authenticateRoute: function(req, res, next) {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/login');
        }
    },

    render: function(req, res, next) {
        res.render('login', {
            active:'login'
        });
        next();
    }
};