'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itConfig
 * @module itesoft
 * @since 1.2
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
 *     <td>Allows to use URL parameters to override JSON configuration peroperties in URL ?key=value&key=value</td>
 * </tr>
 * </table>
 *
 *
 *
 * @example
 <example module="itesoft">
 <file name="Controller.js">
 angular.module('itesoft').config(['itConfigProvider', function (itConfigProvider) {
			//configuration of default values
			itConfigProvider.defaultNamespace('CaptureOmnicanal');
			itConfigProvider.allowOverride(true);
			itConfigProvider.configFile("config.json");
	}]).controller('Mycontroller',['$scope','itConfig', function($scope, itConfig) {
			$scope.config=itConfig;
	}]);
 </file>
 <file name="index.html">
 <!-- CSS adaptation of ngToast for example purposes. Do not do this in production-->
 <div ng-controller="Mycontroller">
 <p>All properties : {{config.get() | json}}</p>
 <p>Other namespace properties : {{config.get('common') | json}}</p>
 <p>One propertie : {{config.get().baseUrl}}</p>
 </div>
 </file>
 <file name="config.json">
 {
     "CaptureOmnicanal" : {
         "baseUrl":"http://test/base"
     },
     "common": {
         "debug":true
     }
 }
 </file>
 </example>
 **/
IteSoft.provider('itConfig', [function itConfigProvider() {
    var allowOverride = false;
    var configFile = 'app/config/config.json';
    var defaultNamespace = null;
    var overrideConfig = undefined;
    var isLoaded = false;
    var baseConfig = undefined;

    this.allowOverride = function (value) {
        allowOverride = value;
    };

    this.configFile = function (value) {
        configFile = value;
    };

    this.defaultNamespace = function (value) {
        defaultNamespace = value;
    };

    this.get = function () {
        if (!isLoaded) {
            return _load(overrideConfig);
        } else {
            return baseConfig[defaultNamespace];
        }
    };

    /**
     * Return query parameter without $location.search
     * @returns {*|{}}
     * @private
     */
    function _getRequestParam() {
        var queryPart = location.search;
        if(queryPart == ""){
            queryPart = location.hash;
        }
        var search = queryPart
            .split(/[&||?]/)
            .filter(function (x) { return x.indexOf("=") > -1; })
            .map(function (x) { return x.split(/=/); })
            .map(function (x) {
                x[1] = x[1].replace(/\+/g, " ");
                return x;
            })
            .map(function (x) {
                if (x[1] == "true") {
                    x[1] = true;
                    return x;
                } else if (x[1] == "false") {
                    x[1] = false;
                    return x;
                } else {
                    return x;
                }
            })
            .reduce(function (acc, current) {
                acc[current[0]] = current[1];
                return acc;
            }, {});
        return search;
    };

    function _load(overrideConfig) {
        var defaultConfig = {};
        if (baseConfig == undefined) {
            overrideConfig = _getRequestParam();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    baseConfig = JSON.parse(xhttp.responseText);
                    isLoaded = true;
                    if (allowOverride) {
                        if ((defaultNamespace != undefined) && (defaultNamespace != null)) {
                            defaultConfig = baseConfig[defaultNamespace];
                            for (var propertyName in defaultConfig) {
                                if (typeof overrideConfig !== 'undefined' && typeof overrideConfig[propertyName] !== 'undefined') {
                                    defaultConfig[propertyName] = overrideConfig[propertyName];
                                }
                            }
                        }
                    }
                    isLoaded = true;
                }
            };
            xhttp.open("GET", configFile, false);
            xhttp.send();
        }
        return defaultConfig;
    }

    this.$get = ['$location', function itConfigFactory($location) {

        var self = this;
        return {
            get: function (namespace) {

                if (!isLoaded) {
                    _load(overrideConfig);
                }

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
