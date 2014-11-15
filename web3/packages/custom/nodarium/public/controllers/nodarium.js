'use strict';

angular.module('mean.nodarium').controller('NodariumController', ['$scope', 'Global', 'Nodarium',
  function($scope, Global, Nodarium) {
    $scope.global = Global;
    $scope.package = {
      name: 'nodarium'
    };
  }
]);
