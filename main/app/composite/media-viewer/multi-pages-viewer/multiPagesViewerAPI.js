'use strict';
/**
 * TODO MultiPagesViewerAPI desc
 */
itMultiPagesViewer.factory('MultiPagesViewerAPI', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {

    function MultiPagesViewerAPI(viewer) {
        this.viewer = viewer;
    };

    MultiPagesViewerAPI.prototype = {
        getViewer: function () {
            return this.viewer;
        },
        getZoomLevels: function () {
            return this.viewer.zoomLevels;
        },
        zoomTo: function (scaleItem) {
            if(scaleItem != undefined) {
                this.viewer.setScale(scaleItem);
            }
        },
        getZoomLevel: function () {
            return this.viewer.scaleItem;
        },
        zoomIn: function() {
            var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
            if(index < this.viewer.zoomLevels.length) {
                this.zoomTo(this.viewer.zoomLevels[index + 1]);
            }
        },
        zoomOut: function() {
            var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
            if(index > 0) {
                this.zoomTo(this.viewer.zoomLevels[index - 1]);
            }
        },
        getCurrentPage: function () {
            return this.viewer.currentPage;
        },
        getSelectedPage: function () {
            return this.viewer.selectedPage || this.viewer.currentPage;
        },
        isPageSelected: function(pageIndex) {
            return (this.getSelectedPage() === pageIndex) ? "selected" : null;
        },
        goToPage: function (pageIndex) {
            if(pageIndex < 1 || pageIndex > this.getNumPages()) {
                return;
            }
            var pageContainer = this.viewer.pages[pageIndex - 1].container[0];
            var element = this.viewer.element[0];
            //this.viewer.pages[pageIndex - 1].container[0].scrollIntoView();
            if(this.viewer.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                var offsetLeft = pageContainer.offsetLeft - 10;
                if(Math.round(element.scrollLeft) === offsetLeft){
                    offsetLeft -= 1;
                }
                element.scrollLeft = offsetLeft;
            } else {
                var offsetTop = pageContainer.offsetTop - 10;
                if(Math.round(element.scrollTop) === offsetTop){
                    offsetTop -= 1;
                }
                element.scrollTop = offsetTop;
            }
        },
        goToNextPage: function () {
            this.goToPage(this.getSelectedPage() + 1);
        },
        goToPrevPage: function () {
            this.goToPage(this.getSelectedPage() - 1);
        },
        getNumPages: function () {
            return this.viewer.pages.length;
        },
        rotatePagesRight: function() {
            this.viewer.rotatePages(90);
        },
        rotatePagesLeft: function() {
            this.viewer.rotatePages(-90);
        },
        rotatePageRight: function(pageIndex) {
            this.rotatePage({ pageIndex : (pageIndex | this.getSelectedPage() -1), rotation: 90 });
        },
        rotatePageLeft: function(pageIndex) {
            this.rotatePage({ pageIndex : (pageIndex | this.getSelectedPage() -1), rotation: -90 });
        },
        rotatePage: function(args) {
            this.viewer.rotate(args);
            if(this.onPageRotation) {
                this.onPageRotation(args);
            }
        }
    };

    return (MultiPagesViewerAPI);
}]);

