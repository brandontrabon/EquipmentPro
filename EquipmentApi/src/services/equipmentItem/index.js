'use strict';

const service = require('feathers-mongoose');
const equipmentItem = require('./equipmentItem-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: equipmentItem,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/equipmentItems', service(options));

  // Get our initialize service to that we can bind hooks
  const equipmentItemService = app.service('/equipmentItems');

  // Set up our before hooks
  equipmentItemService.before(hooks.before);

  // Set up our after hooks
  equipmentItemService.after(hooks.after);
};
