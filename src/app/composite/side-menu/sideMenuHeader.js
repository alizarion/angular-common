/**
 *

 */
IteSoft
    .directive('itSideMenuHeader',function(){
        return {
            'restrict': 'E',
            'require' : '^itSideMenu',
            'transclude' : true,
            'template': '<div id="header" class="itesoft-header navbar navbar-inverse" ><button class="itesoft-toggle" it-menu-toggle ng-click="toggleMenu()"></button><div class="row" ng-transclude></div></div>'
        }
    });