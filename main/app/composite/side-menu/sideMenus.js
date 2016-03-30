'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenus
 * @module itesoft
 * @restrict ECA
 * @since 1.0
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
 *
 *  <it-side-menu-header it-animate="true"  it-hide-button-menu="true">
 *  </it-side-menu-header>
 *
 *   <!-- Center content -->
 *
 *   <it-side-menu-content>
 *   </it-side-menu-content>
 *
 *   <!-- menu -->
 *
 *
 *   <it-side-menu >
 *   </it-side-menu>
 *
 * </it-side-menus>
 * ```
 * @example
    <example module="itesoft">
        <file name="index.html">

         <it-side-menus>
             <it-side-menu-header it-animate="true"  it-button-menu="true">


             </it-side-menu-header>

             <it-side-menu>
                     <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">


                     <li it-collapsed-item=""   >
                     <a href=""><h5>Menu</h5></a>
                     <ul  class="nav navbar-nav nav-pills nav-stacked it-menu-animated">
                     <li >
                     <a href="#/widget/itloader">SubMenu1</a>
                     </li>
                     <li >
                     <a href="#/widget/itBottomGlue">SubMenu2</a>
                     </li>
                     </ul>
                     </li>
                     </ul>
              </it-side-menu>


             <it-side-menu-content>

                 <h1>See on Plunker !</h1>

             </it-side-menu-content>
         </it-side-menus>

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