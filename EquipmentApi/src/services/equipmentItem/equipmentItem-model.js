'use strict';

// equipmentItem-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentItemSchema = new Schema({
  equipmentTypeId: { type: Schema.ObjectId, ref: 'equipmentType' },
  name: { type: String, required: true },
  description: { type: String, required: false },
  startingPrice: { type: Double, required: true },
  minimumPrice: { type: Double, required: true },
  buyNowPrice: { type: Double, required: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemModel = mongoose.model('equipmentItem', equipmentItemSchema);

module.exports = equipmentItemModel;
