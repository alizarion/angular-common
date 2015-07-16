"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailContent
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
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *   </it-detail>
 *
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
    .directive('itDetailContent',function() {
        return {
            restrict: 'EA',
            require: '^itDetail',
            transclude: true,
            scope:false,
            template : '<div class="row it-fill">' +
                '           <div class="col-md-12  it-fill" ng-transclude>'+

                            '</div>'+
                       '</div>'

        }
    });