(function() {
  'use strict';

  describe('alcoholRange filter', function() {

    beforeEach(angular.mock.module('app.filters'));

    var $filter;

    beforeEach(inject(function(_$filter_){
      $filter = _$filter_;
    }));

    it('returns undefined when given beers are not defined', function() {
      var alcoholRange = $filter('alcoholRange');
      expect(alcoholRange(undefined)).toEqual(undefined);
    });

    it('returns not filtered beers when given range is not defined', function() {
      var alcoholRange = $filter('alcoholRange');
      expect(alcoholRange([{foo: 'bar'}])).toEqual([{foo: 'bar'}]);
    });

    it('returns beers filted by range', function() {
      var alcoholRange = $filter('alcoholRange');

      var beers = [{
        Brewery: '21st Amendment Brewery Cafe',
        City: 'San Francisco',
        Name: '21A IPA',
        Abv: 7.2,
        Ibu: '?',
        Srm: '?',
        Tags: 'north_american_ale|american_style_india_pale_ale'
      }, {
        Brewery: '21st Amendment Brewery Cafe',
        City: 'San Francisco',
        Name: '563 Stout',
        Abv: 5,
        Ibu: '?',
        Srm: '?',
        Tags: 'north_american_ale|american_style_stout'
      }];

      expect(alcoholRange(beers, 6).length).toEqual(1);
      expect(alcoholRange(beers, 6)).toEqual([{
        Brewery: '21st Amendment Brewery Cafe',
        City: 'San Francisco',
        Name: '563 Stout',
        Abv: 5,
        Ibu: '?',
        Srm: '?',
        Tags: 'north_american_ale|american_style_stout'
      }]);
    });
  });

})();
