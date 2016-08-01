(function() {
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

  coreConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

  function coreConfig($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }

})();
