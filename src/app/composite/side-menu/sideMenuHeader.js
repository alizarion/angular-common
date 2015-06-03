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
                    .querySelector('.material-design-hamburger__layer'));
                var button = angular.element(element[0]
                    .querySelector('.material-design-hamburger__icon'));



                button.on('click', function () {
                    if (child.hasClass('material-design-hamburger__icon--to-arrow')) {

                        child.removeClass('material-design-hamburger__icon--to-arrow');
                        child.addClass('material-design-hamburger__icon--from-arrow');
                    } else {
                        child.removeClass('material-design-hamburger__icon--from-arrow');
                        child.addClass('material-design-hamburger__icon--to-arrow');

                    }
                });
            },
            'template': '<div id="header" class="itesoft-header' +
                ' " >' +
                '<section class="material-design-hamburger">' +
                '<button it-menu-toggle ng-click="toggleMenu()" ' +
                'class="material-design-hamburger__icon">' +
                '<span class="material-design-hamburger__layer "> ' +
                '</span></button> </section>' +
                '<div class="row" ng-transclude></div></div>'
        }
    });