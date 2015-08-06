'use strict';
IteSoft
    .directive('itBottomGlue', ['$window',  function ($window) {
    return function (scope, element) {


        function _onWindowsResize () {
            var newValue = { 'h': $window.innerHeight, 'w': $window.innerWidth };
            var elementToResize = angular.element(element)[0];
            var computedStyles = $window.getComputedStyle(element[0]);
            var mtop = parseInt(computedStyles['margin-top'], 10);
            var mbottom = parseInt(computedStyles['margin-bottom'], 10);
            var marginTop = !isNaN(mtop)? mtop : 20;
            var marginBottom = !isNaN(mbottom) ? mbottom : 20;
            var elementToResizeContainer = elementToResize.getBoundingClientRect();
            element.css('height', newValue.h - (elementToResizeContainer.top +marginTop +marginBottom) + 'px' );
            element.css('overflow-y', 'auto');
        }

        scope.$applyAsync(function(){
            _onWindowsResize();
            var w = angular.element($window);
            w.bind('resize', function () {
                _onWindowsResize();
            });
        })

    };

}]);