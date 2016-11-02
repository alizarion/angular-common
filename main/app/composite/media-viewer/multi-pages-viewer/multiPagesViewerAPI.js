'use strict';
/**
 * TODO MultiPagesViewerAPI desc
 */
itMultiPagesViewer
    .factory('MultiPagesViewerAPI', ['$log', 'MultiPagesConstants' , 'DownloadManager', function ($log, MultiPagesConstants, DownloadManager) {

        function MultiPagesViewerAPI(viewer) {
            this.viewer = viewer;
        };

        MultiPagesViewerAPI.prototype = {
            getViewer: function () {
                return this.viewer;
            },
            download : function() {
                throw "NotImplementedError - api.download()";
            },
            getMode: function () {
                return this.viewer.mode;
            },
            getModes: function () {
                return this.viewer.modes;
            },
            setMode : function(mode) {
                this.viewer.setMode(mode);
            },
            getZoomLevels: function () {
                return this.viewer.zoomLevels;
            },
            zoomTo: function (zoomLevel) {
                if(zoomLevel != null) {
                    this.viewer.setScale(zoomLevel);
                    this.viewer.renderAllVisiblePages();
                }
            },
            getZoomLevel: function () {
                return this.viewer.scaleItem;
            },
            zoomToSelection: function (zoomSelection) {
                this.viewer.zoomToSelection(zoomSelection);
            },
            getNextZoomLevel: function() {
                var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
                if(index < this.viewer.zoomLevels.length) {
                    return this.viewer.zoomLevels[index + 1];
                }
                return null;
            },
            getPreviousZoomLevel: function() {
                var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
                if(index > 0) {
                    return this.viewer.zoomLevels[index - 1];
                }
                return null;
            },
            zoomIn: function() {
                this.zoomTo(this.getNextZoomLevel());
            },
            zoomOut: function() {
                this.zoomTo(this.getPreviousZoomLevel());
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
            goToPage: function (pageId) {
                var page = this.viewer.pages[pageId - 1];
                if(page) {
                    var pageContainer = page.container[0];
                    if(this.viewer.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                        this.viewer.setScrollPosition(0, pageContainer.offsetLeft - 10);
                    } else {
                        this.viewer.setScrollPosition(pageContainer.offsetTop - 10, 0);
                    }
                }
            },
            goToNextPage: function () {
                if(this.getSelectedPage() >= this.getNumPages()) {
                    return;
                }
                if(this.viewer.selectedPage == null) {
                    this.viewer.selectedPage = this.viewer.currentPage;
                }
                this.viewer.selectedPage += 1;
                this.goToPage(this.viewer.selectedPage);
            },
            goToPrevPage: function () {
                if(this.getSelectedPage() <= 1) {
                    return;
                }
                if(this.viewer.selectedPage == null) {
                    this.viewer.selectedPage = this.viewer.currentPage;
                }
                this.viewer.selectedPage -= 1;
                this.goToPage(this.viewer.selectedPage);
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
            }
        };

        return (MultiPagesViewerAPI);
    }]);

