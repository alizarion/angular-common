'use strict';
/**
 * TODO MultiPagesViewer desc
 */
itMultiPagesViewer.factory('MultiPagesViewer', ['$log' ,'$timeout' , 'MultiPagesViewerAPI' , 'MultiPagesConstants' , 'SizeWatcher', function ($log, $timeout, MultiPagesViewerAPI, MultiPagesConstants, SizeWatcher) {
    function getElementInnerSize(element, margin) {
        var tallTempElement = angular.element("<div></div>");
        tallTempElement.css("height", "10000px");

        element.append(tallTempElement);

        var w = tallTempElement[0].offsetWidth;

        tallTempElement.remove();

        var h = element[0].offsetHeight;
        if(h === 0) {
            // TODO: Should we get the parent height?
            h = 2 * margin;
        }

        w -= 2 * margin;
        h -= 2 * margin;

        return {
            width: w,
            height: h
        };
    }

    function MultiPagesViewer(api, element) {
        this.pages = [];
        this.scaleItem = null;
        this.fitWidthScale = 1.0;
        this.fitHeightScale = 1.0;
        this.fitPageScale = 1.0;
        this.element = element;
        this.pageMargin = 0;
        this.currentPage = 0;
        this.lastScrollDir = 0;

        this.api = api;

        // Hooks for the client...
        this.onPageRendered = null;
        this.onDataDownloaded = null;
        this.onCurrentPageChanged = null;
    }

    MultiPagesViewer.prototype = {
        getAPI: function () {
            return this.api;
        },
        setContainerSize: function (initialScale) {
            if(this.pages.length > 0){
                this.containerSize = getElementInnerSize(this.element, this.pageMargin);

                this.fitWidthScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_WIDTH);
                this.fitHeightScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_HEIGHT);
                this.fitPageScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_PAGE);

                this.api.zoomLevels = [];
                var lastScale = 0.1;
                do {
                    var curScale = this.api.getNextZoomInScale(lastScale);
                    if(curScale.value=== lastScale) {
                        break;
                    }

                    if(curScale.value === 100){
                        this.defaultScale = curScale;
                    }

                    if(this.scaleItem == undefined && curScale.id === initialScale){
                        this.scaleItem = curScale;
                    }

                    this.api.zoomLevels.push(curScale);

                    lastScale = curScale.value;
                } while(true);

                this.setScale(this.scaleItem);
            }
        },
        setScale: function (scaleItem) {
            if(scaleItem != undefined) {
                this.scaleItem = scaleItem;
            }
            var si = scaleItem  || this.defaultScale || this.api.zoomLevels[0];

            var numPages = this.pages.length;

            for(var iPage = 0;iPage < numPages;++iPage) {
                // Clear the page's contents...
                this.pages[iPage].clear();

                // Resize to current scaleItem...
                this.pages[iPage].resize(si.value);
            }

            if(this.currentPage != 0 && this.currentPage != 1) {
                this.api.goToPage(this.currentPage);
            }else{
                this.renderAllVisiblePages();
            }
        },
        calcScale: function (desiredScale) {
            if(desiredScale === MultiPagesConstants.ZOOM_FIT_WIDTH) {
                // Find the widest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var maxWidth = this.pages[0].getViewport(1.0).width;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    maxWidth = Math.max(maxWidth, this.pages[iPage].getViewport(1.0).width);
                }

                return this.containerSize.width / maxWidth;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_HEIGHT) {
                // Find the highest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var maxHeight = this.pages[0].getViewport(1.0).height;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    maxHeight = Math.max(maxHeight, this.pages[iPage].getViewport(1.0).height);
                }

                return this.containerSize.height / maxHeight;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_PAGE) {
                // Find the smaller dimension of the container and fit the 1st page to it.
                var page0Viewport = this.pages[0].getViewport(1.0);

                if(this.containerSize.height < this.containerSize.width) {
                    return this.containerSize.height / page0Viewport.height;
                }

                return this.containerSize.width / page0Viewport.width;
            }

            var scale = parseFloat(desiredScale);
            if(isNaN(scale)) {
                $log.debug("PDF viewer: " + desiredScale + " isn't a valid scaleItem value.");
                return 1.0;
            }

            return scale;
        },
        removeDistantPages: function (curPageID, distance) {
            var numPages = this.pages.length;

            var firstActivePageID = Math.max(curPageID - distance, 0);
            var lastActivePageID = Math.min(curPageID + distance, numPages - 1);

            for(var iPage = 0;iPage < firstActivePageID;++iPage) {
                this.pages[iPage].clear();
            }

            for(var iPage = lastActivePageID + 1;iPage < numPages;++iPage) {
                this.pages[iPage].clear();
            }
        },
        renderAllVisiblePages: function (scrollDir) {
            if(scrollDir != undefined){
                this.lastScrollDir = scrollDir;
            }

            var self = this;
            var numPages = this.pages.length;
            var currentPageID = 0;
            var atLeastOnePageInViewport = false;
            for(var iPage = 0;iPage < numPages;++iPage) {
                var page = this.pages[iPage];

                if(page.isVisible()) {
                    var parentContainer = page.container.parent()[0];
                    var pageTop = page.container[0].offsetTop - parentContainer.scrollTop;
                    if(pageTop <= parentContainer.offsetHeight / 2) {
                        currentPageID = iPage;
                    }

                    atLeastOnePageInViewport = true;
                    page.render(function (page, status) {
                        if(status === MultiPagesConstants.PAGE_RENDERED) {
                            self.onPageRendered("success", page.id, self.pages.length, "");
                        } else if (status === MultiPagesConstants.PAGE_RENDER_FAILED) {
                            self.onPageRendered("failed", page.id, self.pages.length, "Failed to render page.");
                        }
                    });
                } else {
                    if(atLeastOnePageInViewport) {
                        break;
                    }
                }
            }

            if(this.lastScrollDir !== 0) {
                var nextPageID = currentPageID + this.lastScrollDir;
                if(nextPageID >= 0 && nextPageID < numPages) {
                    this.pages[nextPageID].render(function (page, status) {
                        if(status === MultiPagesConstants.PAGE_RENDERED) {
                            self.onPageRendered("success", page.id, self.pages.length, "");
                        } else if (status === MultiPagesConstants.PAGE_RENDER_FAILED) {
                            self.onPageRendered("failed", page.id, self.pages.length, "Failed to render page.");
                        }
                    });
                }
            }

            this.removeDistantPages(currentPageID, 2);

            this.currentPage = currentPageID + 1;
            if(this.onCurrentPageChanged){
                this.onCurrentPageChanged( currentPageID + 1);
            }
        },
        hookScope: function(scope, initialScale) {
            var self = this;
            var lastScrollY = 0;
            var watcher = new SizeWatcher(self.element[0], 200);
            scope.$watchGroup(watcher.group, function(values) {
                self.setContainerSize(initialScale);
            });

            var onProgress = function(operation, state, value, total, message) {
                if (operation === "render" && value === 1) {
                    if (state === "success") {
                        $log.debug("onProgress(" + operation + ", " + state + ", " + value + ", " + total + ")");
                    }
                    else {
                        $log.debug("Failed to render 1st page!\n\n" + message);
                    }
                }
                else if (operation === "download" && state === "loading") {
                    self.api.downloadProgress = (value / total) * 100.0;
                }
                else {
                    if (state === "failed") {
                        $log.debug("Something went really bad!\n\n" + message);
                    }
                }
            };

            scope.onPageRendered = function(status, pageID, numPages, message) {
                onProgress("render", status, pageID, numPages, message);
            };

            scope.onDataDownloaded = function(status, loaded, total, message) {
                onProgress("download", status, loaded, total, message);
            };

            self.onPageRendered = angular.bind(scope, scope.onPageRendered);
            self.onDataDownloaded = angular.bind(scope, scope.onDataDownloaded);

            scope.$on('$destroy', function() {
                if(self.onDestroy != null){
                    try	{

                    }catch (ex)
                    {
                        $log.log(ex);
                    }
                    self.onDestroy();
                }
                watcher.cancel();
                self.element.empty();
                $log.debug("viewer destroyed");
            });

            self.element.bind("scroll", function(event) {
                if (scope.scrollTimeout) $timeout.cancel(scope.scrollTimeout);
                scope.scrollTimeout = $timeout(function() {
                    var scrollTop = self.element[0].scrollTop;

                    var scrollDir = scrollTop - lastScrollY;
                    lastScrollY = scrollTop;

                    var normalizedScrollDir = scrollDir > 0 ? 1 : (scrollDir < 0 ? -1 : 0);
                    self.renderAllVisiblePages(normalizedScrollDir);
                }, 350);
            });
        },
        downloadProgress: function(progressData) {
            // JD: HACK: Sometimes (depending on the server serving the TIFFs) TIFF.js doesn't
            // give us the total size of the document (total == undefined). In this case,
            // we guess the total size in order to correctly show a progress bar if needed (even
            // if the actual progress indicator will be incorrect).
            var total = 0;
            if (typeof progressData.total === "undefined")
            {
                while (total < progressData.loaded)
                {
                    total += 1024 * 1024;
                }
            }
            else {
                total = progressData.total;
            }

            if(this.onDataDownloaded){
                this.onDataDownloaded("loading", progressData.loaded, total, "");
            }
        }
    };

    return (MultiPagesViewer);
}]);