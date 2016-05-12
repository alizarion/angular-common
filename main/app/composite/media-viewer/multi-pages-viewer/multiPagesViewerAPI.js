'use strict';
/**
 * TODO MultiPagesViewerAPI desc
 */
itMultiPagesViewer.factory('MultiPagesViewerAPI', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {

        function MultiPagesViewerAPI(viewer) {
            this.viewer = viewer;
            this.scaleItems = {};
            this.zoomLevels = [];
        };

        MultiPagesViewerAPI.prototype = {
            getNextZoomInScale: function (scale) {
                var newScale = scale;
                var numZoomLevels = MultiPagesConstants.ZOOM_LEVELS_LUT.length;
                var scaleItem = null;
                for(var i = 0;i < numZoomLevels;++i) {
                    if(MultiPagesConstants.ZOOM_LEVELS_LUT[i] > scale) {
                        newScale = MultiPagesConstants.ZOOM_LEVELS_LUT[i];
                        break;
                    }
                }

                if(scale < this.viewer.fitWidthScale && newScale > this.viewer.fitWidthScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_WIDTH,
                        value : this.viewer.fitWidthScale,
                        label: "Fit width"
                    };
                } else if(scale < this.viewer.fitHeightScale && newScale > this.viewer.fitHeightScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_HEIGHT,
                        value : this.viewer.fitHeightScale,
                        label: "Fit height"
                    };
                } else if(scale < this.viewer.fitPageScale && newScale > this.viewer.fitPageScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_PAGE,
                        value : this.viewer.fitPageScale,
                        label: "Fit page"
                    };
                }else {
                    scaleItem = {
                        id: newScale,
                        value : newScale,
                        label: (newScale * 100.0).toFixed(0) + "%"
                    };
                }

                var result = this.scaleItems[scaleItem.id];
                if(result == undefined){
                    this.scaleItems[scaleItem.id] = scaleItem;
                    result = scaleItem;
                }else{
                    result.value = scaleItem.value;
                }
                return result;
            },
            getNextZoomOutScale: function (scale) {
                var newScale = scale;
                var numZoomLevels = MultiPagesConstants.ZOOM_LEVELS_LUT.length;
                var scaleItem = null;
                for(var i = numZoomLevels - 1; i >= 0;--i) {
                    if(MultiPagesConstants.ZOOM_LEVELS_LUT[i] < scale) {
                        newScale = MultiPagesConstants.ZOOM_LEVELS_LUT[i];
                        break;
                    }
                }

                if(scale > this.viewer.fitWidthScale && newScale < this.viewer.fitWidthScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_WIDTH,
                        value : this.viewer.fitWidthScale,
                        label: "Fit width"
                    };
                } else if(scale < this.viewer.fitHeightScale && newScale > this.viewer.fitHeightScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_HEIGHT,
                        value : this.viewer.fitHeightScale,
                        label: "Fit height"
                    };
                } else if(scale > this.viewer.fitPageScale && newScale < this.viewer.fitPageScale) {
                    scaleItem = {
                        id: MultiPagesConstants.ZOOM_FIT_PAGE,
                        value : this.viewer.fitPageScale,
                        label: "Fit page"
                    };
                } else{
                    scaleItem = {
                        id: newScale,
                        value : newScale,
                        label: (newScale * 100.0).toFixed(0) + "%"
                    };
                }

                var result = this.scaleItems[scaleItem.id];
                if(result == undefined){
                    this.scaleItems[scaleItem.id] = scaleItem;
                    result = scaleItem;
                }else{
                    result.value = scaleItem.value;
                }
                return result;
            },
            zoomTo: function (scaleItem) {
                if(scaleItem != undefined){
                    this.viewer.setScale(scaleItem);
                }
            },
            getZoomLevel: function () {
                return this.viewer.scaleItem;
            },
            getCurrentPage: function () {
                return this.viewer.currentPage;
            },
            goToPage: function (pageIndex) {
                if(pageIndex < 1 || pageIndex > this.getNumPages()) {
                    return;
                }

                //this.viewer.pages[pageIndex - 1].container[0].scrollIntoView();
                this.viewer.element[0].scrollTop = this.viewer.pages[pageIndex - 1].container[0].offsetTop;
            },
            goToNextPage: function () {
                this.goToPage(this.viewer.currentPage + 1);
            },
            goToPrevPage: function () {
                this.goToPage(this.viewer.currentPage - 1);
            },
            getNumPages: function () {
                return this.viewer.pages.length;
            }
        };

        return (MultiPagesViewerAPI);
    }]);
