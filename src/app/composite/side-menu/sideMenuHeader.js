/**
 *

 */
IteSoft
    .directive('itSideMenuHeader',function(){
        return {
            'restrict': 'E',
            'transclude' : true,
            'link' : function (scope, element, attrs ) {
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
            'template': '<div id="header" class="itesoft-header' +
                ' " >' +
                '<section class="it-material-design-hamburger">' +
                '<button it-menu-toggle ng-click="toggleMenu()" ' +
                'class="it-material-design-hamburger__icon">' +
                '<span class="it-material-design-hamburger__layer "> ' +
                '</span></button> </section>' +
                '<div class="row" ng-transclude></div></div>'
        }
    });