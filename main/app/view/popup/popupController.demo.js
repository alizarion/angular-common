angular.module('itesoft-showcase')
    .controller('PopupCtrl',['$scope','itPopup', function($scope,itPopup) {

        $scope.showAlert = function(){
            var alertPopup = itPopup.alert({
                title: 'Don\'t eat that!',
                text: 'It might taste good'
            });
            alertPopup.then(function() {
               alert('alert callback');
            });
        };

        $scope.showConfirm = function(){
            var confirmPopup = itPopup.confirm({
                title: 'Don\'t eat that!',
                text: 'It might taste good'
            });
            confirmPopup.then(function(res) {
                alert('confirm validate');
            },function(){
                alert('confirm canceled');
            });
        };

        $scope.showPrompt = function(){
            var promptPopup = itPopup.prompt({
                title: 'Don\'t eat that!',
                text: 'It might taste good',
                inputLabel : 'Put your value here!!'
            });
            promptPopup.then(function(data) {
                alert('prompt validate with value ' + data.response);
            },function(){
                alert('prompt canceled');
            });
        };

    }]);