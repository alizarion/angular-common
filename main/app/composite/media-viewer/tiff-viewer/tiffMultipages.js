'use strict';
/**
 * TODO Tiff implementation desc
 */
itTiffViewer
    .factory('TIFFPage', ['$log' , 'MultiPagesPage', 'MultiPagesConstants', function($log, MultiPagesPage, MultiPagesConstants) {

        function TIFFPage(pageIndex, src, view) {
            this.base = MultiPagesPage;
            this.base(pageIndex, view);

            this.src = src;
        }

        TIFFPage.prototype = new MultiPagesPage;

        TIFFPage.prototype.render = function (callback) {
            var self = this;
            if(this.rendered) {
                if(callback) {
                    callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                }
                return;
            };

            this.rendered = true;

            if(this.canvasRendered){
                self.container.append(self.canvas);
            }else {
                self.container.append(self.canvas);

                var ctx = self.canvas[0].getContext('2d');
                var img = new Image;
                img.onload = function(){
                    ctx.drawImage(img,0,0, self.viewport.width, self.viewport.height); // Or at whatever offset you like

                    if(callback) {
                        callback(self, MultiPagesConstants.PAGE_RENDERED);
                    }
                };
                img.src = this.src;
            }
        };

        return (TIFFPage);
    }])

    .factory('TIFFViewer', ['$log', 'MultiPagesViewerAPI' , 'TIFFPage' , 'MultiPagesViewer', function($log, MultiPagesViewerAPI, TIFFPage, MultiPagesViewer) {
        Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});

        function TIFFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new MultiPagesViewerAPI(this), element);

            this.tiff = null;
        }

        TIFFViewer.prototype = new MultiPagesViewer;

        TIFFViewer.prototype.open = function(obj, initialScale, pageMargin) {
            this.element.empty();
            this.pages = [];
            this.pageMargin = pageMargin;
            this.initialScale = initialScale;
            var isFile = typeof obj != typeof "";

            if(isFile){
                this.setFile(obj);
            }else {
                this.setUrl(obj);
            }
        };
        TIFFViewer.prototype.setUrl = function(url) {
            if (url !== undefined && url !== null && url !== '') {
                var self = this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'arraybuffer';
                xhr.onprogress =  angular.bind(this, self.downloadProgress);
                xhr.onload = function (e) {
                    self.loadTiff(xhr.response);
                };
                xhr.send();
            }
        };
        TIFFViewer.prototype.setFile = function(file) {
            if (file !== undefined && file !== null) {
                var self = this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    self.loadTiff(e.target.result);
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
            }
        };
        TIFFViewer.prototype.loadTiff = function(arrayBuffer){
            var self = this;
            self.onDestroy();
            self.tiff = new Tiff({buffer: arrayBuffer});
            self.getAllPages(function(pageList) {
                self.pages = pageList;

                self.setContainerSize(self.initialScale);
            });
        };
        TIFFViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.tiff.countDirectory(),
                remainingPages = numPages;
            var self = this;
            function _getUrl(index) {
                self.tiff.setDirectory(index);
                return self.tiff.toDataURL();
            };
            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                this.tiff.setDirectory(iPage);
                var page =  new TIFFPage(iPage, _getUrl, [0,0,this.tiff.width(),this.tiff.height()]);
                pageList[iPage] = page;

                this.element.append(page.container);

                --remainingPages;
                if (remainingPages === 0) {
                    callback(pageList);
                }
            }
        };
        TIFFViewer.prototype.onDestroy = function () {
            if(self.tiff != null){
                self.tiff.close();
                self.tiff = null;
            }
        };

        return (TIFFViewer);
    }])

    .directive("tiffViewer", ['$log' , 'TIFFViewer', function($log, TIFFViewer) {
        var pageMargin = 10;

        return {
            restrict: "E",
            scope:
            {
                src: "@",
                file: "=",
                api: "=",
                initialScale: "@"

            },
            controller: ['$scope', '$element', function($scope, $element) {

                var viewer = new TIFFViewer($element);

                $scope.api = viewer.getAPI();

                $scope.onSrcChanged = function() {
                    viewer.open(this.src, this.initialScale, pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open(this.file, this.initialScale, pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function(scope, element, attrs) {
                attrs.$observe('src', function(src) {
                    scope.onSrcChanged();
                });

                scope.$watch("file", function (file) {
                    scope.onFileChanged();
                });
            }
        };
    }]);
