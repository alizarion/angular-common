'use strict';

IteSoft
    .controller("$sideMenuCtrl",['$scope', function($scope){
    $scope.showmenu=false;
    $scope.toggleMenu = function(){
        $scope.showmenu=($scope.showmenu) ? false : true;
    }
}]);
