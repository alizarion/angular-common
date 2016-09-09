'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itCircularBtn
 * @module itesoft
 * @since 1.1
 * @restrict AEC
 *
 * @description
 * Provide a circular button like for the full screen button
 *
 * ```html
 *   <it-circular-btn></it-circular-btn>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div ng-controller="HomeCtrl">
     <it-circular-btn><i class="fa fa-expand"></i></it-circular-btn>
     </div>
 </file>
 <file name="Module.js">
    angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl',
     ['$scope',
     function($scope) {

                        }]);
 </file>
 </example>
 */

IteSoft.directive('itCircularBtn',
    [
        function () {
            return {
                restrict: 'ACE',
                scope: false,
                transclude: true,
                template:'<span class="it-circular-button-container ">' +
                '<button class="btn  pull-right" > ' +
                '<div class="it-animated-circular-button">' +
                '<ng-transclude></ng-transclude>' +
                '</div>' +
                '</button> '+
                '</span>'

            }
        }]
);
