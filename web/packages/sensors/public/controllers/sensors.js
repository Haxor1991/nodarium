'use strict';


angular.module('mean').controller('SensorsController', ['$scope', 'Global',  '$stateParams', 'Sensors', '$filter',
    function($scope, Global,  $stateParams, Sensors, $filter) {
        $scope.global = Global;
        $scope.sensors = Sensors.get({sensorMachineName:'motti-horesh-is-awesome'});

        $scope.validationErrors = {
            machineNameNotAvailable: false
        };

        $scope.sensor = {

        };

        $scope.generateMachineName = function(){

           $scope.sensor.machineName = $filter('lowercase')($scope.sensor.displayTitle);
            if(typeof($scope.sensor.machineName) !== 'undefined') {

                $scope.sensor.machineName = $scope.sensor.machineName.replace(/[^a-zA-Z0-9]+/gi, '-');

                checkMachineNameInDB();
            }

            // check if machine name is available since machine name needs to be unique.

        };


        $scope.verifyMachineName = function() {
            if(typeof($scope.sensor.machineName) !== 'undefined') {
                $scope.sensor.machineName = $scope.sensor.machineName.replace(/[^a-zA-Z0-9]+/gi, '-');

                checkMachineNameInDB();


            }
        };

        var checkMachineNameInDB = function () {
            Sensors.get({sensorMachineName:$scope.sensor.machineName}, function(res){
                if(typeof(res._id) !== 'undefined') {
                    $scope.validationErrors.machineNameNotAvailable = true;
                } else {
                    $scope.validationErrors.machineNameNotAvailable = false;
                }

            });

        };

        $scope.sensorId = $stateParams.sensorId;






        $scope.saveNewSensor = function(){
            var newSensor = new Sensors();

            newSensor.machineName = 'test';
            newSensor.displayTItle = 'Cool Title';

            newSensor.$save(function (response) {
                console.log('saved...');
            });
        };
    }

]);



angular.module('mean').directive('uniqueSensorMachineName', ['Sensors',function(Sensors) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$formatters.unshift(function(viewValue) {


                Sensors.get({sensorMachineName:viewValue}, function(res){
                    console.log(res);
                    if(typeof(res._id) !== 'undefined') {

                        ctrl.$setValidity('uniqueSensorMachineName', false);

                    } else {
                        ctrl.$setValidity('uniqueSensorMachineName', true);

                    }
                    return viewValue;
                });


            });
        }
    };
}]);