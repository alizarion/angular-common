'use strict';
/**
 * TODO itThumbnailMenuViewer desc
 */
itMultiPagesViewer.directive('itThumbnailMenuViewer', ['$log' , 'TranslateViewer', function($log, TranslateViewer){
    var linker = function (scope, element, attrs) {
        scope.model = {};
        scope.model.sizes = ["small", "medium", "big"];
        scope.model.currentSize = scope.model.sizes[2];
    };

    return {
        scope : { options : "=", orientation : "=" },
        transclude : true,
        restrict: 'E',
        template :  '<div class="thumbnail-menu-select" ng-if="options.showSizeMenu != false"><select ng-model="model.currentSize" ng-options="size as size for size in model.sizes"></select></div>' +
        '<div class="thumbnail-menu-{{orientation}}-{{model.currentSize}}" ><it-thumbnail-viewer viewer-api="options.$$api" orientation="orientation" show-num-pages="options.showNumPages"></it-thumbnail-viewer><ng-transclude></ng-transclude></div>',
        link: linker
    };
}]);