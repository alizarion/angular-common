/**
 * Created by sza on 22/04/2016.
 */
'use strict';
IteSoft
    .factory('BlockService', ['$resource', 'CONFIG',
        function ($resource, CONFIG) {
            return {
                custom: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/blocks/custom/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                all: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/blocks/all/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                original: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/blocks/original/:name'),
                customByOriginal: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/original/'+CONFIG.CURRENT_PACKAGE+'/:name/custom'),
                restore: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/blocks/restore/'+CONFIG.CURRENT_PACKAGE+'/:name'),
                build: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/packages/build'),
                preview: $resource(
                    CONFIG.REST_TEMPLATE_API_URL + '/api/rest/packages/preview'),
                'new': function (name, ref, position, content, roleAllowed, version) {
                    return {'name': name, 'position': position, 'ref': ref, 'content': content, 'role': roleAllowed, 'version': version};
                },
            }
        }]);