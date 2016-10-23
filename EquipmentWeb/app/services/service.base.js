/**
 * @description Base service class containing code to work with the feathers
 * service framework.
 */

'use strict';

define(['../app'], function(app) {
    (function() {
        var service = function($http, $q) {
            var vm = this;

            vm.baseUrl = '';

            vm.init = init;
            vm.get = feathers_get;
            vm.getSecure = feathers_secure_get;
            vm.post = feathers_post;
            vm.postSecure = feathers_secure_post;
            vm.put = feathers_put;
            vm.putSecure = feathers_secure_put;
            vm.delete = feathers_delete;
            vm.deleteSecure = feathers_secure_delete;

            /**
             * Initializes the service with the base url to connect to.
             * @param {string} baseUrl - The first part of the url to connect to.
             */
            function init(baseUrl) {
                vm.baseUrl = baseUrl;
            }

            /**
             * Calls the feathers js generated service to get unsecured data.
             * @param {string} url - The rest part of the Url to call.
             * @param {Object} params - A dictionary of settings used to construct the url.
             * @returns {promise} - The promise that can be resolved with data or rejected.
             */
            function feathers_get(url, params) {
                return callService(url, 'GET', params);
            }

            /**
             * Calls the feathers js generated service to get secured data.
             * @param {string} url - The rest part of the url to call.
             * @param {Object} params - A dictionary of settings used to construct the url.
             * @returns {promise} - The promise that can be resolved with data or rejected.
             */
            function feathers_secure_get(url, params) {
                return callSecureService(url, 'GET', params);
            }

            /**
             * Creates a new record using a call that does not need security.
             * @param {string} url - The rest part of the Url to call.
             * @param {Object} params - A dictionary of settings used to construct the url.
             * @returns {promise} - The promise that can be resolved with data or rejected.
             */
            function feathers_post(url, params) {
                return callService(url, 'POST', params);
            }

            /**
             * Creates a new record using a call that needs security.
             * @param {string} url - The rest part of the Url to call.
             * @param {Object} params - A dictionary of settings used to construct the url.
             * @returns {promise} - The promise that can be resolved with data or rejected.
             */
            function feathers_secure_post(url, params) {
                return callSecureService(url, 'POST', params);
            }

            function feathers_put(url, params) {
                return callService(url, 'PUT', params);
            }

            function feathers_secure_put(url, params) {
                return callSecureService(url, 'PUT', params);
            }

            function feathers_delete(url, params) {
                return callService(url, 'DELETE', params);
            }

            function feathers_secure_delete(url, params) {
                return callSecureService(url, 'DELETE', params);
            }

            function callSecureService(url, method, params) {
                var serviceUrl = constructUrl(url, params);

                var deferred = $q.defer();
                $http({
                    method: method,
                    url: serviceUrl,
                    headers: {
                        'Authorization': params['auth_token']
                    }
                }).then(
                    function(response) {
                        // TODO: Add code to check for errors
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }

            function callService(url, method, params) {
                var serviceUrl = constructUrl(url, params);

                var deferred = $q.defer();
                $http({
                    method: method,
                    url: serviceUrl
                }).then(
                    function(response) {
                        // TODO: Add code to check for errors
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }

            /**
             * Constructs the url used to get data from the REST service.
             * @param {string} url - The rest part of the URL to use not including the base url.
             * @param {Object} params - A dictionary of values used in constructing the url.
             * @returns {string} The final url to use.
             */
            function constructUrl(url, params) {
                var combinedUrl = vm.baseUrl + url;
                combinedUrl += combinedUrl.endsWith("/") === true ? "" : "/";

                if (params['pageSize'] && params['pageNumber']) {
                    var currentPage = params['pageNumber'];

                    var limit = params['pageSize'];
                    // for the 1st page skip should be 0
                    var skip = limit * --currentPage;

                    if (combinedUrl.indexOf('?') === -1)
                        combinedUrl += "?$limit=" + limit + "&$skip=" + skip;
                    else
                        combinedUrl += "&$limit=" + limit + "&$skip=" + skip;
                }

                return combinedUrl;
            }
        };

        service.$inject = ['$http', '$q'];

        app.service('BaseService', service);
    })();
});