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
                text: '{{\'POPUP_CONTENT\' | translate}}',
                buttons: [
                    {
                        text:  'toto',
                        type:  'btn-info',
                        onTap: function() {
                            return false;
                        }
                    },
                    {
                        text: 'Cancel',
                        type: '',
                        onTap: function () {
                            return false;
                        }
                    },
                    {
                        text: 'TITI',
                        type: '',
                        onTap: function () {
                            return false;
                        }
                    }
                   ]
            });
            confirmPopup.then(function(res) {
                alert('confirm validate');
            },function(){
                alert('confirm canceled');
            });
        };


        /**
         * Customizing popup button
         */
        $scope.showCustomConfirm = function(){
            var confirmPopup = itPopup.confirm({
                title: 'My Custom title',
                text: '{{\'POPUP_CONTENT\' | translate}}',
                buttons: [
                    {
                        text:  'Custom reject btn',
                        type:  'btn-info',
                        onTap: function() {
                            return false;
                        }
                    },
                    {
                        text: 'Custom resolve btn',
                        type: '',
                        onTap: function () {
                            return true;
                        }
                    },
                    {
                        text: 'My third Button',
                        type: 'btn-danger',
                        onTap: function () {
                            return true;
                        }
                    }
                ]
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