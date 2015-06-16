'use strict';

IteSoft
    .directive('itSideMenuHeader',function(){
        return {
            restrict: 'E',
            transclude : true,
            link : function (scope, element, attrs ) {
                var child = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__layer'));
                var button = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__icon'));
                button.on('click', function () {

                    if (child.hasClass('it-material-design-hamburger__icon--to-arrow')) {
                        child.removeClass('it-material-design-hamburger__icon--to-arrow');
                        child.addClass('it-material-design-hamburger__icon--from-arrow');
                    } else {
                        child.removeClass('it-material-design-hamburger__icon--from-arrow');
                        child.addClass('it-material-design-hamburger__icon--to-arrow');

                    }
                });
            },
            template :
                '<nav id="header" class="it-side-menu-header nav navbar navbar-fixed-top navbar-inverse" >' +
                    '<section class="it-material-design-hamburger">' +
                        '<button it-menu-toggle ng-click="toggleMenu()" class="it-material-design-hamburger__icon navbar-btn">' +
                            '<span class="menu-animated it-material-design-hamburger__layer "> ' +
                            '</span>' +
                        '</button>' +
                    ' </section>' +
                    '<div class="container-fluid" ng-transclude>' +
                    '</div>' +
                '</nav>'
        }
    });