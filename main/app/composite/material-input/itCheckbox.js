'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itCheckbox
 * @module itesoft
 * @restrict A
 *
 * @description
 * The checkbox is no different than the HTML checkbox input,
 * except it's styled differently.
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
            <div>
                 <input it-checkbox type="checkbox" it-label="Checkbox">
            </div>
        </file>
    </example>
 */
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
                input.after('<span class="checkbox-material"><span class="check" style="margin-right:16px;width: '+attrs.width+';height:'+ attrs.height+';"></span></span>&nbsp;'+(attrs.itLabel || ''));
            }
        }
});