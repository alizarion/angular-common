
'use strict';

IteSoft.factory('BlockService', ['$resource', 'CONFIG', '$http',
    function ($resource, CONFIG, $http) {
        return {
            custom: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/blocks/custom/:name'),
            original: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/blocks/original/'),
            restore: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/blocks/restore/:name'),
            customByOriginal: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/blocks/custom/:name'),
            build: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/packages/build'),
            preview: $resource(
                CONFIG.REST_TEMPLATE_API_URL + '/packages/preview'),
            'new': function (name, ref, position, content, roleAllowed, version) {
                return {'name': name, 'position': position, 'ref': ref, 'content': content, 'role': roleAllowed, 'version': version};
            }
        }
    }]);