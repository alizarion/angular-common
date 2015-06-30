'use strict';

IteSoft
    .directive('itViewTitle',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template : '<div class="row"><div class="col-xs-12"><h3 ng-transclude></h3><hr></div></div>'
        }
    });
