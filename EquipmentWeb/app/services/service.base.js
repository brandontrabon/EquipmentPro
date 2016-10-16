/**
 * @description Base service class containing code to work with the feathers
 * service framework.
 */

'use strict';

define(['angular'], function(ng) {
    (function() {
        var service = function($http) {
            var vm = this;

            vm.baseUrl = '';

            vm.init = init;
            vm.get = feathers_get;
            vm.post = feathers_post;
            vm.put = feathers_put;
            vm.delete = feathers_delete;

            function init(baseUrl) {
                vm.baseUrl = baseUrl;
            }

            function feathers_get(url, params) {

            }

            function feathers_post(url, params) {

            }

            function feathers_put(url, params) {

            }

            function feathers_delete(url, params) {

            }

            function callService(url, params) {

            }

            function constructUrl(url, params) {
                var combinedUrl = vm.baseUrl + url;
                combinedUrl += combinedUrl.endsWith("/") === true ? "" : "/";

                // TODO: Next implement paging and field limitation criteria
            }
        };

        service.$inject = ['$http'];

        app.service('BaseService', service);
    })();
});