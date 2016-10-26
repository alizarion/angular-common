'use strict';

/**
 * @ngdoc directive
 * @name style2016.directive:style2016
 * @module style2016
 * @restrict C
 * @since 1.1
 * @description
 * Itesoft style 2016 (like SCPAS)
 *
 * To enable it just add
 * <pre class="prettyprint linenums">
 * @ import "../lib/angular-common/dist/assets/scss/style2016/style2016";
 * </pre>
 * add the begin of your principal scss file
 *
 * <h3>Icon</h3>
 *
 * Class that can be used to show itesoftIcons:
 * <ul>
 *     <li>
 *         error_validate
 *     </li>
 *     <li>
 *         menu_admin
 *     </li>
 *     <li>
 *         menu_home
 *     </li>
 *     <li>
 *         menu_rapport
 *     </li>
 *     <li>
 *         menu_search
 *     </li>
 *     <li>
 *         menu_settings
 *     </li>
 *     <li>
 *         menu_task
 *     </li>
 * </ul>
 *
 *
 *
 *
 * See http://seraimtfs11:8080/tfs/ItesoftCollection/ItesoftDev/_git/QuickStartSCPAS. to show how to use it ;)
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <link rel="stylesheet" href="css/style2016.css" type="text/css">
     <div style="background-color:#EEEEEE"  ng-controller="HomeCtrl as $ctrl">
         <div style="background-color: white">
            {{$ctrl.captureMode}}
                 <button type="button" class="btn capture-input"
                 ng-model="$ctrl.captureMode"
                 bs-options="captureMode | translate for captureMode in $ctrl.capturesMode"
                 bs-select>
                    <span class="caret"></span>
                 </button><br/>
                 <input class="scpas-input ng-valid" required>
                <br/>
                 <input class="scpas-input ng-invalid" required>
         </div>
         <div style="height:200px">
             <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">
                 <li class="logo">
                 <a href="#" class="no-padding">

                 </a>
                 </li>
                 <li it-collapsed-item>
                 <a href="#/home"><i class="it-icon menu_home"></i></a>
                 </li>
                 <li>
                 <a href="#/search"><i class="it-icon menu_search"></i></a>
                 </li>
                 <li>
                 <a href="#/task"><i class="it-icon menu_task"></i></a>
                 </li>
                 <li>
                 <a href="#/settings"><i class="it-icon menu_settings"></i></a>
                 </li>
             </ul>
         </div>
         <div >
             <div class="row-height-10 dashboard-with-footer" style="height:500px;padding-top:100px;position:relative">
                 <div class="col-xs-12" style="height:185px;margin-top: -185px">
                 <div class="dashboard-row-indicator">
                 <div class="dashboard-panel-container-indicator">
                 <div class="row-height-8">
                 <div class="dashboard-indicator-count ng-binding">14
                 </div>
                 </div>
                 <div class="row-height-2">
                 <div class="dashboard-indicator-title ng-binding">Tasks
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="dashboard-row-indicator">
                 <div class="dashboard-panel-container-indicator">
                 <div class="row-height-8">
                 <div class="dashboard-indicator-count ng-binding">12
                 </div>
                 </div>
                 <div class="row-height-2">
                 <div class="dashboard-indicator-title ng-binding">Invoices
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="dashboard-row-indicator">
                 <div class="dashboard-panel-container-indicator">
                 <div class="row-height-8">
                 <div class="dashboard-indicator-count ng-binding">1
                 </div>
                 </div>
                 <div class="row-height-2">
                 <div class="dashboard-indicator-title ng-binding">Capture
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="dashboard-row-indicator">
                 <div class="dashboard-panel-container-indicator">
                 <div class="row-height-8">
                 <div class="dashboard-indicator-count ng-binding">15
                 </div>
                 </div>
                 <div class="row-height-2">
                 <div class="dashboard-indicator-title ng-binding">Scan
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="dashboard-row-indicator">
                 <div class="dashboard-panel-container-indicator">
                 <div class="row-height-8">
                 <div class="dashboard-indicator-count ng-binding">22
                 </div>
                 </div>
                 <div class="row-height-2">
                 <div class="dashboard-indicator-title ng-binding">Image
                 </div>
                 </div>
                 </div>
                 </div>
                 </div>

                 <div class="row-height-10 dashboard-container-with-footer">
                 <div class="left-panel row-height-10 col-xs-4">
                 <div class="dashboard-panel-container">
                 <div class="messages-title dashboard-panel-header ng-binding">
                 LEFT
                 </div>
                 <div class="dashboard-panel-content row-height-10 ">
                 <div class="dashboard-scrollable-content smooth">
                 left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>left<br/>
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="middle-panel row-height-10 col-xs-4 ">
                 <div class="dashboard-panel-container">
                 <div class="messages-title dashboard-panel-header ng-binding">
                 MIDDLE
                 </div>
                 <div class="dashboard-panel-content row-height-10 ">
                 </div>
                 </div>
                 </div>
                 <div class="right-panel row-height-10 col-xs-4 ">
                 <div class="dashboard-panel-container">
                 <div class="messages-title dashboard-panel-header ng-binding">
                 RIGHT
                 </div>
                 <div class="dashboard-panel-content row-height-10 ">
                 </div>
                 </div>
                 </div>
                 </div>
                 <div class="it-button-bar" style="text-align: right">
                     <button class="btn btn-success it-button-do">
                     <span class="ng-binding">
                     Capturer
                     </span>
                     </button>
                     <button class="btn btn-primary it-button-do">
                     <span class="ng-binding">
                     Envoyer
                     </span>
                     </button>
                 </div>
             </div>
         </div>

         <div style="height:500px;overflow: auto">
             <it-tab label="'Company'" id="'analyticalCoding-header-tab-company'"></it-tab>
             <it-tab label="'Supplier'" id="'analyticalCoding-header-tab-supplier'"></it-tab>
             <it-tab label="'Invoice'" id="'analyticalCoding-header-tab-invoice'"></it-tab>
             <table class="table-condensed-small table-striped col-md-12"> <thead> <tr class="it-header-tab"> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.TASK_NAME' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.DATE' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.CATEGORY' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.CODE' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.DOC_NUMBER' | translate}} </th> <th class="nowrap text-right excel-style-header">{{'TASK.LINES.TABLE.NET_AMOUNT' | translate}} </th> <th class="nowrap text-right excel-style-header">{{'TASK.LINES.TABLE.TOTAL_AMOUNT' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.SUPPLIER' | translate}} </th> <th class="nowrap text-left excel-style-header"></th> <th class="nowrap text-left excel-style-header"><span class="excel-style-settings"></span></th> </tr> </thead> <tbody class="row-height-10"> <tr ng-repeat="item in $ctrl.invoices" class="it-line" ng-class="{'excel-style-row-selected': $ctrl.selectedLine.id == item.id}" ng-dblclick="$emit('goToCodingForm',{event: $event, invoiceId: $ctrl.selectedLine.invoice.id, attachmentId: $ctrl.selectedLine.attachment.id, taskId: $ctrl.selectedLine.id, taskName: $ctrl.selectedLine.name})"> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-task-name nowrap text-left excel-style-header no-border"> <span class="it-task-invoice-type">{{'TASK.DOCUMENT.TYPE.'+item.invoice.type | translate}}</span>&nbsp;{{$ctrl.taskService.getTranslatedTaskName(item.name)}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-invoice-date nowrap text-left excel-style-header no-border"> {{item.invoice.date | date:'dd/MM/yyyy HH:mm'}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-invoice-category nowrap text-left excel-style-header no-border"> {{'TASK.DOCUMENT.CATEGORY.'+item.invoice.category | translate}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-itesoft-id nowrap text-left excel-style-header no-border"> {{item.invoice.code}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-doc-number nowrap text-left excel-style-header no-border"> {{item.docNumber}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-net-amount nowrap text-right excel-style-header no-border"> {{item.netAmount | currency}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-total-amount nowrap text-right excel-style-header no-border"> {{item.totalAmount | currency}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-supplier-name nowrap text-left excel-style-header no-border"> {{item.supplierName}} </div> </td> <td colspan="2" ng-click=""> <button class="small-btn btn-primary" title="{{'GLOBAL.BUTTON.FOLLOW_REMOVE' | translate}}"> <i class="fa fa-trash"></i> </button> </td> </tr> </tbody> </table>
        </div>
     </div>

 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft','mgcrea.ngStrap'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {
 var self = this;
 self.capturesMode=["manual","semi-automatic","automatic"];
 self.captureMode="manual";

 self.selectedLine = {} ; self.invoices = [{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 } ]; self.updateSelectedLine = function (item) { self.selectedLine = item; };
  }]) ;
 </file>
 </example>
 */