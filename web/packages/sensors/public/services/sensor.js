'use strict';

//Articles service used for articles REST endpoint
angular.module('mean')
    .factory('Sensors', ['$resource',
        function ($resource) {
            return $resource('/api/v1/sensors/:sensorMachineName', {
                sensorMachineName: '@_machineName'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
