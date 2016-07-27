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
 *          id
 *      </td>
 *      <td>
 *          tab identifier (must be the same that tab content id)
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
 <it-tab label="'Company'" id="'analyticalCoding-header-tab-company'"></it-tab>
 <it-tab label="'Supplier'" id="'analyticalCoding-header-tab-supplier'"></it-tab>
 <it-tab label="'Invoice'" id="'analyticalCoding-header-tab-invoice'"></it-tab>
 <it-tab-content id="'analyticalCoding-header-tab-company'" view-controller="$ctrl"  content-url="'app/features/settings/view/company.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-supplier'" view-controller="$ctrl"   content-url="'app/features/settings/view/supplier.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-invoice'" view-controller="$ctrl"  content-url="'app/features/settings/view/invoice.html'"></it-tab-content>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { api.onZoomLevelsChanged = function (zoomLevels) { console.log(zoomLevels); } } }; }]);
 </file>
 </example>
 */
itTab.component('itTab', {
        bindings: {
            id: '=',
            label: '='
        },
        template: '<button class="btn header-tab full-width " ng-click="$ctrl.changeTab()"' +
        ' title="{{\'ACCOUNTING_CODING.PAYMENT.TITLE\' |translate }}" ng-disabled="$ctrl.isActiveTab"> <i class="fa' +
        ' fa-exclamation-triangle color-danger" aria-hidden="true" ng-if="$ctrl.hasError()"></i> ' +
        '<i class="fa fa-exclamation-triangle color-warning" aria-hidden="true" ng-if="$ctrl.hasWarning()"></i> <span> {{$ctrl.label |translate }} </span> </button>',
    controller
:
['$rootScope',  'CurrentErrors', 'TabService', function ($rootScope, CurrentErrors, TabService) {

    var self = this;
    self.isActiveTab = false;

    self.hasError = _hasError;
    self.hasWarning = _hasWarning;
    self.changeTab = _changeTab;

    self.isActiveTab = (TabService.currentActiveTabId == self.id);
    TabService.onTabChanged(function (selectedTabId) {
        self.isActiveTab = (selectedTabId == self.id);
    });

    function _changeTab() {
        TabService.changeTab(self.id);
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