'use strict';
/**
 * TODO itProgressbarViewer desc
 */
itMultiPagesViewer.directive('itProgressbarViewer', [function(){
    return {
        scope: {
            api: "="
        },
        restrict: 'E',
        template :  '<div class="loader" >' +
        '<div class="progress-bar">' +
        '<span class="bar" ng-style=\'{width: api.downloadProgress + "%"}\'></span>' +
        '</div>' +
        '</div>'
    };
}]);