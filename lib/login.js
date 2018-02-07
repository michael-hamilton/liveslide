var Presentation = require('./models/Presentation.js');

module.exports = {
    login: function(req, res, next) {
        res.render('login', {
            active:'login'
        });
        next();
    }
};