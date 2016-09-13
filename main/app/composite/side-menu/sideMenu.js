'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenu
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 * @since 1.0
 * @description
 * A container for a side menu, sibling to an {@link itesoft.directive:itSideMenuContent} Directive.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
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
            scope:false,
            link:function(scope, element, attrs ){
                scope.$itSideMenuWidth = attrs.itWidth ? attrs.itWidth : 260;


                scope.$watch(function(){
                    scope.$itSideMenuWidth = attrs.itWidth ? attrs.itWidth : 260;
                });

                var sideMenuHeader = angular.element(document
                    .querySelector('it-side-menu-header'));
                if(!sideMenuHeader[0]){
                   scope.$noMenuHeader = true;
                }

                scope.sideMenuCalc1 = { 'width': (scope.itSideMenuWidth * 1) + (50 * 1) + 'px' };
                scope.sideMenuCalc2 = { 'width': scope.$itSideMenuWidth + 'px' };
            },
            template :
            '<div style="{{$noMenuHeader ? \'top:0px;padding-bottom:0px;left:0px;\':\'\'}}width:{{$itSideMenuWidth}}px;" class="it-side-menu it-side-menu-left it-side-menu-hide it-menu-animated" ng-class="{\'it-side-menu-hide\':!showmenu,\'it-side-menu-slide\':showmenu}">' +
                '<div ng-style="sideMenuCalc1"  class="it-sidebar-inner">' +
                    '<div ng-style="sideMenuCalc2" class="nav navbar navbar-inverse">' +
                    '<nav class="" ng-transclude ></nav>' +
                    '</div>'+
                '</div>'+
            '</div>'
        }
});