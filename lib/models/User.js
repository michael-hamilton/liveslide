var mongoose = require('mongoose');
var loginLib = require('../login');

var User = new mongoose.Schema({
    username: String,
    password: String
});

User.pre('save', function() {
    this.password = loginLib.hashPassword(this.password);
});

User.methods.verifyPassword = function(password) {
    return loginLib.hashPassword(password);
};

module.exports = mongoose.model('User', User, 'User');