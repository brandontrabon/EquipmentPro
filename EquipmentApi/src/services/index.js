'use strict';
const equipmentItemBid = require('./equipmentItemBid');
const role = require('./role');
const claim = require('./claim');
const equipmentType = require('./equipmentType');
const equipmentItem = require('./equipmentItem');
const userType = require('./userType');
const addressType = require('./addressType');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(addressType);
  app.configure(userType);
  app.configure(equipmentItem);
  app.configure(equipmentType);
  app.configure(claim);
  app.configure(role);
  app.configure(equipmentItemBid);
};
