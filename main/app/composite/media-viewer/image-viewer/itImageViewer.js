'use strict';
/**
 * TODO itImageViewer desc
 */
itImageViewer.directive('itImageViewer', ['$sce', function($sce){
    var linker = function (scope, element, attrs) {
        scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
    };

    return {
        scope: {
            src: "=",
            options: "="
        },
        restrict: 'E',
        template :  '<it-progressbar-viewer api="options.api" ng-if="options.showProgressbar"></it-progressbar-viewer>' +
                    '<it-toolbar-viewer api="options.api" ng-if="options.showToolbar"></it-toolbar-viewer>' +
                    '<image-viewer class="multipage-viewer" src="{{trustSrc(src)}}" api="options.api" initial-scale="{{options.initialScale}}" ></image-viewer>',
        link: linker
    };
}]);
