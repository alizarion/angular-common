
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itNavActive
 * @module itesoft
 * @restrict A
 *
 * @description
 * Directive to set active view css class on side menu item {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 *
 *  <div class="jumborton ng-scope">
 *    <img src="../dist/assets/img/nav-active.gif" alt="">
 *  </div>
 *
 * ```html
 *     <it-side-menu>
 *            <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">
 *                <li>
 *                <a href="#"><h5><i class="fa fa-home fa-fw"></i>&nbsp; Content</h5></a>
 *                </li>
 *                <li>
 *                <a href="#/typo"><h5><i class="fa fa-book fa-fw"></i>&nbsp; Typography</h5></a>
 *                </li>
 *                <li>
 *                <a href=""><h5><i class="fa fa-book fa-fw"></i>&nbsp; Tables</h5></a>
 *                </li>
 *            </ul>
 *
 *     </it-side-menu>
 * ```
 *
 */

IteSoft.
    directive('itNavActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element,attrs) {
                var clazz = attrs.itActive || 'active';
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass(clazz);
                            } else {
                                angular.element(li).removeClass(clazz);
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        }
    }]);