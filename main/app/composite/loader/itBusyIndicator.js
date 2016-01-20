"use strict";

/**
 * @ngdoc directive
 * @name itesoft.directive:itBusyIndicator
 * @module itesoft
 * @restrict EA
 *
 * @description
 * <li>Simple loading spinner displayed instead of the screen while waiting to fill the data.</li>
 * <li>It has 2 usage modes:
 * <ul>
 *     <li> manual : based on "is-busy" attribute value to manage into the controller.</li>
 *     <li> automatic : no need to use "is-busy" attribute , automatically displayed while handling http request pending.</li>
 * </ul>
 * </li>
 *
 * @usage
 * <it-busy-indicator is-busy="true">
 * </it-busy-indicator>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="LoaderDemoController">
     <it-busy-indicator is-busy="loading">
     <div class="container-fluid">
     <div class="jumbotron">
     <button class="btn btn-primary" ng-click="loadData()">Start Loading (manual mode)</button>
    <button class="btn btn-primary" ng-click="loadAutoData()">Start Loading (auto mode)</button>
     <div class="row">
     <table class="table table-striped table-hover ">
     <thead>
     <tr>
     <th>#</th>
     <th>title</th>
     <th>url</th>
     <th>image</th>
     </tr>
     </thead>
     <tbody>
     <tr ng-repeat="dataItem in data">
     <td>{{dataItem.id}}</td>
     <td>{{dataItem.title}}</td>
     <td>{{dataItem.url}}</td>
     <td><img ng-src="{{dataItem.thumbnailUrl}}" alt="">{{dataItem.body}}</td>
     </tr>
     </tbody>
     </table>
     </div>
     </div>
     </div>
     </it-busy-indicator>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft']);
 </file>
 <file name="PhotosService.js">
 angular.module('itesoft-showcase')
 .factory('Photos',['$resource', function($resource){
                                return $resource('http://jsonplaceholder.typicode.com/photos/:id',null,{});
                            }]);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase')
 .controller('LoaderDemoController',['$scope','Photos','$timeout', function($scope,Photos,$timeout) {
        $scope.loading = false;

        var loadInternalData = function () {
            var data = [];
            for (var i = 0; i < 15; i++) {
                var dataItem = {
                    "id" : i,
                    "title": "title " + i,
                    "url" : "url " + i
                };
                data.push(dataItem);
            }
            return data;
        };

        $scope.loadData = function() {
            $scope.data = [];
            $scope.loading = true;

            $timeout(function() {
                $scope.data = loadInternalData();
            },500)
            .then(function(){
                $scope.loading = false;
            });
        }

        $scope.loadAutoData = function() {
            $scope.data = [];
            Photos.query().$promise
            .then(function(data){
                $scope.data = data;
            });
        }
 }]);
 </file>

 </example>
 *
 **/

IteSoft
    .directive('itBusyIndicator', ['$timeout', '$http', function ($timeout, $http) {
        var _loadingTimeout;

        function link(scope, element, attrs) {
            scope.$watch(function () {
                return ($http.pendingRequests.length > 0);
            }, function (value) {
                if (_loadingTimeout) $timeout.cancel(_loadingTimeout);
                if (value === true) {
                    _loadingTimeout = $timeout(function () {
                        scope.hasPendingRequests = true;
                    }, 250);
                }
                else {
                    scope.hasPendingRequests = false;
                }
            });
        }

        return {
            link: link,
            restrict: 'AE',
            transclude: true,
            scope: {
                isBusy:'='
            },
            template:   '<div class="mask-loading-container" ng-show="hasPendingRequests"></div>' +
                '<div class="main-loading-container" ng-show="hasPendingRequests || isBusy"><i class="fa fa-circle-o-notch fa-spin fa-4x text-primary "></i></div>' +
                '<ng-transclude ng-show="!isBusy" class="it-fill"></ng-transclude>'
        };
    }]);