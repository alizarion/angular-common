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
    TabService.onTabChanged(function (selectedTabId,groupId) {
              self.isActiveTab = TabService.isTabActive(selectedTabId, groupId);
          });
 }]
 );
 </file>
 </example>
 */

itTab.factory('TabService', [function () {
    var self = this;

    var _DEFAULT_TAB_GROUP = '_IT_DEFAULT_TAB_GROUP';

    self.tabChangedCallBacks = [];
    self.changeTab = _changeTab;
    self.onTabChanged = _onTabChanged;
    self.isTabActive = _isTabActive;
    self.currentActiveTabIds = [];

    /**
     * Change current active tab
     * @param newTabId id of the tab
     * @param groupId id of the group
     * @private
     */
    function _changeTab(newTabId, groupId) {
        console.log('_changeTab (' + newTabId + ',' + groupId + ')' + '] ...');
        if (checkGroupId(groupId)) {
            console.log('before self.currentActiveTabIds[' + _DEFAULT_TAB_GROUP + '] = ' + self.currentActiveTabIds[_DEFAULT_TAB_GROUP]);
            self.currentActiveTabIds[_DEFAULT_TAB_GROUP] = newTabId;
            console.log('after self.currentActiveTabIds[' + _DEFAULT_TAB_GROUP + '] = ' + self.currentActiveTabIds[_DEFAULT_TAB_GROUP]);
        } else {
            self.currentActiveTabIds[groupId] = newTabId;
        }

        console.log('self.currentActiveTabIds[' + groupId + '] = ' + self.currentActiveTabIds[groupId]);
        console.log('self.tabChangedCallBacks = ' + self.tabChangedCallBacks);
        self.tabChangedCallBacks.forEach(function (callBack) {
            if (angular.isDefined(callBack)) {
                console.log('Executing callback [' + callBack + '(' + newTabId + ',' + groupId + ')' + '] ...');
                callBack(newTabId, groupId);
                console.log('Executing callback [' + callBack + '(' + newTabId + ',' + groupId + ')' + '] DONE.');
            }
        });
        console.log('_changeTab (' + newTabId + ',' + groupId + ')' + '] DONE.');

    }

    function checkGroupId(groupId) {
        return !angular.isDefined(groupId) || groupId == null || groupId === '';
    }


    /**
     * Does the tab is active
     * @param tabId the identifier of the tab
     * @param groupId the identifier of the tab group
     * @returns {boolean}
     * @private
     */
    function _isTabActive(tabId, groupId) {
        var result = false;

        if (checkGroupId(groupId)) {
            result = self.currentActiveTabIds[_DEFAULT_TAB_GROUP] === tabId;
        } else {
            result = self.currentActiveTabIds[groupId] === tabId;
        }
        return result;
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
