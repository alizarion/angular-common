'use strict';
/**
 * TODO Pdf implementation desc
 */
itPdfViewer
    .factory('PDFViewerAPI', ['$log' , 'MultiPagesViewerAPI', function ($log, MultiPagesViewerAPI) {

        function PDFViewerAPI(viewer) {
            this.base = MultiPagesViewerAPI;
            this.base(viewer);
        }; 

        PDFViewerAPI.prototype = new MultiPagesViewerAPI;

        PDFViewerAPI.prototype.findNext = function () {
            if(this.viewer.searchHighlightResultID === -1) {
                return;
            }

            var nextHighlightID = this.viewer.searchHighlightResultID + 1;
            if(nextHighlightID >= this.viewer.searchResults.length) {
                nextHighlightID = 0;
            }

            this.viewer.highlightSearchResult(nextHighlightID);
        };

        PDFViewerAPI.prototype.findPrev = function () {
            if(this.viewer.searchHighlightResultID === -1) {
                return;
            }

            var prevHighlightID = this.viewer.searchHighlightResultID - 1;
            if(prevHighlightID < 0) {
                prevHighlightID = this.viewer.searchResults.length - 1;
            }

            this.viewer.highlightSearchResult(prevHighlightID);
        };

        return (PDFViewerAPI);
    }])

    .factory('PDFPage', ['$log', '$window', '$document', '$timeout', 'MultiPagesPage',  'MultiPagesConstants' , 'TextLayerBuilder', function ($log, $window, $document,$timeout, MultiPagesPage, MultiPagesConstants, TextLayerBuilder) {

        function PDFPage(viewer, pdfPage) {
            this.base = MultiPagesPage;
            this.base(viewer, pdfPage.pageIndex);

            this.pdfPage = pdfPage;
            this.renderTask = null;
        }

        PDFPage.prototype = new MultiPagesPage;

        PDFPage.prototype.clear = function () {
            if(this.renderTask !== null) {
                this.renderTask.cancel();
            }
            MultiPagesPage.prototype.clear.call(this);
            this.renderTask = null;
        };
        PDFPage.prototype.getViewport = function (scale , rotation) {
            return this.pdfPage.getViewport(scale, rotation + (this.pdfPage.pageInfo ? this.pdfPage.pageInfo.rotate : 0), 0, 0);
        };
        PDFPage.prototype.renderTextLayer = function () {
            var self = this;
            if(this.viewer.mode.id === MultiPagesConstants.MODE_TEXT) {
                if(self.textLayer != null) {
                    self.addLayer(self.textLayer);
                } else {

                    self.textLayer = angular.element("<div class='textLayer r" + self.rotation + "'></div>");
                    self.textLayer.css("width", this.viewport.width + "px");
                    self.textLayer.css("height", this.viewport.height + "px");
                    if (self.textContentTask == null) {
                        self.textContentTask = self.pdfPage.getTextContent();
                    }

                    self.textContentTask.then(function (textContent) {
                        // Render the text layer...
                        var textLayerBuilder = new TextLayerBuilder({
                            textLayerDiv: self.textLayer[0],
                            pageIndex: self.id,
                            viewport: self.viewport
                        });

                        textLayerBuilder.setTextContent(textContent);
                        textLayerBuilder.render(null, function() {
                            self.addLayer(self.textLayer);
                            self.viewer.onTextLayerRendered(self.id, self.textLayer);
                        });
                    });
                }
            }
        };
        PDFPage.prototype.removeTextLayer = function () {
            if(this.textLayer != null) {
                this.textLayer.remove();
            }
        };
        PDFPage.prototype.transform = function () {
            MultiPagesPage.prototype.transform.call(this);
            this.textLayer = null;
        };
        PDFPage.prototype.onRendering = function() {
            if(this.renderTextLayer) {
                this.renderTextLayer();
            }
        };
        PDFPage.prototype.renderPage = function (page, callback) {

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
                if(callback) {
                    callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                }
            }else {

                page.wrapper.append(page.canvas);

                page.renderTask = this.pdfPage.render({
                    canvasContext: page.canvas[0].getContext('2d'),
                    viewport: page.viewport
                });

                page.renderTask.then(function () {
                    page.renderTask = null;

                    if(callback) {
                        callback(page, MultiPagesConstants.PAGE_RENDERED);
                    }
                }, function (message) {
                    page.rendered = false;
                    page.renderTask = null;

                    if(message === "cancelled") {
                        if(callback) {
                            callback(page, MultiPagesConstants.PAGE_RENDER_CANCELLED);
                        }
                    } else {
                        if(callback) {
                            callback(page, MultiPagesConstants.PAGE_RENDER_FAILED);
                        }
                    }
                });
            }
        };

        return (PDFPage);
    }])

    .factory('PDFViewer', ['$log' , '$window', '$document', '$timeout', 'MultiPagesViewer', 'PDFViewerAPI', 'PDFPage' , 'MultiPagesConstants' , 'TranslateViewer', function ($log, $window, $document, $timeout, MultiPagesViewer, PDFViewerAPI, PDFPage, MultiPagesConstants, TranslateViewer) {
        function PDFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new PDFViewerAPI(this), element);

            this.pdf = null;
            // Hooks for the client...
            this.passwordCallback = null;

            function setMousePosition(e) {
                var ev = e || window.event; //Moz || IE
                var el = element[0];
                var offset = el.getBoundingClientRect();
                if (ev.pageX) { //Moz
                    mouse.x = (ev.pageX + el.scrollLeft - offset.left);
                    mouse.y = (ev.pageY + el.scrollTop - offset.top);
                } else if (ev.clientX) { //IE
                    mouse.x = (ev.clientX + el.scrollLeft - offset.left);
                    mouse.y = (ev.clientY + el.scrollTop  - offset.top);
                }
            };

            function getPosition(el) {
                var xPos = 0;
                var yPos = 0;
                var container = element[0];
                do {
                    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPos += (el.offsetTop - el.scrollTop + el.clientTop);

                    el = el.offsetParent;
                } while (el != container && el != null);
                return {
                    x: xPos,
                    y: yPos
                };
            };

            var self = this,
                mouse = {
                    x: 0,
                    y: 0
                },
                onDbClick = function(e) {
                    if ($window.getSelection) {
                        if (self.wordEventTimeout) $timeout.cancel(self.wordEventTimeout);
                        self.wordEventTimeout = null;
                        var selection =  $window.getSelection();
                        var range = $document[0].createRange();
                        range.selectNodeContents(e.target);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        var text = range.toString();
                        self.api.selectedText = text;
                        if(self.api.onTextSelected != null) {
                            self.api.onTextSelected(text);
                        }
                    }
                },
                onMouseDown = function (e) {
                    if(self.selectionTooltip == null){
                        if(self.wordTooltip != null){
                            self.wordTooltip.css("display", "none");
                        }

                        self.selectionTooltip = angular.element('<div class="selection-tooltip"></div>');
                        self.selectionTooltip.css("left",  mouse.x + 'px');
                        self.selectionTooltip.css("top",  mouse.y + 'px');
                        element.append(self.selectionTooltip);
                    }
                },
                onMouseUp = function (e) {
                    if(self.selectionTooltip != null) {
                        self.selectionTooltip.remove();
                        self.selectionTooltip = null;
                    }

                    if (self.wordEventTimeout) $timeout.cancel(self.wordEventTimeout);
                    self.wordEventTimeout = $timeout(function() {
                        var text = "";
                        if ($window.getSelection) {
                            text = $window.getSelection().toString();
                        }
                        if(text.length > 0) {
                            self.api.selectedText = text;
                            if(self.api.onTextSelected != null) {
                                self.api.onTextSelected(text);
                            }
                        }
                    }, 450);
                },
                onMouseMove = function (e) {
                    setMousePosition(e);
                    if(self.selectionTooltip != null) {
                        self.selectionTooltip.css("left",  mouse.x + 'px');
                        self.selectionTooltip.css("top",  mouse.y + 'px');
                        var text = "";
                        if ($window.getSelection) {
                            text = $window.getSelection().toString();
                        }
                        if(text.length > 0) {
                            if(text.length > 30) {
                                var start = text.slice(0, 15);
                                var end = text.slice(text.length - 15, text.length);
                                self.selectionTooltip[0].innerHTML = start + " [...] " + end;
                            } else {
                                self.selectionTooltip[0].innerHTML = text;
                            }
                            self.selectionTooltip.css("display", "block");
                        } else {
                            self.selectionTooltip.css("display", "none");
                        }
                    } else {
                        if(e.target && e.target.className == "word") {
                            if(self.wordTooltip == null){
                                self.wordTooltip = angular.element('<div class="word-tooltip"></div>');
                            }
                            element.append(self.wordTooltip);

                            var position = getPosition(e.target);
                            self.wordTooltip[0].textContent = e.target.textContent;
                            self.wordTooltip.css("display", "table");
                            self.wordTooltip.css("left",  position.x + 'px');
                            self.wordTooltip.css("top",  (position.y - self.wordTooltip[0].offsetHeight - 10) + 'px');
                        } else {
                            if(self.wordTooltip != null){
                                self.wordTooltip.css("display", "none");
                            }
                        }
                    }
                };

            this.modes.push({
                id: MultiPagesConstants.MODE_TEXT,
                label: TranslateViewer.translate('GLOBAL.VIEWER.MODE_TEXT', 'Text'),
                activate : function() {
                    angular.forEach(self.currentPages, function(page) {
                        page.renderTextLayer();
                    });

                    element.on('dblclick', onDbClick);
                    element.on('mousedown', onMouseDown);
                    element.on('mouseup', onMouseUp);
                    element.on('mousemove', onMouseMove);
                },
                cleanUp : function() {
                    for(var iPage = 0;iPage < self.pages.length;++iPage) {
                        self.pages[iPage].removeTextLayer();
                    }

                    element.off('dblclick', onDbClick);
                    element.off('mousedown', onMouseDown);
                    element.off('mouseup', onMouseUp);
                    element.off('mousemove', onMouseMove);
                }
            });
        }

        PDFViewer.prototype = new MultiPagesViewer;

        PDFViewer.prototype.open = function (obj, options) {
            this.element.empty();
            this.pages = [];
            if (obj !== undefined && obj !== null && obj !== '') {
                angular.extend(this, options);
                var isFile = typeof obj != typeof "";

                if(this.getDocumentTask != undefined){
                    var self = this;
                    this.getDocumentTask.destroy().then(function () {
                        if(isFile){
                            self.setFile(obj);
                        }else {
                            self.setUrl(obj);
                        }
                    });
                } else {
                    if(isFile){
                        this.setFile(obj);
                    }else {
                        this.setUrl(obj);
                    }
                }
            }
        };
        PDFViewer.prototype.setUrl = function (url) {
            var self = this;
            this.getDocumentTask = PDFJS.getDocument(url, null, angular.bind(this, this.passwordCallback), angular.bind(this, this.downloadProgress));
            this.getDocumentTask.then(function (pdf) {
                self.pdf = pdf;

                self.getAllPages( function (pageList, pagesRefMap) {
                    self.pages = pageList;
                    self.pagesRefMap = pagesRefMap;
                    self.addPages();
                    //self.setContainerSize(self.initialScale);
                });
            }, function (message) {
                self.onDataDownloaded("failed", 0, 0, "PDF.js: " + message);
            });
        };
        PDFViewer.prototype.setFile = function (file) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function(e) {
                var arrayBuffer = e.target.result;
                var uint8Array = new Uint8Array(arrayBuffer);
                var getDocumentTask = PDFJS.getDocument(uint8Array, null, angular.bind(self, self.passwordCallback), angular.bind(self, self.downloadProgress));
                getDocumentTask.then(function (pdf) {
                    self.pdf = pdf;

                    self.getAllPages(function (pageList, pagesRefMap) {
                        self.pages = pageList;
                        self.pagesRefMap = pagesRefMap;
                        self.addPages();
                        //self.setContainerSize(self.initialScale);
                    });
                }, function (message) {
                    self.onDataDownloaded("failed", 0, 0, "PDF.js: " + message);
                });
            };

            reader.onprogress = function (e) {
                self.downloadProgress(e);
            };

            reader.onloadend = function (e) {
                var error = e.target.error;
                if(error !== null) {
                    var message = "File API error: ";
                    switch(e.code) {
                        case error.ENCODING_ERR:
                            message += "Encoding error.";
                            break;
                        case error.NOT_FOUND_ERR:
                            message += "File not found.";
                            break;
                        case error.NOT_READABLE_ERR:
                            message += "File could not be read.";
                            break;
                        case error.SECURITY_ERR:
                            message += "Security issue with file.";
                            break;
                        default:
                            message += "Unknown error.";
                            break;
                    }

                    self.onDataDownloaded("failed", 0, 0, message);
                }
            };

            reader.readAsArrayBuffer(file);
        };
        PDFViewer.prototype.getAllPages = function (callback) {
            var pageList = [],
                pagesRefMap = {},
                numPages = this.pdf.numPages,
                remainingPages = numPages,
                self = this;

            for(var iPage = 0;iPage < numPages;++iPage) {
                pageList.push({});

                var getPageTask = this.pdf.getPage(iPage + 1);
                getPageTask.then(function (page) {
                    // Page reference map. Required by the annotation layer.
                    var refStr = page.ref.num + ' ' + page.ref.gen + ' R';
                    pagesRefMap[refStr] = page.pageIndex + 1;

                    var pdfPage = new PDFPage(self, page, true);
                    pageList[page.pageIndex] = pdfPage;

                    --remainingPages;
                    if(remainingPages === 0) {
                        callback(pageList, pagesRefMap);
                    }
                });
            }
        };
        PDFViewer.prototype.onDestroy = function () {
            if(this.getDocumentTask){
                this.getDocumentTask.destroy();
                this.getDocumentTask = null;
            }
        };

        return (PDFViewer);
    }])

    .directive("pdfViewer", ['$log', 'PDFViewer', function ($log, PDFViewer) {
        var pageMargin = 10;

        return {
            restrict: "E",
            scope: {
                src: "@",
                file: "=",
                api: "=",
                options: "=",
                passwordCallback: "&"
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                var getOption = function(optionName) {
                    if($scope.options === null || $scope.options === undefined) {
                        return null;
                    }
                    return $scope.options[optionName];
                };

                var getOptions = function() {
                    return {
                        initialScale : getOption("initialScale"),
                        initialMode : getOption("initialMode"),
                        orientation : getOption("orientation"),
                        zoomSelectionShortcutKey : getOption("zoomSelectionShortcutKey"),
                        pageMargin : pageMargin
                    };
                };

                $scope.getPassword = function (passwordFunc, reason) {
                    if(this.passwordCallback) {
                        var self = this;
                        this.$apply(function () {
                            var password = self.passwordCallback({reason: reason});

                            if(password !== "" && password !== undefined && password !== null) {
                                passwordFunc(password);
                            } else {
                                $log.log("A password is required to read this document.");
                            }
                        });
                    } else {
                        $log.log("A password is required to read this document.");
                    }
                };

                var viewer = new PDFViewer($element);
                viewer.passwordCallback = angular.bind($scope, $scope.getPassword);

                $scope.api = viewer.getAPI();

                $scope.Open = function(value) {
                    viewer.open(value, getOptions());
                };

                viewer.hookScope($scope);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', scope.Open);
                scope.$watch("file", scope.Open);
            }
        };
    }]);
