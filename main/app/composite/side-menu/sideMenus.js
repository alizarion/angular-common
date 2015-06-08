'use strict';

IteSoft
    .directive('itSideMenus',function(){
        return {
            restrict: 'ECA',
            transclude : true,
            template : '<div class="it-side-menu-group" ng-transclude></div>'
        }
});