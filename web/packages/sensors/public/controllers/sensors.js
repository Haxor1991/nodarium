'use strict';

angular.module('mean').controller('SensorsController', ['$scope', 'Global',  '$stateParams',
    function($scope, Global,  $stateParams, Sensors) {
        $scope.global = Global;
        $scope.sensors = {
            name: 'sensors'
        };

        $scope.sensorId = $stateParams.sensorId;

    }
]);
