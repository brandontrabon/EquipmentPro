/**
 * Created by btrabon on 6/25/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClaimSchema = require('./claim').schema;

var RoleSchema = new Schema({
    name: { type: String, unique: true, required: true },
    claims: [ClaimSchema]
});

module.exports = mongoose.model('roles', RoleSchema);