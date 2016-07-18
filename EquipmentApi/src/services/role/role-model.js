'use strict';

// role-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, unique: true, required: true },
  claims: [{ type: Schema.ObjectId, unique: false, ref: 'claim' }],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const roleModel = mongoose.model('role', roleSchema);

module.exports = roleModel;
