'use strict';

/**
 * @ngdoc service
 * @name itesoft.service:TabService
 * @module itesoft
 *
 * @description
 * Service that manage tab
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
 *  <h1>Exemple</h1>
 *
 * TabService.onTabChanged(function (selectedTabId) {
 *               self.isActiveTab = (selectedTabId == self.id);
 *           });
 *
 **/

IteSoft.factory('TabService', [function () {
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
