'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenuContent
 * @since 1.0
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
            scope : false,
            link : function(scope){
                var sideMenuHeader = angular.element(document
                    .querySelector('it-side-menu-header'));
                if(!sideMenuHeader[0]){
                    scope.showmenu = true;
                }
            },
            template :
                '<div class="it-menu-content"  style="padding-left : {{showmenu ? $itSideMenuWidth : 0}}px">' +
                    '<div class="it-container it-fill" ng-transclude></div>'+
                '</div>'
        }
    });