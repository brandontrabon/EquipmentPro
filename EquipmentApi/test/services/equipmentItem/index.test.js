'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('equipmentItem service', function() {
  it('registered the equipmentItems service', function() {
    assert.ok(app.service('equipmentItems'));
  });
});
