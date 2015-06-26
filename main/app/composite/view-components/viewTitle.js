'use strict';

IteSoft
    .directive('itViewTitle',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template : '<h3 ng-transclude></h3><hr>'
        }
    });
