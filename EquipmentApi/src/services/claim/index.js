'use strict';

const service = require('feathers-mongoose');
const claim = require('./claim-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: claim,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/claims', service(options));

  // Get our initialize service to that we can bind hooks
  const claimService = app.service('/claims');

  // Set up our before hooks
  claimService.before(hooks.before);

  // Set up our after hooks
  claimService.after(hooks.after);
};
