'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenuContent

 * @module itesoft
 * @restrict E
 * @parent itesoft/sideMenus
 *
 * @description
 * A container for a side menu, sibling to an directive.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 * @usage
 * <it-side-menu>
 * </it-side-menu>
 */
IteSoft

    .directive('itSideMenuContent',function(){
        return {
            restrict : 'ECA',
            require : '^itSideMenus',
            transclude : true,
            scope : true,
            template :
                '<div class="it-menu-content menu-animated" ng-class="{\'it-side-menu-overlay\':showmenu}">' +
                    '<div class="it-container it-fill" ng-transclude></div>'+
                '</div>'
        }
    });