'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('claim service', function() {
  it('registered the claims service', function() {
    assert.ok(app.service('claims'));
  });
});
