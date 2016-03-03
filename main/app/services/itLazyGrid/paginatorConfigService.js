/**
 * Created by SZA on 20/01/2016.
 */

'use strict';
/**
 * Singleton that provide paginatorConfig
 */
IteSoft.factory('itPaginatorConfigService',
        ['$q', '$log', 'itNotifier', '$filter', 'MetadataService',
            function ($q, $log, itNotifier, $filter, MetadataService) {

                var self = this;
                var deferred = $q.defer();

                /**
                 * fields
                 * @type {{options: Array, defaultOption: string, loaded: boolean}}
                 */
                self.fields = {
                    options: [],
                    defaultOption: "",
                    loaded: false
                };

                /**
                 * public method
                 * @type {{initialize: initialize}}
                 */
                self.fn = {
                    initialize: initialize
                };

                return self;
                /**
                 * filter initialization
                 * @returns {*}
                 */
                function initialize() {
                    if (!self.fields.loaded) {
                        var paginatorOptionsPromise = MetadataService.getConfig.get({type: 'paginatorOptions'}).$promise;
                        var paginatorDefaultOptionPromise = MetadataService.getConfig.get({type: 'paginatorDefaultOption'}).$promise;
                        $q.all([paginatorOptionsPromise, paginatorDefaultOptionPromise]).then(
                            function (options) {
                                self.fields.defaultOption = options[1].value;
                                var paginatorOptions = options[0].value;
                                if (angular.isDefined(paginatorOptions) && paginatorOptions != null && angular.isDefined(paginatorOptions.split)) {
                                    self.fields.options = paginatorOptions.split(',');
                                } else {
                                    itNotifier.notifyError({content: $filter('translate')('ERROR.WS.METADATA_ERROR')}, paginatorOptions);
                                }

                                $log.debug("PaginatorConfigService: loaded");
                                self.fields.loaded = true;
                                deferred.resolve('ok');
                            },
                            function (failed) {
                                itNotifier.notifyError({content: $filter('translate')('ERROR.WS.METADATA_ERROR')}, failed.data);
                            });
                    } else {
                        $log.debug("PaginatorConfigService: loaded");
                        deferred.resolve('ok');
                    }
                    return deferred.promise;

                }

            }
        ]
    );