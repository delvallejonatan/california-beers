(function() {
  'use strict';

  describe('Beersfactory', function() {
    var beersService;

    beforeEach(angular.mock.module('app.services'));

    beforeEach(inject(function(_beersService_) {
      beersService = _beersService_;
    }));


    it('should exist', function() {
      expect(beersService).toBeDefined();
    });

    describe('.getAll()', function() {
      it('should exist', function() {
        expect(beersService.getAll).toBeDefined();
      });
    });
  });

})();
