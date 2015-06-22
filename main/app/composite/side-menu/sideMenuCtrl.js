'use strict';

IteSoft
    .controller("$sideMenuCtrl",['$scope', function($scope){
        var _self = this;
        _self.scope = $scope;

        _self.scope.showmenu = false;
        _self.toggleMenu = function(){
            _self.scope.showmenu=(_self.scope.showmenu) ? false : true;
        }
    }]);
