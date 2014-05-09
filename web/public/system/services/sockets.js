'use strict';

angular.module('mean.system').factory('sockets', ['socketFactory', function(socketFactory) {
    return socketFactory();
}]);
