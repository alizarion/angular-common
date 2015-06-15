'use strict';

IteSoft
    .directive('itToggle',function(){
        return {
            restrict: 'E',
            transclude : true,
            link : function (scope, element, attrs ) {
                
            },
            scope: {
            	itModel: '=',
            	itText: '@'
            },
            template :
               '<div class="togglebutton"><label>'
               +'<input type="checkbox" ng-model="itModel"/>'
               +'<span class="toggle"></span> {{ itText }}' 
               +'</label></div>'
        }
});