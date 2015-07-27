

angular
    .module('itesoft-showcase')
    .controller('LoaderDemoController',['$scope','Photos', function($scope,Photos) {


        $scope.datas = [];

        $scope.loadMoreData = function(){
            Photos.query().$promise.then(function(datas){
                $scope.datas = datas;
            })
        };


    }]);