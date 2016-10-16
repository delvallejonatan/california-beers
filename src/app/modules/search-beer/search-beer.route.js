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
