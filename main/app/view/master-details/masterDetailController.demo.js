angular.module('itesoft-showcase')

    .controller('MasterDetailController', ['$scope','Comments', function($scope,Comments) {
        $scope.data = [];
        $scope.data =  Comments.query();


        $scope.masterDetails = {};

        $scope.masterDetails = {
            columnDefs : [{ field: 'name', displayName: 'BUTTON_LANG_EN', headerCellFilter:'translate', width: '20%', sortable:true},
                { field: 'email', displayName: 'Email ',  width: '10%', sortable:true},
                { field: 'body', displayName: 'Comments body',  width: '30%', sortable:true},
                { field: 'enabledde', displayName: 'My value 3', cellTemplate:'cellTemplate.html',  sortable:false}]

        };

        $scope.masterDetails.navAlert = {
            text:'{{\'BUTTON_LANG_EN\' | translate}}',
            title:'{{\'FOO\' | translate}}'
        };

        function _removeItems(items,dataList){
            console.log(items);
            console.log('item drop');
            angular.forEach(items,function(entry){
                var index = dataList.indexOf(entry);
                dataList.splice(index, 1);
            })
        }

        $scope.deleteSelectedItems = function(){
            console.log($scope.masterDetails);
            var items =$scope.masterDetails.getSelectedItems();
            _removeItems(items, $scope.data);
        };

        $scope.saveCurrentItem = function(){
            $scope.$broadcast('unlockCurrentItem');
        };
        $scope.undoChange = function(){
            $scope.masterDetails.undoChangeCurrentItem();
            $scope.masterDetails.fillHeight();
        };

        $scope.addNewItem = function(){
            var newItem =  {
                "code" : "Code " + ($scope.data.length+1) ,
                "description": "Description " + ($scope.data.length+1),
                "enabledde" : true
            };
            $scope.data.push(newItem);
            $scope.masterDetails.setCurrentItem(newItem).then(function(success){
                $scope.$broadcast('lockCurrentItem',false);
            },function(error){

            });
        };
        $scope.retrieveClass = function(activation) {
            return 'fa fa-circle-o';
        };


        $scope.hasChanged = function(){
            if($scope.masterDetails.getCurrentItemWrapper() != null){
                return $scope.masterDetails.getCurrentItemWrapper().hasChanged;
            } else {
                return false;
            }
        }
    }]);
