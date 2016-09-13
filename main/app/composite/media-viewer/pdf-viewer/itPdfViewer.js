'use strict';
/**
 * TODO itPdfViewer desc
 */
itPdfViewer.directive('itPdfViewer', ['$log' , 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
    var linker = function (scope, element, attrs) {

        scope.thumbnailCollapsed = false;
        scope.onPassword = function (reason) {
            return prompt("The selected PDF is password protected. PDF.js reason: " + reason, "");
        };

        scope.toggleThumbnail = function () {
            scope.thumbnailCollapsed = !scope.thumbnailCollapsed;
        };

        MultiPagesAddEventWatcher(scope);
    };

    return {
        scope: {
            src: "=",
            options: "="
        },
        restrict: 'E',
        template :
        '<div ui-layout="{ flow : \'column\', dividerSize : 0 }" class="multipage-container">' +
            '<it-progressbar-viewer api="options.$$api" ng-if="options.showProgressbar != false"></it-progressbar-viewer><it-toolbar-viewer  api="options.$$api" ng-if="options.showToolbar != false"></it-toolbar-viewer>' +
            '<div ng-if="options.showThumbnail != false" collapsed="thumbnailCollapsed" ui-layout-container size="210px" class="thumbnail-menu">' +
                '<it-thumbnail-menu-viewer orientation="\'vertical\'" options="options">' +
                    '<div class="ui-splitbar-container-column pull-right"  ng-click="toggleThumbnail()">' +
                        '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-left"></span>' +
                    '</div>' +
                '</it-thumbnail-menu-viewer>' +
            '</div>' +
            '<div ui-layout-container>' +
                '<pdf-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.$$api" options="options" password-callback="onPassword(reason)"></pdf-viewer>' +
            '</div>' +
            '<div class="ui-splitbar-container-column pull-left"  ng-click="toggleThumbnail()" ng-if="thumbnailCollapsed">' +
                '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-right"></span>' +
            '</div>' +
        '</div>',
        link: linker
    };
}]);