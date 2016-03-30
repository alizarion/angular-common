'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:rowHeight
 * @module itesoft
 * @restrict A
 * @since 1.1
 * @description
 * Simple Stylesheet class to manage height like bootstrap row.<br/>
 * Height is split in 10 parts.<br/>
 * Div's parent need to have a define height (in pixel, or all parent need to have it-fill class).<br/>
 *
 *
 * @example
 <example module="itesoft">
 <file name="index.html">
 <div style="height: 300px" >
     <div class="col-md-3 row-height-10">
         <!-- CSS adaptation for example purposes. Do not do this in production-->
         <div class="row-height-5" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-5
         </div>
     </div>
     <div  class="col-md-3 row-height-10">
        <!-- CSS adaptation for example purposes. Do not do this in production-->
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
            .row-height-1
         </div>
         <div class="row-height-2" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
           .row-height-2
         </div>
         <div class="row-height-3" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
            .row-height-3
         </div>
         <div class="row-height-4" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
            .row-height-4
         </div>
     </div>
     <div  class="col-md-3 row-height-10">
         <!-- CSS adaptation for example purposes. Do not do this in production-->
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
         <div class="row-height-1" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-1
         </div>
    </div>
     <div class="col-md-3 row-height-10">
         <!-- CSS adaptation for example purposes. Do not do this in production-->
         <div class="row-height-10" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .row-height-10
         </div>
     </div>
 <div>
 </file>
 </example>
 */