var IteSoft = angular.module('itesoft', ['ngRoute','ui.bootstrap']);

IteSoft.controller('MainCtrl',['$scope', function($scope) {
	$scope.user = {
		email : 'test@itesoft.com'
	}
}]);


