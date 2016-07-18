'use strict';

// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = require('./address-model').schema;
const RoleSchema = require('../role/role-model').schema;
const ClaimSchema = require('./user-claim-value-model').schema;

const userSchema = new Schema({
  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  githubId: { type: String },
  github: { type: Schema.Types.Mixed },
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },
  linkedinId: { type: String },
  linkedin: { type: Schema.Types.Mixed },
  paypalId: { type: String },
  paypal: { type: Schema.Types.Mixed },

  userTypeId: { type: Schema.ObjectId, required: true, ref: 'userType' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  firstName: { type: String, required: true },
  middleInitial: { type: String, required: false },
  lastName: { type: String, required: true },
  companyName: { type: String, required: true },
  addresses: [AddressSchema],
  roles: [RoleSchema],
  claims: [ClaimSchema],

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
