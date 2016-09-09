'use strict';
/**
 * TODO Thumbnail implementation desc
 */
itMultiPagesViewer
    .factory('ThumbnailViewerAPI', ['$log' , 'MultiPagesViewerAPI', function ($log, MultiPagesViewerAPI) {

        function ThumbnailViewerAPI(viewer) {
            this.base = MultiPagesViewerAPI;
            this.base(viewer);
        };

        ThumbnailViewerAPI.prototype = new MultiPagesViewerAPI;

        ThumbnailViewerAPI.prototype.getSelectedPage = function () {
           return this.viewer.viewer.getAPI().getSelectedPage();
        };

        return (ThumbnailViewerAPI);
    }])

    .factory('ThumbnailPage', ['$log' , '$timeout', 'MultiPagesPage', 'MultiPagesConstants', function($log, $timeout, MultiPagesPage, MultiPagesConstants) {

        function ThumbnailPage(viewer, page, showNumPages) {
            this.base = MultiPagesPage;
            this.base(viewer, page.pageIndex, page.view);

            if(showNumPages) {
                this.pageNum = angular.element("<div class='num-page'>" + this.id + "</div>");
            }

            this.page = page;
        }

        ThumbnailPage.prototype = new MultiPagesPage;

        ThumbnailPage.prototype.getViewport = function (scale, rotation) {
            return this.page.getViewport(scale, rotation);
        };
        ThumbnailPage.prototype.renderPage = function (page, callback) {
            this.page.renderPage(page, callback);
            if(this.pageNum != undefined) {
                page.wrapper.append(this.pageNum);
            }
        };

        return (ThumbnailPage);
    }])

    .factory('ThumbnailViewer', ['$log', 'ThumbnailViewerAPI' , 'ThumbnailPage' , 'MultiPagesViewer' , 'MultiPagesConstants', function($log, ThumbnailViewerAPI, ThumbnailPage, MultiPagesViewer, MultiPagesConstants) {

        function ThumbnailViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new ThumbnailViewerAPI(this), element);
        }

        ThumbnailViewer.prototype = new MultiPagesViewer;

        ThumbnailViewer.prototype.open = function(viewerApi, orientation, showNumPages, pageMargin) {
            this.element.empty();
            this.pages = [];
            if(viewerApi != null) {
                var self = this;
                this.viewer = viewerApi.getViewer();
                this.viewer.thumbnail = this;
                this.pageMargin = pageMargin;
                this.showNumPages = showNumPages;


                this.orientation = orientation;

                if(this.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                    this.initialScale = MultiPagesConstants.ZOOM_FIT_HEIGHT;
                } else {
                    this.initialScale = MultiPagesConstants.ZOOM_FIT_WIDTH;
                }

                this.getAllPages(function(pageList) {
                    self.pages = pageList;
                    self.addPages();
                    self.setContainerSize(self.initialScale);
                });
            }
        };
        ThumbnailViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.viewer.pages.length,
                remainingPages = numPages,
                self = this;
            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                var page =  new ThumbnailPage(self, self.viewer.pages[iPage], self.showNumPages);
                pageList[iPage] = page;

                --remainingPages;
                if (remainingPages === 0) {
                    callback(pageList);
                }
            }
        };
        ThumbnailViewer.prototype.onContainerSizeChanged = function(containerSize) {
            if(this.showNumPages === true && this.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                containerSize.height -= 20;
            }
        };
        ThumbnailViewer.prototype.onPageClicked = function (pageIndex) {
            if(this.viewer) {
                this.viewer.api.goToPage(pageIndex);
                this.viewer.selectedPage = pageIndex;
            }
        };
        ThumbnailViewer.prototype.clearDistantSelectedPage = function (currentPageID, lastPageID) {
            //Keep selection
        };
        ThumbnailViewer.prototype.onDestroy = function () {
            if(self.viewer != null){
                this.viewer.thumbnail = null;
                self.viewer = null;
            }
        };

        ThumbnailViewer.prototype.zoomTo = function(zoomSelection) {
            this.viewer.zoomTo(zoomSelection);
        };

        return (ThumbnailViewer);
    }]);
