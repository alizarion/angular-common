'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelContent
 * @module itesoft
 * @restrict E
 *
 * @description
 * A container for a Side Panel content, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-content>
 * </it-side-panel-content>
 */
IteSoft
    .directive('itSidePanelContent', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require: '^itSidePanel',
            template:
                '<div class="it-side-panel-content" ng-transclude></div>'
        };
    });

