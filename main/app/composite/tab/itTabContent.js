'use strict';

/**
 * @ngdoc directive
 * @name it-tab.directive:itTabContent
 * @module it-tab
 * @since 1.2
 * @restrict E
 *
 * @description
 * Div that represent tab content
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Param
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          view-controller
 *      </td>
 *      <td>
 *          allow to keep a reference to controller view
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          id
 *      </td>
 *      <td>
 *          tab identifier (must be the same that tab id)
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          group-id
 *      </td>
 *      <td>
 *          group identifier (must be the same that group tab id)
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *         content-url
 *      </td>
 *      <td>
 *          Template html url
 *      </td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 <!-- Tab without group id -->
 <it-tab label="'Company'" id="'tab-company'"></it-tab>
 <it-tab label="'Supplier'" id="'tab-supplier'"></it-tab>
 <it-tab label="'Invoice'" id="'tab-invoice'"></it-tab>
 <it-tab-content id="'tab-company'" view-controller="$ctrl"  content-url="'company.html'"></it-tab-content>
 <it-tab-content id="'tab-supplier'" view-controller="$ctrl"  content-url="'supplier.html'"></it-tab-content>
 <it-tab-content id="'tab-invoice'" view-controller="$ctrl"  content-url="'invoice.html'"></it-tab-content>

 <!-- Tab with group id -->
 <it-tab label="'Currency'" group-id="'first-group'" id="'tab-currency'"></it-tab>
 <it-tab label="'Third Party'" group-id="'first-group'" id="'tab-thirdparty'"></it-tab>
 <it-tab label="'Receipt'" group-id="'first-group'" id="'tab-receipt'"></it-tab>
 <it-tab-content group-id="'first-group'" id="'tab-currency'" view-controller="$ctrl"content-url="'currency.html'"></it-tab-content>
 <it-tab-content group-id="'first-group'" id="'tab-thirdparty'" view-controller="$ctrl"  content-url="'thirdparty.html'"></it-tab-content>
 <it-tab-content group-id="'first-group'" id="'tab-receipt'" view-controller="$ctrl"  content-url="'receipt.html'"></it-tab-content>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="company.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;company</p></div>
 </file>
 <file name="supplier.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supplier</p></div>
 </file>
 <file name="invoice.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invoice</p></div>
 </file>
 <file name="currency.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency</p></div>
 </file>
 <file name="thirdparty.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thirdparty</p></div>
 </file>
 <file name="receipt.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;receipt</p></div>
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope','TabService', function($scope,TabService) {
  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { api.onZoomLevelsChanged = function (zoomLevels) { console.log(zoomLevels); } } };
       //activation of tab-currency which is attach to the group 'first-group'
    TabService.changeTab('tab-currency','first-group');
    //activation of tab-company
    TabService.changeTab('tab-supplier');
 }]);
 </file>
 </example>
 */

itTab.component('itTabContent', {
    restrict: 'E',
    bindings: {
        groupId: '=',
        id: '=',
        contentUrl: '=',
        viewController: '='
    },
    template: '<div ng-show="$ctrl.fn.isTabActive()"' +
    '                class="row-height-10 under-tabs-container bloc-border-left">' +
    '           <div id="{{$ctrl.id}}" group-id="{{$ctrl.groupId}}" class="it-scpas-bloc-content-scrollable it-fill' +
    ' content-tab"' +
    '               ng-include="$ctrl.contentUrl"></div>' +
    '           </div>',
    controller: [
        '$rootScope',
        'TabService',
        function ($rootScope,
                  TabService) {

            var self = this;
            self.fn = {
                isTabActive: _isTabActive
            };


            TabService.onTabChanged(function (selectedTabId, groupId) {
                TabService.isTabActive(selectedTabId, groupId);
            });

            function _isTabActive() {
                return TabService.isTabActive(self.id, self.groupId);
            }

        }]
});