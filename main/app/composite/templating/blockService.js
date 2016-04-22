/**
 * Created by sza on 22/04/2016.
 */
'use strict';
IteSoft
    .factory('BlockService', ['$resource', 'CONFIG',
        function ($resource, CONFIG) {
            return {
                custom: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/blocks/custom/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                all: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/blocks/all/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                original: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/blocks/original/:name'),
                customByOriginal: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/original/'+CONFIG.CURRENT_PACKAGE+'/:name/custom'),
                restore: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/blocks/restore/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                build: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/packages/build'),
                preview: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/packages/preview'),
                'new': function (name, ref, position, content, roleAllowed, version) {
                    return {'name': name, 'position': position, 'ref': ref, 'content': content, 'role': roleAllowed, 'version': version};
                },
            }
        }]);