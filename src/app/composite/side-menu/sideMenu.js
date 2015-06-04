/**
 *
 */
IteSoft
    .directive('itSideMenu',function(){
        return {
            restrict: 'E',
            require: '^itSideMenu',
            'controller' : '$sideMenuCtrl',
            'transclude' : true,
            'template': '<div class="it-side-menu-left menu-content ' +
                'it-side-menu-left it-side-menu-hide" ' +
                'ng-class="{\'it-hide\':!showmenu,\'it-slide\':showmenu}">' +
                '<div ng-transclude ></div></div>'


        }
});