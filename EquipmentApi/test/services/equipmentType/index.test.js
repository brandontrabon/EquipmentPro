'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('equipmentType service', function() {
  it('registered the equipmentTypes service', function() {
    assert.ok(app.service('equipmentTypes'));
  });
});
