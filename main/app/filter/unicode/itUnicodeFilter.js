/**
 * @ngdoc filter
 * @name itesoft.filter:itUnicode
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * Simple filter that escape string to unicode.
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
             <div ng-controller="myController">
                <p ng-bind-html="stringToEscape | itUnicode"></p>

                 {{stringToEscape | itUnicode}}
             </div>
        </file>
         <file name="Controller.js">
            angular.module('itesoft')
                .controller('myController',function($scope){
                 $scope.stringToEscape = 'o"@&\'';
            });

         </file>
    </example>
 */
IteSoft
    .filter('itUnicode',['$sce', function($sce){
        return function(input) {
            function _toUnicode(theString) {
                var unicodeString = '';
                for (var i=0; i < theString.length; i++) {
                    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
                    while (theUnicode.length < 4) {
                        theUnicode = '0' + theUnicode;
                    }
                    theUnicode = '&#x' + theUnicode + ";";

                    unicodeString += theUnicode;
                }
                return unicodeString;
            }
            return $sce.trustAsHtml(_toUnicode(input));
        };
}]);

