'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanel
 * @module itesoft
 * @restrict E
 *
 * @description
 * A container element for side panel and its Header, Content and Footer
 *
 * <table class="table">
 *   <tr>
 *      <td>
 *          <pre>
 *              <it-side-panel it-col="3">
 *              </it-side-panel>
 *          </pre>
 *      </td>
 *      <td>number of bootstrap columns of the Site Panel element, if undefined = 4</td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <pre>
 *          <it-side-panel it-z-index="700">
 *          </it-side-panel>
 *          </pre>
 *      </td>
 *      <td>set the  z-index of the Site Panel elements, by default take highest index of the view.</td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <pre>
 *              <it-side-panel it-icon-class="fa-star-o">
 *              </it-side-panel>
 *          </pre>
 *      </td>
 *      <td>set icon class of Site Panel button. Use Font Awesome icons</td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <pre>
 *              <it-side-panel it-height-mode="auto | window | full">
 *              </it-side-panel>
 *          </pre>
 *      </td>
 *      <td>
 *          set "Height Mode" of the Side Panel.
 *          <ul>
 *              <li><b>auto</b> :
 *                  <ul>
 *                      <li>if height of Side Panel is greater to the window's : the mode "window" will be applied.</li>
 *                      <li>Else the height of Side Panel is equal to its content</li>
 *                  </ul>
 *                </li>
 *              <li><b>window</b> : the height of the side panel is equal to the height of the window </li>
 *              <li><b>full</b>
*                   <ul>
 *                      <li>If the height of Side Panel is smaller than the window's, the mode "auto" is applied</li>
 *                      <li>Else the height of Side Panel covers the height of its content (header, content and footer) without scroll bar.</li>
 *                  </ul>
 *              </li>
 *          </ul>
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <pre>
 *              <it-side-panel it-top-position="XX | none">
 *              </it-side-panel>
 *          </pre>
 *      </td>
 *      <td>
 *          set css top position of the Side Panel. Default value is "none" mode
 *          <ul>
 *              <li><b>none</b> :  Will take the default css "top" property of the side panel. Default "top" is "0px".</li>
 *              <li><b>XX</b> : Has to be a number. It will override the default css top position
 *              </li>
 *          </ul>
 *      </td>
 *  </tr>
 * </table>
 *
 * ```html
 * <it-side-panel>
 *      <it-side-panel-header>
 *          <!--Header of Side Panel -->
 *      </it-side-panel-header>
 *      <it-side-panel-content>
 *          <!--Content Side Panel-->
 *      </it-side-panel-content>
 *      <it-side-panel-footer>
 *          <!--Footer Side Panel-->
 *      </it-side-panel-footer>
 * </it-side-panel>
 * ```
 * @example
 <example module="itesoft">
 <file name="custom.css">

     it-side-panel:nth-of-type(1) .it-side-panel-container .it-side-panel-button  {
       background-color: blue;
     }

     it-side-panel:nth-of-type(2) .it-side-panel-container .it-side-panel-button {
       background-color: green;
     }

     it-side-panel:nth-of-type(3) .it-side-panel-container .it-side-panel-button {
       background-color: gray;
     }


     .it-side-panel-container .it-side-panel .it-side-panel-footer {
        text-align: center;
        display: table;
        width: 100%;
     }

     .it-side-panel-container .it-side-panel .it-side-panel-footer div{
        display: table-cell;
        vertical-align:middle;
     }

     .it-side-panel-container .it-side-panel .it-side-panel-footer .btn {
        margin:0px;
     }

 </file>
 <file name="index.html">

 <it-side-panel it-col="6" it-z-index="1100" it-height-mode="window" it-top-position="40"  it-icon-class="fa-star-o">
 <it-side-panel-header>
 <div><h1>Favorites</h1></div>
 </it-side-panel-header>
 <it-side-panel-content>
 <div>
 <h2>Favorite 1</h2>
 <p>

 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, repudiandae, totam vel dignissimos saepe cum assumenda velit tempora blanditiis harum hic neque et magnam tenetur alias provident tempore cumque facilis.
 </p>

 <br>
 <h2>Favorite 2</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 3</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 4</h2>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h2>Favorite 5</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 6</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 7</h2>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h2>Favorite 8</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 9</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 10</h2>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h2>Favorite 11</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 12</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 13</h2>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h2>Favorite 14</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 15</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Favorite 16</h2>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>


 </div>
 </it-side-panel-content>
 <it-side-panel-footer>
 <div><button class="btn btn-default btn-success">Submit</button></div>
 </it-side-panel-footer>
 </it-side-panel>


 <it-side-panel it-col="8" it-z-index="1200" it-height-mode="auto" it-top-position="none"  it-icon-class="fa-pied-piper-alt">
 <it-side-panel-header>
 <div><h1>Silicon Valley</h1></div>
 </it-side-panel-header>
 <it-side-panel-content>
 <div>
 <h2>Paragraph 1</h2>
 <p>

 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, repudiandae, totam vel dignissimos saepe cum assumenda velit tempora blanditiis harum hic neque et magnam tenetur alias provident tempore cumque facilis.
 </p>

 <br>
 <h2>Paragraph 2</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2 >Paragraph 3</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>

 </div>
 </it-side-panel-content>
 <it-side-panel-footer>
 <div><button class="btn btn-default btn-success">Submit</button></div>
 </it-side-panel-footer>
 </it-side-panel>



 <it-side-panel it-col="2" it-z-index="1300" it-height-mode="full" it-top-position="80">
 <it-side-panel-header>
 <div><h1>Search</h1></div>
 </it-side-panel-header>
 <it-side-panel-content>
 <div>
 <h2>Paragraph 1</h2>
 <p>

 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, repudiandae, totam vel dignissimos saepe cum assumenda velit tempora blanditiis harum hic neque et magnam tenetur alias provident tempore cumque facilis.
 </p>

 <br>
 <h2>Paragraph 2</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2 >Paragraph 3</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>

 </div>
 </it-side-panel-content>
 <it-side-panel-footer>
 <div><button class="btn btn-default btn-success">Submit</button></div>
 </it-side-panel-footer>
 </it-side-panel>

 </file>
 </example>
 */
IteSoft
    .directive('itSidePanel', ['$window', function ($window) {


        function _link(scope, element, attrs) {

            scope.itSidePanelElement = element;

            scope.setIconClass(scope, attrs);

            scope.setZIndexes(element, attrs);

            scope.setColMd(attrs);

            scope.setHeightMode(attrs);

            scope.setTopPosition(attrs);

        }

        return {
            link: _link,
            restrict: 'E',
            transclude: true,
            controller: '$sidePanelCtrl',
            scope : true,
            template:
            '<div class="it-side-panel-container" ng-class="{\'it-side-panel-container-show\': showPanel}">' +
                '<div class="it-side-panel-button it-vertical-text" ng-class="{\'it-side-panel-button-show\':showPanel,\'it-side-panel-button-right\':!showPanel}" ng-click="toggleSidePanel()">' +
                    '<span class="fa {{itIconClass}}"></span>' +
                '</div>'+
                '<div class="it-side-panel" ng-transclude></div>'+
            '</div>'

        };
    }]);

