'use strict';

angular.module('mean').controller('LightListController', ['$scope', 'Global', '$rootScope','Lights',
    function($scope, Global, $rootScope,Lights) {
        $scope.global = Global;
        $scope.title = 'Light Fixtures:';

    }
]);
