'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('equipmentItemBid service', function() {
  it('registered the equipmentItemBids service', function() {
    assert.ok(app.service('equipmentItemBids'));
  });
});
