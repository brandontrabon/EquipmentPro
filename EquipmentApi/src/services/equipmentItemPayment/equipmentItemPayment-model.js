'use strict';

// equipmentItemPayment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentItemPaymentSchema = new Schema({
  equipmentItemBidId: { type: Schema.ObjectId, ref: 'equipmentItemBid' },
  paymentConfirmation: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemPaymentModel = mongoose.model('equipmentItemPayment', equipmentItemPaymentSchema);

module.exports = equipmentItemPaymentModel;
