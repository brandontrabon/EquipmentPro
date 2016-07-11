'use strict';

// equipmentType-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentTypeSchema = new Schema({
  name: { type: String, required: true },
  parentId: { type: Schema.ObjectId, required: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const equipmentTypeModel = mongoose.model('equipmentType', equipmentTypeSchema);

module.exports = equipmentTypeModel;
