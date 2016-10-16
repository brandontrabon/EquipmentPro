'use strict';

const service = require('feathers-mongoose');
const equipmentItemImage = require('./equipmentItemImage-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: equipmentItemImage,
    paginate: {
      default: 10,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/equipmentItemImages', service(options));

  // Get our initialize service to that we can bind hooks
  const equipmentItemImageService = app.service('/equipmentItemImages');

  // Set up our before hooks
  equipmentItemImageService.before(hooks.before);

  // Set up our after hooks
  equipmentItemImageService.after(hooks.after);
};
