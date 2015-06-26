'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenus
 * @module itesoft
 * @restrict ECA
 *
 * @description
 * A container element for side menu(s) and the main content. Allows the left and/or right side menu
 * to be toggled by dragging the main content area side to side.
 *
 * To use side menus, add an `<it-side-menus>` parent element. This will encompass all pages that have a
 * side menu, and have at least 2 child elements: 1 `<it-side-menu-content>` for the center content,
 * and `<it-side-menu>` directives
 *

 *
 * ```html
 * <it-side-menus>
 *   <!-- Center content -->
 *
 *   <it-side-menu-content>
 *   </it-side-menu-content>
 *
 *   <!-- menu -->
 *   <it-side-menu >
 *   </it-side-menu>
 *
 * </it-side-menus>
 * ```
 * @example
    <example module="itesoft">
    <file name="index.html">

    <it-side-menus>

     <it-side-menu-header>
     </it-side-menu-header>

    <!-- Center content -->
    <it-side-menu-content>
    </it-side-menu-content>

    <!-- menu -->
    <it-side-menu >
    </it-side-menu>

    </it-side-menus>
     </file>
 </file>
 </example>
 */
IteSoft
    .directive('itSideMenus',function(){
        return {
            restrict: 'ECA',
            transclude : true,
            controller : '$sideMenuCtrl',
            template : '<div class="it-side-menu-group" ng-transclude></div>'
        }
});