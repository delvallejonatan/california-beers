(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('tags', tags);

  tags.$inject = [];

  function tags() {
    return function(string) {
      if (!string) { return; }

      return '#' + string
        .split('|')
        .map(function(tag) {
          return tag.trim();
        })
        .map(function(tag) {
          return tag.replace(/_/g, ' ');
        })
        .join(' #');
    };
  }
})();
