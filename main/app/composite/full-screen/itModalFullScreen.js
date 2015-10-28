/**
 * @ngdoc directive
 * @name itesoft.directive:itModalFullScreen
 * @module itesoft
 * @restrict EA
 *
 * @description
 * print the encapsuled content into full screen modal popup
 *
 * <table class="table">
 *  <tr>
 *   <td><code><it-modal-full-screen it-open-class="myCssClass"></code></td>
 *   <td>class to set on the modal popup where is expanded , default class it-modal-background </td>
 *  </tr>
 * <tr>
 *   <td><code><it-modal-full-screen it-escape-key="27"></code></td>
 *   <td>it-escape-key keyboard mapping for close action, default 27 "escape key" </td>
 *  </tr>
 * <tr>
 *   <td>it-z-index="700"</td>
 *   <td>set the  z-index of the modal element, by default take highest index of the view.</td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft">
     <file name="index.html">
         <it-modal-full-screen  >
             <div class="jumbotron" >Lorem ipsum dolor sit amet,
             consectetur adipisicing elit. Assumenda autem cupiditate dolor dolores dolorum et fugiat inventore
             ipsum maxime, pariatur praesentium quas sit temporibus velit, vitae. Ab blanditiis expedita tenetur.
             </div>
         </it-modal-full-screen>
     </file>

 </example>
 */
IteSoft
    .directive('itModalFullScreen',
    [ '$timeout','$window','$document',
        function( $timeout,$window,$document) {

            function _findHighestZIndex()
            {
                var elements = document.getElementsByTagName("*");
                var highest_index = 0;

                for (var i = 0; i < elements.length - 1; i++) {
                    var computedStyles = $window.getComputedStyle(elements[i]);
                    var zindex = parseInt(computedStyles['z-index']);
                    if ((!isNaN(zindex)? zindex : 0 )> highest_index) {
                        highest_index = zindex;
                    }
                }
                return highest_index;
            }

            var TEMPLATE = '<div class="it-modal-full-screen" ng-class="$isModalOpen? $onOpenCss : \'\'">' +
                '<div  ng-if="$isModalOpen"  class="it-modal-full-screen-button ">' +
                '<button class="btn pull-right" ng-click="$closeModal()"><div class="it-animated-ciruclar-button"><i class="fa fa-compress"></i></div></button>' +
                '</div>'+
                '<div  ng-if="!$isModalOpen"  class="it-modal-full-screen-button ">' +
                ' <button class="btn pull-right"  ng-click="$openModal()"><div class="it-animated-ciruclar-button"><i class="fa fa-expand"></i></div></button> ' +
                '</div>'+
                '<div  class="it-modal-full-screen-content it-fill"  ng-transclude> </div>' +
                '</div>';

            return {
                restrict: 'EA',
                transclude: true,
                scope: false,
                template: TEMPLATE,
                link : function(scope, iElement, iAttrs, controller){
                    var zindex = (!isNaN(parseInt(iAttrs.itZIndex))? parseInt(iAttrs.itZIndex) : null);
                    scope.$onOpenCss = iAttrs.itOpenClass ?iAttrs.itOpenClass : 'it-modal-background';

                    var escapeKey =   (!isNaN(parseInt(iAttrs.itEscapeKey))? parseInt(iAttrs.itEscapeKey) : 27);
                    var content = angular.element(iElement[0]
                        .querySelector('.it-modal-full-screen'));
                    var contentElement = angular.element(content[0]);
                    scope.$openModal = function () {
                        scope.$isModalOpen = true;
                        var body = document.getElementsByTagName("html");
                        var computedStyles = $window.getComputedStyle(body[0]);
                        var top = parseInt(computedStyles['top']);
                        var marginTop = parseInt(computedStyles['margin-top']);
                        var paddingTop = parseInt(computedStyles['padding-top']);
                        var topSpace = (!isNaN(parseInt(top))? parseInt(top) : 0) +
                            (!isNaN(parseInt(marginTop))? parseInt(marginTop) : 0)
                            + (!isNaN(parseInt(paddingTop))? parseInt(paddingTop) : 0);
                        contentElement.addClass('it-opened');
                        contentElement.css('top', topSpace+'px');
                        if(zindex !== null){
                            contentElement.css('z-index',zindex );
                        } else {
                            contentElement.css('z-index', _findHighestZIndex() +100 );
                        }
                        $timeout(function(){
                            var event = document.createEvent('Event');
                            event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                            $window.dispatchEvent(event);
                        },300)
                    };

                    scope.$closeModal = function(){
                        scope.$isModalOpen = false;
                        scope.$applyAsync(function(){
                            contentElement.removeAttr( 'style' );
                            contentElement.removeClass('it-opened');
                            $timeout(function(){
                                var event = document.createEvent('Event');
                                event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                                $window.dispatchEvent(event);
                            },300)
                        })
                    };

                    $document.on('keyup', function(e) {
                        if(e){
                            if(e.keyCode == escapeKey){
                                scope.$closeModal();
                            }
                        }
                    });
                }
            }
        }]);

