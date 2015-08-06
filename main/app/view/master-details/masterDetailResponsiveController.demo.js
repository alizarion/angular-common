angular.module('itesoft-showcase')

    .controller('MasterDetailResponsiveController', [
        '$scope',
        'screenSize',
        function(
            $scope,
            screenSize
            )
        {
            $scope.activeState = 'master';

            $scope.desktop = screenSize.on('md, lg', function(match){
                $scope.desktop = match;
                $scope.activeState = 'master';
            });
            $scope.mobile = screenSize.on('xs, sm', function(match){
                $scope.mobile = match;
            });

            $scope.goToDetail = function(){
                $scope.activeState = 'detail';
            };

            $scope.goToMaster = function(){
                $scope.activeState = 'master';
            };
        }]);
