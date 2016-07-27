'use strict';

/**
 * @ngdoc service
 * @name it-tab.service:TabService
 * @module it-tab
 * @since 1.2
 *
 * @description
 * Service that manage tab link to itTab
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
 *          changeTab(newTabId)
 *      </td>
 *      <td>
 *          Change current tab to newTabId
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          onTabChanged
 *      </td>
 *      <td>
 *          CallBack method call when tab changed
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

itTab.factory('TabService', [function () {
        var self = this;
        self.tabChangedCallBacks = [];
        self.changeTab = _changeTab;
        self.onTabChanged = _onTabChanged;
        self.currentActiveTabId = "";

        /**
         * Change current active tab
         * @param newTabId
         * @private
         */
        function _changeTab(newTabId) {
            self.currentActiveTabId = newTabId;
            self.tabChangedCallBacks.forEach(function (callBack) {
                if (angular.isDefined(callBack)) {
                    callBack(newTabId);
                }
            })
        }

        /**
         * Register listener changed
         * @param callBack
         * @private
         */
        function _onTabChanged(callBack) {
            self.tabChangedCallBacks.push(callBack)
        }

        return self;
    }]);
