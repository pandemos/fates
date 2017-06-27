'use strict';

describe('fates.version module', function() {
  beforeEach(module('fates.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
