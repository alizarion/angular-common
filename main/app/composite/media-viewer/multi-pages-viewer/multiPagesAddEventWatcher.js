'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesAddEventWatcher', ['$sce', function ($sce) {
    return function (scope) {
        if(scope){
            scope.$watch("src", function (src) {
                if(typeof src === typeof "") {
                    scope.url = src;
                }else{
                    scope.file = src;
                }
            });

            scope.$watch("options.$$api", function (api) {
                if(api) {
                    scope.options.getApi = function() {
                        return api;
                    };
                    if(scope.options && scope.options.onApiLoaded) {
                        scope.options.onApiLoaded(api);
                    }
                }
            });

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src)
            }; 
        }
    };
}]);