angular.module('itesoft')

    .controller('MasterDetail2Controller', ['$scope','MasterDetailDataService', function($scope,MasterDetailDataService) {

        $scope.data = MasterDetailDataService.data;

        $scope.masterDetails = {};


        function _removeItems(items,dataList){
            angular.forEach(items,function(entry){
                var index = dataList.indexOf(entry);
                dataList.splice(index, 1);
            })
        }

        $scope.deleteSelectedItems = function(){
            _removeItems($scope.masterDetails.getSelectedItems(), $scope.data);
        };

        $scope.saveCurrentItem = function(){
            console.log($scope.masterDetails.getCurrentItem())
        };
        $scope.undoChange = function(){
        $scope.masterDetails.undoCurrentItem();
        }
    }]);
