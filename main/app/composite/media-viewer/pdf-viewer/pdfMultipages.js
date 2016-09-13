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

        function PDFPage(pdfPage, hasTextLayer) {
            this.base = MultiPagesPage;
            this.base(pdfPage.pageIndex);

            this.pdfPage = pdfPage;
            this.renderTask = null;
            this.hasTextLayer = hasTextLayer;
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
            return this.pdfPage.getViewport(scale, rotation, 0, 0);
        };
        PDFPage.prototype.transform = function () {
            MultiPagesPage.prototype.transform.call(this);

            this.textLayer = angular.element("<div class='text-layer'></div>");
            this.textLayer.css("width", this.viewport.width + "px");
            this.textLayer.css("height", this.viewport.height + "px");
        };
        PDFPage.prototype.renderPage = function (page, callback) {

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
                if(page.hasTextLayer) {
                    page.wrapper.append(page.textLayer);
                }
            }else{

                page.wrapper.append(page.canvas);

                page.renderTask = this.pdfPage.render({
                    canvasContext: page.canvas[0].getContext('2d'),
                    viewport: page.viewport
                });

                page.renderTask.then(function () {

                    //self.rendered = true;
                    page.renderTask = null;
                    if(callback) {
                        callback(page, MultiPagesConstants.PAGE_RENDERED);
                    }
                    //wrapper.append(self.canvas);

                    if(page.hasTextLayer) {
                        page.pdfPage.getTextContent().then(function (textContent) {
                            // Render the text layer...
                            var textLayerBuilder = new TextLayerBuilder({
                                textLayerDiv: page.textLayer[0],
                                pageIndex: page.id,
                                viewport: page.viewport
                            });

                            textLayerBuilder.setTextContent(textContent);
                            textLayerBuilder.renderLayer();
                            page.wrapper.append(page.textLayer);
                        });
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

    .factory('PDFViewer', ['$log', 'MultiPagesViewer', 'PDFViewerAPI', 'PDFPage', function ($log, MultiPagesViewer, PDFViewerAPI, PDFPage) {
        function PDFViewer(element) {
                this.base = MultiPagesViewer;
                this.base(new PDFViewerAPI(this), element);

                this.pdf = null;
                // Hooks for the client...
                this.passwordCallback = null;
           }

            PDFViewer.prototype = new MultiPagesViewer;

            PDFViewer.prototype.open = function (obj, initialScale, renderTextLayer, orientation, pageMargin) {
                this.element.empty();
                this.pages = [];
                if (obj !== undefined && obj !== null && obj !== '') {
                    this.pageMargin = pageMargin;
                    this.initialScale = initialScale;
                    this.hasTextLayer = renderTextLayer;
                    this.orientation = orientation;
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
                    remainingPages = numPages;

                if(this.hasTextLayer) {
                    for(var iPage = 0;iPage < numPages;++iPage) {
                        pageList.push({});

                        var getPageTask = this.pdf.getPage(iPage + 1);
                        getPageTask.then(function (page) {
                            // Page reference map. Required by the annotation layer.
                            var refStr = page.ref.num + ' ' + page.ref.gen + ' R';
                            pagesRefMap[refStr] = page.pageIndex + 1;

                            var pdfPage = new PDFPage(page, true);
                            pageList[page.pageIndex] = pdfPage;

                            --remainingPages;
                            if(remainingPages === 0) {
                                callback(pageList, pagesRefMap);
                            }

                            /*page.getTextContent().then(function (textContent) {
                                pdfPage.textContent = textContent;
                            });*/
                        });
                    }
                } else {
                    for(var iPage = 0;iPage < numPages;++iPage) {
                        pageList.push({});

                        var getPageTask = this.pdf.getPage(iPage + 1);
                        getPageTask.then(function (page) {
                            pageList[page.pageIndex] = new PDFPage(page, false);

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

                var shouldRenderTextLayer = function () {
                    var renderTextLayer = getOption("renderTextLayer");
                    if(typeof renderTextLayer === typeof true) {
                        return renderTextLayer;
                    }

                    return false;
                };

                $scope.onSrcChanged = function () {
                    viewer.open($scope.src, getOption("initialScale"), shouldRenderTextLayer(), getOption("orientation"), pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open($scope.file, getOption("initialScale"), shouldRenderTextLayer(), getOption("orientation"), pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', scope.onSrcChanged);

                scope.$watch("file", scope.onFileChanged);
            }
        };
    }]);
