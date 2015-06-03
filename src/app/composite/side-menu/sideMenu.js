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
            'template': '<div class="itesoft-side-menu-left menu-content ' +
                'itesoft-side-menu-left itesoft-hide" ' +
                'ng-class="{\'itesoft-hide\':!showmenu,\'itesoft-slide\':showmenu}">' +
                '<div ng-transclude ></div></div>'


        }
});