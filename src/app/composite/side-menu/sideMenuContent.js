/**
 *
 */
IteSoft
    .directive('itSideMenuContent',function(){
        return {
            'restrict': 'ECA',
            'require' : '^itSideMenu',
            'controller' : '$sideMenuCtrl',
            'transclude' : true,
            'template': '<div class="itesoft-all"  ng-transclude ' +
                'ng-class="{\'itesoft-hide\':showmenu,\'itesoft-slide\':!showmenu}">' +
                '<div class="itesoft-overlay" ng-class="{show:showmenu}" ' +
                'ng-transclude ng-swipe-left="showmenu=false"></div></div>'
        }
    });