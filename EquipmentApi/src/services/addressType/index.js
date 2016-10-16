'use strict';

const service = require('feathers-mongoose');
const addressType = require('./addressType-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: addressType,
    paginate: {
      default: 10,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/addressTypes', service(options));

  // Get our initialize service to that we can bind hooks
  const addressTypeService = app.service('/addressTypes');

  // Set up our before hooks
  addressTypeService.before(hooks.before);

  // Set up our after hooks
  addressTypeService.after(hooks.after);
};
