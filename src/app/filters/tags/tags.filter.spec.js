(function() {
  'use strict';

  describe('tags filter', function() {

    beforeEach(angular.mock.module('app.filters'));

    var $filter;

    beforeEach(inject(function(_$filter_){
      $filter = _$filter_;
    }));

    it('returns undefined when given null', function() {
      var tags = $filter('tags');
      expect(tags(null)).toEqual(undefined);
    });

    it('returns hash like strings from string with pipes and underscores', function() {
      var tags = $filter('tags');
      expect(tags('foo_bar | baz')).toEqual('#foo bar #baz');
    });
  });

})();
