'use strict';
/**
 * TODO itPdfViewer desc
 */
itPdfViewer.directive('itPdfViewer', ['$sce', function($sce) {
	var linker = function (scope, element, attrs) {
		scope.onPassword = function (reason) {
			return prompt("The selected PDF is password protected. PDF.js reason: " + reason, "");
		};

		scope.$watch("src", function (src) {
			if(typeof src === typeof ""){
				scope.url = src;
			}else{
				scope.file = src;
			}
		});

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
					'<pdf-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.api" initial-scale="{{options.initialScale}}" render-text-layer="{{options.renderTextLayer}}" password-callback="onPassword(reason)"></pdf-viewer>',
		link: linker
	};
}]);