angular.module('itesoft-showcase')
    .controller('PopupCtrl',['$scope','itPopup', function($scope,itPopup) {

        $scope.showAlert = function(){
            var alertPopup = itPopup.alert({
                title: '{{\'POPUP_TITLE\' | translate}}',
                text: '{{\'POPUP_CONTENT\' | translate}}'
            });
            alertPopup.then(function() {
               alert('alert callback');
            });
        };

        $scope.showConfirm = function(){
            var confirmPopup = itPopup.confirm({
                title: '{{\'POPUP_TITLE\' | translate}}',
                text: '{{\'POPUP_CONTENT\' | translate}}'
            });
            confirmPopup.then(function(res) {
                alert('confirm validate');
            },function(){
                alert('confirm canceled');
            });
        };

        $scope.showPrompt = function(){
            var promptPopup = itPopup.prompt({
                title: '{{\'POPUP_TITLE\' | translate}}',
                text: '{{\'POPUP_CONTENT\' | translate}}',
                inputLabel : '{{\'POPUP_LABEL\' | translate}}',
                inputType: 'password'
            });
            promptPopup.then(function(data) {
                alert('prompt validate with value ' + data.response);
            },function(){
                alert('prompt canceled');
            });
        };

    }]);