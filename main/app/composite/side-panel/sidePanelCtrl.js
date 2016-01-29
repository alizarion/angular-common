'use strict';

IteSoft
    .controller("$sidePanelCtrl", [
        '$scope',
        '$window',
        '$document',
        '$timeout',
        function ($scope, $window, $document, $timeout) {


            var Z_INDEX_CSS_KEY = 'z-index';

            var IT_HEIGHT_MODE_WINDOW = 'window';
            var IT_HEIGHT_MODE_FULL = 'full';
            var IT_HEIGHT_MODE_AUTO = 'auto';
            var IT_HEIGHT_MODES = [IT_HEIGHT_MODE_WINDOW, IT_HEIGHT_MODE_FULL,IT_HEIGHT_MODE_AUTO];

            var DEFAULT_HEIGHT_MODE = IT_HEIGHT_MODE_WINDOW;
            var DEFAULT_COL_MD = 4;
            var DEFAULT_COLD_MD_PULL = DEFAULT_COL_MD;
            var DEFAULT_ICON_CLASS = 'fa-search';

            var IT_SIDE_PANEL_BUTTON_CLASS = '.it-side-panel-button';
            var IT_SIDE_PANEL_CONTAINER_CLASS = '.it-side-panel-container';
            var IT_SIDE_PANEL_CLASS = '.it-side-panel';
            var IT_SIDE_PANEL_HEADER_CLASS = '.it-side-panel-header';
            var IT_SIDE_PANEL_CONTENT_CLASS = '.it-side-panel-content';
            var IT_SIDE_PANEL_FOOTER_CLASS = '.it-side-panel-footer';

            var _self = this;
            _self.scope = $scope;
            _self.scope.showPanel = false;

            _self.scope.itHeightMode = DEFAULT_HEIGHT_MODE;

            //Set default col-md(s) to the scope
            _self.scope.itSidePanelcolMd = DEFAULT_COL_MD;

            //Set default col-md-pull(s) to the scope
            _self.scope.itSidePanelcolMdPull = DEFAULT_COLD_MD_PULL;


            var w = angular.element($window);


            /**
             * Get window Dimensions
             * @returns {{height: Number, width: Number}}
             */
            _self.scope.getWindowDimensions = function () {
                return {
                    'height': $window.innerHeight,
                    'width': $window.innerWidth
                };
            };

            /**
             * Watch the resizing of window Dimensions
             */
            _self.scope.$watch(_self.scope.getWindowDimensions, function (newValue, oldValue) {

                _self.scope.windowHeight = newValue.height;
                _self.scope.windowWidth = newValue.width;
                var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);

                if (_self.scope.itHeightMode === IT_HEIGHT_MODE_WINDOW) {
                    var newHeight = (_self.scope.windowHeight-sidePanelContainer[0].getBoundingClientRect().top);
                    //console.log(" newHeight calc = ("+_self.scope.windowHeight+"-"+sidePanelContainer[0].getBoundingClientRect().top+") " );

                    sidePanelContainer.css("height", newHeight + "px");

                    var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                    sidePanel.css("height", newHeight+"px");

                    var heightHeader = (newHeight*0.10);
                    var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                    sidePanelHeader.css("height",heightHeader+"px");

                    var heightFooter = (newHeight*0.10);
                    var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                    sidePanelFooter.css("height",heightFooter+"px");

                    var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                    sidePanelContent.css("height", (newHeight*0.8)+"px");

                }

            }, true);

            w.bind('resize', function () {
                _self.scope.$apply();
            });

            /**
             * Change class for display Side Panel or not depending on the value of @{link: _self.scope.showPanel}
             */
            _self.scope.toggleSidePanel = function () {
                _self.scope.showPanel = (_self.scope.showPanel) ? false : true;

                var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                var iconButtonElement = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_BUTTON_CLASS);

                if(_self.scope.showPanel){

                    sidePanel.addClass("col-md-"+_self.scope.itSidePanelcolMd);
                    iconButtonElement.addClass("col-md-"+_self.scope.itSidePanelcolMd);

                } else {
                    sidePanel.removeClass("col-md-"+_self.scope.itSidePanelcolMd);
                    iconButtonElement.removeClass("col-md-"+_self.scope.itSidePanelcolMd);
                }

                $timeout(function(){
                    var event = document.createEvent('Event');
                    event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                    $window.dispatchEvent(event);
                },300);
            };

            _self.scope.setItSidePanelElement = function(element){
                _self.scope.itSidePanelElement = element;
            };


            /**
             * Set the Side Panel Height Mode from "it-height-mode" attributes
             * @param attrs directive attributes object
             */
            _self.scope.setHeightMode = function (attrs){
                _self.scope.itHeightMode = attrs.itHeightMode;

                //If attribute is not defined set the default height Mode
                if (_self.scope.itHeightMode === '' || typeof _self.scope.itHeightMode === 'undefined') {
                    _self.scope.itHeightMode = DEFAULT_HEIGHT_MODE;

                } else if (IT_HEIGHT_MODES.indexOf(_self.scope.itHeightMode) != -1 ) {
                    var index = IT_HEIGHT_MODES.indexOf(_self.scope.itHeightMode);
                    //Get the provided mode
                    _self.scope.itHeightMode = IT_HEIGHT_MODES[index];
                } else{

                    //If height mode is defined but unknown set to the default  height mode
                    _self.scope.itHeightMode = DEFAULT_HEIGHT_MODE;
                }

                //Set height of header, content and footer
                var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                sidePanelHeader.css("height","10%");

                var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                sidePanelFooter.css("height","10%");

                var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                sidePanelContent.css("height", "80%");



                //Configure height of Side Panel elements depending on the provided height mode
                switch(_self.scope.itHeightMode) {
                    case IT_HEIGHT_MODE_FULL:

                        var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                        var sidePanelContainerHeight = sidePanelContainer.css("height");

                        if(sidePanelContainerHeight > _self.scope.windowHeight){
                            sidePanelContainer.css("height", "100%");
                            var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                            sidePanel.css("height", "100%");
                        }else {
                            //console.log("size of container is less than window height so height is 100%!");
                        }
                        break;
                    case IT_HEIGHT_MODE_AUTO:
                        //console.log(IT_HEIGHT_MODE_AUTO+" mode!");
                        break;
                    case IT_HEIGHT_MODE_WINDOW:

                        var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                        sidePanel.css("height", "100%");

                        //set overflow : auto to the Side Panel Content
                        var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                        sidePanelContent.css("overflow", "auto");
                        break;
                    default:
                        console.error("Height mode : '"+_self.scope.itHeightMode+"'!");
                }
            };

            /**
             * Retrieve provided iconClass and put the value it in scope
             * @param scope the scope
             * @param attrs the attributes provided by directive
             * @private
             */
            _self.scope.setIconClass = function (scope, attrs) {
                var defaultIconClass = DEFAULT_ICON_CLASS;
                if (attrs.itIconClass === '' || typeof attrs.itIconClass === 'undefined') {
                    _self.scope.itIconClass = defaultIconClass;
                } else {
                    _self.scope.itIconClass = attrs.itIconClass;
                }
            };

            /**
             * Handle col-md of directive.
             * If itCol is provided to the directive apply its col-md-X
             * If no itCol is provided to the directive, the col-md-X applied will be the default col-md-X. Where X is DEFAULT_COL_MD
             * @param element
             * @param attrs
             */
            _self.scope.setColMd = function (attrs) {
                var colMd = DEFAULT_COL_MD;
                if (!isNaN(parseInt(attrs.itCol))) {
                    _self.scope.itSidePanelcolMd = attrs.itCol;
                    _self.scope.itSidePanelcolMdPull = 12-_self.scope.itSidePanelcolMd;
                }
            };

            /**
             * Handle z indexes of directive.
             * If itZIndex is provided to the directive apply its z-index
             * If no itZIndex is provided to the directive, the z-index applied will be the highest zi-index of the DOM + 100
             * @param element
             * @param attrs
             */
            _self.scope.setZIndexes = function (element, attrs) {

                var zindex = null;
                if (!isNaN(parseInt(attrs.itZIndex))) {
                    zindex = parseInt(attrs.itZIndex);
                }

                var sidePanelContainer = _self.scope.getElementFromClass(element, IT_SIDE_PANEL_CONTAINER_CLASS);
                var iconButtonElement = _self.scope.getElementFromClass(element, IT_SIDE_PANEL_BUTTON_CLASS);

                if (zindex !== null) {
                    sidePanelContainer.css(Z_INDEX_CSS_KEY, zindex);
                    iconButtonElement.css(Z_INDEX_CSS_KEY, zindex + 1);
                } else {

                    var highestZIndex = _self.scope.findHighestZIndex();
                    var newHighestZIndex = highestZIndex + 100;

                    //set the zindex to side panel element
                    sidePanelContainer.css(Z_INDEX_CSS_KEY, newHighestZIndex);

                    //set the zindex to the icon button of the side panel element
                    iconButtonElement.css(Z_INDEX_CSS_KEY, newHighestZIndex + 1);

                }
            };

            /**
             * Get Dom element from its class
             * @param element dom element in which the class search will be performed
             * @param className className. Using 'querySelector' selector convention
             * @private
             */
            _self.scope.getElementFromClass = function (element, className) {
                var content = angular.element(element[0].querySelector(className));
                var sidePanel = angular.element(content[0]);
                return sidePanel;
            };

            /**
             * Find the highest z-index of the DOM
             * @returns {number} the highest z-index value
             * @private
             */
            _self.scope.findHighestZIndex = function () {
                var elements = document.getElementsByTagName("*");
                var highest_index = 0;

                for (var i = 0; i < elements.length - 1; i++) {
                    var computedStyles = $window.getComputedStyle(elements[i]);
                    var zindex = parseInt(computedStyles['z-index']);
                    if ((!isNaN(zindex) ? zindex : 0 ) > highest_index) {
                        highest_index = zindex;
                    }
                }
                return highest_index;
            };
        }
    ]);
