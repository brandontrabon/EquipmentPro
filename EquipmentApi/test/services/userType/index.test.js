'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('userType service', function() {
  it('registered the userTypes service', function() {
    assert.ok(app.service('userTypes'));
  });
});
