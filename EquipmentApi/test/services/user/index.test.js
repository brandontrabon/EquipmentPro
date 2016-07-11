'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('user service', function() {
  it('registered the users service', function() {
    assert.ok(app.service('users'));
  });
});
