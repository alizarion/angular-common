/**
 * @ngdoc directive
 * @name itesoft.directive:itCompile
 * @module itesoft
 * @restrict EA
 *
 * @description
 * This directive can evaluate and transclude an expression in a scope context.
 *
 * @example
  <example module="itesoft">
    <file name="index.html">
        <div ng-controller="DemoController">
             <div class="jumbotron ">
                 <div it-compile="pleaseCompileThis"></div>
             </div>
    </file>
    <file name="controller.js">
         angular.module('itesoft')
         .controller('DemoController',['$scope', function($scope) {

                $scope.simpleText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                    'Adipisci architecto, deserunt doloribus libero magni molestiae nisi odio' +
                    ' officiis perferendis repudiandae. Alias blanditiis delectus dicta' +
                    ' laudantium molestiae officia possimus quaerat quibusdam!';

                $scope.pleaseCompileThis = '<h4>This is the compile result</h4><p>{{simpleText}}</p>';
            }]);
    </file>
  </example>
 */
IteSoft
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('itCompile', ['$compile',function($compile) {
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        return scope.$eval(attrs.itCompile);
                    },
                    function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    }
                );
            };
        }]);
    }]);
