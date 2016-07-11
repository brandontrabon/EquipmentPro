'use strict';

const service = require('feathers-mongoose');
const userType = require('./userType-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: userType,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/userTypes', service(options));

  // Get our initialize service to that we can bind hooks
  const userTypeService = app.service('/userTypes');

  // Set up our before hooks
  userTypeService.before(hooks.before);

  // Set up our after hooks
  userTypeService.after(hooks.after);
};
