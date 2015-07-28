"use strict";
/**
 * @ngdoc directive
 * @name itesoft:itLoader
 * @module itesoft
 * @restrict EA
 *
 * @description
 * Simple loading spinner that handle http request.
 *
 **/
IteSoft
    .directive('itLoader',['$http','$rootScope', function ($http,$rootScope) {
        return {
            restrict : 'EA',
            template : '<span class="fa-stack"> ' +
                            '<i class="fa fa-refresh fa-stack-1x" ng-class="{\'fa-spin\':isLoading}">' +
                            '</i>' +
                        '</span>',
            link : function ($scope) {
                $scope.$watch(function() {
                    if($http.pendingRequests.length>0){
                        $scope.isLoading = true;
                    } else {
                        $scope.isLoading = false;
                    }
                });

            }
        }
    }]
);