(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('alcoholRange', alcoholRange);

  alcoholRange.$inject = [];

  function alcoholRange() {
    return function(beers, range) {
      if (!beers || !range) { return beers; }

      return beers.filter(function(beer) {
        return beer.Abv <= range;
      });
    };
  }
})();
