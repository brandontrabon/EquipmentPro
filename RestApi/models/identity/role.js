/**
 * Created by btrabon on 6/25/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClaimSchema = require('./claim').schema;

var RoleSchema = new Schema({
    name: { type: String, unique: true, required: true },
    claims: [{ type: Schema.ObjectId, unique: false, ref: 'claims' }]
});

module.exports = mongoose.model('roles', RoleSchema);