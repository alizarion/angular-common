'use strict';

IteSoft
    .directive('itSideMenuContent',function(){
        return {
            restrict : 'ECA',
            require : '^itSideMenus',
            transclude : true,
            scope : true,
            template :
                '<div class="it-menu-content menu-animated" ng-class="{\'it-side-menu-overlay\':showmenu}">' +
                    '<div class="it-container" ng-transclude></div>'+
                '</div>'
        }
    });