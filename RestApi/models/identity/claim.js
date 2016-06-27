/**
 * Created by btrabon on 6/24/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClaimSchema = new Schema({
    name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('claims', ClaimSchema);