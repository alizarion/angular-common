'use strict';
/**
 * TODO itImageViewer desc
 */
itImageViewer.directive('itImageViewer', ['$log', 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
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
                     '<image-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}"  api="options.api" initial-scale="{{options.initialScale}}" ></image-viewer>',
         link: linker
     };
 }]);
