'use strict';

// equipmentItemImage-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentItemImageSchema = new Schema({
  equipmentItemId: { type: Schema.ObjectId, required: true, ref: 'equipmentItem' },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
  isMainImage: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemImageModel = mongoose.model('equipmentItemImage', equipmentItemImageSchema);

module.exports = equipmentItemImageModel;
