/**
 * Created by dge on 14/12/2015.
 */
'use strict';

IteSoft.factory('BlockService', ['$resource', 'CONFIG', '$http',
    function ($resource, CONFIG, $http) {
        return {
            custom: $resource(
                CONFIG.URL + '/blocks/custom/:name'),
            original: $resource(
                CONFIG.URL + '/blocks/original/'),
            restore: $resource(
                CONFIG.URL + '/blocks/restore/:name'),
            customByOriginal: $resource(
                CONFIG.URL + '/blocks/custom/:name'),
            build: $resource(
                CONFIG.URL + '/packages/build'),
            preview: $resource(
                CONFIG.URL + '/packages/preview'),
            'new': function (name, ref, position, content, roleAllowed) {
                return {'name': name, 'position': position, 'ref': ref, 'content': content, 'role': roleAllowed};
            }
        }
    }]);