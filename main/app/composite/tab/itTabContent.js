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
 <it-tab label="'Company'" id="'analyticalCoding-header-tab-company'"></it-tab>
 <it-tab label="'Supplier'" id="'analyticalCoding-header-tab-supplier'"></it-tab>
 <it-tab label="'Invoice'" id="'analyticalCoding-header-tab-invoice'"></it-tab>
 <it-tab-content id="'analyticalCoding-header-tab-company'" view-controller="$ctrl"  content-url="'app/features/settings/view/company.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-supplier'" view-controller="$ctrl"  content-url="'app/features/settings/view/supplier.html'"></it-tab-content>
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

itTab.component('itTabContent', {
        restrict: 'E',
        bindings: {
            id: '=',
            contentUrl: '=',
            viewController: '='
        },
        template: '<div ng-show="$ctrl.isActiveTab"' +
        '                class="row-height-10 under-tabs-container bloc-border-left">' +
        '           <div id="{{$ctrl.id}}" class="it-scpas-bloc-content-scrollable it-fill content-tab"' +
        '               ng-include="$ctrl.contentUrl"></div>' +
        '           </div>',
        controller: ['$rootScope', 'TabService',
            function ($rootScope, TabService) {

                var self = this;
                self.isActiveTab = false;

                self.isActiveTab = (TabService.currentActiveTabId == self.id);

                TabService.onTabChanged(function (selectedTabId) {
                    self.isActiveTab = (selectedTabId == self.id);
                });

            }]
    });