'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus', 'sockets',
    function($scope, $rootScope, Global, Menus, sockets) {

        // my code
        $scope.isCollapsed = false;
        $scope.numberico = 1;


        sockets.on('giveMeNumber', function(data){
            $scope.numberico = data;
            console.log(data);

        });

        setInterval(function(){
            sockets.emit('updateNumber', $scope.numberico);
        }, 1000);

        $scope.global = Global;
        $scope.menus = {};


        // Default hard coded menu items for main menu
        var defaultMainMenu = [];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('main', defaultMainMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('main', defaultMainMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);
