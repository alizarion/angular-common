'use strict';
/**
 * TODO Tiff implementation desc
 */
itTiffViewer
    .factory('TIFFPage', ['$log' , '$timeout', 'MultiPagesPage', 'MultiPagesConstants', function($log, $timeout, MultiPagesPage, MultiPagesConstants) {

        function TIFFPage(viewer, pageIndex, getSrc, view) {
            this.base = MultiPagesPage;
            this.base(viewer, pageIndex, view);

            this.getSrc = getSrc;
        }

        TIFFPage.prototype = new MultiPagesPage;

        TIFFPage.prototype.renderPage = function (page, callback) {
            var self = this;
            /*if(this.rendered) {
             if(callback) {
             callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
             }
             return;
             };

             this.rendered = true;*/

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
            }else {
                page.wrapper.append(page.canvas);

                var ctx = page.canvas[0].getContext('2d');
                ctx.transform.apply(ctx, page.viewport.transform);
                var img = new Image;
                img.onload = function(){
                    ctx.drawImage(img,0,0); // Or at whatever offset you like
                    //self.canvasRendered = true;
                    if(callback) {
                        callback(page, MultiPagesConstants.PAGE_RENDERED);
                    }
                };

                $timeout(function () {
                    if(self.src == undefined){
                        self.src =  self.getSrc(page.pageIndex);
                    }

                    img.src = self.src;
                }, 50);

            }
        };

        return (TIFFPage);
    }])

    .factory('TIFFViewer', ['$log', 'MultiPagesViewerAPI' , 'TIFFPage' , 'MultiPagesViewer', function($log, MultiPagesViewerAPI, TIFFPage, MultiPagesViewer) {
        try {
            Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});
        } catch(ex) {
            $log.debug("Lib tiff throw exception on set TOTAL_MEMORY : " + ex);
        }

        function TIFFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new MultiPagesViewerAPI(this), element);

            this.tiff = null;
        }

        TIFFViewer.prototype = new MultiPagesViewer;

        TIFFViewer.prototype.open = function(obj, initialScale, orientation, pageMargin) {
            this.element.empty();
            this.pages = [];
            this.pageMargin = pageMargin;
            this.initialScale = initialScale;
            this.orientation = orientation;
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
                self.addPages();
                //self.setContainerSize(self.initialScale);
            });
        };
        TIFFViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.tiff.countDirectory(),
                remainingPages = numPages,
                self = this;

            function _getUrl(index) {
                self.tiff.setDirectory(index);
                return self.tiff.toDataURL();
            };
            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                self.tiff.setDirectory(iPage);
                var page =  new TIFFPage(self, iPage, _getUrl, [0,0, self.tiff.width(), self.tiff.height()]);
                pageList[iPage] = page;

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
                options: "="

            },
            controller: ['$scope', '$element', function($scope, $element) {

                var getOption = function(optionName) {
                    if($scope.options === null || $scope.options === undefined) {
                        return null;
                    }
                    return $scope.options[optionName];
                };

                var viewer = new TIFFViewer($element);

                $scope.api = viewer.getAPI();

                $scope.onSrcChanged = function() {
                    viewer.open(this.src, getOption("initialScale"), getOption("orientation"), pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open(this.file, getOption("initialScale"), getOption("orientation"), pageMargin);
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
