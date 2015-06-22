'use strict';

IteSoft
    .directive('itSideMenuHeader',function(){
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
                button.on('click', function () {

                    if (child.hasClass('it-material-design-hamburger__icon--to-arrow')) {
                        child.removeClass('it-material-design-hamburger__icon--to-arrow');
                        child.addClass('it-material-design-hamburger__icon--from-arrow');
                    } else {
                        child.removeClass('it-material-design-hamburger__icon--from-arrow');
                        child.addClass('it-material-design-hamburger__icon--to-arrow');

                    }
                });

                if(attrs.itButtonMenu){
                    scope.itButtonMenu = scope.$eval(attrs.itButtonMenu);

                }
                scope.$watch(attrs.itButtonMenu, function(newValue, oldValue) {
                    scope.itButtonMenu = newValue;
                });

            },
            template :
                '<nav id="header" class="it-side-menu-header nav navbar navbar-fixed-top navbar-inverse">' +
                    '<section class="it-material-design-hamburger" ng-hide="itButtonMenu">' +
                        '<button it-menu-toggle ng-click="toggleMenu()" class="it-material-design-hamburger__icon  ">' +
                            '<span class="menu-animated it-material-design-hamburger__layer  "> ' +
                            '</span>' +
                        '</button>' +
                    ' </section>' +
                    '<div class="container-fluid" ng-transclude>' +
                    '</div>' +
                '</nav>'
        }
    });