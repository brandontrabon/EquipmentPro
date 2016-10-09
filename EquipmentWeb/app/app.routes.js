/**
 * @description Contains the routes for the application; if this section gets
 * too large it may be broken out by section.
 */

'use strict';

define(['./app', 'angular'], function(app) {
    (function() {
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('base', {
                abstract: true,
                url: '',
                templateUrl: 'base.route.template.html',
                resolve: {
                    startingState: function() {
                        return "base.home";
                    }
                }
            })
            .state('base.home', {
                url: '/home',
                templateUrl: 'home/home.template.html',
                controller: 'HomeController',
                controllerAs: 'hc'
            });

            $urlRouterProvider.otherwise('/home');
        }]);
    })();
});