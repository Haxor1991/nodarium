'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}])
    .filter('spacesToDashes', function() {
        return function(data) {
            return data.replace(/\s/g, '-');
        };
    })
    .filter('dashesToSpaces', function() {
        return function(data) {
            return data.replace(/-/g, ' ');
        };
    });