'use strict';

angular.module('mean.arduino').controller('ArduinoController', ['$scope', 'Global', 'Arduino',
  function($scope, Global, Arduino) {
    $scope.global = Global;
    $scope.package = {
      name: 'arduino'
    };
  }
]);
