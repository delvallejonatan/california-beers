(function() {
  'use strict';

  angular
    .module('app.main')
    .config(mainRoute);

  mainRoute.$inject = ['$stateProvider'];

  var template = '<section ng-controller=\'MainController as vm\' ng-cloak>\n' +
  '  <header>\n' +
  '    <h1 class="title"> {{vm.title.first}} <br> #{{vm.title.second}}</h1>\n' + '<h1 class="title2"> {{vm.title.first}} {{vm.title.second}}</h1>\n' +
  '    <a class="copyright" target="_blank" href="http://jonidelv.me/">with ❤ by jonidelv</a>\n' +
  '  </header>\n' +
  '  <div ui-view></div>\n' +
  '</section>\n' +
  '';

  function mainRoute($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        template: template,
        // templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      });
  }

})();
