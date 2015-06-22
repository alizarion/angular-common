'use strict';

IteSoft
    .directive('itSideMenu',function(){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope:true,
            template :
                '<div class="it-side-menu it-side-menu-left it-side-menu-hide it-menu-animated" ng-class="{\'it-side-menu-hide\':!showmenu,\'it-side-menu-slide\':showmenu}">' +
                   '<div class="nav navbar navbar-inverse">'+
                    '<nav class="" ng-transclude ></nav>' +
                    '</div>'+
                '</div>'


        }
});