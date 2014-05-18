'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: 'settings/views/index.html'
        });
    }
]);
