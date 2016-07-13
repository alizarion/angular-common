'use strict';
/**
 * TODO itThumbnailViewer desc
 */
itMultiPagesViewer.directive('itThumbnailViewer', ['$log' , 'ThumbnailViewer' , '$timeout', function($log, ThumbnailViewer, $timeout) {
    var pageMargin = 10;

    return {
        restrict: "E",
        scope: {
            viewerApi: "=",
            orientation : "=",
            showNumPages : "="
        },
        controller: ['$scope', '$element', function($scope, $element) {

            $scope.shouldShowNumPages = function () {
                var showNumPages = this.showNumPages;
                if(typeof showNumPages === typeof true) {
                    return showNumPages;
                }

                return true;
            };

            var viewer = new ThumbnailViewer($element);
            $element.addClass('thumbnail-viewer');
            $scope.api = viewer.getAPI();
            $scope.onViewerApiChanged = function () {
                viewer.open($scope.viewerApi, $scope.orientation, $scope.shouldShowNumPages(), pageMargin);
            };

            viewer.hookScope($scope);
        }],
        link: function(scope, element, attrs) {
            scope.$watchGroup(["viewerApi.getNumPages()", "showNumPages"], function() {
                 if (scope.onViewerApiChangedTimeout) $timeout.cancel(scope.onViewerApiChangedTimeout);
                  scope.onViewerApiChangedTimeout = $timeout(function() {
                      scope.onViewerApiChanged()
                  }, 300);
            });
        }
    };
}]);