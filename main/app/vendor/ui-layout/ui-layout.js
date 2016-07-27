
'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:ui-layout
 * @module dependencies
 * @restrict AE
 * @since 1.0
 * @description
 * This directive allows you to split
 * See more :  {@link https://github.com/angular-ui/ui-layout}
 * @example
 <example module="itesoft-showcase">
 <file name="Module.js">
 angular.module('itesoft-showcase',['ui.layout']);
 </file>
 <file name="index.html">
    <div style="position: relative;height:500px">
     <div ui-layout style="margin-left: 90px;margin-right: 10px" >
     <div ui-layout-container  size="100px">
     <h3>
     NEW CAPTURE 2016JUN30-00001
     </h3>
     <div>
     <span>Environment:</span>
     </div>
     <div>
     <span>Profile:</span>
     </div>
     </div>
     <div ui-layout-container>
     <div ui-layout="{flow : 'column'}" >
     <div ui-layout-container  >Settings</div>
     <div ui-layout-container  >
     <div>[ ]image 001</div>
     <div>[ ]image 002</div>
     <div>[ ]image 003</div>
     <div>[ ]image 004</div>
     </div>
     <div ui-layout-container  >Viewer</div>
     </div>
     </div>

     <div ui-layout-container size="60px" style="text-align: right" >
     <button it-block="" name="lines-table-invoice-coding-btn nowrap" class="btn btn-success it-button-do"
     disabled="disabled">
     <span class="ng-binding">
     Capturer
     </span>
     </button>
     <button it-block="" name="lines-table-invoice-coding-btn nowrap" class="btn btn-primary it-button-do"
     disabled="disabled">
     <span class="ng-binding">
     Envoyer
     </span>
     </button>
     </div>
     </div>
    </div>
 </file>
 </example>
 */