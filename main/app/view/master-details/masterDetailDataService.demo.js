'use strict';

angular.module('itesoft').factory('MasterDetailDataService', function () {

    return {
        'data' : [
            {
                "code" : "Code 1",
                "description": "Description 1",
                "enabledde" : true
            },
            {
                "code" : "Code 2",
                "description": "Description 2",
                "enabledde" : false
            },
            {
                "code" : "Code 3",
                "description": "Description 3",
                "enabledde" : true
            },
            {
                "code" : "Code 4",
                "description": "Description 4",
                "enabledde" : false
            },
            {
                "code" : "Code 5",
                "description": "Description 5",
                "enabledde" : true
            }
        ]
    }

});

