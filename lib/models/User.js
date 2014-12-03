var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, require: true, index: {unique : true}},
    full_name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(potentialPassword, cBack) {
    bcrypt.compare(potentialPassword, this.password, function(err, isMatch) {
        if (err) return cBack(err);
        cBack(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);