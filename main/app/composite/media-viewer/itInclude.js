'use strict';
/**
 * TODO itInclude desc
 */
angular.module('itesoft.viewer').directive('itInclude', ['$timeout', '$compile', function($timeout, $compile) {
    var linker = function (scope, element, attrs) {
        var currentScope;
        scope.$watch(attrs.itInclude, function (template) {
            $timeout(function () {
                if(currentScope){
                    currentScope.$destroy();
                }
                currentScope = scope.$new();
                element.html( template || '');
                $compile(element.contents())(currentScope);
            }, 50);
        });
    };
    return {
        restrict: 'AE',
        link: linker
    };
}]);
