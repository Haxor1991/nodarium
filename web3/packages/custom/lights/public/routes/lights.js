'use strict';

angular.module('mean.lights').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('lights example page', {
      url: '/lights/example',
      templateUrl: 'lights/views/index.html'
    });
  }
]);
