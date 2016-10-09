'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('equipmentItemImage service', function() {
  it('registered the equipmentItemImages service', () => {
    assert.ok(app.service('equipmentItemImages'));
  });
});
