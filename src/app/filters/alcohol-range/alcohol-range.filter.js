(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('alcoholRange', alcoholRange);

  alcoholRange.$inject = [];

  function alcoholRange() {
    return function(beers, range) {
      var rangeNumber = Number(range);
      if (!beers || !rangeNumber) { return beers; }

      return beers.filter(function(beer) {
        return beer.Abv <= rangeNumber;
      });
    };
  }
})();
