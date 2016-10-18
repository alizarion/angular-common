'use strict';
/**
 * @ngdoc directive
 * @name it-tab.directive:itTab
 * @module it-tab
 * @since 1.2
 * @restrict E
 *
 *
 * @description
 * Button that represent tab header
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
 *          label
 *      </td>
 *      <td>
 *          Button Label
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          title
 *      </td>
 *      <td>
 *          Button title
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          id
 *      </td>
 *      <td>
 *          tab identifier (must be the same that tab content id)
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          group-id
 *      </td>
 *      <td>
 *          group identifier (must be the same that the id of group tab content )
 *      </td>
 *  </tr>
 *  </table>
 *  <h1>Exemple</h1>
 *
 *        <it-tab
 *          label="'FEATURE.COMPANY.TITLE'"
 *          id="'validate-header-tab-company'">
 *        </it-tab>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 <it-tab label="'Company'" title="'COMPANY'"  id="'tab-company'" class="col-xs-2"></it-tab>
 <it-tab label="'Supplier'" title="'SUPPLIER'" id="'tab-supplier'" class="col-xs-2"></it-tab>
 <it-tab label="'Invoice'" title="'INVOICE'" id="'tab-invoice'" class="col-xs-2"></it-tab>
 <it-tab-content id="'tab-company'" content-url="'company.html'"></it-tab-content>
 <it-tab-content id="'tab-supplier'" content-url="'supplier.html'"></it-tab-content>
 <it-tab-content id="'tab-invoice'" content-url="'invoice.html'"></it-tab-content>


 <!-- Tab with group id -->
 <it-tab label="'Currency'" group-id="'first-group'" title="'CURRENCY'" id="'tab-currency'" class="col-xs-2"></it-tab>
 <it-tab label="'ThirdParty'" group-id="'first-group'" title="'THIRD PARTY'" id="'tab-thirdparty'" class="col-xs-2"></it-tab>
 <it-tab label="'Receipt'" group-id="'first-group'" title="'RECEIPT'" id="'tab-receipt'" class="col-xs-2"></it-tab>
 <it-tab-content group-id="'first-group'" id="'tab-currency'" view-controller="$ctrl"content-url="'currency.html'"></it-tab-content>
 <it-tab-content group-id="'first-group'" id="'tab-thirdparty'" view-controller="$ctrl"  content-url="'thirdparty.html'"></it-tab-content>
 <it-tab-content group-id="'first-group'" id="'tab-receipt'" view-controller="$ctrl"  content-url="'receipt.html'"></it-tab-content>

 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="company.html">
 <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;company </p></div>
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
itTab.component('itTab', {
    bindings: {
        groupId: '=',
        id: '=',
        label: '<',
        title: '<'
    },
    template: '<button class="btn header-tab header-tab-btn full-width label-text-overflow " ng-click="$ctrl.fn.changeTab()"' +
    ' title="{{$ctrl.title |translate}}" ng-disabled="$ctrl.fn.isTabActive()">' +
    '<i class="fa fa-exclamation-triangle color-danger" aria-hidden="true" ng-if="$ctrl.fn.hasError()"></i> ' +
    '<i class="fa fa-exclamation-triangle color-warning" aria-hidden="true" ng-if="$ctrl.fn.hasWarning()"></i>' +
    ' <span class="label-text-overflow"> {{$ctrl.label |translate }} </span>' +
    ' </button>',
    controller: [
        '$rootScope',
        'CurrentErrors',
        'TabService',
        function ($rootScope,
                  CurrentErrors,
                  TabService) {

            var self = this;

            self.fn = {
                isTabActive: _isTabActive,
                hasError: _hasError,
                hasWarning: _hasWarning,
                changeTab: _changeTab
            };

            TabService.onTabChanged(function (selectedTabId, groupId) {
                TabService.isTabActive(selectedTabId, groupId);
            });

            function _isTabActive() {
                return TabService.isTabActive(self.id, self.groupId);
            }

            function _changeTab() {
                TabService.changeTab(self.id, self.groupId);
            }

            function _hasError() {
                return CurrentErrors.hasError(self.id);
            }

            function _hasWarning() {
                return CurrentErrors.hasWarning(self.id);
            }
        }]
})
;