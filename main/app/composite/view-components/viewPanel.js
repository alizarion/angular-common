'use strict';

IteSoft
    .directive('itViewPanel',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template : '<div class="jumbotron" ng-transclude></div>'
        }
    });
