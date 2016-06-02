'use strict';
/**
 * TODO MultiPagesViewer desc
 */
itMultiPagesViewer.factory('MultiPagesViewer', ['$log' ,'$timeout', '$compile' , 'MultiPagesViewerAPI' , 'MultiPagesConstants' , 'SizeWatcher', function ($log,$timeout,$compile, MultiPagesViewerAPI, MultiPagesConstants, SizeWatcher) {
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
        this.scaleItems = {};
        this.zoomLevels = [];
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
        updateScaleItem : function(scaleItem) {
            var result = this.scaleItems[scaleItem.id];
            if(result == undefined){
                this.scaleItems[scaleItem.id] = scaleItem;
                result = scaleItem;
            }else{
                result.value = scaleItem.value;
            }

            this.zoomLevels.push(result);

            return result;
        },
        setContainerSize: function (initialScale) {
            if(this.pages.length > 0) {
                this.containerSize = getElementInnerSize(this.element, this.pageMargin);

                var oldScaleValue = this.scaleItem ? this.scaleItem.value : null;

                this.fitWidthScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_WIDTH);
                this.fitHeightScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_HEIGHT);
                this.fitPageScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_PAGE);

                this.zoomLevels = [];
                var numZoomLevels = MultiPagesConstants.ZOOM_LEVELS_LUT.length - 1;
                for(var i = 0;i < numZoomLevels;++i) {
                    var scaleItem = null;
                    var scale = MultiPagesConstants.ZOOM_LEVELS_LUT[i];
                    var newScale = MultiPagesConstants.ZOOM_LEVELS_LUT[i + 1];
                    if (scale < this.fitWidthScale && newScale > this.fitWidthScale) {
                       scaleItem = this.updateScaleItem({
                           id: MultiPagesConstants.ZOOM_FIT_WIDTH,
                           value : this.fitWidthScale,
                           label: "Fit width"
                       });
                   }

                   if (scale < this.fitHeightScale && newScale > this.fitHeightScale) {
                       scaleItem = this.updateScaleItem({
                           id: MultiPagesConstants.ZOOM_FIT_HEIGHT,
                           value : this.fitHeightScale,
                           label: "Fit height"
                       });
                   }

                   if (scale < this.fitPageScale && newScale > this.fitPageScale) {
                       scaleItem = this.updateScaleItem({
                           id: MultiPagesConstants.ZOOM_FIT_PAGE,
                           value : this.fitPageScale,
                           label: "Fit page"
                       });
                   }

                   var label = (newScale * 100.0).toFixed(0) + "%";
                   scaleItem = this.updateScaleItem({
                       id: label,
                       value : newScale,
                       label: label
                   });
                }

                if (this.scaleItem == undefined && initialScale) {
                    if(this.scaleItems[initialScale] != undefined) {
                        this.scaleItem = this.scaleItems[initialScale];
                    }else{
                        $log.debug("InitialScale not found : " + initialScale);
                    }
                }

                if(this.api.onZoomLevelsChanged ) {
                    this.api.onZoomLevelsChanged (this.zoomLevels);
                }

                if(this.scaleItem != null && this.scaleItem.value === oldScaleValue && this.pages[0] && this.pages[0].viewport != null) {
                    this.render();
                    return;
                }

                this.setScale(this.scaleItem || this.scaleItems["100%"]);
            }
        },
        setScale: function (scaleItem) {
            if(scaleItem != undefined){
                this.scaleItem = scaleItem;
            }
            var sci = scaleItem  || this.zoomLevels[0];

            var numPages = this.pages.length;

            for(var iPage = 0;iPage < numPages;++iPage) {
                // Resize to current scaleItem...
                this.pages[iPage].resize(sci.value);
            }

            this.render();
        },
        calcScale: function (desiredScale) {
            if(desiredScale === MultiPagesConstants.ZOOM_FIT_WIDTH) {
                // Find the widest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var page = this.pages[0];
                var maxWidth = page.getViewport(1.0, page.rotation).width;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    page = this.pages[iPage];
                    maxWidth = Math.max(maxWidth, page.getViewport(1.0, page.rotation).width);
                }

                return this.containerSize.width / maxWidth;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_HEIGHT) {
                // Find the highest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var page = this.pages[0];
                var maxHeight = page.getViewport(1.0, page.rotation).height;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    page = this.pages[iPage];
                    maxHeight = Math.max(maxHeight, page.getViewport(1.0, page.rotation).height);
                }

                return this.containerSize.height / maxHeight;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_PAGE) {
                // Find the smaller dimension of the container and fit the 1st page to it.
                var page = this.pages[0];
                var page0Viewport = page.getViewport(1.0, page.rotation);

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
        removeDistantPages: function (curPageID, lastPageID, distance) {
            var numPages = this.pages.length;

            var firstActivePageID = Math.max(curPageID - distance, 0);
            var lastActivePageID = Math.min(lastPageID + distance, numPages - 1);

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
            var currentPageID = -1;
            var lastPageID = 0;
            var atLeastOnePageInViewport = false;
            for(var iPage = 0;iPage < numPages;++iPage) {
                var page = this.pages[iPage];

                if(page.isVisible()) {
                    var parentContainer = page.container.parent()[0];
                    var pageContainer = page.container[0];
                    var pageTop = pageContainer.offsetTop - parentContainer.scrollTop;
                    var pageCenter = pageContainer.offsetHeight / 2;
                    if(currentPageID === -1 && (pageCenter + pageTop) >= 0) {
                        currentPageID = iPage;
                    }

                    atLeastOnePageInViewport = true;
                    lastPageID = iPage;
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
                var nextPageID = (this.lastScrollDir > 0 ? lastPageID : currentPageID) + this.lastScrollDir;
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

            this.removeDistantPages(currentPageID, lastPageID, 1);

            this.currentPage = currentPageID + 1;
            if(this.onCurrentPageChanged){
                this.onCurrentPageChanged( currentPageID + 1);
            }
        },
        render: function () {
            if(this.currentPage != 0 && this.currentPage != 1) {
                this.api.goToPage(this.currentPage);
            }else{
                this.renderAllVisiblePages();
            }
        },
        rotate : function (args) {
            if(args != undefined) {
                var page = this.pages[args.pageIndex];
                if(page != undefined) {
                    var rotation = page.viewport.rotation + args.rotation;
                    if(rotation === 360 || rotation === -360){
                        rotation = 0;
                    }
                    page.viewport.rotation = rotation;
                    page.rotate(rotation);
                    if(this.api.onPageRotation) {
                        this.api.onPageRotation(args);
                    }
                    this.setContainerSize(this.initialScale);
                }
            }
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
        },
        hookScope: function(scope) {
            var self = this;
            var lastScrollY = 0;
            var watcher = new SizeWatcher(self.element[0], 200);
            scope.$watchGroup(watcher.group, function(values) {
                self.setContainerSize(self.initialScale);
            });

            var onProgress = function(operation, state, value, total, message) {
                if (operation === "render" && value === 1) {
                    if (state === "success") {
                         $compile(self.element.contents())(scope);
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
        }
    };

    return (MultiPagesViewer);
}]);
