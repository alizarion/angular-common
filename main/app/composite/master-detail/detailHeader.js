"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailHeader
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for detail header.
 *
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">

            <it-detail-header>
            </it-detail-header>

        </file>
    </example>
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