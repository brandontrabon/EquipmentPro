/**
 * Created by btrabon on 6/26/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressTypeSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('addressTypes', AddressTypeSchema);