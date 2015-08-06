

angular
    .module('itesoft-showcase')
    .controller('LoaderDemoController',['$scope','Photos', function($scope,Photos) {


        $scope.gridOptions = {};
        $scope.gridOptions.data = [];

        $scope.loadMoreData = function(){
            Photos.query().$promise.then(function(datas){
                $scope.gridOptions.data =datas;
            })
        };


    }]);