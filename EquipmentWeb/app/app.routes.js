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
            })
            .state('base.list', {
                url: '/list',
                templateUrl: 'list/list.template.html',
                controller: 'ListController',
                controllerAs: 'lc'
            });

            $urlRouterProvider.otherwise('/home');
        }]);
    })();
});