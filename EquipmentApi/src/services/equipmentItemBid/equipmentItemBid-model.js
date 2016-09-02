'use strict';

// equipmentItemBid-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// install currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const equipmentItemBidSchema = new Schema({
  equipmentItemId: { type: Schema.ObjectId, ref: 'equipmentItem' },
  userId: { type: Schema.ObjectId, ref: 'user' },
  bidAmount: { type: Currency, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemBidModel = mongoose.model('equipmentItemBid', equipmentItemBidSchema);

module.exports = equipmentItemBidModel;
