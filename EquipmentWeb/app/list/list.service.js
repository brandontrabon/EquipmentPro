/**
 * @description The service used for the list page.
 */

'use strict';

define(['../app'], function(app) {
    (function() {
        var service = function(BaseService) {
            var vm = this;

            BaseService.init('http://localhost:3030/');
            
            vm.getData = getData;
            
            function getData() {
                BaseService.get('equipmentItems', {}).then(
                    function(response) {
                        console.log(response);
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            }
        };

        service.$inject = ['BaseService'];
        
        app.service('ListService', service);
    })();
});