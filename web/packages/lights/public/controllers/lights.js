'use strict';

angular.module('mean').controller('LightsController', ['$scope', 'Global', 'Lights', '$location', 'sockets',
    function ($scope, Global, Lights, $location, sockets) {
        $scope.lights = Lights.query();
        $scope.selectedLight = null;

        $scope.setSelectedLight = function (light) {
            console.log(light);
            $scope.selectedLight = light;
        };
        $scope.cancelSelection = function () {
            $scope.selectedLight = null;
        };

        $scope.saveModifiedLight = function () {
            var lightFixture = $scope.selectedLight;

            lightFixture.$update(function () {
                $scope.lights = Lights.query();
                $scope.selectedLight = null;
            });

        };

        $scope.addChannel = function () {
            $scope.selectedLight.channels.push({});
        };

        $scope.deleteChannel = function (index) {
            console.log($scope.selectedLight.channels);
            console.log('removing ' + index);
            $scope.selectedLight.channels.splice(index, 1);
        };

        $scope.addLightFixture = function () {
            var newLightFixture = new Lights();
            newLightFixture.$save(function (response) {
                $scope.lights = Lights.query();
            });
        };

        $scope.enterSettingsMode = function () {
            console.log('entering settings mode');
        };


        $scope.cancelSettingsMode = function () {
            console.log('cancelling settings mode');
        };

        $scope.deleteLightFixture = function (lightFixture) {
            // Confirm that the user want to delete...
            var confirmDelete = confirm('Are you sure you want to delete "' + lightFixture.title + '"? this action is unrecoverable.');
            // if so delete


            if (lightFixture && confirmDelete) {
                lightFixture.$remove();

                for (var i in $scope.lights) {
                    if ($scope.lights[i] === lightFixture) {
                        $scope.lights.splice(i, 1);
                    }
                }
            } else {
                $scope.lights.$remove();

            }
            $scope.selectedLight = null;

        };


        // Sockets Communcations
        $scope.updateLight = function (channel, day) {
            day = day || 'day';
            var data = {
                pwmChip: $scope.selectedLight.channels[channel].pinsGroup,
                channel: $scope.selectedLight.channels[channel].pin,
                value: parseInt($scope.selectedLight.channels[channel][day] * $scope.selectedLight.lightIntensity[day] / 100)

            };

            sockets.emit('Update Light Channel', data);
        };


        $scope.updateAllLights = function (day) {
            day = day || 'day';

            var data = {
                channels: []
            };

            angular.forEach($scope.selectedLight.channels, function (channel) {
                data.channels.push({
                    pwmChip: channel.pinsGroup,
                    channel: channel.pin,
                    value: parseInt(channel[day] * $scope.selectedLight.lightIntensity[day] / 100)
                });


            });


//            var data = {
//
//                channels: [
////                {
//                    pwmChip: $scope.selectedLight.channels[channel].pinGroup,
//                    channel: $scope.selectedLight.channels[channel].pin,
//                    value: parseInt($scope.selectedLight.channels[channel][day] * $scope.selectedLight.lightIntensity[day] / 100)
//                }
//
//            ]


//        };
        sockets.emit('Update All Channels', data);
    };
}
])
;
