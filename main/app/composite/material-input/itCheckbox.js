'use strict';

IteSoft
    .directive('itCheckbox',function(){
        return {
            restrict: 'A',
            transclude : true,
            replace : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);
                input.wrap('<div class="checkbox"></div>');
                input.wrap('<label></label>');
                input.after('<span class="checkbox-material"><span class="check"></span></span>&nbsp;'+scope.itText);
            },
            scope: {
            	itText: '@'
            }               
        }
});