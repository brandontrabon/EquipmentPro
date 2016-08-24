'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('equipmentItemPayment service', function() {
  it('registered the equipmentItemPayments service', () => {
    assert.ok(app.service('equipmentItemPayments'));
  });
});
