/**
 * @description The controller for the home page.
 */

'use strict';

define(['../app'], function(app) {
    (function() {
        var controller = function(HomeService) {
            var vm = this;
            
            vm.data = [
                {
                    "equipmentItemType": {
                        "_id": "1234abcd",
                        "name": "Test Type 1"
                    },
                    "name": "Test Equipment Item 1",
                    "description": "The description for equipment item 1",
                    "startingPrice": "$2500.00",
                    "minimumPrice": "$3000.00",
                    "buyNowPrice": "$4000.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "1234abcd",
                        "name": "Test Type 1"
                    },
                    "name": "Test Equipment Item 2",
                    "description": "The description for equipment item 2",
                    "startingPrice": "$2000.00",
                    "minimumPrice": "$3000.00",
                    "buyNowPrice": "$3500.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "5678efgh",
                        "name": "Test Type 2"
                    },
                    "name": "Test Equipment Item 3",
                    "description": "The description for equipment item 3",
                    "startingPrice": "$1500.00",
                    "minimumPrice": "$2000.00",
                    "buyNowPrice": "$3000.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "5678efgh",
                        "name": "Test Type 2"
                    },
                    "name": "Test Equipment Item 4",
                    "description": "The description for equipment item 4",
                    "startingPrice": "$4000.00",
                    "minimumPrice": "$4200.00",
                    "buyNowPrice": "$5000.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "1234abcd",
                        "name": "Test Type 1"
                    },
                    "name": "Test Equipment Item 5",
                    "description": "The description for equipment item 5",
                    "startingPrice": "$2500.00",
                    "minimumPrice": "$3000.00",
                    "buyNowPrice": "$4000.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "1234abcd",
                        "name": "Test Type 1"
                    },
                    "name": "Test Equipment Item 6",
                    "description": "The description for equipment item 6",
                    "startingPrice": "$2000.00",
                    "minimumPrice": "$3000.00",
                    "buyNowPrice": "$3500.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "5678efgh",
                        "name": "Test Type 2"
                    },
                    "name": "Test Equipment Item 7",
                    "description": "The description for equipment item 7",
                    "startingPrice": "$1500.00",
                    "minimumPrice": "$2000.00",
                    "buyNowPrice": "$3000.00"
                },
                {
                    "equipmentItemType": {
                        "_id": "5678efgh",
                        "name": "Test Type 2"
                    },
                    "name": "Test Equipment Item 8",
                    "description": "The description for equipment item 8",
                    "startingPrice": "$4000.00",
                    "minimumPrice": "$4200.00",
                    "buyNowPrice": "$5000.00"
                }
            ];
        };
        
        controller.$inject = ['HomeService'];
        
        app.controller('HomeController', controller);
    })();
});