'use strict';

IteSoft
    .directive('itSideMenuHeader',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope: true,
            link : function (scope, element, attrs ,sideMenuCtrl) {

                var child = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__layer'));
                var button = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__icon'));

                scope.toggleMenu = sideMenuCtrl.toggleMenu;

                scope.$watch('showmenu',function(newValue,oldValue){
                    if(newValue!=oldValue ){
                    if (!newValue) {
                        child.removeClass('it-material-design-hamburger__icon--to-arrow');
                        child.addClass('it-material-design-hamburger__icon--from-arrow');
                        $rootScope.$broadcast('it-sidemenu-state', 'opened');
                    } else {
                        child.removeClass('it-material-design-hamburger__icon--from-arrow');
                        child.addClass('it-material-design-hamburger__icon--to-arrow');
                        $rootScope.$broadcast('it-sidemenu-state', 'closed');
                    }
                    }
                },true);


                if(attrs.itButtonMenu){
                    scope.itButtonMenu = scope.$eval(attrs.itButtonMenu);

                }
                scope.$watch(attrs.itButtonMenu, function(newValue, oldValue) {
                    scope.itButtonMenu = newValue;
                    if(newValue){
                        sideMenuCtrl.hideSideMenu();
                        _toggleButton();
                    }
                });

            },
            template :
                '<nav id="header" class="it-side-menu-header nav navbar navbar-fixed-top navbar-inverse">' +
                    '<section class="it-material-design-hamburger" ng-hide="itButtonMenu">' +
                        '<button  ng-click="toggleMenu()" class="it-material-design-hamburger__icon  ">' +
                            '<span class="menu-animated it-material-design-hamburger__layer  "> ' +
                            '</span>' +
                        '</button>' +
                    ' </section>' +
                    '<div class="container-fluid" ng-transclude>' +
                    '</div>' +
                '</nav>'
        }
    }]);
