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
IteSoft.factory('itHttpLoaderInterceptor'
    ,['$q',
        '$rootScope',
        '$log',
        function ($q, $rootScope) {

            var numLoadings = 0;

            return {
                request: function (config) {
                    numLoadings++;
                    $rootScope.$broadcast("it_loader_show");
                    return config || $q.when(config)
                },
                response: function (response) {
                    if ((--numLoadings) === 0) {
                        $rootScope.$broadcast("it_loader_hide");
                    }
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    if (!(--numLoadings)) {
                        $rootScope.$broadcast("it_loader_hide");
                    }
                    return $q.reject(response);
                }
            };
        }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('itHttpLoaderInterceptor');
    }])
    .directive('itLoader', function () {
        return {
            restrict : 'EA',
            template : '<span class="fa-stack"> ' +
                            '<i class="fa fa-refresh fa-stack-1x" >' +
                            '</i>' +
                        '</span>',
            link : function ($scope, element) {
                var spinner = angular.element(element[0].querySelector('i'));
                $scope.$on('it_loader_show', function () {
                    spinner.addClass('fa-spin');
                });
                return $scope.$on('it_loader_hide', function () {
                    spinner.removeClass('fa-spin');
                });

            }
        }
    }
);