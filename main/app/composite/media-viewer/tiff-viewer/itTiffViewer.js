'use strict';
/**
 * TODO itTiffViewer desc
 */
itTiffViewer.directive('itTiffViewer', ['$log', 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
    var linker = function(scope, element, attrs) {
        MultiPagesAddEventWatcher(scope);
    };

    return {
        scope: {
            src: "=",
            options: "="
        },
        restrict: 'E',
        template :  '<it-progressbar-viewer api="options.api" ng-if="options.showProgressbar"></it-progressbar-viewer>' +
                    '<it-toolbar-viewer api="options.api" ng-if="options.showToolbar"></it-toolbar-viewer>' +
                    //'<tiff-viewer ng-if="options.api.getNumPages() > 1" api="options.thumbnailApi" class="thumbnail-viewer" file="file" src="{{trustSrc(url)}}" initial-scale="fit_width" ></tiff-viewer>' +
                    '<tiff-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.api" initial-scale="{{options.initialScale}}" ></tiff-viewer>',
        link: linker

    };
}]);