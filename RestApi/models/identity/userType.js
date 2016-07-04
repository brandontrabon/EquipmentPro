/**
 * Created by btrabon on 7/2/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserTypeSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('userTypes', UserTypeSchema);