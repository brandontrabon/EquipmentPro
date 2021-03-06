/**
 * Created by btrabon on 6/26/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    addressTypeId: { type: Schema.ObjectId, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    city: { type: String, required: true },
    stateProvince: { type: String, required: true },
    postalCode: { type: String, required: true },
    countryCode: { type: String, required: true }
});

module.exports = mongoose.model('addresses', AddressSchema);