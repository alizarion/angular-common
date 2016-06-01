'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesPage', ['$log' , 'MultiPagesConstants', 'PageViewport', function ($log, MultiPagesConstants, PageViewport) {

    function MultiPagesPage(pageIndex, view) {
        this.id = pageIndex + 1;
        this.container = angular.element("<div class='page' ng-click='api.onPageClicked(" + this.id + ")'></div>");
        this.container.attr("id", "page_" + pageIndex);

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
            this.container.empty();
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

              this.container.css("width", this.viewport.width + "px");
              this.container.css("height", this.viewport.height + "px");
        },
        resize: function (scale) {
            this.scale = scale;
            this.transform();
        },
        rotate: function (rotation) {
              this.rotation = rotation;
              this.transform();
            /*// The canvas may have been originally rotated, rotate relative to that.
            //var relativeRotation = rotation - this.canvas._viewport.rotation;
            var relativeRotation = rotation;
            var absRotation = Math.abs(relativeRotation);
            var scaleX = 1, scaleY = 1;

            if (absRotation === 90 || absRotation === 270) {
                // Scale x and y because of the rotation.
                *//*scaleX = this.viewport.height / this.viewport.width;
                scaleY = this.viewport.width / this.viewport.height;*//*


               if(this.viewport.width > this.viewport.height) {
                    var margin = (this.viewport.width - this.viewport.height);
                    this.container.css("margin", margin + "px auto");
                }

            }else {
                this.container.css("margin", null);
            }

            this.viewport.rotation = relativeRotation;
            var cssTransform = 'rotate(' + relativeRotation + 'deg) ' +
                'scale(' + scaleX + ',' + scaleY + ')';
            this.container.css('transform', cssTransform);*/
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
