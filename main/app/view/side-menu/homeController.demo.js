angular.module('itesoft-showcase').controller('HomeCtrl',['$scope', function($scope) {
    $scope.user = {
        email : 'test@itesoft.com'
    };
    $scope.showCaseData = {};
    $scope.showCaseData.displayMenuButton = false;

    $scope.signIn = function(form) {
        if(form.$valid) {
            console.log('Sign-In', $scope.user.username);

        }
    };
}]);