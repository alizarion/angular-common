/**
 * Created by dge on 14/12/2015.
 */
'use strict';

IteSoft.factory('JSService', ['$resource', 'CONFIG', '$http',
    function ($resource, CONFIG, $http) {
        return {
            js: $resource(
                CONFIG.URL + '/js/:packageName/:fileName'),
            }
    }]);