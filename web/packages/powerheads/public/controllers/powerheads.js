'use strict';

angular.module('mean').controller('PowerheadsController', ['$scope', 'Global',
    function($scope, Global, Powerheads) {
        $scope.global = Global;
        $scope.powerheads = {
            name: 'powerheads'
        };
    }
]);
