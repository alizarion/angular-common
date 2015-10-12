"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetail
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for detail part of the master-detail main content.
 *
 * To use master details directive, add an {@link itesoft.directive:itMasterDetail `<it-master-detail>`} parent element. This will encompass all master details content,
 * and have 2 child elements: 1 {@link itesoft.directive:itMaster `<it-master>`} for the list selectable content,
 * and {@link itesoft.directive:itDetail `<it-detail>`} that display the content of the selected item.
 *
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *       </it-detail-header>
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 */
IteSoft
    .directive('itDetail',[function() {
        return {
            restrict: 'EA',
            require: '^itMasterDetail',
            transclude: true,
            scope: false,
            template: ' <div ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))"   ng-if="currentItemWrapper.currentItem"  class="it-master-detail-slide-left col-md-{{$masterCol ? (12-$masterCol) : 6}} it-fill" >' +
                '<div class="it-fill" ng-transclude>' +
                '</div>' +
                '</div>' +
                '<div  ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))" class="col-md-{{$masterCol ? (12-$masterCol) : 6}} it-fill" ng-if="!currentItemWrapper.currentItem">' +
                '<div class="it-watermark" >{{$itNoDetail}}</div>' +
                '</div>'
        }
    }]);
