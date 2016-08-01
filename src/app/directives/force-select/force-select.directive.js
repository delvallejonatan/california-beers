(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('forceSelect', forceSelect);

  forceSelect.$inject = ['$mdUtil'];

  function forceSelect($mdUtil) {
    var directive = {
      restrict: 'A',
      link: linkFunc,
      require: 'mdAutocomplete'
    };

    return directive;

    function linkFunc(scope, element, attrs, autoComplete) {

      var isSelected = function isSelected(item) {
        return autoComplete.matches.indexOf(item) !== -1;
      };

      $mdUtil.nextTick(function() {
        var ngModel = element.find('input').controller('ngModel');

        autoComplete.registerSelectedItemWatcher(function(selectedItem) {
          ngModel.$setValidity('forceSelect', isSelected(selectedItem));
        });

        ngModel.$viewChangeListeners.push(function() {
          $mdUtil.nextTick(function() {
            ngModel.$setValidity('forceSelect', isSelected(autoComplete.scope.selectedItem));
          });
        });
      });
    }
  }
})();
