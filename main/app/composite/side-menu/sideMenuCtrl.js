'use strict';

IteSoft
    .controller("$sideMenuCtrl",[
        '$scope',
        '$document',
        '$timeout'
        ,'$window',
        function($scope,
                 $document,
                 $timeout,
                 $window){
        var _self = this;
        _self.scope = $scope;

        _self.scope.showmenu = false;
        _self.toggleMenu = function(){

            _self.scope.showmenu=(_self.scope.showmenu) ? false : true;

            $timeout(function(){
                var event = document.createEvent('Event');
                event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                $window.dispatchEvent(event);
            },300)
        };
        _self.hideSideMenu = function(){
            _self.scope.showmenu= false;
        }
    }]);
