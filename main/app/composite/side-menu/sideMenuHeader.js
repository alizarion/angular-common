'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenuHeader
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 *
 * @description
 * A container for a side menu header.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}
 *
 * <table class="table">
 *  <tr>
 *   <td><code>it-animate="true | false"</code></td>
 *   <td>Static or animated button.</td>
 *  </tr>
 *  <tr>
 *   <td><code>it-button-menu="true | false"</code></td>
 *   <td>show or hide side menu button</td>
 *  </tr>
 *</table>
 *
 * @usage
 * <it-side-menu-header it-animate="true | false" it-hide-button-menu="true | false">
 * </it-side-menu-header>
 */
IteSoft
    .directive('itSideMenuHeader',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope: true,
            link : function (scope, element, attrs ,sideMenuCtrl) {

                var child = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__layer'));
                var button = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__icon'));

                scope.toggleMenu = sideMenuCtrl.toggleMenu;
                if(attrs.itAnimate === "true") {
                    scope.$watch('showmenu', function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            if (!newValue) {
                                child.removeClass('it-material-design-hamburger__icon--to-arrow');
                                child.addClass('it-material-design-hamburger__icon--from-arrow');
                                $rootScope.$broadcast('it-sidemenu-state', 'opened');
                            } else {
                                child.removeClass('it-material-design-hamburger__icon--from-arrow');
                                child.addClass('it-material-design-hamburger__icon--to-arrow');
                                $rootScope.$broadcast('it-sidemenu-state', 'closed');
                            }
                        }
                    }, true);
                }

                if(attrs.itHideButtonMenu){
                    scope.itHideButtonMenu = scope.$eval(attrs.itHideButtonMenu);

                }
                scope.$watch(attrs.itHideButtonMenu, function(newValue, oldValue) {
                    scope.itHideButtonMenu = newValue;
                    if(newValue){
                        sideMenuCtrl.hideSideMenu();
                    }
                });

            },
            template :
                '<nav id="header" class="it-side-menu-header nav navbar navbar-fixed-top navbar-inverse">' +
                    '<section class="it-material-design-hamburger" ng-hide="itHideButtonMenu">' +
                        '<button  ng-click="toggleMenu()" class="it-material-design-hamburger__icon  ">' +
                            '<span class="menu-animated it-material-design-hamburger__layer  "> ' +
                            '</span>' +
                        '</button>' +
                    ' </section>' +
                    '<div class="container-fluid" ng-transclude>' +
                    '</div>' +
                '</nav>'
        }
    }]);
