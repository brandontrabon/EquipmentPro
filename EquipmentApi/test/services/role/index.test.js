'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('role service', function() {
  it('registered the roles service', function() {
    assert.ok(app.service('roles'));
  });
});
