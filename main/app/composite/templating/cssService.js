/**
 * Created by dge on 14/12/2015.
 */
'use strict';

IteSoft.factory('CSSService', ['$resource', 'CONFIG', '$http',
    function ($resource, CONFIG, $http) {
        return {
            css: $resource(
                CONFIG.URL + '/css/:packageName/:fileName'),
            }
    }]);