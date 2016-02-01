'use strict';

IteSoft
    .controller("$sidePanelCtrl", [
        '$scope',
        '$window',
        '$document',
        '$timeout',
        '$log',
        function ($scope, $window, $document, $timeout, $log) {


            var COL_MD_NAME = 'it-col';
            var HEIGHT_MODE_NAME = 'it-height-mode';

            var DEFAULT_SIDE_PANEL_BUTTON_WIDTH = 40;

            var Z_INDEX_CSS_KEY = 'z-index';

            var IT_HEIGHT_MODE_WINDOW = 'window';
            var IT_HEIGHT_MODE_FULL = 'full';
            var IT_HEIGHT_MODE_AUTO = 'auto';
            var IT_HEIGHT_MODES = [IT_HEIGHT_MODE_WINDOW, IT_HEIGHT_MODE_FULL,IT_HEIGHT_MODE_AUTO];

            var DEFAULT_HEIGHT_MODE = IT_HEIGHT_MODE_WINDOW;
            var DEFAULT_COL_MD = 4;
            var MAX_COL_MD = 12;
            var MIN_COL_MD = 1;

            var DEFAULT_ICON_CLASS = 'fa-search';

            var IT_SIDE_PANEL_BUTTON_CLASS = '.it-side-panel-button';
            var IT_SIDE_PANEL_BUTTON_RIGHT_CLASS = '.it-side-panel-button-right';
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

            _self.scope.sidePanelButtonWidth = DEFAULT_SIDE_PANEL_BUTTON_WIDTH;

            _self.scope.sidePanelContainerWidth = null;
            _self.scope.sidePanelContainerRight = null;
            _self.scope.sidePanelButtonRight = null;


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

                    sidePanelContainer.css('height', newHeight + 'px');

                    var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                    sidePanel.css('height', newHeight+'px');

                    var heightHeader = (newHeight*0.10);
                    var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                    sidePanelHeader.css('height',heightHeader+'px');

                    var heightFooter = (newHeight*0.10);
                    var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                    sidePanelFooter.css('height',heightFooter+'px');

                    var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                    sidePanelContent.css('height', (newHeight*0.8)+'px');

                }


                if(_self.scope.showPanel){
                    var newWidth = (_self.scope.windowWidth/12*_self.scope.itSidePanelcolMd);
                    _self.scope.sidePanelContainerWidth = newWidth;
                    sidePanelContainer.css('width', newWidth + 'px');
                //if its the firt time initialise all components width an right
                }else {
                    _self.scope.modifySidePanelCssProperties(true);
                }

            }, true);

            /**
             * Update Side panel Css properties (right and width)
             */
            _self.scope.modifySidePanelCssProperties = function (){

                var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                var sidePanelButtonRight = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_BUTTON_RIGHT_CLASS);
                var newWidth = (_self.scope.windowWidth / 12) * _self.scope.itSidePanelcolMd;

                _self.scope.sidePanelContainerWidth = newWidth;
                _self.scope.sidePanelContainerRight = -_self.scope.sidePanelContainerWidth;
                _self.scope.sidePanelButtonRight = _self.scope.sidePanelContainerWidth;

                //update side panel container right and width properties
                sidePanelContainer.css('width', _self.scope.sidePanelContainerWidth + 'px');
                sidePanelContainer.css('right', _self.scope.sidePanelContainerRight + 'px');

                //update side panel button right right property
                sidePanelButtonRight.css('right', _self.scope.sidePanelButtonRight + 'px');
            };

            w.bind('resize', function () {
                _self.scope.$apply();
            });

            /**
             * Change class for display Side Panel or not depending on the value of @{link: _self.scope.showPanel}
             */
            _self.scope.toggleSidePanel = function () {
                _self.scope.showPanel = (_self.scope.showPanel) ? false : true;

                var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                var iconButtonElement = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_BUTTON_CLASS);

                if(_self.scope.showPanel){

                    //Reset the right property of Side panel button
                    iconButtonElement.css('right', "");

                    //Do the transition in order to the side panel be visible
                    //Wait few ms to prevent unexpected "iconButtonElement" transition behaviour
                    $timeout(function(){
                        _self.scope.sidePanelContainerRight = 0;
                        sidePanelContainer.css('right', _self.scope.sidePanelContainerRight+'px');
                    },50);


                } else {


                    //sidePanelContainer.removeClass("col-md-"+_self.scope.itSidePanelcolMd);
                    //iconButtonElement.removeClass("col-md-"+_self.scope.itSidePanelcolMd);

                    var newRight = sidePanelContainer.css('width');
                    _self.scope.sidePanelContainerRight = -parseInt(newRight.slice(0, newRight.length-2));
                    _self.scope.sidePanelButtonRight = _self.scope.sidePanelContainerWidth;

                    sidePanelContainer.css('right', _self.scope.sidePanelContainerRight+'px');
                    iconButtonElement.css('right', _self.scope.sidePanelButtonRight+'px');
                }
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
                    $log.error('"'+HEIGHT_MODE_NAME+'" with value "'+_self.scope.itHeightMode+'"is unknown. ' +
                        'The default value is taken : "'+DEFAULT_HEIGHT_MODE+'"');
                }

                //Set height of header, content and footer
                var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                sidePanelHeader.css('height','10%');

                var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                sidePanelFooter.css('height','10%');

                var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                sidePanelContent.css('height', '80%');



                //Configure height of Side Panel elements depending on the provided height mode
                switch(_self.scope.itHeightMode) {
                    case IT_HEIGHT_MODE_FULL:

                        var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                        var sidePanelContainerHeight = sidePanelContainer.css('height');

                        if(sidePanelContainerHeight > _self.scope.windowHeight){
                            sidePanelContainer.css('height', '100%');
                            var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                            sidePanel.css('height', '100%');
                        }
                        break;
                    case IT_HEIGHT_MODE_AUTO:
                        //console.log(IT_HEIGHT_MODE_AUTO+" mode!");
                        break;
                    case IT_HEIGHT_MODE_WINDOW:

                        var sidePanel = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CLASS);
                        sidePanel.css('height', '100%');

                        //set overflow : auto to the Side Panel Content
                        var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                        sidePanelContent.css('overflow', 'auto');
                        break;
                    default:
                        $log.error('Height mode : "'+_self.scope.itHeightMode+'" is unknown.');
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

                    if (attrs.itCol > MAX_COL_MD) {
                        _self.scope.itSidePanelcolMd = MAX_COL_MD;
                        $log.warn('Attribute "' + COL_MD_NAME + '" of itSidePanel directive exceeds the maximum value ' +
                            '(' + MAX_COL_MD + '). The maximum value is taken.');
                    } else if (attrs.itCol < MIN_COL_MD) {
                        _self.scope.itSidePanelcolMd = MIN_COL_MD;
                        $log.warn('Attribute "' + COL_MD_NAME + '" of itSidePanel directive exceeds the minimum value ' +
                            '(' + MIN_COL_MD + '). The minimum value is taken.');
                    } else {
                        _self.scope.itSidePanelcolMd = attrs.itCol;
                    }
                } else {
                    _self.scope.itSidePanelcolMd = DEFAULT_COL_MD;
                    $log.warn('Attribute "' + COL_MD_NAME + '" of itSidePanel directive is not a number. ' +
                     'The default value is taken : "' + _self.scope.itSidePanelcolMd + '"');
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
