
'use strict';

/**
 * @ngdoc service
 * @name dependencies.service:localStorage
 * @module dependencies
 * @restrict AE
 * @since 1.1
 * @description
 *
 * An Angular module that gives you access to the browsers local storage
 * See more :  {@link https://github.com/grevory/angular-local-storage angular-local-storage }
 *
 * @example
 <example module="itesoft">
         <file name="index.html">
         <div ng-controller="mainController">
             <h3 id="example_-storage-type-{{storagetype}}"> storage type : {{storageType}} </h3>

             <div class="form-group">
             <input it-input class="form-control floating-label"   required="" ng-minlength="5"  ng-maxlength="10" type="text" it-label="saveThis" name="saveThis" ng-model="saveThis">
             </div>

             <button ng-click="write()">save it !</button>

             <h1>Last saved value for key 'demo' : {{lsKeys}}</h1>
         </div>
         </file>
         <file name="Controller.js">
         angular.module('itesoft').config(['localStorageServiceProvider',function (localStorageServiceProvider) {
                 localStorageServiceProvider
                   .setPrefix('itesoft')
                   .setNotify(true, true);
                // localStorageServiceProvider
                //  .setStorageType('sessionStorage');
               }])
             .controller('mainController', ['$scope','localStorageService', function ($scope,localStorageService) {
                     $scope.storageType = localStorageService.getStorageType(); //e.g localStorage

                      $scope.read = function(){
                       $scope.lsKeys = localStorageService.get('demo');
                      }

                    $scope.write = function () {
                         console.log('saved');
                        localStorageService.set('demo', $scope.saveThis);
                        $scope.read();
                    }
                     $scope.read();
            }]);
         </file>

 </example>
 */