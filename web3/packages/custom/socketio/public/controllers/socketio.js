'use strict';

angular.module('mean.socketio').controller('SocketioController', ['$scope', 'Global', 'Socketio',
  function($scope, Global, Socketio) {
    $scope.global = Global;
    $scope.package = {
      name: 'socketio'
    };
  }
]);
