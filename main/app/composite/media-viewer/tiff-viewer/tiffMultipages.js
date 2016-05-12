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
        //Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});

        function TIFFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new MultiPagesViewerAPI(this), element);

            this.tiff = null;
        }

        TIFFViewer.prototype = new MultiPagesViewer;

        TIFFViewer.prototype.open = function(url, initialScale, pageMargin) {
            this.pages = [];
            this.pageMargin = pageMargin;
            if (url !== undefined && url !== null && url !== '') {

                var self = this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'arraybuffer';
                xhr.onprogress =  angular.bind(this, self.downloadProgress);
                xhr.onload = function (e) {
                    var buffer = xhr.response;
                    self.onDestroy();
                    Tiff.initialize({TOTAL_MEMORY:16777216*5});
                    self.tiff = new Tiff({buffer: buffer});
                    self.getAllPages(function(pageList) {
                        self.pages = pageList;

                        self.setContainerSize(initialScale);
                    });
                };
                xhr.send();
            }
        };
        TIFFViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.tiff.countDirectory(),
                remainingPages = numPages;

            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                this.tiff.setDirectory(iPage);
                var src = this.tiff.toDataURL();
                var page =  new TIFFPage(iPage, src, [0,0,this.tiff.width(),this.tiff.height()]);
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
                    $element.empty();
                    viewer.open(this.src, this.initialScale, pageMargin);
                };

                viewer.hookScope($scope, $scope.initialScale);
            }],
            link: function(scope, element, attrs) {
                attrs.$observe('src', function(src) {
                    scope.onSrcChanged();
                });
            }
        };
    }]);
