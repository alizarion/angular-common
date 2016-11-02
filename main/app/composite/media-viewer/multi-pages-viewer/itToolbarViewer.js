'use strict';
/**
 * TODO itToolbarViewer desc
 */
itMultiPagesViewer.directive('itToolbarViewer', ['$log', function($log){
    var linker = function (scope, element, attrs) {

        scope.$watch("api.getMode()", function (value) {
            scope.mode = value;
        });

        scope.$watch("api.getZoomLevel()", function (value) {
            scope.scale = value;
        });

        scope.$watch("api.getSelectedPage()", function (value) {
            scope.currentPage = value;
        });

        scope.onZoomLevelChanged = function() {
            scope.api.zoomTo(scope.scale);
        };

        scope.onModeChanged = function() {
            scope.api.setMode(scope.mode);
        };

        scope.onPageChanged = function() {
            scope.api.goToPage(scope.currentPage);
        };
    };

    return {
        scope: {
            api: "="
        },
        restrict: 'E',
        template :  '<div class="multipage-viewer-toolbar row" ng-show="api.getNumPages() > 0">' +
        '<div class="form-group">' +
        '<select ng-model="mode" class="form-control" ng-change="onModeChanged()" ng-options="mode as mode.label for mode in api.getModes()">' +
        '</select> ' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.zoomOut()">-</button> ' +
        '<select ng-model="scale" class="form-control" ng-change="onZoomLevelChanged()" ng-options="zoom as zoom.label for zoom in api.getZoomLevels()">' +
        '</select> ' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.zoomIn()">+</button> ' +

        '<div class="horizontal-group" ng-show="api.getNumPages() > 1">' +
        '<span>Page : </span>' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.goToPrevPage()"><</button> ' +
        '<input type="text" class="form-control input-page"  ng-model="currentPage" ng-change="onPageChanged()"/> ' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.goToNextPage()">></button> ' +
        '<span> of {{api.getNumPages()}} </span> ' +
        '</div>' +

        ' <button type="button" class="btn btn-sm btn-default" ng-click="api.rotatePageRight()"><i class="fa fa-repeat" aria-hidden="true"></i></button>' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.rotatePageLeft()"><i class="fa fa-undo" aria-hidden="true"></i></button> ' +
        '<button type="button" class="btn btn-sm btn-default" ng-click="api.download()"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>' +
        '</div>' +
        '</div>',
        link: linker
    };
}]);
