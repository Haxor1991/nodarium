'use strict';

angular.module('mean').controller('SensorsController', ['$scope', 'Global',
    function($scope, Global, Sensors) {
        $scope.global = Global;
        $scope.sensors = {
            name: 'sensors'
        };
    }
]);
