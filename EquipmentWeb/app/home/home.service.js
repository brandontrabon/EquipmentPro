/**
 * @description The service used for the home page.
 */

'use strict';

define(['../app'], function(app) {
    (function() {
        var service = function() {
            var vm = this;

            vm.getData = getData;

            function getData() {
                
            }
        };

        app.service('HomeService', service);
    })();
});