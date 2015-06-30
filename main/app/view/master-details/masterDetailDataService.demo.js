'use strict';

angular.module('itesoft').factory('MasterDetailDataService', function () {

    return {
        'data' : [
            {
                'code' : 'Code 1',
                'description': 'Description 1',
                'enabled' : true
            },
            {
                'code' : 'Code 2',
                'description': 'Description 2',
                'enabled' : false
            },
            {
                'code' : 'Code 3',
                'description': 'Description 3',
                'enabled' : true
            },
            {
                'code' : 'Code 4',
                'description': 'Description 4',
                'enabled' : false
            },
            {
                'code' : 'Code 5',
                'description': 'Description 5',
                'enabled' : true
            }
        ]
    }

});

