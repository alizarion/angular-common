angular.module('itesoft').controller('MasterDetailController',
    ['$scope', 'MasterDetailDataService', function($scope, MasterDetailDataService) {

        $scope.data = MasterDetailDataService.data;

        $scope.currentItemWrapper = null;

        $scope.$watch('currentItemWrapper.currentItem', function(newValue,oldValue){
            console.log(newValue);
            console.log(oldValue);

            if($scope.currentItemWrapper!=null ){
                if(typeof newValue !== "undefined" && typeof oldValue !== "undefined") {


                        if (!angular.equals(newValue, oldValue)) {
                            console.log('watch') ;

                            $scope.currentItemWrapper.hasChange = true;
                        }
                }
            }
        }, true);

        $scope.displayDetail = function (item,index) {
            console.log('displayDetail') ;
            if($scope.currentItemWrapper != null){
                if($scope.currentItemWrapper.hasChange){
                    return;
                }

            }
            $scope.currentItemWrapper = {
                "currentIndex":index,
                "currentItem" :item,
                "hasChange":false
            };

        };
        $scope.saveCurrent =  function(){
            if($scope.currentItemWrapper!=null){
                $scope.currentItemWrapper.hasChange =false;
            }
        };


    }]);
