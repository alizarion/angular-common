'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesAddEventWatcher', ['$sce', 'DownloadManager', function ($sce, DownloadManager) {
    return function (scope) {
        if(scope){
            scope.$watch("src", function (src) {
                if(typeof src === typeof "") {
                    if(DownloadManager.isValidUrl(src)) {
                        scope.url = src;
                    } else{
                        scope.file = DownloadManager.dataURItoBlob("data:image/png;base64," + src);
                    }
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
