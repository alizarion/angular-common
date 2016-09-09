'use strict';
/**
 * TODO itToolbarViewer desc
 */
itMultiPagesViewer.directive('itToolbarViewer', ['$log', function($log){
    var linker = function (scope, element, attrs) {

        scope.$watch("api.getZoomLevel()", function (value) {
            scope.scale = value;
        });

        scope.$watch("api.getSelectedPage()", function (value) {
            scope.currentPage = value;
        });

        scope.onZoomLevelChanged = function() {
            scope.api.zoomTo(scope.scale);
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
        template :  '<div class="toolbar">' +
        '<div class="zoom_wrapper" ng-show="api.getNumPages() > 0">' +
        '<button type="button" ng-click="api.zoomOut()">-</button> ' +
        '<select ng-model="scale" ng-change="onZoomLevelChanged()" ng-options="zoom as zoom.label for zoom in api.getZoomLevels()">' +
        '</select> ' +
        '<button type="button" ng-click="api.zoomIn()">+</button> ' +
        '</div>' +

        '<div class="select_page_wrapper" ng-show="api.getNumPages() > 1">' +
        '<span>Page : </span>' +
        '<button type="button" ng-click="api.goToPrevPage()"><</button> ' +
        '<input type="text" ng-model="currentPage" ng-change="onPageChanged()"/> ' +
        '<button type="button" ng-click="api.goToNextPage()">></button> ' +
        '<span> of {{api.getNumPages()}}</span> ' +
        '</div>' +

        '<div class="zoom_wrapper" ng-show="api.getNumPages() > 0">' +
        '<button type="button" ng-click="api.rotatePageRight()"><i class="fa fa-repeat" aria-hidden="true"></i></button>' +
        '<button type="button" ng-click="api.rotatePageLeft()"><i class="fa fa-undo" aria-hidden="true"></i></button>' +
        '</div>' +
        '</div>',
        link: linker
    };
}])
