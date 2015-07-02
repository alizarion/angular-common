'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterDetail
 * @module itesoft
 * @restrict EA
 *
 * @description
 * A container element for master-detail main content.
 *
 * To use master details directive, add an `<it-master-detail>` parent element. This will encompass all master details content,
 * and have 2 child elements: 1 `<it-master>` for the list selectable content,
 * and `<it-detail>` that display the content of the selected item.
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
    <example module="itesoft">
        <file name="index.html">
         <it-master-detail>
            <it-master>
               <it-master-header>
               </it-master-header>
            </it-master>

            <it-detail>
                <it-detail-header>
                </it-detail-header>
            </it-detail>

         </it-master-detail>
        </file>
    </example>
 */
IteSoft
    .directive('itMasterDetail',function(){
        return {
            restrict: 'EA',
            transclude : true,
            scope:false,
            template : '<div class="row" ng-transclude></div>'
        }
    });