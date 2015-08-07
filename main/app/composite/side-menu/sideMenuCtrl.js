'use strict';

IteSoft
    .controller("$sideMenuCtrl",['$scope','$timeout','$window', function($scope,$timeout,$window){
        var _self = this;
        _self.scope = $scope;

        _self.scope.showmenu = false;
        _self.toggleMenu = function(){

            _self.scope.showmenu=(_self.scope.showmenu) ? false : true;

            $timeout(function(){
                $window.dispatchEvent(new Event('resize'));
            },300)
        };
        _self.hideSideMenu = function(){
            _self.scope.showmenu= false;
        }
    }]);
