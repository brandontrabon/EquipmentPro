/**
 * Created by btrabon on 6/25/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserClaimValue = new Schema({
    claimName: { type: String, required: true, unique: false },
    claimValue: { type: Object, required: false }
});

module.exports = mongoose.model('userClaimValues', UserClaimValue);