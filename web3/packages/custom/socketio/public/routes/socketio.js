'use strict';

angular.module('mean.socketio').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('socketio example page', {
      url: '/socketio/example',
      templateUrl: 'socketio/views/index.html'
    });
  }
]);
