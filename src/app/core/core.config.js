(function() {
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

  coreConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

  function coreConfig($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
