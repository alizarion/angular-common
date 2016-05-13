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

        IMAGEViewer.prototype.open = function(url, initialScale, pageMargin) {
            this.pages = [];
            this.pageMargin = pageMargin;
            var self = this;

            if (url !== undefined && url !== null && url !== '') {
                self.getAllPages(url, function(pageList) {
                    self.pages = pageList;

                    self.setContainerSize(initialScale);
                });
            }
        };
        IMAGEViewer.prototype.getAllPages = function(url, callback) {
            var pageList = [],
                self = this;

            pageList.push({});

            var img = new Image;
            img.onprogress = angular.bind(this, self.downloadProgress);
            img.onload = function(){
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
                    $element.empty();
                    viewer.open(this.src, this.initialScale, pageMargin);
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

