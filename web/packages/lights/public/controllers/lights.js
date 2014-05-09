'use strict';

angular.module('mean').controller('LightsController', ['$scope', 'Global', 'Lights', '$location',
    function($scope, Global, Lights, $location) {
        $scope.lights = Lights.query();
        $scope.selectedLight = null;

        $scope.setSelectedLight = function(light){
            $scope.selectedLight = light;
        };

        $scope.saveModifiedLight = function() {
            var lightFixture = $scope.selectedLight;

            lightFixture.$update(function(){
                $scope.selectedLight = null;
            });

        };

        $scope.addChannel = function() {
            $scope.selectedLight.channels.push({});
        };

    }
]);
