angular.module('itesoft').controller('MasterDetailController',
    ['$scope', 'MasterDetailDataService','$window', function($scope, MasterDetailDataService,$window) {

        $scope.data = [];

        $scope.currentItemWrapper = null;

        $scope.itemChange = function (toto){
            console.log(toto);
        };

        $scope.option = {
            reOrdering : false,
            onlyView : true
        };

//        $scope.priorityGrid = {
//            data: 'dataSource',
//            selectedItems: [],
//            rowTemplate: 'priorityRowTemplate.html',
//            checkboxCellTemplate: 'checkboxCellTemplate.html',//gestion du disabled en édition
//            checkboxHeaderTemplate:'checkboxHeaderTemplate.html',//gestion du disabled en édition
//            rowHeight: 40,
//            enableColumnResize: true,
//            multiSelect: true,
//            enableRowSelection: true,
//            filterOptions: {
//                filterText: '', useExternalFilter: false
//            },
//            showGroupPanel: true,
//            showSelectionCheckbox: true,
//            footerTemplate: 'priorityFooterTemplate.html',
//            showFooter: true,
//            beforeSelectionChange: function() {
//                return $scope.option.onlyView;
//            }
//        };



        $scope.priorityGrid = {
            data: 'dataSource',
            rowHeight: 40,
            multiSelect: true,
            enableRowSelection: true,
            showSelectionCheckbox: true,
            enableSelectAll :true
        };

        $scope.priorityGrid.columnDefs = [{ field: 'code', displayName: 'ASG.PRIORITY.ORDER_COLHEADER',  width: '8%', sortable:true},
            { field: 'description', displayName: 'ASG.PRIORITY.ACTIVE_COLHEADER',  width: '10%', sortable:true},
            { field: 'enabledde', displayName: 'ASG.PRIORITY.DESCRIPTION_COLHEADER',   sortable:true}];

        $scope.dataSource = MasterDetailDataService.data;
        console.log( $scope.dataSource);
        $scope.$watch('currentItemWrapper.currentItem', function(newValue,oldValue){
            if($scope.currentItemWrapper!=null ){
                if(!$scope.currentItemWrapper.isWatched) {
                    $scope.currentItemWrapper.isWatched = true;
                } else {
                    console.log('has change') ;
                    $scope.currentItemWrapper.hasChange = true;
                }
            }
        }, true);

        $scope.displayDetail = function (item,index) {
            console.log('displayDetail') ;
            if($scope.currentItemWrapper != null){
                if($scope.currentItemWrapper.hasChange){
                    alert('please save or undo your selection');
                    return;
                }

            }
            $scope.currentItemWrapper = {
                "currentIndex":index,
                "currentItem" :item,
                "hasChange":false,
                "isWatched":false
            };

        };

        $scope.saveCurrent =  function(){
            if($scope.currentItemWrapper!=null){
                $scope.$broadcast('MASTER_DETAILS_ITEM_SAVED');
            }
        };

        $scope.$on('MASTER_DETAILS_ITEM_SAVED',function(){
            $scope.currentItemWrapper.hasChange =false;
        });

        function confirmLeavePage(e) {
            var confirmed;
            console.log($scope.currentItemWrapper.hasChange);
            if ($scope.currentItemWrapper.hasChange) {
                confirmed = $window.confirm("You have unsaved edits. Do you wish to leave?");
                if (e && !confirmed) {
                    e.preventDefault();
                }
            }
        }


        $scope.$on("$locationChangeStart", confirmLeavePage);

    }]);
