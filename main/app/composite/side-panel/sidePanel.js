'use strict';
IteSoft
    .directive('itSidePanel', ['FilterViewService', function (FilterViewService) {
        function _link(scope) {
            scope.filterViewService = FilterViewService;
        }
        return {
            scope: {
                changeHandler: '&clear'
            },
            link: _link,
            restrict: 'AE',
            transclude: true,
            template: '<div class="side-panel panel-filters animate-show" ng-class="{\'side-panel-show\': filterViewService.getShowFilter() && filterViewService.needFilters}"> </div> <div class="side-panel-top panel-filters vertical-text animate-show" ng-class="{\'side-panel-right\':filterViewService.getShowFilter() && filterViewService.needFilters,\'side-panel-right-collapse\':!filterViewService.getShowFilter() && filterViewService.needFilters}" ng-click="filterViewService.setShowFilter()"> <span class="fa fa-search"></span> </div> <div class="side-panel-top panel-refresh animate-show" ng-class="{\'side-panel-right-collapse\': filterViewService.needRefresh}" ng-click="filterViewService.setRefresh(!filterViewService.isRefreshAutoActive)"> <span class="fa-stack"> <i class="fa fa-refresh fa-stack-1x" ng-class="{\'fa-spin\':filterViewService.filterOptions.autoRefresh && filterViewService.isRefreshAutoActive,\'\':!filterViewService.isRefreshAutoActive || !filterViewService.filterOptions.autoRefresh }"> </i> <i class="fa fa-ban fa-stack-2x text-danger" ng-show="!filterViewService.filterOptions.autoRefresh"> </i> </span> </div>'
        };
    }]);

