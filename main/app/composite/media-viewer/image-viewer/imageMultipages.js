'use strict';
/**
 * TODO Image implementation desc
 */
itImageViewer
    .factory('IMAGEPage', ['$log' , 'MultiPagesPage', 'PageViewport', 'MultiPagesConstants', function($log, MultiPagesPage, PageViewport, MultiPagesConstants) {

        function IMAGEPage(pageIndex, img, view) {
            this.base = MultiPagesPage;
            this.base(pageIndex, view);
            this.img = img;
        }

        IMAGEPage.prototype = new MultiPagesPage;

        IMAGEPage.prototype.render = function (callback) {
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
                ctx.drawImage(this.img ,0,0, self.viewport.width, self.viewport.height); // Or at whatever offset you like

                if(callback) {
                    callback(self, MultiPagesConstants.PAGE_RENDERED);
                }
            }
        };

        return (IMAGEPage);
    }])

    .factory('IMAGEViewer', ['$log', 'MultiPagesViewer', 'MultiPagesViewerAPI', 'IMAGEPage', function ($log, MultiPagesViewer, MultiPagesViewerAPI, IMAGEPage) {
        function IMAGEViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new MultiPagesViewerAPI(this), element);
        }

        IMAGEViewer.prototype = new MultiPagesViewer;

        IMAGEViewer.prototype.open = function(obj, initialScale, pageMargin) {
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
        IMAGEViewer.prototype.setUrl = function(url) {
            if (url !== undefined && url !== null && url !== '') {
                var self = this;
                self.getAllPages(url, function(pageList) {
                    self.pages = pageList;

                    self.setContainerSize(self.initialScale);
                });
            }
        };
        IMAGEViewer.prototype.setFile = function(file) {
            if (file !== undefined && file !== null) {
                var self = this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var url = e.target.result;
                    self.getAllPages(url, function(pageList) {
                        self.pages = pageList;

                        self.setContainerSize(self.initialScale);
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

                reader.readAsDataURL(file);
            }
        };
        IMAGEViewer.prototype.getAllPages = function(url, callback) {
            var pageList = [],
                self = this;

            pageList.push({});

            var img = new Image;
            img.onprogress = angular.bind(this, self.downloadProgress);
            img.onload = function() {
                var page =  new IMAGEPage(0, img, [0,0, img.width, img.height]);
                pageList[0] = page;

                self.element.append(page.container);

                callback(pageList);
            };
            img.src = url;
        };

        return (IMAGEViewer);
    }])

    .directive("imageViewer", ['$log', 'IMAGEViewer', function ($log, IMAGEViewer) {
        var pageMargin = 10;

        return {
            restrict: "E",
            scope: {
                src: "@",
                api: "=",
                initialScale: "@",
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                var viewer = new IMAGEViewer($element); ;

                $scope.api = viewer.getAPI();

                $scope.onSrcChanged = function () {
                    viewer.open(this.src, this.initialScale, pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open(this.file, this.initialScale, pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', function (src) {
                    scope.onSrcChanged();
                });

                scope.$watch("file", function (file) {
                    scope.onFileChanged();
                });
            }
        };
    }]);

