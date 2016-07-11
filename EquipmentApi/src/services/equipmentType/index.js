'use strict';

const service = require('feathers-mongoose');
const equipmentType = require('./equipmentType-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: equipmentType,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/equipmentTypes', service(options));

  // Get our initialize service to that we can bind hooks
  const equipmentTypeService = app.service('/equipmentTypes');

  // Set up our before hooks
  equipmentTypeService.before(hooks.before);

  // Set up our after hooks
  equipmentTypeService.after(hooks.after);
};
