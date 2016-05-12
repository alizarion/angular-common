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

    .factory('PDFPage', ['$log' , 'MultiPagesPage',  'MultiPagesConstants' , 'TextLayerBuilder', function ($log, MultiPagesPage, MultiPagesConstants, TextLayerBuilder) {

        function PDFPage(pdfPage, textContent) {
            this.base = MultiPagesPage;
            this.base(pdfPage.pageIndex);

            this.pdfPage = pdfPage;
            this.textContent = textContent;
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
        PDFPage.prototype.getViewport = function (scale) {
            return this.pdfPage.getViewport(scale);
        };
        PDFPage.prototype.resize = function (scale) {
            MultiPagesPage.prototype.resize.call(this, scale);

            this.textLayer = angular.element("<div class='text-layer'></div>");
            this.textLayer.css("width", this.viewport.width + "px");
            this.textLayer.css("height", this.viewport.height + "px");
        };
        PDFPage.prototype.render = function (callback) {
            var self = this;
            if(this.rendered) {
                if(this.renderTask === null) {
                    if(callback) {
                        callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                    }
                } else {
                    this.renderTask.then(function () {
                        if(callback) {
                            callback(self, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                        }
                    }, function (reason) {
                        $log.debug('stopped ' + reason);
                    });
                }

                return;
            }

            this.rendered = true;

            if(this.canvasRendered){
                self.container.append(self.canvas);
                self.container.append(self.textLayer);
            }else{
                this.renderTask = this.pdfPage.render({
                    canvasContext: this.canvas[0].getContext('2d'),
                    viewport: this.viewport
                });

                self.container.append(self.canvas);

                this.renderTask.then(function () {
                    self.rendered = true;
                    self.renderTask = null;
                    self.canvasRendered = true;
                    //self.container.append(self.canvas);

                    if(self.textContent) {
                        // Render the text layer...
                        var textLayerBuilder = new TextLayerBuilder({
                            textLayerDiv: self.textLayer[0],
                            pageIndex: self.id,
                            viewport: self.viewport
                        });

                        textLayerBuilder.setTextContent(self.textContent);
                        textLayerBuilder.renderLayer();
                        self.container.append(self.textLayer);
                    }

                    if(callback) {
                        callback(self, MultiPagesConstants.PAGE_RENDERED);
                    }
                }, function (message) {
                    self.rendered = false;
                    self.renderTask = null;

                    if(message === "cancelled") {
                        if(callback) {
                            callback(self, MultiPagesConstants.PAGE_RENDER_CANCELLED);
                        }
                    } else {
                        if(callback) {
                            callback(self, MultiPagesConstants.PAGE_RENDER_FAILED);
                        }
                    }
                });
            }
        };

        return (PDFPage);
    }])

    .factory('PDFViewer', ['$log', 'MultiPagesViewer', 'PDFViewerAPI', 'PDFPage', function ($log, MultiPagesViewer, PDFViewerAPI, PDFPage) {
        function PDFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new PDFViewerAPI(this), element);

            this.pdf = null;
            // Hooks for the client...
            this.passwordCallback = null;
        }

        PDFViewer.prototype = new MultiPagesViewer;

        PDFViewer.prototype.open = function (url, initialScale, renderTextLayer, pageMargin) {
            if(this.getDocumentTask != undefined){
                var self = this;
                this.getDocumentTask.destroy().then(function (){
                    self.setUrl(url, initialScale, renderTextLayer, pageMargin);
                });
            }else{
                this.setUrl(url, initialScale, renderTextLayer, pageMargin);
            }
        };
        PDFViewer.prototype.setUrl = function (url, initialScale, renderTextLayer, pageMargin) {
            this.pages = [];
            this.hasTextLayer = renderTextLayer;
            this.pageMargin = pageMargin;
            if (url !== undefined && url !== null && url !== '') {
                var self = this;
                this.getDocumentTask = PDFJS.getDocument(url, null, angular.bind(this, this.passwordCallback), angular.bind(this, this.downloadProgress));
                this.getDocumentTask.then(function (pdf) {
                    self.pdf = pdf;

                    self.getAllPages( function (pageList, pagesRefMap) {
                        self.pages = pageList;
                        self.pagesRefMap = pagesRefMap;

                        // Append all page containers to the $element...
                        for (var iPage = 0; iPage < pageList.length; ++iPage) {
                            self.element.append(pageList[iPage].container);
                        }

                        self.setContainerSize(initialScale);
                    });
                }, function (message) {
                    self.onDataDownloaded("failed", 0, 0, "PDF.js: " + message);
                });
            }
        };
        PDFViewer.prototype.setFile = function (file, initialScale, renderTextLayer, pageMargin) {
            this.resetSearch();
            this.pages = [];
            this.hasTextLayer = renderTextLayer;
            this.pageMargin = pageMargin;

            var self = this;
            var reader = new FileReader();
            reader.onload = function(e) {
                var arrayBuffer = e.target.result;
                var uint8Array = new Uint8Array(arrayBuffer);
                self.pages = [];
                var getDocumentTask = PDFJS.getDocument(uint8Array, null, angular.bind(self, self.passwordCallback), angular.bind(self, self.downloadProgress));
                getDocumentTask.then(function (pdf) {
                    self.pdf = pdf;

                    self.getAllPages(function (pageList, pagesRefMap) {
                        self.pages = pageList;
                        self.pagesRefMap = pagesRefMap;

                        // Append all page containers to the $element...
                        for(var iPage = 0;iPage < pageList.length; ++iPage) {
                            element.append(pageList[iPage].container);
                        }

                        self.setContainerSize(initialScale);
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
                remainingPages = numPages;

            if(this.hasTextLayer) {
                for(var iPage = 0;iPage < numPages;++iPage) {
                    pageList.push({});

                    var getPageTask = this.pdf.getPage(iPage + 1);
                    getPageTask.then(function (page) {
                        // Page reference map. Required by the annotation layer.
                        var refStr = page.ref.num + ' ' + page.ref.gen + ' R';
                        pagesRefMap[refStr] = page.pageIndex + 1;

                        var pdfPage = new PDFPage(page, null);
                        pageList[page.pageIndex] = pdfPage;

                        --remainingPages;
                        if(remainingPages === 0) {
                            callback(pageList, pagesRefMap);
                        }

                        page.getTextContent().then(function (textContent) {
                            pdfPage.textContent = textContent;
                        });
                    });
                }
            } else {
                for(var iPage = 0;iPage < numPages;++iPage) {
                    pageList.push({});

                    var getPageTask = this.pdf.getPage(iPage + 1);
                    getPageTask.then(function (page) {
                        pageList[page.pageIndex] = new PDFPage(page, null);

                        --remainingPages;
                        if(remainingPages === 0) {
                            callback(pageList, pagesRefMap);
                        }
                    });
                }
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
                api: "=",
                initialScale: "@",
                renderTextLayer: "@",
                passwordCallback: "&"
            },
            controller: ['$scope', '$element', function ($scope, $element) {

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

                $scope.shouldRenderTextLayer = function () {
                    if(this.renderTextLayer === "" || this.renderTextLayer === undefined || this.renderTextLayer === null || this.renderTextLayer.toLowerCase() === "false") {
                        return false;
                    }

                    return true;
                };

                $scope.onSrcChanged = function () {
                    $element.empty();
                    viewer.open(this.src, this.initialScale, this.shouldRenderTextLayer(), pageMargin);
                };

                viewer.hookScope($scope, $scope.initialScale);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', function (src) {
                    scope.onSrcChanged();
                });
            }
        };
    }]);
