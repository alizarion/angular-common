/**
 * Created by SBN on 01/06/2015.
 */
IteSoft.controller("$sideMenuCtrl",['$scope', function($scope){
    $scope.showmenu=false;
    $scope.toggleMenu = function(){
        $scope.showmenu=($scope.showmenu) ? false : true;
    }
}]);
