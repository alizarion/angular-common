angular.module('itesoft-showcase').controller('HomeCtrl',['$scope', function($scope) {
    $scope.user = {
        email : 'test@itesoft.com'
    };
    $scope.showCaseData = {};
    $scope.showCaseData.displayMenuButton = false;

    $scope.signIn = function(form) {
        console.log( $scope);
        if(form.$valid) {
            console.log('Sign-In', $scope.user.username);

        }
    };
}]);