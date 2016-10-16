'use strict';

const service = require('feathers-mongoose');
const equipmentItemPayment = require('./equipmentItemPayment-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: equipmentItemPayment,
    paginate: {
      default: 10,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/equipmentItemPayments', service(options));

  // Get our initialize service to that we can bind hooks
  const equipmentItemPaymentService = app.service('/equipmentItemPayments');

  // Set up our before hooks
  equipmentItemPaymentService.before(hooks.before);

  // Set up our after hooks
  equipmentItemPaymentService.after(hooks.after);
};
