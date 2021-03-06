/**
 * @description The controller for the list page.
 */

'use strict';

define(['../app'], function(app) {
    (function() {
        var controller = function(ListService) {
            var vm = this;
            
            vm.data = [];
            
            ListService.getData();
        };
        
        controller.$inject = ['ListService'];
        
        app.controller('ListController', controller);
    })();
});