/**
 *

 */
IteSoft
    .directive('itSideMenuHeader',function(){
        return {
            'restrict': 'E',
            'require' : '^itSideMenu',
            'transclude' : true,
            'template': '<div id="header" class="itesoft-header navbar navbar-inverse" >' +
                '<section class="material-design-hamburger"> <button it-menu-toggle ng-click="toggleMenu()" class="material-design-hamburger__icon">' +
                '<span class="material-design-hamburger__layer"> </span></button> </section><div class="row" ng-transclude></div></div>'
        }
    });