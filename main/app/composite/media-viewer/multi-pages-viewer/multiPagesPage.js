'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesPage', ['$log' , 'MultiPagesConstants', 'PageViewport' , 'ZoomSelection', function ($log, MultiPagesConstants, PageViewport, ZoomSelection) {

    function MultiPagesPage(viewer, pageIndex, view) {
        this.viewer = viewer;
        this.pageIndex = pageIndex;
        this.id = pageIndex + 1;


        this.container = angular.element('<div></div>');
        this.container.attr("id", "page_" + pageIndex);

        this.wrapper = angular.element('<div class="page {{api.isPageSelected(' + this.id + ')}}"  ></div>');
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
            this.layer = null;
            if(this.cleanUp) {
                this.cleanUp();
            }
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
            this.setOrientation();
            this.scale = scale;
            this.transform();
        },
        setOrientation : function(orientation) {
            //this.orientation = orientation;
            switch (this.viewer.orientation) {
                case MultiPagesConstants.ORIENTATION_HORIZONTAL:
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
            switch (this.viewer.orientation) {
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
        addLayer : function(layer) {
            if(this.layer == null) {
                this.layer = angular.element("<div class='selectable-layer'></div>");
                this.wrapper.append(this.layer);
            }
            this.layer.append(layer);
        },
        initSelectZoom : function () {
            function setMousePosition(e) {
                var ev = e || window.event; //Moz || IE
                var offset = self.wrapper[0].getBoundingClientRect();
                if (ev.pageX) { //Moz
                    mouse.x = (ev.pageX - offset.left);
                    mouse.y = (ev.pageY - offset.top);
                } else if (ev.clientX) { //IE
                    mouse.x = (ev.clientX - offset.left);
                    mouse.y = (ev.clientY  - offset.top);
                }
            };

            function getCtrlKey (e) {
                if(e != null) {
                    var shortcutKey = self.viewer.zoomSelectionShortcutKey;
                    if(shortcutKey != null && e[shortcutKey] != null) {
                        return e[shortcutKey];
                    }
                    return e.ctrlKey;
                }
                return false;
            };

            var self = this,
                mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                },
                rect = null,
                element = null,
                onMouseDown = function (e) {
                    if(self.viewer.mode.id === MultiPagesConstants.MODE_ZOOM_SELECTION || getCtrlKey(e)) {
                        if(rect == null) {
                            setMousePosition(e);

                            if(self.layer) {
                                self.layer.removeClass("selectable-layer");
                            }
                            mouse.startX = mouse.x;
                            mouse.startY = mouse.y;
                            rect = {};
                            rect.offsetX = mouse.x;
                            rect.offsetY = mouse.y;
                            element = angular.element('<div class="zoom-selection-rectangle"></div>');
                            element.css("left",  mouse.x + 'px');
                            element.css("top",  mouse.y + 'px');
                            self.wrapper.append(element);
                            self.viewer.element.on('mouseup', onMouseUp);
                            self.viewer.element.on('mousemove', onMouseMove);
                            self.viewer.element.addClass("viewer-zoom-cursor");
                        }
                    } else {
                        self.viewer.selectedPage = self.id;
                        if(self.viewer.onPageClicked) {
                            self.viewer.onPageClicked(self.id);
                        }
                        if(self.viewer.api.onPageClicked) {
                            self.viewer.api.onPageClicked(self.id);
                        }
                    }
                },
                onMouseUp = function (e) {
                    self.viewer.element.removeClass("viewer-zoom-cursor");
                    self.viewer.element.off('mouseup', onMouseUp);
                    self.viewer.element.off('mousemove', onMouseMove);
                    if(rect != null) {
                        if(self.layer) {
                            self.layer.addClass("selectable-layer");
                        }
                        if(rect.width > 10 || rect.height > 10) {
                            self.viewer.zoomTo(new ZoomSelection(rect, self));
                        }

                        element.remove();
                        element = null;
                        rect = null;
                    }
                },
                onMouseMove = function (e) {
                    setMousePosition(e);
                    if (rect !== null) {
                        rect.width =  Math.abs(mouse.x - mouse.startX);
                        rect.height = Math.abs(mouse.y - mouse.startY);
                        rect.offsetLeft = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        rect.offsetTop = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        element.css("width", rect.width + 'px');
                        element.css("height", rect.height + 'px');
                        element.css("left", rect.offsetLeft + 'px');
                        element.css("top", rect.offsetTop + 'px');
                    }
                };

            self.container.on('mousedown', onMouseDown);

            self.cleanUp = function () {
                self.container.off('mousedown', onMouseDown);
                delete self.cleanUp;
            };
        },
        render: function (callback) {
            if(this.onRendering) {
                this.onRendering();
            }
            if(this.rendered) {
                if(callback) {
                    callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                }
                return;
            };

            $log.debug("render page " + this.id +" started");
            var start = new Date();
            this.rendered = true;
            this.initSelectZoom();
            this.renderPage(this, function (page, status) {
                if(status === MultiPagesConstants.PAGE_RENDERED) {
                    page.canvasRendered = true;
                    $log.debug("render page " + page.id +" ended, duration : " + (( (new Date() - start)  % 60000) / 1000).toFixed(0) + " sec");
                } else  if(status === MultiPagesConstants.PAGE_ALREADY_RENDERED) {
                    $log.debug("page " + page.id +" already rendered");
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
