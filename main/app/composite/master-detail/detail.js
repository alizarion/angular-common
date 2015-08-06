"use strict";
/**
 * @ngdoc directive
 * @name itesoft:itDetail
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for detail part of the master-detail main content.
 *
 * To use master details directive, add an `<it-master-detail>` parent element. This will encompass all master details content,
 * and have 2 child elements: 1 `<it-master>` for the list selectable content,
 * and `<it-detail>` that display the content of the selected item.
 *
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *   <!-- menu -->
 *   <it-detail>
 *   </it-detail>
 * </it-master-detail>
 * ```
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">
            <it-master-detail>
            <it-master>
                <it-master-header>
                </it-master-header>
            </it-master>
            <it-detail>
            </it-detail>
        </file>
    </example>
 */
IteSoft
    .directive('itDetail',[function() {
        return {
            restrict: 'EA',
            require: '^itMasterDetail',
            transclude: true,
            scope: false,
            template: ' <div ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))"   ng-if="currentItemWrapper.currentItem" class="it-master-detail-slide-left col-md-6" >' +
                '<a href="" ng-if="$parent.$parent.mobile" ng-click="$parent.$parent.$parent.goToMaster()" class="it-material-design-hamburger__icon pull-left"> ' +
                '<span  class="menu-animated it-material-design-hamburger__layer it-material-design-hamburger__icon--to-arrow"> ' +
                '</span>' +
                ' </a>'+

                '<div class="it-fill" ng-transclude>' +
                '</div>' +
                '</div>' +
                '<div  ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))" class="col-md-6 it-fill" ng-if="!currentItemWrapper.currentItem">' +
                '<div class="it-watermark" >{{$itNoDetail}}</div>' +
                '</div>'

        }
    }]);
