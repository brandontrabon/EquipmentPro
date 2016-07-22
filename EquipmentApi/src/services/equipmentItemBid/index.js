'use strict';

const service = require('feathers-mongoose');
const equipmentItemBid = require('./equipmentItemBid-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: equipmentItemBid,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/equipmentItemBids', service(options));

  // Get our initialize service to that we can bind hooks
  const equipmentItemBidService = app.service('/equipmentItemBids');

  // Set up our before hooks
  equipmentItemBidService.before(hooks.before);

  // Set up our after hooks
  equipmentItemBidService.after(hooks.after);
};
