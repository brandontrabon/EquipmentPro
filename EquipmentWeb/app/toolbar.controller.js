/**
 * @description This controller will provide the functionality for the popup
 * menu.
 */

'use strict';

define(['./app'], function(app) {
    (function() {
        var controller = function($mdSidenav) {
            var vm = this;

            vm.toggleMenu = toggleMenu;

            function toggleMenu() {
                $mdSidenav('left').toggle().then(function() {
                    console.log('Toggle completed');
                });
            }
        };

        controller.$inject = ['$mdSidenav'];

        app.controller('ToolbarController', controller);
    })();
});