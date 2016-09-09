'use strict';

/**
 * @ngdoc service
 * @name itesoft.service:CurrentErrorsService
 * @module itesoft
 * @since 1.2
 *
 * @description
 * Service that keep reference to error inside tabs
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Function
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasFatal(tabId)
 *      </td>
 *      <td>
 *          Return true if there is a fatal inside tab
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasError(tabId)
 *      </td>
 *      <td>
 *          Return true if there is an error inside tab
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasWarning(tabId)
 *      </td>
 *      <td>
 *           Return true if there is a warning inside tab
 *      </td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {
    TabService.onTabChanged(function (selectedTabId) {
              self.isActiveTab = (selectedTabId == self.id);
          });
 }]
 );
 </file>
 </example>
 */

IteSoft.factory('CurrentErrors', [function () {

        function _isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        };

        function _isArrayEmpty(obj) {
            if (!angular.isDefined(obj) || !angular.isArray(obj)) {
                return false;
            }

            return obj.length == 0;
        };

        return {
            //Technical errors
            technicalErrors: [],

            //Error levels
            fatals: {},
            errors: {},
            warnings: {},

            // Errors levels by tabs
            fatalsByTabs: {},
            errorsByTabs: {},
            warningsByTabs: {},

            init: function () {
                this.fatals = {};
                this.errors = {};
                this.warnings = {};
                this.fatalsByTabs = {};
                this.errorsByTabs = {};
                this.warningsByTabs = {};
            },
            hasFatalOrHigher: function () {
                return this.hasFatal() || this.hasTechnical();
            },
            hasTechnical: function () {
                return !_isArrayEmpty(this.technicalErrors);
            },
            hasFatal: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.fatalsByTabs[tab])) {
                        return !_isEmpty(this.fatalsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.fatals);
                }
                return false;
            },
            hasError: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.errorsByTabs[tab])) {
                        return !_isEmpty(this.errorsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.errors);
                }
                return false;
            },
            hasWarning: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.warningsByTabs[tab])) {
                        return !_isEmpty(this.warningsByTabs[tab]);
                    } else {
                        return false;
                    }
                } else {
                    return !_isEmpty(this.warnings);
                }
                return false;
            }
        };
    }]);