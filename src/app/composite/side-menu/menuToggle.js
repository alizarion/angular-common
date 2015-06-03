/**
 *
 */
IteSoft

    .directive('itMenuToggle', ['$animate', function($animate) {
    return  {
        'restrict': 'E',

        compile: function (scope, element, attrs) {
            var child = angular.element(element[0]
                .querySelector('.material-design-hamburger__layer'));
            element.on('click', function () {
                if (child.hasClass('material-design-hamburger__icon--to-arrow')) {
                    $animate.removeClass(child,
                        'material-design-hamburger__icon--to-arrow');
                    $animate.addClass(child,
                        'material-design-hamburger__icon--from-arrow');
                } else {
                    $animate.removeClass(child,
                        'material-design-hamburger__icon--from-arrow');
                    $animate.addClass(child,
                        'material-design-hamburger__icon--to-arrow');
                }
            });
        }
    }
}]);
