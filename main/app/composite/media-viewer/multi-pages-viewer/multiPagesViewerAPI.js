'use strict';
/**
 * TODO MultiPagesViewerAPI desc
 */
itMultiPagesViewer.factory('MultiPagesViewerAPI', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {

        function MultiPagesViewerAPI(viewer) {
        			this.viewer = viewer;
        			this.rotation = 0;
        		};

        MultiPagesViewerAPI.prototype = {
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
            goToPage: function (pageIndex) {
                if(pageIndex < 1 || pageIndex > this.getNumPages()) {
                    return;
                }

                //this.viewer.pages[pageIndex - 1].container[0].scrollIntoView();
                var offsetTop = this.viewer.pages[pageIndex - 1].container[0].offsetTop;
                if(Math.round(this.viewer.element[0].scrollTop) === offsetTop){
                    offsetTop -= 1;
                }
                this.viewer.element[0].scrollTop = offsetTop;
            },
            goToNextPage: function () {
                this.goToPage(this.viewer.currentPage + 1);
            },
            goToPrevPage: function () {
                this.goToPage(this.viewer.currentPage - 1);
            },
            getNumPages: function () {
                return this.viewer.pages.length;
            },
            rotatePagesRight: function() {
                var numPages = this.viewer.pages.length;
                var rotation = this.rotation + 90;
                if(rotation === 360 || rotation === -360) {
                    rotation = 0;
                }
                this.rotation = rotation;
                for(var iPage = 0;iPage < numPages;++iPage) {
                    this.viewer.pages[iPage].rotate(rotation);
                }

                this.viewer.setContainerSize(this.viewer.initialScale);
            },
            rotatePagesLeft: function() {
                var numPages = this.viewer.pages.length;
                var rotation = this.rotation - 90;
                if(rotation === 360 || rotation === -360){
                    rotation = 0;
                }
                this.rotation = rotation;
                for(var iPage = 0;iPage < numPages;++iPage) {
                    this.viewer.pages[iPage].rotate(rotation);
                }

                this.viewer.setContainerSize(this.viewer.initialScale);
            },
            rotatePageRight: function(pageIndex) {
                this.viewer.rotate({ pageIndex : pageIndex, rotation: 90 });
            },
            rotatePageLeft: function(pageIndex) {
                this.viewer.rotate({ pageIndex : pageIndex, rotation: -90 });
            }
        };

        return (MultiPagesViewerAPI);
    }]);
