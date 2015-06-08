'use strict';

IteSoft
    .directive('itSideMenuContent',function(){
        return {
            restrict : 'ECA',
            require : '^itSideMenu',
            controller : '$sideMenuCtrl',
            transclude : true,
            template :
                '<div class="it-menu-content menu-animated "   ng-class="{\'it-side-menu-overlay\':showmenu}">' +
                    '<div class="container" ng-transclude></div>'+
                '</div>'
        }
    });