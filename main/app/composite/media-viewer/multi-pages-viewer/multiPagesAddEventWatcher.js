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

            scope.$watch("options.thumbnailApi", function (thumbnailApi) {
                if(thumbnailApi) {
                    thumbnailApi.onPageClicked = function (pageIndex) {
                        if(scope.options.api) {
                            scope.options.api.goToPage(pageIndex);
                        }
                    };
                }
            });

            scope.$watch("options.api", function (api) {
                if(api) {
                    if(scope.options && scope.options.onApiLoaded) {
                        scope.options.onApiLoaded(api);
                    }

                    api.onPageRotation = function (args) {
                        if(scope.options.thumbnailApi) {
                            scope.options.thumbnailApi.rotatePage(args);
                        }
                    };
                }
            });

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src)
            };
        }
    };
}]);
