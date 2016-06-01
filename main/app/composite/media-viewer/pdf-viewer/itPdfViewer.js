'use strict';
/**
 * TODO itPdfViewer desc
 */
itPdfViewer.directive('itPdfViewer', ['$log' , 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
    var linker = function (scope, element, attrs) {
        scope.onPassword = function (reason) {
            return prompt("The selected PDF is password protected. PDF.js reason: " + reason, "");
        };

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
                    //'<pdf-viewer ng-if="options.api.getNumPages() > 1" api="options.thumbnailApi" class="thumbnail-viewer" file="file" src="{{trustSrc(url)}}" initial-scale="fit_width" ></pdf-viewer>' +
                    '<pdf-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.api" initial-scale="{{options.initialScale}}" render-text-layer="{{options.renderTextLayer}}" password-callback="onPassword(reason)"></pdf-viewer>',
        link: linker
    };
}]);