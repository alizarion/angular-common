'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itConfig
 * @module itesoft
 * @since 1.1
 * @requires itNotifier
 * @requires $http
 * @requires $location
 *
 * @description
 * This is a configuration provider. It load a json file and let you inject everywhere, you can also override
 * each properties of the configuration through url parameters.
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td><code>configFile</code></td>
 *     <td>app/config/config.json</td>
 *     <td>Allows to override the default url to get JSON configuration object</td>
 * </tr>
 * <tr>
 *     <td><code>defaultNamespace</code></td>
 *     <td>''</td>
 *     <td>Set the default namespace of the configuration file when you use get() function</td>
 * </tr>
 * <tr>
 *     <td><code>allowOverride</code></td>
 *     <td>false</td>
 *     <td>Allows to use URL parameters to override JSON configuration peroperties</td>
 * </tr>
 * </table>
 *
 * For example, to configure and user the itConfig provider :
 *
 *
 * @example
     <example module="itesoft">

         <file name="Controller.js">

            angular.module('itesoft')
                .config(['itConfigProvider', function (itConfigProvider) {
                    //configuration of default values
                    itConfigProvider.defaultNamespace('CaptureOmnicanal');
        			itConfigProvider.allowOverride(true);
        			itConfigProvider.configFile("app/config/config.json.dev");
                }]).controller('Mycontroller',['$scope','itConfig', '$log', function($scope, itConfig, $log) {
					$log.info(itConfig.get()); // retrieve the properties on default namespace CaptureOmnicanal

					$log.info(itConfig.get('common')); // retrieve the properties on namespace common

					$log.info(itConfig.get().baseUrl); // retrieve the propertie baseUrl on default namespace CaptureOmnicanal

                }]);
         </file>
         <file name="index.html">
             <!-- CSS adaptation of ngToast for example purposes. Do not do this in production-->
         </file>
     </example>
 **/
IteSoft.provider('itConfig', [ function itConfigProvider() {
    var allowOverride = false;
    var configFile = 'app/config/config.json';
    var defaultNamespace = null;

    this.allowOverride = function (value) {
        allowOverride = value;
    };

    this.configFile = function (value) {
        configFile = value;
    };

    this.defaultNamespace = function (value) {
        defaultNamespace = value;
    };

    this.$get = ['$http', 'itNotifier', '$location', function ConfigServiceFactory($http, itNotifier, $location) {
        var overrideConfig = $location.search();
        var self = this;
        // Load menu
        $http.get(configFile).then(function (response) {
            if (!allowOverride) {
                baseConfig = response.data;
            } else {
                baseConfig = response.data;
                if ((defaultNamespace != undefined) && (defaultNamespace != null)) {
                    defaultConfig = baseConfig[defaultNamespace];
                    for (var propertyName in defaultConfig) {
                        defaultConfig[propertyName] = overrideConfig[propertyName] || defaultConfig[propertyName];
                    }
                }
            }
        }, function (err) {
            itNotifier.notifyError({content: err.data.Message});
        });


        return {
            get: function (namespace) {
                if ((namespace != null) && (namespace != undefined)) {
                    return baseConfig[namespace];
                } else {
                    if (defaultNamespace != null) {
                        return baseConfig[defaultNamespace];
                    } else {
                        return baseConfig;
                    }
                }
            }
        };
    }];
}]);
