angular.module('itesoft').controller('MainCtrl',['$scope', function($scope) {
	$scope.user = {
		email : 'test@itesoft.com'
	};
    $scope.showCaseData = {};
    $scope.showCaseData.displayMenuButton = false;
}]);