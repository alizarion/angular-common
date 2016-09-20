/**
 * Created by sza on 22/04/2016.
 */
'use strict';
IteSoft
    .factory('BlockService', ['$resource', 'itConfig',
        function ($resource, itConfig) {
            return {
                custom: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/blocks/custom/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                all: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/blocks/all/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                original: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/blocks/original/:name'),
                customByOriginal: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/original/' + itConfig.get().CURRENT_PACKAGE + '/:name/custom'),
                restore: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/blocks/restore/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                build: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/packages/build'),
                preview: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/rest/packages/preview'),
                'new': function (name, ref, position, content, roleAllowed, version, removed, element) {
                    return {
                        'name': name,
                        'position': position,
                        'ref': ref,
                        'content': content,
                        'role': roleAllowed,
                        'version': version,
                        'removed': removed == "true" ? true : false,
                        'element': element
                    };
                },
            }
        }]);