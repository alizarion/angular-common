'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelHeader
 * @module itesoft
 * @restrict E
 *
 * @description
 * A container for a Side Panel header, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-header>
 * </it-side-panel-header>
 */
IteSoft
    .directive('itSidePanelHeader', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require : '^itSidePanel',
            template:
                '<div class="it-side-panel-header text-center" ng-transclude></div>'
        };
    });

