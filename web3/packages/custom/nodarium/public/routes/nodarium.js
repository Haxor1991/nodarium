'use strict';

angular.module('mean.nodarium').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('nodarium example page', {
      url: '/test',
      templateUrl: 'nodarium/views/index.html'
    });
  }
]);
