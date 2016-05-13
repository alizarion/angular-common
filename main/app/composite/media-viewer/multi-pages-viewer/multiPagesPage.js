'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesPage', ['PageViewport', function (PageViewport) {

    function MultiPagesPage(pageIndex, view) {
        this.id = pageIndex + 1;
        this.container = angular.element("<div class='page'></div>");
        this.container.attr("id", "page_" + pageIndex);

        this.canvasRendered = false;
        this.rendered = false;

        //transform
        this.view = view;

    }

    MultiPagesPage.prototype = {
        clear: function () {
            this.rendered = false;
            this.container.empty();
        },
        getViewport: function (scale) {
            return new PageViewport(this.view, scale, 0, 0, 0);
        },
        resize: function (scale) {
            this.viewport = this.getViewport(scale);
            this.canvasRendered = false;
            this.canvas = angular.element("<canvas></canvas>");

            this.canvas.attr("width", this.viewport.width);
            this.canvas.attr("height", this.viewport.height);

            this.container.css("width", this.viewport.width + "px");
            this.container.css("height", this.viewport.height + "px");
        },
        isVisible: function () {
            var pageContainer = this.container[0];
            var parentContainer = this.container.parent()[0];

            var pageTop = pageContainer.offsetTop - parentContainer.scrollTop;
            var pageBottom = pageTop + pageContainer.offsetHeight;

            return pageBottom >= 0 && pageTop <= parentContainer.offsetHeight;
        },
        render: function (callback) {
            throw "NotImplementedError - render";
        }
    };

    return (MultiPagesPage);
}]);
