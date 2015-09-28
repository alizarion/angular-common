'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenu
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 *
 * @description
 * A container for a side menu, sibling to an {@link itesoft.directive:itSideMenuContent} Directive.
 * see {@link itesoft.directive:itSideMenu `<it-side-menu>`}.
 *
 * @usage
 * <it-side-menu>
 * </it-side-menu>
 */
IteSoft
    .directive('itSideMenu',function(){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope:true,
            template :
                '<div class="it-side-menu it-side-menu-left it-side-menu-hide it-menu-animated" ng-class="{\'it-side-menu-hide\':!showmenu,\'it-side-menu-slide\':showmenu}">' +
                   '<div class="it-sidebar-inner">'+
                        '<div class="nav navbar navbar-inverse">'+
                        '<nav class="" ng-transclude ></nav>' +
                        '</div>'+
                    '</div>'+
                '</div>'


        }
});