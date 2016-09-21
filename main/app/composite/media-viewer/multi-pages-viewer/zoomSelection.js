'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('ZoomSelection', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {
    function ZoomSelection(rect, page) {
        this.percentTop = (rect.offsetTop * 100) / page.viewport.height;
        this.percentLeft = (rect.offsetLeft * 100) / page.viewport.width;
        this.percentWidth = (rect.width * 100) / page.viewport.width;
        this.percentHeight = (rect.height * 100) / page.viewport.height;

        this.pageIndex = page.pageIndex;
    }

    return (ZoomSelection);
}]);

