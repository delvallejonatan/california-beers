(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('beersService', beersService);

  beersService.$inject = ['$http'];

  function beersService($http) {
    var service = {
      getAll: getAll
    };

    return service;

    function getAll() {
      return $http.get('http://localhost:3000/beers')
      .then(function(res) {
        return res.data.map(_parseBeerAbv);
      });
    }

    // For filter porpuses all beers with '?' alcohol avg were set to minimum alcohol abv (3.3)
    function _parseBeerAbv(beer) {
      if (beer.Abv === '?') {
        beer.Abv = 3.3;
      } else {
        beer.Abv = Number(beer.Abv.slice(0, -1));
      }
      return beer;
    }
  }
})();
