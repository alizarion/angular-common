'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itLazyGrid
 * @module itesoft
 * @restrict ECA
 * @since 1.1
 * @description
 * The itLazyGrid widgets provides lazy grid feature on ui-grid
 *
 *
 * ```html
 *    <it-lazy-grid option="option" ></it-lazy-grid>
 * ```
 *
 * <h1>Skinning</h1>
 * Following is the list of structural style classes:
 *
 * <table class="table">
 *  <tr>
 *      <th>
 *          Class
 *      </th>
 *      <th>
 *          Applies
 *      </th>
 *  </tr>
 *  </table>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <style>
 </style>
 <div ng-controller="HomeCtrl" >
 Query RSQL send to REST API:
    <pre><code class="lang-html">{{query}}</code></pre>
     <div style="height:300px;display:block;">
        <it-lazy-grid options="options" ></it-lazy-grid>
     </div>
    </div>
 </div>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngMessages','itesoft']);
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase')
 .controller('HomeCtrl',['$scope', '$templateCache', function ($scope,$templateCache) {
        $scope.query = "";
        // require to link directive with scope
        $scope.options = {
            // call when lazyGrid is instantiate
            onRegisterApi: function (lazyGrid) {
                $scope.lazyGrid = lazyGrid;
                $scope.lazyGrid.appScope = $scope;
                $scope.lazyGrid.fn.initialize();
                $scope.lazyGrid.fn.callBack = load;
                $scope.lazyGrid.fields.gridOptions.paginationPageSizes = [2,4,20];
                $scope.lazyGrid.fields.gridOptions.paginationPageSize = 2;

                // Call after each loaded event
                $scope.lazyGrid.on.loaded = function () {
                };

                // Call when user click
                $scope.lazyGrid.on.rowSelectionChanged = function (row) {
                    $scope.selectedInvoice = row.entity;
                };

                // Loading columnDef
                 $scope.lazyGrid.fields.gridOptions.columnDefs = [
                     {"name":"type", "cellClass":"type", "cellFilter":"translate", "filterHeaderTemplate":$templateCache.get('dropDownFilter.html'), "headerCellClass":"it-sp-SUPPLIERPORTAL_INVOICES_DOCUMENTTYPE", "visible":true, "width":80, "displayName":"Type", "headerTooltip":"Le document est de type soit facture, soit avoir.", "sorterRsqlKey":"type", "filters":[ { "options":{ "data":[ { "id":"", "value":"Tous" }, { "id":"INVOICE", "value":"Facture" }, { "id":"CREDIT", "value":"Avoir" } ] }, "condition":"==", "class":"width-50", "defaultTerm":"" } ] },
                     { "name": "date", "cellClass": "date", "type": "date", "cellFilter": "date:'dd/MM/yyyy'", "filterHeaderTemplate": $templateCache.get('dateRangeFilter.html'), "headerCellClass": "it-sp-SUPPLIERPORTAL_INVOICES_DATE", "visible": true, "width": "180", "sort": [ { "direction": "desc" } ], "displayName": "Date", "headerTooltip": "Filtre des factures par date d’émission, en indiquant soit une plage de dates, soit la date de début du filtre.", "filters": [ { "emptyOption": "Du", "condition": "=ge=" }, { "emptyOption": "Au", "condition": "=le=" } ] },
                     {"name":"supplierName", "cellClass":"supplierName", "cellFilter":"translate", "filterHeaderTemplate":$templateCache.get('stringFilter.html'), "headerCellClass":"it-sp-SUPPLIERPORTAL_INVOICES_SUPPLIER", "visible":true, "minWidth":150, "displayName":"Fournisseur", "headerTooltip":"Fournisseur concerné par la facture.", "sorterRsqlKey":"supplier.name", "filters":[ { "options":{ "data":[ ] }, "rsqlKey":"supplier.id", "condition":"==", "class":"width-125", "defaultTerm":"" ,"maxLength":"50"} ]}
                 ];

                //Call when grid is ready to use (with config)
                $scope.$applyAsync(function () {
                   $scope.lazyGrid.fn.initialLoad();
                });
        }};

         // ui-grid loading function, will be call on:
         //-filter
         //-pagination
         //-sorter
        function load(query) {

            // ignore this, it's just for demo
            if(query.size == 2){
                 var data = {"metadata":{"count":2,"maxResult":10},"items":[
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    ]};
                }else if(query.size == 4){
                 var data = {"metadata":{"count":4,"maxResult":10},"items":[
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    ]};
                }else{
                 var data = {"metadata":{"count":10,"maxResult":10},"items":[
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                    {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true},
                   {"id":-26,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1540504800000,"dueDate":null,"number":"F049865665","totalAmount":700,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63640","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-26,"companyName":"ma filiale numéro 4","showImage":true},
                    {"id":-14,"status":"SP_AVAILABLE_FOR_PAYMENT","date":1477432800000,"dueDate":null,"number":"INV123456","totalAmount":10235.25,"totalNetAmount":40000.556,"site":"SITE","type":"INVOICE","currency":"EUR","code":"63653","scanDate":null,"batchName":"batch_name","dateChangeState":1446937200000,"custom1":null,"custom2":null,"custom3":null,"custom4":null,"custom5":null,"supplierId":-22,"supplierName":"fournisseur1","companyId":-8,"companyName":"ma filiale numéro 6","showImage":true}
                 ]};
             }
            // end ignore this, it's just for demo
            query = query.build();
            // query RSQL to send to REST API
            console.log(query);
            $scope.query = query;
            $scope.lazyGrid.fields.gridOptions.data = data.items;
            $scope.lazyGrid.fields.gridOptions.totalItems = data.metadata.maxResult;

            $scope.isBusy = false;
            $scope.lazyGrid.on.loaded();
        }
     }
 ]
 );
 </file>
 </example>
 */
IteSoft.directive('itLazyGrid',
                 ['OPERATOR', 'NOTIFICATION_TYPE', 'itQueryFactory', 'itQueryParamFactory', 'itAmountCleanerService', 'localStorageService',  '$rootScope', '$log', '$q', '$templateCache', '$timeout',
        function (OPERATOR, NOTIFICATION_TYPE, itQueryFactory, itQueryParamFactory, itAmountCleanerService, localStorageService, $rootScope, $log, $q, $templateCache,$timeout) {
            return {
                restrict: 'AE',
                scope: {
                    options: '='
                },
                template: '<div ui-grid="lazyGrid.fields.gridOptions"  ui-grid-selection ui-grid-pagination ui-grid-auto-resize="true" class="it-fill it-sp-lazy-grid">' +
                '<div class="it-watermark sp-watermark gridWatermark" ng-show="!lazyGrid.fields.gridOptions.data.length"> {{\'GLOBAL.NO_DATA\' |translate}} </div> </div> ' +
                '<!------------------------------------------------------------------------------------------------------------------------------- FILTER --------------------------------------------------------------------------------------------------------------------------------> ' +
                '<script type="text/ng-template" id="dropDownFilter.html"> <div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> ' +
                '<it-autocomplete items="colFilter.options.data" selected-option="colFilter.term" input-class="col.headerCellClass" option-container-class="colFilter.class"> </div> ' +
                '</script> <script type="text/ng-template" id="dateRangeFilter.html"> ' +
                '<div class="ui-grid-filter-container"> ' +
                '<span ng-repeat="colFilter in col.filters" class="{{col.headerCellClass}}"> ' +
                '<input type="text" class="form-control {{col.headerCellClass}}_{{colFilter.emptyOption}}" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
                'placeholder="{{colFilter.emptyOption | translate}}" ng-model="colFilter.term" data-min-date="01/01/1980" data-max-date="01/01/2100" data-autoclose="1" ' +
                'name="date2" data-date-format="{{\'GLOBAL.DATE.FORMAT\' | translate}}" bs-datepicker> </span> </div> ' +
                '</script> <script type="text/ng-template" id="stringFilter.html"> ' +
                '<div class="ui-grid-filter-container {{col.headerCellClass}}" ng-repeat="colFilter in col.filters"> ' +
                '<input type="text" class="form-control" ng-model="colFilter.term" pattern="{{colFilter.pattern}}" placeholder="{{colFilter.emptyOption | translate}}" maxlength="{{colFilter.maxLength}}"> </div>' +
                ' </script> ' +
                '<!------------------------------------------------------------------------------------------------------------------------------- PAGINATOR --------------------------------------------------------------------------------------------------------------------------------> ' +
                '<script type="text/ng-template" id="paginationTemplate.html"> ' +
                '<div role="contentinfo" class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"> ' +
                '<div role="navigation" class="ui-grid-pager-container"> ' +
                '<div role="menubar" class="ui-grid-pager-control"> ' +
                '<button type="button" role="menuitem" class="ui-grid-pager-first it-sp-grid-pager-first" bs-tooltip title="{{ \'HELP.FIRSTPAGE\' | translate }}" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"> ' +
                '<div class="first-triangle"> <div class="first-bar"> </div> </div> ' +
                '</button> <button type="button" role="menuitem" class="ui-grid-pager-previous it-sp-grid-pager-previous" ' +
                'bs-tooltip title="{{ \'HELP.PREVPAGE\' | translate }}" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"> ' +
                '<div class="first-triangle prev-triangle"></div> </button> ' +
                '<input type="number" class="ui-grid-pager-control-input it-sp-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" required/> ' +
                '<span class="ui-grid-pager-max-pages-number it-sp-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"> <abbr> / </abbr> ' +
                '{{ paginationApi.getTotalPages() }} ' +
                '</span> <button type="button" role="menuitem" class="ui-grid-pager-next it-sp-grid-pager-next "' +
                ' bs-tooltip title="{{ \'HELP.NEXTPAGE\' | translate }}" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"> ' +
                '<div class="last-triangle next-triangle">' +
                '</div> ' +
                '</button> ' +
                '<button type="button" role="menuitem" class="ui-grid-pager-last it-sp-grid-pager-last" bs-tooltip title="{{ \'HELP.FIRSTPAGE\' | translate }}" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"> ' +
                '<div class="last-triangle"> ' +
                '<div class="last-bar"> ' +
                '</div> </div> ' +
                '</button> </div> ' +
                '<div class="ui-grid-pager-row-count-picker it-sp-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1"> ' +
                '<select ui-grid-one-bind-aria-labelledby-grid="\'items-per-page-label\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select>' +
                '<span ui-grid-one-bind-id-grid="\'items-per-page-label\'" class="ui-grid-pager-row-count-label"> &nbsp; </span> ' +
                '</div> ' +
                '<span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label it-sp-grid-pager-row-count-label"> ' +
                '{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}} ' +
                '</span> </div> ' +
                '<div class="ui-grid-pager-count-container">' +
                '<div class="ui-grid-pager-count"> ' +
                '<span class="it-sp-grid-pager-footer-text" ng-show="grid.options.totalItems > 0"> ' +
                '{{\'PAGINATION.INVOICE.FROM\' | translate}} {{showingLow}} <abbr> </abbr> ' +
                '{{\'PAGINATION.INVOICE.TO\' | translate}} {{showingHigh}} {{\'PAGINATION.INVOICE.ON\' | translate}} {{grid.options.totalItems}} ' +
                '{{\'PAGINATION.INVOICE.TOTAL\' | translate}} </span>' +
                ' </div> </div> </div> ' +
                '</script>',
                controllerAs: 'lazyGrid',
                controller: ['$scope', function ($scope) {


                    //Get current locale
                    var locale = localStorageService.get('Locale');

                    var self = this;

                    self.options = $scope.options;

                    /**
                     * Fields
                     * @type {{filter: Array, externalFilter: {}, gridApi: {}, paginationOptions: {pageNumber: number, pageSize: number, sort: {name: undefined, direction: undefined}}, appScope: {}}}
                     */
                    self.fields = {
                        template: {pagination: $templateCache.get('paginationTemplate.html')},
                        filter: [],
                        externalFilter: {},
                        gridApi: {},
                        gridOptions: {},
                        paginationOptions: {},
                        appScope: {},
                        promise: {refresh: {}}
                    };

                    /**
                     * Event callback method
                     * @type {{loaded: onLoaded, ready: onReady, filterChange: onFilterChange, sortChange: onSortChange, paginationChanged: onPaginationChanged, rowSelectionChanged: onRowSelectionChanged}}
                     */
                    self.on = {
                        loaded: onLoaded,
                        ready: onReady,
                        filterChange: onFilterChange,
                        sortChange: onSortChange,
                        paginationChanged: onPaginationChanged,
                        rowSelectionChanged: onRowSelectionChanged
                    };
                    /**
                     * Public Method
                     * @type {{callBack: *, initialize: initialize, getGrid: getGrid, refresh: refresh, initialLoad: initialLoad, addExternalFilter: addExternalFilter}}
                     */
                    self.fn = {
                        callBack: self.options.callBack,
                        initialize: initialize,
                        refresh: refresh,
                        initialLoad: initialLoad,
                        addExternalFilter: addExternalFilter
                    };


                    /**
                     *
                     * @type {{pageNumber: number, pageSize: number, sort: {name: undefined, direction: undefined}}}
                     */
                    self.fields.paginationOptions = {
                        pageNumber: 1,
                        pageSize: 10,
                        sort: {
                            name: undefined,
                            direction: undefined
                        }
                    };
                    /**
                     * Default grid options
                     * @type {{enableFiltering: boolean, enableSorting: boolean, enableColumnMenus: boolean, useExternalPagination: boolean, useExternalSorting: boolean, enableRowSelection: boolean, enableRowHeaderSelection: boolean, multiSelect: boolean, modifierKeysToMultiSelect: boolean, noUnselect: boolean, useExternalFiltering: boolean, data: Array, columnDefs: Array, paginationTemplate: *, onRegisterApi: self.fields.gridOptions.onRegisterApi}}
                     */
                    self.fields.gridOptions = {
                        enableFiltering: true,
                        enableSorting: true,
                        enableColumnMenus: false,
                        useExternalPagination: true,
                        useExternalSorting: true,
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        useExternalFiltering: true,
                        data: [],
                        columnDefs: [],
                        paginationTemplate: self.fields.template.pagination,
                        onRegisterApi: function (gridApi) {
                            gridApi.core.on.filterChanged(self.appScope, self.on.filterChange);
                            gridApi.core.on.sortChanged(self.appScope, self.on.sortChange);
                            gridApi.pagination.on.paginationChanged(self.appScope, self.on.paginationChanged);
                            gridApi.selection.on.rowSelectionChanged(self.appScope, self.on.rowSelectionChanged);
                            self.fields.gridApi = gridApi;
                            $log.debug('LazyGrid:UI-grid:onRegisterApi')
                        }
                    };
                    /**
                     * Apply external filter
                     * @private
                     */
                    function _applyExternalFilter() {
                        $log.debug("LazyGrid:Apply External filter");
                        angular.forEach(self.fields.externalFilter, function (externalFilter, key) {
                            if (!angular.isUndefined(key) && !angular.isUndefined(externalFilter.value) && !angular.isUndefined(externalFilter.condition)) {
                                var queryParam = itQueryParamFactory.create(key, externalFilter.value, externalFilter.condition);
                                self.fields.filter.push(queryParam);
                            }
                        });
                    }

                    /**
                     * Apply filter
                     * @private
                     */
                    function _applyFilter() {
                        $log.debug("LazyGrid:Apply filter");
                        var key = '';
                        var value = '';
                        var condition = OPERATOR.EQUALS;
                        if(angular.isDefined(self.fields.gridApi.grid)) {
                            for (var i = 0; i < self.fields.gridApi.grid.columns.length; i++) {
                                key = self.fields.gridApi.grid.columns[i].field;
                                for (var j = 0; j < self.fields.gridApi.grid.columns[i].filters.length; j++) {
                                    value = self.fields.gridApi.grid.columns[i].filters[j].term;
                                    if (value != undefined && value != '') {
                                        $log.debug("LazyGrid:Filter changed, fieds: " + key + ", and value: " + value);
                                        // if filter key is override
                                        var rsqlKey = self.fields.gridApi.grid.columns[i].filters[j].rsqlKey;
                                        if (rsqlKey != undefined) {
                                            key = rsqlKey;
                                        }

                                        if (self.fields.gridApi.grid.columns[i].filters[j].condition != undefined) {
                                            condition = self.fields.gridApi.grid.columns[i].filters[j].condition;
                                        }

                                        //Si la donnée doit être traitée comme un nombre
                                        if (self.fields.gridApi.grid.columns[i].filters[j].amount == true) {
                                            value = itAmountCleanerService.cleanAmount(value, locale);
                                        }

                                        var queryParam = itQueryParamFactory.create(key, value, condition);
                                        self.fields.filter.push(queryParam);
                                    }
                                }
                            }
                        }
                    }

                    /**
                     * Apply default filter configured inside columnDef filter option
                     * @private
                     */
                    function _applyDefaultFilter() {
                        $log.debug("LazyGrid:Apply default filter");
                        if(angular.isDefined(self.fields.gridApi.grid)) {
                            angular.forEach(self.fields.gridApi.grid.columns, function (column) {
                                if (angular.isDefined(column) && angular.isDefined(column.colDef) && angular.isDefined(column.colDef.filters) && angular.isDefined(column.colDef.filters[0]) && angular.isDefined(column.colDef.filters[0].defaultTerm)) {
                                    if (!angular.isUndefined(column.field) && !angular.isUndefined(column.colDef.filters[0].defaultTerm)) {
                                        //Apparemment ne sert pas car le _applyFilter récupère les données dans les columns
                                        //if (angular.isDefined(column.colDef.filters[0].defaultTerm) && column.colDef.filters[0].defaultTerm != '') {
                                        //    var queryParamClient = QueryParamFactory.create(column.field, column.colDef.filters[0].defaultTerm, OPERATOR.EQUALS);
                                        //    self.fields.filter.push(queryParamClient);
                                        //}
                                        column.colDef.filters[0].term = column.colDef.filters[0].defaultTerm;

                                        $log.debug("LazyGrid:Apply default filter: " + column.field + "->" + column.colDef.filters[0].term);
                                    }
                                }
                            });
                        }
                    }

                    /**
                     * Call after each loading
                     */
                    function onLoaded() {
                    }

                    /**
                     * Call when grid is ready, when config is loaded (columnDef is present)
                     */
                    function onReady() {
                    }

                    /**
                     * Call on filter change
                     */
                    function onFilterChange() {
                        $log.debug("LazyGrid:Filter Changed");
                        self.fields.filter = [];
                        if (angular.isDefined(self.fields.promise.refresh)) {
                            $timeout.cancel(self.fields.promise.refresh);
                        }
                        self.fields.promise.refresh = $timeout(function () {
                                self.fn.refresh();
                            }
                            , 1000);

                    }

                    /**
                     * Call on sort change
                     * @param grid
                     * @param sortColumns
                     */
                    function onSortChange(grid, sortColumns) {
                        $log.debug("LazyGrid:Sort Changed");
                        self.fields.filter = [];
                        if (sortColumns.length == 0) {
                            self.fields.paginationOptions.sort.name = undefined;
                            self.fields.paginationOptions.sort.direction = undefined;
                        } else {
                            var sortKey = sortColumns[0].name;
                            /**
                             * Surcharge avec la clé rsql
                             */
                            if (angular.isDefined(sortColumns[0]) && angular.isDefined(sortColumns[0].colDef) && angular.isDefined(sortColumns[0].colDef.sorterRsqlKey)) {
                                sortKey = sortColumns[0].colDef.sorterRsqlKey;
                            }
                            self.fields.paginationOptions.sort.name = sortKey;
                            self.fields.paginationOptions.sort.direction = sortColumns[0].sort.direction;
                            $log.debug("sort changed, sort key: " + sortColumns[0].name + ", and direction: " + sortColumns[0].sort.direction);
                        }
                        self.fn.refresh();
                    }

                    /**
                     * Call when page changed
                     * @param newPage
                     * @param pageSize
                     */
                    function onPaginationChanged(newPage, pageSize) {
                        $log.debug("LazyGrid:Pagination Changed");
                        self.fields.filter = [];
                        if (self.fields.paginationOptions.pageNumber != newPage || self.fields.paginationOptions.pageSize != pageSize) {
                            self.fields.paginationOptions.pageNumber = newPage;
                            self.fields.paginationOptions.pageSize = pageSize;
                            self.fn.refresh();
                        }
                    }

                    /**
                     * Call when user click on row
                     */
                    function onRowSelectionChanged() {
                        $log.debug("LazyGrid:Row Selection Changed");
                    }

                    /**
                     * Call to refresh data
                     */
                    function refresh() {
                        $log.debug("LazyGrid:Refresh");
                        _applyExternalFilter();
                        _applyFilter();
                        var firstRow = (self.fields.paginationOptions.pageNumber - 1) * self.fields.paginationOptions.pageSize;
                        var query = itQueryFactory.create(self.fields.filter, firstRow, self.fields.paginationOptions.pageSize, self.fields.paginationOptions.sort);
                        self.fn.callBack(query);
                    }

                    /**
                     * Initial loading
                     */
                    function initialLoad() {
                        $log.debug("LazyGrid:Initial load");

                        //application des filtres pour récupérer le nom de filtre actifs
                        _applyFilter();
                        if (self.fields.filter.length <= 0) {
                            _applyDefaultFilter();
                        }
                        //remise à 0 des informations de filtre
                        self.fields.filter = [];

                        self.fn.refresh();
                    }

                    /**
                     * Add external filter like clientId
                     * @param filter external filter to always apply
                     * @param filter.key
                     * @param filter.value
                     * @param filter.condition
                     */
                    function addExternalFilter(filter) {
                        if (angular.isUndefined(filter.key)) {
                            $log.error("External filter object must have key");
                            return;
                        }
                        if (angular.isUndefined(filter.condition)) {
                            $log.error("External filter object must have condition");
                            return;
                        }
                        if (angular.isUndefined(filter.value)) {
                            self.fields.externalFilter[filter.key] = {};
                        } else {
                            self.fields.externalFilter[filter.key] = filter;
                        }
                    }

                    /**
                     * Call before using
                     * @returns {*}
                     */
                    function initialize() {

                    }

                    if (angular.isDefined(self.options.onRegisterApi)) {
                        self.options.onRegisterApi(self);
                        $log.debug('LazyGrid:onRegisterApi')
                    }


                }]
            }
        }
    ]
).constant("OPERATOR", {
        "EQUALS": "==",
        "LIKE": "==%",
        "NOT_EQUALS": "!=",
        "LESS_THAN": "=lt=",
        "LESS_EQUALS": "=le=",
        "GREATER_THAN": "=gt=",
        "GREATER_EQUALS": "=ge="
})
.constant('NOTIFICATION_TYPE', {
    INFO: "INFO",
    WARNING: "WARNING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    DISMISS: "DISMISS"
})
;