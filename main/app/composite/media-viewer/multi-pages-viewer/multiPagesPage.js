'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer
    .factory('MultiPagesPage', ['$log', 'MultiPagesConstants', 'PageViewport' , 'ZoomSelection' , 'ZoomWheel', function ($log, MultiPagesConstants, PageViewport, ZoomSelection, ZoomWheel) {

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
            },
            remove: function () {
                this.clear();
                if(this.cleanUp) {
                    this.cleanUp();
                }
            },
            getViewport: function (scale, rotation) {
                return new PageViewport(this.view, scale, rotation, 0, 0, true);
            },
            transform : function() {
                this.clear();
                this.canvasRendered = false;
                this.viewport = this.getViewport(this.scale, this.rotation);
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
                $log.debug(this.viewer.name + " : rotate page " + this.id);
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
            getZoomSelectionShortcutKey : function(e) {
                if(e != null) {
                    var shortcutKey = this.viewer.zoomSelectionShortcutKey;
                    if(shortcutKey != null && e[shortcutKey] != null) {
                        return e[shortcutKey];
                    }
                    return e.ctrlKey;
                }
                return false;
            },
            initSelectZoom : function () {
                if(this.cleanUp == null) {
                    var setMousePosition = function (e) {
                        var ev = e || window.event; //Moz || IE
                        var pageOffset = self.wrapper[0].getBoundingClientRect();
                        var viewerOffset =  self.viewer.element[0].getBoundingClientRect();
                        if (ev.pageX) { //Moz
                            mouseRelativeToPage.x = Math.round(ev.pageX - pageOffset.left);
                            mouseRelativeToPage.y = Math.round(ev.pageY - pageOffset.top);
                            mouseRelativeToViewer.x = Math.round(ev.pageX - viewerOffset.left);
                            mouseRelativeToViewer.y = Math.round(ev.pageY - viewerOffset.top);
                        } else if (ev.clientX) { //IE
                            mouseRelativeToPage.x = Math.round(ev.clientX - pageOffset.left);
                            mouseRelativeToPage.y = Math.round(ev.clientY  - pageOffset.top);
                            mouseRelativeToViewer.x = Math.round(ev.clientX - viewerOffset.left);
                            mouseRelativeToViewer.y = Math.round(ev.clientY  - viewerOffset.top);
                        }
                    };

                    var self = this,
                        mouseRelativeToPage = {
                            x: 0,
                            y: 0,
                            startX: 0,
                            startY: 0
                        },
                        mouseRelativeToViewer = {
                            x: 0,
                            y: 0,
                        },
                        rect = null,
                        element = null,
                        onMouseDown = function (e) {
                            if(self.viewer.mode.id === MultiPagesConstants.MODE_ZOOM_SELECTION || self.getZoomSelectionShortcutKey(e)) {
                                if(rect == null) {
                                    setMousePosition(e);

                                    if(self.layer) {
                                        self.layer.removeClass("selectable-layer");
                                    }
                                    mouseRelativeToPage.startX = mouseRelativeToPage.x;
                                    mouseRelativeToPage.startY = mouseRelativeToPage.y;
                                    rect = {};
                                    rect.x = mouseRelativeToPage.x;
                                    rect.y = mouseRelativeToPage.y;
                                    element = angular.element('<div class="zoom-selection-rectangle"></div>');
                                    element.css("left",  mouseRelativeToPage.x + 'px');
                                    element.css("top",  mouseRelativeToPage.y + 'px');
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
                                    self.viewer.zoomToSelection(new ZoomSelection(rect, self));
                                }

                                element.remove();
                                element = null;
                                rect = null;
                            }
                        },
                        onMouseMove = function (e) {
                            setMousePosition(e);
                            if (rect !== null) {
                                rect.width =  Math.abs(mouseRelativeToPage.x - mouseRelativeToPage.startX);
                                rect.height = Math.abs(mouseRelativeToPage.y - mouseRelativeToPage.startY);
                                rect.x = (mouseRelativeToPage.x - mouseRelativeToPage.startX < 0) ? mouseRelativeToPage.x : mouseRelativeToPage.startX;
                                rect.y = (mouseRelativeToPage.y - mouseRelativeToPage.startY < 0) ? mouseRelativeToPage.y : mouseRelativeToPage.startY;
                                element.css("width", rect.width + 'px');
                                element.css("height", rect.height + 'px');
                                element.css("left", rect.x + 'px');
                                element.css("top", rect.y + 'px');
                            }
                        },
                        onMousewheel = function(e) {
                            if(self.viewer.mode.id === MultiPagesConstants.MODE_ZOOM_SELECTION) {
                                var ev = e.originalEvent || e;
                                setMousePosition(ev);
                                var zoomLevel = (ev.wheelDelta > 0 || ev.detail < 0) ? self.viewer.api.getNextZoomLevel() : self.viewer.api.getPreviousZoomLevel();
                                if(zoomLevel) {
                                    self.viewer.zoomToSelection(new ZoomWheel(mouseRelativeToPage, mouseRelativeToViewer, self, zoomLevel));
                                }
                                ev.preventDefault();
                            }
                        };
                    // IE9, Chrome, Safari, Opera, FireFox
                    self.container.bind("mousewheel DOMMouseScroll", onMousewheel);
                    self.container.on('mousedown', onMouseDown);

                    self.cleanUp = function () {
                        self.container.off("mousewheel DOMMouseScroll", onMousewheel);
                        self.container.off('mousedown', onMouseDown);
                        delete self.cleanUp;
                    };
                }
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

                $log.debug(this.viewer.name + " : render page " + this.id +" started");
                var start = new Date();
                this.rendered = true;
                this.initSelectZoom();
                this.renderPage(this, function (page, status) {
                    switch (status) {
                        case MultiPagesConstants.PAGE_RENDERED:
                            page.canvasRendered = true;
                            $log.debug(page.viewer.name + " : render page " + page.id +" ended, duration : " + (( (new Date() - start)  % 60000) / 1000).toFixed(0) + " sec");
                            break;
                        case MultiPagesConstants.PAGE_ALREADY_RENDERED:
                            $log.debug(page.viewer.name + " : page " + page.id + " already rendered");
                            break;
                        case MultiPagesConstants.PAGE_RENDER_CANCELLED:
                            $log.debug(page.viewer.name + " : render page " + page.id + " canceled");
                            break;
                        default:
                            break;
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
