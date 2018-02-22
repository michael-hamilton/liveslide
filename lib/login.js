var passport = require('passport');
var crypto = require('crypto');

module.exports = {
    authenticate: passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
        failureMessage: "Invalid username or password"
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash('success', 'logged out');
        res.redirect('/login');
    },

    hashPassword: (password) => {
        const hash = crypto.createHmac('sha256', password)
            .update(process.env.cookie_secret)
            .digest('hex');
        return hash;
    },

    authenticateRoute: (req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/login');
        }
    },

    redirectIfLoggedIn: (req, res, next) => {
        if(req.user) {
            res.redirect('/');
        }
        else {
            next();
        }
    },

    render: (req, res, next) => {
        res.render('login', {
            active:'login'
        });
        next();
    }
};