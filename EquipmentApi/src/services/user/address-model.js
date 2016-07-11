/**
 * Created by btrabon on 7/9/16.
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  addressTypeId: { type: Schema.ObjectId, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  postalCode: { type: String, required: true },
  countryCode: { type: String, required: true }
});

module.exports = mongoose.model('address', addressSchema);
