'use strict';

IteSoft

    .directive('itMenuToggle', ['$animate', function($animate) {
        return  {
            restrict: 'E',
            compile: ['scope','element','attrs',function (scope, element, attrs) {
                var child = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__layer'));
                element.on('click', function () {
                    if (child.hasClass('it-material-design-hamburger__icon--to-arrow')) {
                        $animate.removeClass(child,
                            'it-material-design-hamburger__icon--to-arrow');
                        $animate.addClass(child,
                            'it-material-design-hamburger__icon--from-arrow');
                    } else {
                        $animate.removeClass(child,
                            'it-material-design-hamburger__icon--from-arrow');
                        $animate.addClass(child,
                            'it-material-design-hamburger__icon--to-arrow');
                    }
                });
            }]
        }
    }]);
