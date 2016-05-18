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
 * <table class="table">
 *  <tr>
 *  <td><code>it-width="400"  attribute on it-side-menu directive </code></td>
 *   <td>Width of the side menu, in pixels, max value 800.</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-animate="true"  on it-side-menu-header  </code></td>
 *   <td>to animate de side menu open and close button</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-hide-button-menu="true"  on it-side-menu-header  </code></td>
 *   <td>to hide header menu Close/open button</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-side-menu-header </code></td>
 *   <td>headers are optionnal</td>
 *  </tr>
 *  </table>
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

                 <!-- Header Menu-->
                 <div class="collapse navbar-collapse">
                 <div uib-dropdown class="nav navbar-nav navbar-right ">
                 <button class="btn loginButton" type="button" uib-dropdown-toggle>
                 <i class="glyphicon glyphicon-user ">&nbsp;John Doe&nbsp;</i><span class="caret"></span>
                 </button>
                 <ul class="dropdown-menu" role="menu">
                 <li>
                 <a ng-cloak>
                 français
                 <i class="pull-right">
                 </i>
                 </a>
                 </li>
                 <li>
                 <a ng-cloak>
                 anglais
                 <i class="pull-right glyphicon glyphicon-ok">
                 </i>
                 </a>
                 </li>
                 <li>
                 <a ng-cloak>
                 dothraki
                 <i class="pull-right">
                 </i>
                 </a>
                 </li>
                 <li class="divider"></li>
                 <li>
                 <a ng-cloak>
                 logout
                 </a>
                 </li>
                 </ul>
                 </div>
                 </div>
             </it-side-menu-header>

         <it-side-menu it-width="200">
             <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">
             <li it-collapsed-item>
             <a href=""><h5><i class="fa fa-music"></i>&nbsp; Menu 1</h5></a>
             <ul  class="nav navbar-nav nav-pills nav-stacked it-menu-animated">
             <li >
             <a href="#/menu1/sub1" translate>SubMenu 1</a>
             </li>
             <li >
             <a href="#/menu2/sub2" translate>SubMenu 2</a>
             </li>
             </ul>
             </li>
             <li>
             <a href="#/menu2"><h5><i class="fa fa-list"></i>&nbsp; Menu 2</h5></a>
             </li>
             <li>
             <a href="#/menu3"><h5><i class="fa fa-pied-piper-alt"></i>&nbsp; Menu 3</h5></a>
             </li>
             </ul>
         </it-side-menu>


         <it-side-menu-content>

             <div class="container-fluid">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, veritatis, earum ullam accusantium consectetur consequuntur totam enim nemo impedit atque blanditiis ratione eum provident libero illum laboriosam qui amet eius.</p>

             </div>


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