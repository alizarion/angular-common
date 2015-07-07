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
            scope : true,
            transclude: true,
            template : '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<div class="btn-toolbar clearfix pull-right" ng-transclude>'+
                                '</div>'+
                            '</div>'+
                       '</div>'
        }

    });