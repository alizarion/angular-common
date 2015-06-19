'use strict';

IteSoft
    .directive('itToggle',function(){
        return {
            restrict: 'A',
            transclude : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);
                input.wrap('<div class="togglebutton"></div>');
                input.wrap('<label>'+scope.itText+'</label>');
                input.after('<span class="toggle"></span>');
            },
            scope: {
            	itModel: '=',
            	itText: '@'
            }
        }
});