'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelFooter
 * @module itesoft
 * @restrict E
 * @since 1.0
 * @description
 * A container for a Side Panel footer, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-footer>
 * </it-side-panel-footer>
 */
IteSoft
    .directive('itSidePanelFooter', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require : '^itSidePanel',
            template:
                '<div class="it-side-panel-footer" ng-transclude></div>'
        };
    });

