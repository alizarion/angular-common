'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesPage', ['$log' , 'MultiPagesConstants', 'PageViewport', function ($log, MultiPagesConstants, PageViewport) {

    function MultiPagesPage(pageIndex, view) {
        this.pageIndex = pageIndex;
        this.id = pageIndex + 1;


        this.container = angular.element('<div></div>');
        this.container.attr("id", "page_" + pageIndex);

        this.wrapper = angular.element('<div class="page {{api.isPageSelected(' + this.id + ')}}" ng-click="onPageClicked(' + this.id + ')"></div>');
        this.container.append(this.wrapper);

        this.canvasRendered = false;
        this.rendered = false;

        //transform
        this.rotation = 0;
        this.scale = 1.0;
        this.view = view;

    }

    MultiPagesPage.prototype = {
        clear: function () {
            this.rendered = false;
            this.wrapper.empty();
        },
        getViewport: function (scale, rotation) {
            return new PageViewport(this.view, scale, rotation, 0, 0, true);
        },
        transform : function() {
            this.clear();
            this.viewport = this.getViewport(this.scale, this.rotation);
            this.canvasRendered = false;
            this.canvas = angular.element("<canvas></canvas>");
            this.canvas.attr("width", this.viewport.width);
            this.canvas.attr("height", this.viewport.height);

            this.wrapper.css("width", this.viewport.width + "px");
            this.wrapper.css("height", this.viewport.height + "px");
        },
        resize: function (scale) {
            this.scale = scale;
            this.transform();
        },
        setOrientation : function(orientation) {
            this.orientation = orientation;
            switch (orientation) {
                case MultiPagesConstants.ORIENTATION_HORIZONTAL :
                    this.container.addClass("horizontal");
                    this.container.removeClass("vertical");
                    break;
                default:
                    this.container.addClass("vertical");
                    this.container.removeClass("horizontal");
                    break;
            };
        },
        rotate: function (rotation) {
            this.rotation = rotation;
            this.transform();
        },
        isVisible: function () {
            var pageContainer = this.container[0];
            var parentContainer = this.container.parent()[0];
            switch (this.orientation) {
                case MultiPagesConstants.ORIENTATION_HORIZONTAL :
                    var pageLeft = pageContainer.offsetLeft - parentContainer.scrollLeft;
                    var pageRight = pageLeft + pageContainer.offsetWidth;
                    return (pageRight >= 0 && pageLeft <= parentContainer.offsetWidth);
                    break;
                default:
                    var pageTop = pageContainer.offsetTop - parentContainer.scrollTop;
                    var pageBottom = pageTop + pageContainer.offsetHeight;
                    return (pageBottom >= 0 && pageTop <= parentContainer.offsetHeight);
                    break;
            };
        },
        render: function (callback) {
            if(this.rendered) {
                if(callback) {
                    callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                }
                return;
            };

            //$log.debug("render page " + this.id +" started");
            //var start = new Date();
            this.rendered = true;
            this.renderPage(this, function (page, status) {
                if(status === MultiPagesConstants.PAGE_RENDERED) {
                    page.canvasRendered = true;
                    //$log.debug("render page " + page.id +" ended, duration : " + (( (new Date() - start)  % 60000) / 1000).toFixed(0) + " sec");
                }
                if(callback) {
                    callback(page, status);
                }
            });
        },
        renderPage: function (page, callback) {
            throw "NotImplementedError - renderPage(page, callback)";
        }
    };

    return (MultiPagesPage);
}]);
