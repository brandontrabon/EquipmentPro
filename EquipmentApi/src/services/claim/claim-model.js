'use strict';

// claim-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  name: { type: String, unique: true, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const claimModel = mongoose.model('claim', claimSchema);

module.exports = claimModel;
