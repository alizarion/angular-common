'use strict';
/**
 * TODO itThumbnailMenuViewer desc
 */
itMultiPagesViewer.directive('itThumbnailMenuViewer', ['$log' , 'TranslateViewer', function($log, TranslateViewer){
    var linker = function (scope, element, attrs) {
        scope.model = {};
        scope.model.sizes = [{ label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.SMALL", "small"), value : "small" }, { label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.MEDIUM", "medium"), value : "medium" }, { label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.BIG", "big"), value : "big" }];
        scope.model.currentSize = scope.model.sizes[2];
    };

    return {
        scope : { options : "=", orientation : "=" },
        transclude : true,
        restrict: 'E',
        template :  '<div class="thumbnail-menu-select" ng-if="options.showSizeMenu != false"><select ng-model="model.currentSize" ng-options="size as size.label for size in model.sizes"></select></div>' +
        '<div class="thumbnail-menu-{{orientation}}-{{model.currentSize.value}}" ><it-thumbnail-viewer viewer-api="options.$$api" orientation="orientation" show-num-pages="options.showNumPages"></it-thumbnail-viewer><ng-transclude></ng-transclude></div>',
        link: linker
    };
}]);