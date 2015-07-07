angular.module('itesoft')

    .controller('MasterDetailController', ['$scope', function($scope) {

        $scope.data =
           [
                {
                    "code" : "Code 1",
                    "description": "Description 1",
                    "enabledde" : true
                },
                {
                    "code" : "Code 2",
                    "description": "Description 2",
                    "enabledde" : false
                },
                {
                    "code" : "Code 3",
                    "description": "Description 3",
                    "enabledde" : true
                },
                {
                    "code" : "Code 4",
                    "description": "Description 4",
                    "enabledde" : false
                },
                {
                    "code" : "Code 5",
                    "description": "Description 5",
                    "enabledde" : true
                }
            ];

        $scope.masterDetails = {};

        $scope.masterDetails = {
            columnDefs : [{ field: 'code', displayName: 'ASG.PRIORITY.ORDER_COLHEADER',  width: '8%', sortable:true},
                { field: 'description', displayName: 'ASG.PRIORITY.ACTIVE_COLHEADER',  width: '10%', sortable:true},
                { field: 'enabledde', displayName: 'ASG.PRIORITY.DESCRIPTION_COLHEADER',   sortable:true}]

        };


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
            $scope.$broadcast('unlockCurrentItem');
        };
        $scope.undoChange = function(){
            $scope.masterDetails.undoChangeCurrentItem();
        };

        $scope.addNewItem = function(){
            var newItem =  {
                "code" : "Code " + ($scope.data.length+1) ,
                "description": "Description " + ($scope.data.length+1),
                "enabledde" : true
            };
            $scope.data.push(newItem);
            $scope.masterDetails.setCurrentItem(newItem).then(function(success){
                $scope.$broadcast('lockCurrentItem');
            },function(error){

            });



        }
    }]);
