'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itToggle
 * @module itesoft
 * @restrict A
 *
 * @description
 * A toggle is an animated switch which binds a given model to a boolean.
 * Allows dragging of the switch's nub.
 *
 *
 * ```html
 *     <input  it-toggle type="checkbox" it-label="Toggle button">
 * ```
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
            <div>
                <input  it-toggle type="checkbox" ng-model="data" it-label="Toggle button">
            </div>
        </file>

    </example>
 */
IteSoft
    .directive('itToggle',['$compile',function($compile){
        return {
            restrict: 'A',
            transclude : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);
                input.wrap('<div class="togglebutton"></div>');
                if (scope.itLabel == undefined) {
                    input.wrap('<label></label>');
                    input.after('<span class="toggle"></span>');
                } else {
                    input.wrap('<label></label>');
                    input.after('<span class="toggle"></span><span>'+(scope.itLabel || '')+'</span>');

                    scope.$watch('itLabel', function(value) {
                        if ((value) && (input.context)) {
                            var label = angular.element(input.context.parentNode);
                            if ((label) && (attrs.itLabel)) {
                                var labelText = angular.element(label.get(0).firstChild);
                                labelText.get(0).textContent = value+'  ';
                            }
                        }
                    });
                }
            },
            scope: {
                itLabel: '@'
            }
        }
}]);