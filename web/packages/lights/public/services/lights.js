'use strict';

//Articles service used for articles REST endpoint
angular.module('mean')
    .factory('Lights', ['$resource',
        function ($resource) {
            return $resource('/api/v1/lights/:lightId', {
                lightId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
