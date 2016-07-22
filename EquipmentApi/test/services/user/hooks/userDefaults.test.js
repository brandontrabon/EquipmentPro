'use strict';

const assert = require('assert');
const userDefaults = require('../../../../src/services/user/hooks/userDefaults.js');

describe('user userDefaults hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    userDefaults()(mockHook);

    assert.ok(mockHook.userDefaults);
  });
});
