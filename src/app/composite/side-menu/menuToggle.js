IteSoft
    .directive('itMenuToggle', ['$animate', function($animate) {
    return function(scope, element, attrs) {
        element.on('click', function() {
            if(element.hasClass('itesoft-rotate-left')) {
                $animate.removeClass(element, 'itesoft-rotate-left');
                $animate.addClass(element, 'itesoft-rotate-right');

            } else {
                $animate.removeClass(element, 'itesoft-rotate-right');
                $animate.addClass(element, 'itesoft-rotate-left');

            }
        });
    };
}]);
