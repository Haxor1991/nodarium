'use strict';

angular.module('mean').controller('ArduinoController', ['$scope', 'Global',
    function($scope, Global, Arduino) {
        $scope.global = Global;
        $scope.arduino = {
            name: 'arduino'
        };
    }
]);
