angular.module('itesoft').controller('MasterDetailController',
    ['$scope', 'MasterDetailDataService', function($scope, MasterDetailDataService) {

    $scope.data = MasterDetailDataService.data;

    $scope.displayDetail = function (item) {
      $scope.currentItem = item;
    };

}]);
