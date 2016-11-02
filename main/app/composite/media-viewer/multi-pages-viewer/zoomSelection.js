'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer
    .factory('ZoomSelection', [function () {
        function ZoomSelection(rect, page) {
            this.percentTop = (rect.y * 100) / page.viewport.height;
            this.percentLeft = (rect.x * 100) / page.viewport.width;
            this.percentWidth = (rect.width * 100) / page.viewport.width;
            this.percentHeight = (rect.height * 100) / page.viewport.height;

            this.pageIndex = page.pageIndex;
        }

        return (ZoomSelection);
    }])

    .factory('ZoomWheel', [function () {
        function ZoomWheel(mouseRelativeToPage, mouseRelativeToViewer, page, zoomLevel) {
            this.percentTop = (mouseRelativeToPage.y * 100) / page.viewport.height;
            this.percentLeft = (mouseRelativeToPage.x * 100) / page.viewport.width;
            this.percentCenterTop = (mouseRelativeToViewer.y * 100) / page.viewer.containerSize.height;
            this.percentCenterLeft = (mouseRelativeToViewer.x * 100) / page.viewer.containerSize.width;
            this.zoomLevel = zoomLevel;

            this.pageIndex = page.pageIndex;
        }

        return (ZoomWheel);
    }]);


