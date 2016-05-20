'use strict';
/**
 * TODO itToolbarViewer desc
 */
itMultiPagesViewer.directive('itToolbarViewer', [function(){
    var linker = function (scope, element, attrs) {

        scope.$watch("api.getZoomLevel()", function (value) {
            scope.scale = value;
        });

        scope.$watch("api.getCurrentPage()", function (value) {
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
        '<button ng-click="api.zoomOut()">-</button> ' +
        '<select ng-model="scale" ng-change="onZoomLevelChanged()" ng-options="zoom as zoom.label for zoom in api.zoomLevels">' +
        '</select> ' +
        '<button ng-click="api.zoomIn()">+</button> ' +
        '</div>' +

        '<div class="select_page_wrapper" ng-show="api.getNumPages() > 1">' +
        '<span>Page : </span>' +
        '<button ng-click="api.goToPrevPage()"><</button> ' +
        '<input type="text" ng-model="currentPage" ng-change="onPageChanged()"/> ' +
        '<button ng-click="api.goToNextPage()">></button> ' +
        '<span> of {{api.getNumPages()}}</span>' +
        '</div>' +
        '</div>',
        link: linker
    };
}]);
