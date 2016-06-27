/**
 * Created by btrabon on 6/24/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var ClaimSchema = require('./user-claim-value').schema;
var AddressSchema = require('../address').schema;

var UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    middleInitial: { type: String, required: false },
    lastName: { type: String, required: true },
    addresses: [AddressSchema],
    claims: [ClaimSchema]
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    console.log(passw);
    console.log(this.password);
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', UserSchema);