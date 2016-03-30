"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailHeader
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for detail header, MUST be include in {@link itesoft.directive:itDetail `<it-detail>`} .
 * for more information see {@link itesoft.directive:itMasterDetail `<it-master-detail>`}.
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
 *           <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="myAction()"><span class="fa fa-plus fa-lg"></span></button>
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
    .directive('itDetailHeader',function() {
        return {
            restrict: 'EA',
            require : '^itDetail',
            scope : false,
            transclude: true,
            template : '<div class="fluid-container"><div class="row it-md-header">'+
                '<div class="col-md-2 it-fill  col-xs-2">' +
                '<a href="" ng-if="$parent.$parent.$parent.mobile" ng-click="$parent.$parent.$parent.$parent.goToMaster()" class="it-material-design-hamburger__icon pull-left it-fill "> ' +
                '<span  class="menu-animated it-material-design-hamburger__layer " ng-class="{\'it-material-design-hamburger__icon--to-arrow\':$parent.$parent.$parent.$parent.mobile}"> ' +
                '</span>' +
                ' </a>'+
                '</div>'+
                '<div class="col-md-10 col-xs-10 it-fill ">'+
                '<div class="btn-toolbar  it-fill pull-right " ng-transclude>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
        }

    });