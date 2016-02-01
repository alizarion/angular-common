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
     .it-side-panel-container .it-side-panel-button {
        background-color: red;
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

 <it-side-panel it-col="6" it-z-index="1100" it-height-mode="window"  it-icon-class="fa-star-o">
 <it-side-panel-header>
    <div><h2>Filter</h2></div>
 </it-side-panel-header>
 <it-side-panel-content>
 <div>
 <h3>Paragraph 1</h3>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, repudiandae, totam vel dignissimos saepe cum assumenda velit tempora blanditiis harum hic neque et magnam tenetur alias provident tempore cumque facilis.
 </p>
 <br>
 <h3>Paragraph 2</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 3</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 4</h3>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h3>Paragraph 2</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 3</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 4</h3>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h3>Paragraph 2</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 3</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 4</h3>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h3>Paragraph 2</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 3</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 4</h3>
 <p>
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, tenetur, nesciunt molestias illo sapiente ab officia soluta vel ipsam aut laboriosam hic veritatis assumenda alias in enim rem commodi optio?
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quisquam autem debitis perspiciatis explicabo! Officiis, eveniet quas illum commodi cum rerum temporibus repellendus ducimus magnam facilis a aliquam eligendi minus.
 </p>
 <br>
 <h3>Paragraph 2</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 3</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h3>Paragraph 4</h3>
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
        }

        return {
            link: _link,
            restrict: 'E',
            transclude: true,
            controller: '$sidePanelCtrl',
            template:
            '<div class="it-side-panel-container" ng-class="{\'it-side-panel-container-show\': showPanel}">' +
                '<div class="it-side-panel-button it-vertical-text" ng-class="{\'it-side-panel-button-show\':showPanel,\'it-side-panel-button-right\':!showPanel}" ng-click="toggleSidePanel()">' +
                    '<span class="fa {{itIconClass}}"></span>' +
                '</div>'+
                '<div class="it-side-panel" ng-transclude></div>'+
            '</div>'

        };
    }]);

