(function() {
  'use strict';

  angular
    .module('modules.searchBeer')
    .config(searchBeerRoute);

    searchBeerRoute.$inject = ['$stateProvider'];

  function searchBeerRoute($stateProvider) {
    $stateProvider
      .state('main.searchBeer', {
        url: '/',
        templateUrl: 'app/modules/search-beer/search-beer.html',
        controller: 'ModulesSearchBeerController',
        controllerAs: 'vm'
      });
  }

})();
