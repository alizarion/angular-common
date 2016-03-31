
'use strict';

/**
 * @ngdoc service
 * @name dependencies.service:screenSize
 * @module dependencies
 * @restrict AE
 * @since 1.0
 * @description
 * Provides an Angular service that returns true if the current screen width matches or false if not. Uses the screen widths predefined in Twitter Bootstrap 3 or a customized size you define.
 * There is a staic method is which checks for a match on page load and a dynamic method on which checks for a match and updates the value on window resize.
 * See more :  {@link https://github.com/jacopotarantino/angular-match-media angular-match-media}
 * @example
     <example module="itesoft">
        <file name="index.html">
            <div ng-controller="mainController">
                <h2> is mobile : {{isMobile}}</h2>
                <div> Your screen size is: {{ '' | media }} </div>
            </div>
        </file>
         <file name="Controller.js">
         angular.module('itesoft')
             .controller('mainController', ['screenSize','$scope', function (screenSize,$scope) {
              $scope.isMobile = screenSize.on('xs, sm', function(isMatch){
                $scope.isMobile = isMatch;
              });
          }]);
         </file>
    </example>
 */