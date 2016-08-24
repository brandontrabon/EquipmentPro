'use strict';

// equipmentItem-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// install currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const equipmentItemSchema = new Schema({
  equipmentTypeId: { type: Schema.ObjectId, ref: 'equipmentType' },
  name: { type: String, required: true },
  description: { type: String, required: false },
  startingPrice: { type: Currency, required: true },
  minimumPrice: { type: Currency, required: true },
  buyNowPrice: { type: Currency, required: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemModel = mongoose.model('equipmentItem', equipmentItemSchema);

module.exports = equipmentItemModel;
