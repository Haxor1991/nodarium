'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('settings.powerheads', {
            url: '/powerheads',
            templateUrl: 'powerheads/views/index.html'
        });
    }
]);
