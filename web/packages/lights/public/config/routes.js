'use strict';

angular.module('mean').config(['$stateProvider',
    function ($stateProvider) {
        // Check if the user is logged in
        var checkLoggedin = function ($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };


        $stateProvider

            .state('settings.lightschedule', {
                url: '/lights/schedule',
                templateUrl: 'lights/views/lightSchedule.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .state('settings.lightFixtures', {
                url: '/lights',
                templateUrl: 'lights/views/index.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });


    }
]);
