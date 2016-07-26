'use strict';

/**
 * @ngdoc directive
 * @name scpas.directive:scpasTabContent
 * @module scpas
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
 *          tab identifier (must be the same that tab id)
 *      </td>
 *  </tr>
 *  </table>
 *  <h1>Exemple</h1>
 *
 *        <scpas-tab
 *          label="'FEATURE.COMPANY.TITLE'"
 *          id="'validate-header-tab-company'">
 *        </scpas-tab>
 *
 **/

IteSoft.component('itsTabContent', {
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