'use strict';

angular.module('mean.lights').controller('LightsController', ['$scope', 'Global', 'Lights',
  function($scope, Global, Lights) {
    $scope.global = Global;
    $scope.package = {
      name: 'lights'
    };
  }
]);
