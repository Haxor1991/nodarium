'use strict';

angular.module('mean').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider

            .state('settings.lightschedule', {
                url: '/lights/schedule',
                templateUrl: 'lights/views/lightSchedule.html'
            })

            .state('settings.lightFixtures', {
                url: '/lights',
                templateUrl: 'lights/views/index.html'
            });





    }
]);
