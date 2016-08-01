(function() {
  'use strict';

  angular
    .module('modules.searchBeer')
    .controller('ModulesSearchBeerController', ModulesSearchBeerController);

  ModulesSearchBeerController.$inject = ['$timeout', 'beersService'];

  function ModulesSearchBeerController($timeout, beersService) {
    var vm = this;

    // Data
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
          _hideLoading();
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

    function _hideLoading() {
      //Force a 2 second delay so we can see loading.
      //Just for testing purpose
      $timeout(function() {
        vm.loading = false;
      }, 2000);
    }

  }

})();
