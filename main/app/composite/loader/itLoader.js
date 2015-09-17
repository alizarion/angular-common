"use strict";


/**
 * @ngdoc directive
 * @name itesoft.directive:itLoader
 * @module itesoft
 * @restrict EA
 *
 * @description
 * Simple loading spinner that handle http request pending.
 *
 *
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">
            <div ng-controller="LoaderDemoController">
                 <div class="jumbotron ">
                 <div class="bs-component">
                 <button class="btn btn-primary" ng-click="loadMoreData()">Load more</button>
                 <it-loader></it-loader>
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
                 <tr ng-repeat="data in datas">
                 <td>{{data.id}}</td>
                 <td>{{data.title}}</td>
                 <td>{{data.url}}</td>
                 <td><img ng-src="{{data.thumbnailUrl}}" alt="">{{data.body}}</td>
                 </tr>
                 </tbody>
                 </table>
                 <div class="btn btn-primary btn-xs" style="display: none;">&lt; &gt;</div></div>
                 </div>
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
                     .controller('LoaderDemoController',['$scope','Photos', function($scope,Photos) {
                            $scope.datas = [];

                            $scope.loadMoreData = function(){
                                Photos.query().$promise.then(function(datas){
                                    $scope.datas = datas;
                                });
                     };
             }]);
         </file>

    </example>
 *
 **/
IteSoft
    .directive('itLoader',['$http','$rootScope', function ($http,$rootScope) {
        return {
            restrict : 'EA',
            scope:true,
            template : '<span class="fa-stack">' +
                            '<i class="fa fa-refresh fa-stack-1x" ng-class="{\'fa-spin\':$isLoading}">' +
                            '</i>' +
                        '</span>',
            link : function ($scope) {
                $scope.$watch(function() {
                    if($http.pendingRequests.length>0){
                        $scope.$applyAsync(function(){
                            $scope.$isLoading = true;
                        });

                    } else {
                        $scope.$applyAsync(function(){
                            $scope.$isLoading = false;
                        });

                    }
                });

            }
        }
    }]
);