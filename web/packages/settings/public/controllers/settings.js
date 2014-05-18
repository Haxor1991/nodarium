'use strict';

angular.module('mean').controller('SettingsController', ['$scope', 'Global', 'Menus', '$rootScope',
    function($scope, Global, Menus, $rootScope, Settings) {
        $scope.global = Global;
        $scope.settings = {
            name: 'settings'
        };


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
        queryMenu('settings', defaultMainMenu);

    }
]);
