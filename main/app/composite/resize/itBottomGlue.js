'use strict';
IteSoft
    .directive('itBottomGlue', ['$window',  function ($window) {
    return function (scope, element) {


        function _onWindowsResize () {
            var newValue = { 'h': $window.innerHeight, 'w': $window.innerWidth };
            var currentElement = element[0];
            var elementToResize = angular.element(element)[0];
            var marginBottom = 0;
            var paddingBottom = 0;
            var  paddingTop = 0;
            var  marginTop =0;
            while(currentElement !== null && typeof currentElement !== 'undefined'){

                var computedStyles = $window.getComputedStyle(currentElement);
                var mbottom = parseInt(computedStyles['margin-bottom'], 10);
                var pbottom = parseInt(computedStyles['padding-bottom'], 10);
                var ptop = parseInt(computedStyles['padding-top'], 10);
                var mtop = parseInt(computedStyles['margin-top'], 10);

                  marginTop = !isNaN(mtop)? mtop : 0;
                marginBottom += !isNaN(mbottom) ? mbottom : 0;
                paddingBottom += !isNaN(pbottom) ? pbottom : 0;
                paddingTop = !isNaN(ptop)? ptop : 0;
                currentElement = currentElement.parentElement;
            }
            var curentElementStyles = $window.getComputedStyle( element[0]);



            var elementToResizeContainer = elementToResize.getBoundingClientRect();
            element.css('height', (newValue.h -
                elementToResizeContainer.top )- (marginBottom)+ 'px' );
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