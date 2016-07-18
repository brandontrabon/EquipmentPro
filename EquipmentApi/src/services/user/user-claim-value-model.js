/**
 * Created by btrabon on 7/14/16.
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimValueSchema = new Schema({
  claimId: { type: Schema.ObjectId, ref: 'claim' },
  claimName: { type: String, required: true, unique: false },
  claimValue: { type: Object, required: false }
});

module.exports = mongoose.model('userClaimValue', claimValueSchema);
