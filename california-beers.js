(function() {
  'use strict';

  angular
    .module('app.services', []);
})();

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
      return $http.get('https://california-beers.herokuapp.com/beers')
      .then(function(res) {
        return res.data.map(_parseBeerAbv);
      });
    }

    function _parseBeerAbv(beer) {
      if (beer.Abv === '?') {
        beer.Abv = 4.5;
      } else {
        beer.Abv = Number(beer.Abv.slice(0, -1));
      }
      return beer;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('modules.searchBeer', []);
})();

(function() {
  'use strict';

  angular
    .module('modules.searchBeer')
    .config(searchBeerRoute);

    searchBeerRoute.$inject = ['$stateProvider'];

  function searchBeerRoute($stateProvider) {

    var template =     '<section class="modules-search-beer" ng-class="{\'open\': vm.open}">\n' +
        '  <form name="beerForm">\n' +
        '\n' +
        '    <h1 class="loading" ng-class="{\'show\': vm.loading}">Loading</h1>\n' +
        '    <div class="content">\n' +
        '      <div class="container">\n' +
        '        <div class="bottle spin"></div>\n' +
        '        <div class="circle show" ng-class="{\'hide\': vm.loading}">\n' +
        '          <h2 class="sub-title">Choose <br> yours</h2>\n' +
        '          <md-autocomplete required md-input-name="autocomplete" force-select md-selected-item=\'vm.beer\' md-search-text=\'vm.query\' md-items=\'beer in vm.filteredBeers | filter:vm.query\' md-item-text=\'beer.Name\' md-min-length="1" placeholder="Beer Name" ng-disabled="vm.open" md-no-cache="true">\n' +
        '            <md-item-template>\n' +
        '              <span md-highlight-text="vm.query" md-highlight-flags="^i"> {{beer.Name}}\n' +
        '              </span>\n' +
        '            </md-item-template>\n' +
        '            <md-not-found>\n' +
        '              No beers matching "{{vm.query}}" were found.\n' +
        '            </md-not-found>\n' +
        '          </md-autocomplete>\n' +
        '          <input class="range" name="slider" type="range" min="4" max="15" step="1" ng-model=\'vm.alcoholRange\' ng-change=\'vm.onRangeChange()\' ng-disabled="vm.open"/>\n' +
        '          <p class="range-description">3.3 - <span>{{vm.alcoholRange}}</span> % Alcohol</p>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="beer-show desplace" style="background-color: {{vm.backgroundColor}};" ng-class="{\'hide\': vm.loading}">\n' +
        '      <button class="circle-show spin-half" ng-click="vm.toggleOpen()" ng-disabled=\'beerForm.autocomplete.$modelValue === " " || beerForm.$invalid || beerForm.$pristine\'>\n' +
        '        <span class=\'tooltip\'>Select a Beer</span>\n' +
        '      </button>\n' +
        '      <div class="label" style="color: {{vm.labelColor}};">\n' +
        '        <div class="name">{{vm.beer.Name}}</div>\n' +
        '        <div class="tag" ng-if=\'vm.beer.Tags !== "?"\'>{{vm.beer.Tags | tags}}</div>\n' +
        '        <div class="City" ng-if=\'vm.beer.City !== "?"\'>{{vm.beer.City}}</div>\n' +
        '        <div class="company" ng-if=\'vm.beer.Brewery !== "?"\'>{{vm.beer.Brewery}}</div>\n' +
        '        <div class="alcohol">{{vm.beer.Abv}}% Alcohol</div>\n' +
        '        <div class="tag" ng-if=\'vm.beer.Srm !== "?"\'>{{vm.beer.Srm}}</div>\n' +
        '        <div class="tag" ng-if=\'vm.beer.Ibu !== "?"\'>{{vm.beer.Ibu}}</div>\n' +
        '      </div>\n' +
        '      <!-- <div ng-include="\'app/modules/search-beer/template/bubbles.html\'"></div> -->\n' +
        '      <div class=\'bubbles\'>\n' +
        '        <div class=\'bubble\' ng-repeat=\'i in vm.bubbles(100) track by $index\'></div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '\n' +
        '  </form>\n' +
        '</section>\n' +
        '';

    $stateProvider
      .state('main.searchBeer', {
        url: '/',
        template: template,
        // templateUrl: 'app/modules/search-beer/search-beer.html',
        controller: 'ModulesSearchBeerController',
        controllerAs: 'vm'
      });
  }

})();

(function() {
  'use strict';

  angular
    .module('modules.searchBeer')
    .controller('ModulesSearchBeerController', ModulesSearchBeerController);

  ModulesSearchBeerController.$inject = ['beersService', 'alcoholRangeFilter'];

  function ModulesSearchBeerController(beersService, alcoholRangeFilter) {
    var vm = this;

    // Data
    vm.filteredBeers = [];
    vm.loading = true;
    vm.open = false;
    vm.beerColors = ['#fbf0cb', '#ffdd79', '#e19726', '#9d5107', '#6e1500', '#320300', '#181717'];
    vm.backgroundColor = '#222222';
    vm.pastBackgrounds = [];
    vm.alcoholRange = 15;

    // Methods
    vm.toggleOpen = toggleOpen;
    vm.onRangeChange = onRangeChange;
    vm.bubbles = bubbles;

    activate();

    //////////

    function activate() {
      beersService.getAll()
        .then(function(data){
          vm.beers = data;
          angular.copy(data, vm.filteredBeers);
          vm.loading = false;
        })
        .catch(function(err){
          console.err(err);
        });
    }

    //////////

    function toggleOpen() {
      vm.open = !vm.open;

      if (vm.open) {
        var rand = Math.floor((Math.random() * 7));
        while (_compareLastTwo(rand, vm.pastBackgrounds)) {
          rand = Math.floor(Math.random() * 5) + 1;
        }
        vm.pastBackgrounds.push(rand);
        vm.backgroundColor = vm.beerColors[rand];
        vm.labelColor = rand < 2 ? '#222222' : '#fff';
      } else {
        vm.backgroundColor = '#222222';
        vm.beer = null;
        vm.query = null;
      }
    }

    function onRangeChange() {
      vm.filteredBeers = alcoholRangeFilter(vm.beers, vm.alcoholRange);
      vm.beer = null;
      vm.query = null;
    }

    function bubbles(num) {
      return new Array(num);
    }

    function _compareLastTwo(val, arr) {
      var leng = arr.length;
      return leng >= 2 && (val === arr[leng-1] || val === arr[leng-2]);
    }

  }

})();

(function() {
  'use strict';

  angular
    .module('app.filters', []);
}());

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

(function() {
  'use strict';

  angular
    .module('app.directives', []);
}());

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

(function() {
  'use strict';

  angular.module('app.modules', [
    'modules.searchBeer'
  ]);

}());

(function() {
  'use strict';

  angular
    .module('app.main', []);
})();

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

(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = [];

  function MainController() {
    var vm = this;

    // Data
    vm.title = {
      first: 'California',
      second: 'Beers'
    };
    vm.year = new Date().getFullYear();

  }
})();

(function() {
  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ngMaterial'
    ]);
})();

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

(function() {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.directives',
      'app.main',
      'app.services',
      'app.modules',
      'app.filters'
    ]);
})();

(function(module) {
try {
  module = angular.module('california-beers');
} catch (e) {
  module = angular.module('california-beers', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/main/main.html',
    '<section ng-controller="MainController as vm" ng-cloak><header><h1 class="title">{{vm.title.first}}<br>#{{vm.title.second}}</h1><h1 class="title2">{{vm.title.first}} {{vm.title.second}}</h1><a class="copyright" target="_blank" href="http://jonidelv.me/">with ❤ by jonidelv</a></header><div ui-view></div></section>');
}]);
})();

(function(module) {
try {
  module = angular.module('california-beers');
} catch (e) {
  module = angular.module('california-beers', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/modules/search-beer/search-beer.html',
    '<section class="modules-search-beer" ng-class="{\'open\': vm.open}"><form name="beerForm"><h1 class="loading" ng-class="{\'show\': vm.loading}">Loading</h1><div class="content"><div class="container"><div class="bottle spin"></div><div class="circle show" ng-class="{\'hide\': vm.loading}"><h2 class="sub-title">Choose<br>yours</h2><md-autocomplete required md-input-name="autocomplete" force-select md-selected-item="vm.beer" md-search-text="vm.query" md-items="beer in vm.filteredBeers | filter:vm.query" md-item-text="beer.Name" md-min-length="1" placeholder="Beer Name" ng-disabled="vm.open" md-no-cache="true"><md-item-template><span md-highlight-text="vm.query" md-highlight-flags="^i">{{beer.Name}}</span></md-item-template><md-not-found>No beers matching "{{vm.query}}" were found.</md-not-found></md-autocomplete><input class="range" name="slider" type="range" min="4" max="15" step="1" ng-model="vm.alcoholRange" ng-change="vm.onRangeChange()" ng-disabled="vm.open"><p class="range-description">3.3 - <span>{{vm.alcoholRange}}</span> % Alcohol</p></div></div></div><div class="beer-show desplace" style="background-color: {{vm.backgroundColor}}" ng-class="{\'hide\': vm.loading}"><button class="circle-show spin-half" ng-click="vm.toggleOpen()" ng-disabled="beerForm.autocomplete.$modelValue === &quot; &quot; || beerForm.$invalid || beerForm.$pristine"><span class="tooltip">Select a Beer</span></button><div class="label" style="color: {{vm.labelColor}}"><div class="name">{{vm.beer.Name}}</div><div class="tag" ng-if="vm.beer.Tags !== &quot;?&quot;">{{vm.beer.Tags | tags}}</div><div class="City" ng-if="vm.beer.City !== &quot;?&quot;">{{vm.beer.City}}</div><div class="company" ng-if="vm.beer.Brewery !== &quot;?&quot;">{{vm.beer.Brewery}}</div><div class="alcohol">{{vm.beer.Abv}}% Alcohol</div><div class="tag" ng-if="vm.beer.Srm !== &quot;?&quot;">{{vm.beer.Srm}}</div><div class="tag" ng-if="vm.beer.Ibu !== &quot;?&quot;">{{vm.beer.Ibu}}</div></div><div class="bubbles"><div class="bubble" ng-repeat="i in vm.bubbles(100) track by $index"></div></div></div></form></section>');
}]);
})();

(function(module) {
try {
  module = angular.module('california-beers');
} catch (e) {
  module = angular.module('california-beers', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/modules/search-beer/template/bubbles.html',
    '<div class="bubbles"><div class="bubble" ng-repeat="i in vm.bubbles(100) track by $index"></div></div>');
}]);
})();
