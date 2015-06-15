'use strict';

IteSoft
    .directive('itCheckbox',function(){
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
               '<div class="checkbox"><label>'
               +'<input type="checkbox" ng-model="itModel"/>'
               +'<span class="checkbox-material"><span class="check"></span></span> {{ itText }}' 
               +'</label></div>'               
        }
});