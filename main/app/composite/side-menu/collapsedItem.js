'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itCollapsedItem
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 * @since 1.0
 * @description
 * Directive to collapse grouped item in {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 *
 * <img src="../dist/assets/img/collapsed-item.gif" alt="">
 * @usage
 *  <li>
 *  </li>
 *  <li it-collapsed-item=""  >
 *    <a href=""><h5>Menu Title</h5></a>
 *    <ul  class=" nav navbar-nav  nav-pills nav-stacked it-menu-animated ">
 *        <li>
 *            <a  href="#/datatable">Normal</a>
 *        </li>
 *    </ul>
 *  </li>
 *  <li>
 *  </li>
 */
IteSoft
    .directive('itCollapsedItem', function() {
        return  {
            restrict : 'A',
            link : function ( scope,element, attrs) {
                var menuItems = angular.element(element[0]
                    .querySelector('ul'));
                var link = angular.element(element[0]
                    .querySelector('a'));
                menuItems.addClass('it-side-menu-collapse');
                element.addClass('it-sub-menu');
                var title = angular.element(element[0]
                    .querySelector('h5'));
                var i = angular.element('<i class="pull-right fa fa-angle-right" ></i>');
                title.append(i);
                link.on('click', function () {
                    if (menuItems.hasClass('it-side-menu-collapse')) {
                        menuItems.removeClass('it-side-menu-collapse');
                        menuItems.addClass('it-side-menu-expanded');
                        i.removeClass('fa-angle-right');
                        i.addClass('fa-angle-down');
                        element.addClass('toggled');
                    } else {
                        element.removeClass('toggled');
                        i.addClass('fa-angle-right');
                        i.removeClass('fa-angle-down');
                        menuItems.removeClass('it-side-menu-expanded');
                        menuItems.addClass('it-side-menu-collapse');

                    }
                });

            }
        }
    });
