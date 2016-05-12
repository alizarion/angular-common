'use strict';
/**
 * TODO itTiffViewer desc
 */
itTiffViewer.directive('itTiffViewer', ['$sce', function($sce) {
	var linker = function(scope, element, attrs) {

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
					'<tiff-viewer class="multipage-viewer" src="{{trustSrc(src)}}" api="options.api" initial-scale="{{options.initialScale}}" ></tiff-viewer>',
		link: linker

	};
}]);