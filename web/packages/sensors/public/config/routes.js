'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('sensors example page', {
            url: '/sensors/example',
            templateUrl: 'sensors/views/index.html'
        });
    }
]);
