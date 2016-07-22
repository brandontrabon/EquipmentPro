'use strict';

// equipmentItemBid-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentItemBidSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentItemBidModel = mongoose.model('equipmentItemBid', equipmentItemBidSchema);

module.exports = equipmentItemBidModel;