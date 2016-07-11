'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('addressType service', function() {
  it('registered the addressTypes service', function() {
    assert.ok(app.service('addressTypes'));
  });
});
