"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailContent
 * @module itesoft
 * @restrict EA
 * @since 1.0
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
    .directive('itDetailContent',function() {
        return {
            restrict: 'EA',
            require: '^itDetail',
            transclude: true,
            scope:false,
            template : '<div class="row it-fill">' +
                ' <div class="col-md-12  it-fill" ng-transclude>'+

                            '</div>'+
                       '</div>'

        }
    });