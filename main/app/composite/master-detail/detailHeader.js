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
                '<div class="col-md-2 col-xs-2">' +
                '<a href="" ng-if="$parent.$parent.$parent.mobile" ng-click="$parent.$parent.$parent.$parent.goToMaster()" class="it-material-design-hamburger__icon pull-left "> ' +
                '<span  class="menu-animated it-material-design-hamburger__layer " ng-class="{\'it-material-design-hamburger__icon--to-arrow\':$parent.$parent.$parent.$parent.mobile}"> ' +
                '</span>' +
                ' </a>'+
                '</div>'+
                '<div class="col-md-10 col-xs-10">'+
                '<div class="btn-toolbar pull-right " ng-transclude>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
        }

    });