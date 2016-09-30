/**
 *
 */

var itMultiPagesViewer = angular.module('it-multi-pages-viewer', ['pascalprecht.translate']);

var itPdfViewer = angular.module("it-pdf-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itTiffViewer = angular.module("it-tiff-viewer", ['it-multi-pages-viewer', 'ui.layout']);

var itImageViewer = angular.module("it-image-viewer", ['it-multi-pages-viewer']);

angular.module('itesoft.viewer',['it-image-viewer','it-tiff-viewer','it-pdf-viewer','it-multi-pages-viewer']);


var itTab = angular.module("it-tab",[]);


var IteSoft = angular.module('itesoft', [
    'ngSanitize',
    'ui.bootstrap.tabs',
    'itesoft.popup',
    'ui.bootstrap.tpls',
    'ngAnimate',
    'matchMedia',
    'ui.grid',
    'ui.grid.pagination',
    'ngRoute',
    'pascalprecht.translate',
    'ui.grid.selection',
    'ui.grid.autoResize',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.grouping',
    'ui.bootstrap.dropdown',
    'LocalStorageModule',
    'ngToast',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.tooltip',
    'ui.codemirror',
    'it-tab',
    'itesoft.messaging',
    'itesoft.language',
    'itesoft.viewer'
]);

/**
 * @ngdoc filter
 * @name itesoft.filter:itUnicode
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * Simple filter that escape string to unicode.
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
             <div ng-controller="myController">
                <p ng-bind-html="stringToEscape | itUnicode"></p>

                 {{stringToEscape | itUnicode}}
             </div>
        </file>
         <file name="Controller.js">
            angular.module('itesoft')
                .controller('myController',function($scope){
                 $scope.stringToEscape = 'o"@&\'';
            });

         </file>
    </example>
 */
IteSoft
    .filter('itUnicode',['$sce', function($sce){
        return function(input) {
            function _toUnicode(theString) {
                var unicodeString = '';
                for (var i=0; i < theString.length; i++) {
                    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
                    while (theUnicode.length < 4) {
                        theUnicode = '0' + theUnicode;
                    }
                    theUnicode = '&#x' + theUnicode + ";";

                    unicodeString += theUnicode;
                }
                return unicodeString;
            }
            return $sce.trustAsHtml(_toUnicode(input));
        };
}]);


'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itCircularBtn
 * @module itesoft
 * @since 1.1
 * @restrict AEC
 *
 * @description
 * Provide a circular button like for the full screen button
 *
 * ```html
 *   <it-circular-btn></it-circular-btn>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div ng-controller="HomeCtrl">
     <it-circular-btn><i class="fa fa-expand"></i></it-circular-btn>
     </div>
 </file>
 <file name="Module.js">
    angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl',
     ['$scope',
     function($scope) {

                        }]);
 </file>
 </example>
 */

IteSoft.directive('itCircularBtn',
    [
        function () {
            return {
                restrict: 'ACE',
                scope: false,
                transclude: true,
                template:'<span class="it-circular-button-container ">' +
                '<button class="btn  pull-right" > ' +
                '<div class="it-animated-circular-button">' +
                '<ng-transclude></ng-transclude>' +
                '</div>' +
                '</button> '+
                '</span>'

            }
        }]
);

/**
 * @ngdoc directive
 * @name itesoft.directive:itCompile
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * This directive can evaluate and transclude an expression in a scope context.
 *
 * @example
  <example module="itesoft">
    <file name="index.html">
        <div ng-controller="DemoController">
             <div class="jumbotron ">
                 <div it-compile="pleaseCompileThis"></div>
             </div>
    </file>
    <file name="controller.js">
         angular.module('itesoft')
         .controller('DemoController',['$scope', function($scope) {

                $scope.simpleText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                    'Adipisci architecto, deserunt doloribus libero magni molestiae nisi odio' +
                    ' officiis perferendis repudiandae. Alias blanditiis delectus dicta' +
                    ' laudantium molestiae officia possimus quaerat quibusdam!';

                $scope.pleaseCompileThis = '<h4>This is the compile result</h4><p>{{simpleText}}</p>';
            }]);
    </file>
  </example>
 */
IteSoft
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.directive('itCompile', ['$compile',function($compile) {
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        return scope.$eval(attrs.itCompile);
                    },
                    function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    }
                );
            };
        }]);
    }]);

/**
 * @ngdoc directive
 * @name itesoft.directive:itModalFullScreen
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * print the encapsuled content into full screen modal popup. 42
 *
 * <table class="table">
 *  <tr>
 *   <td><pre><it-modal-full-screen it-open-class="myCssClass"></pre></td>
 *   <td>class to set on the modal popup where is expanded , default class it-modal-background </td>
 *  </tr>
 * <tr>
 *   <td><pre><it-modal-full-screen it-escape-key="27"></pre></td>
 *   <td>it-escape-key keyboard mapping for close action, default 27 "escape key" </td>
 *  </tr>
 * <tr>
 *   <td><pre><it-modal-full-screen it-z-index="700"></pre></td>
 *   <td>set the  z-index of the modal element, by default take highest index of the view.</td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft">
     <file name="index.html">

         <it-modal-full-screen  class="it-fill">
             <div class="jumbotron it-fill" >Lorem ipsum dolor sit amet,
                 consectetur adipisicing elit.  Assumenda autem cupiditate dolor dolores dolorum et fugiat inventore
                 ipsum maxime, pariatur praesentium quas sit temporibus velit, vitae. Ab blanditiis expedita tenetur.
             </div>
         </it-modal-full-screen>
            <div konami style="height:500px">
            </div>
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
                '<div class="it-modal-full-screen-header pull-right">'+
                '<div  ng-if="$isModalOpen"  class="it-modal-full-screen-button ">' +

                '<button class="btn " ng-click="$closeModal()"><div class="it-animated-ciruclar-button"><i class="fa fa-compress"></i></div></button>' +
                '</div>'+

                '<div  ng-if="!$isModalOpen"  class="it-modal-full-screen-button ">' +
                ' <button class="btn pull-right"  ng-click="$openModal()"><div class="it-animated-ciruclar-button"><i class="fa fa-expand"></i></div></button> ' +
                '</div>'+
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


'use strict';
/**
 * Service that provide RSQL query
 */
IteSoft.factory('itAmountCleanerService', ['$filter',function ($filter) {

        var supportedLocales = ['en_US',
            'en_GB', 'fr_FR', 'de_DE', 'id_IT'];

        return {
            cleanAmount: function (amountString, aLocale) {
                var result = 0;


                //Recherche si la locale passée en argument est acceptée
                var localeFound = false;
                supportedLocales.forEach(function (entry) {

                    if (JSON.stringify(entry) == JSON.stringify(aLocale)) {
                        localeFound = true;
                    }
                })

                if (localeFound == false) {
                    console.log("Unable to format amount for local "
                        + aLocale);

                    return '';
                }

                //Suppression des " " pour séparer les milliers et des caractères non numériques
                amountString = amountString.replace(/[^0-9,.-]/g, "");

                // SI on est en France ou Italie, on peut taper . ou , pour les décimales
                if (JSON.stringify(aLocale) == JSON.stringify(supportedLocales[2]) || JSON.stringify(aLocale) == JSON.stringify(supportedLocales[4])) {
                    amountString = amountString.replace(",", ".");
                }

                //pas de traitement particulier pour le francais
                //si la locale est en-US
                if(JSON.stringify(aLocale) == JSON.stringify(supportedLocales[0])) {
                    //suppression de la virgule permettant de séparer les milliers
                    amountString = amountString.replace(",", "");
                    //si la locale est de-DE
                }else if(JSON.stringify(aLocale) == JSON.stringify(supportedLocales[3])) {
                    //suppression du point permettant de séparer les milliers
                    amountString = amountString.replace(".", "");
                    //remplacement de la virgule par un point
                    amountString = amountString.replace(",", ".");
                }

                //Formattage des montants avec la locale
                result = parseFloat(amountString);

                console.log('result1 ' + result);

                if (result == undefined) {
                    result = parseFloat(amountString);
                }

                console.log('result2 ' + result);

                return result;
            },

            formatAmount: function (amount, aLocale, currency) {
                var result = '';


                //Recherche si la locale passée en argument est acceptée
                var localeFound = false;
                supportedLocales.forEach(function (entry) {

                    if (JSON.stringify(entry) == JSON.stringify(aLocale)) {
                        localeFound = true;
                    }
                })

                if (localeFound == false) {
                    console.log("Unable to format amount for local "
                        + aLocale);

                    return '';
                }
                if (amount != undefined) {
                    var amountString = amount.toString();

                    //Suppression des " " pour séparer les milliers et des caractères non numériques
                    amountString = amountString.replace(/[^0-9,.-]/g, "");

                    // SI on est en France ou Italie, on peut taper . ou , pour les décimales
                    if (JSON.stringify(aLocale) == JSON.stringify(supportedLocales[2]) || JSON.stringify(aLocale) == JSON.stringify(supportedLocales[4])) {
                        amountString = amountString.replace(",", ".");
                    }
                }
                //Formattage des montants avec la locale avec 2 décimales après la virgule
                if(angular.isDefined(currency)){
                    //met en Uppercase la devise
                    currency=$filter('uppercase')(currency);
                    if(angular.equals(currency ,'TND')){
                        // 3 décimales
                        result = new Intl.NumberFormat(aLocale.replace("_", "-"), {minimumFractionDigits: 3,maximumFractionDigits:3}).format(parseFloat(amountString));

                    }else if(angular.equals(currency ,'JPY')){
                        // 0 décimales
                        result = new Intl.NumberFormat(aLocale.replace("_", "-"), {minimumFractionDigits: 0,maximumFractionDigits:0}).format(parseFloat(amountString));

                    }else{
                        // 2 décimales
                        result = new Intl.NumberFormat(aLocale.replace("_", "-"), {minimumFractionDigits: 2,maximumFractionDigits:2}).format(parseFloat(amountString));
                    }

                }else{
                    result = new Intl.NumberFormat(aLocale.replace("_", "-"), {minimumFractionDigits: 2,maximumFractionDigits:2}).format(parseFloat(amountString));
                }

                return result;
            }
        }


    }
    ]
)
;
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
                '<it-autocomplete name="autocomplete" items="colFilter.options.data" selected-option="colFilter.term" input-class="col.headerCellClass" option-container-class="colFilter.class"> </div> ' +
                '</script> <script type="text/ng-template" id="dateRangeFilter.html"> ' +
                '<div class="ui-grid-filter-container"> ' +
                '<span class="{{col.headerCellClass}}"> ' +
                '<input type="text" class="form-control {{col.headerCellClass}}_{{col.filters[0].emptyOption}}" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
                'placeholder="{{col.filters[0].emptyOption | translate}}" ng-model="col.filters[0].term" data-min-date="{{col.filters[0].dateMin}}" data-max-date="{{col.filters[1].term}}" data-autoclose="1" ' +
                'name="date" data-date-format="{{\'GLOBAL.DATE.FORMAT\' | translate}}" bs-datepicker> ' +
                '<input type="text" class="form-control {{col.headerCellClass}}_{{col.filters[1].emptyOption}}" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
                'placeholder="{{col.filters[1].emptyOption | translate}}" ng-model="col.filters[1].term" data-min-date="{{col.filters[0].term}}" data-max-date="{{col.filters[1].dateMax}}" data-autoclose="1" ' +
                'name="date2" data-date-format="{{\'GLOBAL.DATE.FORMAT\' | translate}}" bs-datepicker> </span></div> ' +
                '</script> <script type="text/ng-template" id="stringFilter.html"> ' +
                '<div class="ui-grid-filter-container {{col.headerCellClass}}" ng-repeat="colFilter in col.filters"> ' +
                '<input type="text" class="form-control" ng-model="colFilter.term" pattern="{{colFilter.pattern}}" placeholder="{{colFilter.emptyOption | translate}}" maxlength="{{colFilter.maxLength}}"> </div>' +
                ' </script> ' +
                '<!------------------------------------------------------------------------------------------------------------------------------- PAGINATOR --------------------------------------------------------------------------------------------------------------------------------> ' +
                '<script type="text/ng-template" id="paginationTemplate.html"> ' +
                '<div role="contentinfo" class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"> ' +
                '<div role="navigation" class="ui-grid-pager-container"> ' +
                '<div role="menubar" class="ui-grid-pager-control"> ' +
                '<label data-type="info" data-animation="am-fade-and-scale" ' +
                'bs-tooltip ' +
                'title="{{ \'HELP.FIRSTPAGE\' | translate }}" ' +
                'class="btn it-lazy-grid-btn-button-navigator ui-grid-pager-first it-sp-grid-pager-first " ' +
                'ng-disabled="cantPageBackward()">' +
                '<div class="first-triangle"> <div class="first-bar"> </div> </div> ' +
                '<input type="button" title="" ' +
                'ng-click="pageFirstPageClick()" > </input>'+
                '</label>' +
                '<label data-type="info" data-animation="am-fade-and-scale" ' +
                'bs-tooltip ' +
                'title="{{ \'HELP.PREVPAGE\' | translate }}" ' +
                'class="btn it-lazy-grid-btn-button-navigator ui-grid-pager-previous it-sp-grid-pager-previous" ' +
                'ng-disabled="cantPageBackward()">' +
                '<div class="first-triangle"> <div class="prev-triangle"> </div> </div>' +
                '<input type="button" title="" ' +
                'ng-click="pagePreviousPageClick()"/>' +
                '</label>' +
                '<input type="number" class="ui-grid-pager-control-input it-sp-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" required/> ' +
                '<span class="ui-grid-pager-max-pages-number it-sp-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"> <abbr> / </abbr> ' +
                '{{ paginationApi.getTotalPages() }} ' +
                '</span> ' +
                '<label data-type="info" data-animation="am-fade-and-scale" ' +
                'bs-tooltip ' +
                'title="{{ \'HELP.NEXTPAGE\' | translate }}" ' +
                'class="btn it-lazy-grid-btn-button-navigator ui-grid-pager-next it-sp-grid-pager-next" ' +
                'ng-disabled="cantPageForward()">' +
                '<div class="last-triangle"> <div class="next-triangle"> </div> </div>' +
                '<input type="button" title="" ' +
                'ng-click="pageNextPageClick()"/>' +
                '</label>' +
                '<label data-type="info" data-animation="am-fade-and-scale" ' +
                'bs-tooltip ' +
                'title="{{ \'HELP.LASTPAGE\' | translate }}" ' +
                'class="btn it-lazy-grid-btn-button-navigator ui-grid-pager-last it-sp-grid-pager-last" ' +
                'ng-disabled="cantPageToLast()">' +
                '<div class="last-triangle"> <div class="last-bar"> </div> </div>' +
                '<input type="button" title="" ' +
                'ng-click="pageLastPageClick()"/>' +
                '</label>' +
                ' </div> ' +
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
                        addExternalFilter: addExternalFilter,
                        refreshDefaultFilter:refreshDefaultFilter
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
                     * Refresh datagrid by reset filters and applying default filter
                     */
                    function refreshDefaultFilter(){
                        $log.debug("LazyGrid:Reset Filter and Apply default filter");
                        if(angular.isDefined(self.fields.gridApi.grid)) {
                            angular.forEach(self.fields.gridApi.grid.columns, function (column) {
                                if (angular.isDefined(column) && angular.isDefined(column.colDef) && angular.isDefined(column.colDef.filters)
                                    && angular.isDefined(column.colDef.filters[0])) {
                                    if (!angular.isUndefined(column.field) && !angular.isUndefined(column.colDef.filters[0].defaultTerm)) {
                                        column.colDef.filters[0].term = column.colDef.filters[0].defaultTerm;
                                        $log.debug("LazyGrid:Apply default filter: " + column.field + "->" + column.colDef.filters[0].term);
                                    }else{
                                        //efface tous les filtres
                                        angular.forEach(column.colDef.filters, function(filter){
                                            filter.term="";
                                        });
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
/**
 * Created by SZA on 20/01/2016.
 */

'use strict';
/**
 * Singleton that provide paginatorConfig
 */
IteSoft.factory('itPaginatorConfigService',
        ['$q', '$log', 'itNotifier', '$filter', 'MetadataService',
            function ($q, $log, itNotifier, $filter, MetadataService) {

                var self = this;
                var deferred = $q.defer();

                /**
                 * fields
                 * @type {{options: Array, defaultOption: string, loaded: boolean}}
                 */
                self.fields = {
                    options: [],
                    defaultOption: "",
                    loaded: false
                };

                /**
                 * public method
                 * @type {{initialize: initialize}}
                 */
                self.fn = {
                    initialize: initialize
                };

                return self;
                /**
                 * filter initialization
                 * @returns {*}
                 */
                function initialize() {
                    if (!self.fields.loaded) {
                        var paginatorOptionsPromise = MetadataService.getConfig.get({type: 'paginatorOptions'}).$promise;
                        var paginatorDefaultOptionPromise = MetadataService.getConfig.get({type: 'paginatorDefaultOption'}).$promise;
                        $q.all([paginatorOptionsPromise, paginatorDefaultOptionPromise]).then(
                            function (options) {
                                self.fields.defaultOption = options[1].value;
                                var paginatorOptions = options[0].value;
                                if (angular.isDefined(paginatorOptions) && paginatorOptions != null && angular.isDefined(paginatorOptions.split)) {
                                    self.fields.options = paginatorOptions.split(',');
                                } else {
                                    itNotifier.notifyError({content: $filter('translate')('ERROR.WS.METADATA_ERROR')}, paginatorOptions);
                                }

                                $log.debug("PaginatorConfigService: loaded");
                                self.fields.loaded = true;
                                deferred.resolve('ok');
                            },
                            function (failed) {
                                itNotifier.notifyError({content: $filter('translate')('ERROR.WS.METADATA_ERROR')}, failed.data);
                            });
                    } else {
                        $log.debug("PaginatorConfigService: loaded");
                        deferred.resolve('ok');
                    }
                    return deferred.promise;

                }

            }
        ]
    );
'use strict';
/**
 * Query param service
 */
IteSoft.factory('itQueryParamFactory', [function () {
    function QueryParam(key, value, operator) {
        this.key = key;
        this.value = value;
        this.operator = operator;
    }
    return {
        /**
         * create a queryParam
         * @param key: name
         * @param value: myName
         * @param operator: OPERATOR.equals
         * @returns {QueryParam}
         */
        create: function (key, value, operator) {
            return new QueryParam(key, value, operator);
        }
    }
}]);
'use strict';
/**
 * Service that provide RSQL query
 */
IteSoft.factory('itQueryFactory', ['OPERATOR', function (OPERATOR) {
        function Query(parameters, start, size, sort) {
            this.parameters = parameters;
            this.start = start;
            this.size = size;
            this.sort = sort;
            /**
             * Method that return RSQL path
             * @returns {string}: query=id==1 and name=="name"
             */
            this.build = function () {
                var result = '';
                if (parameters != undefined) {
                    this.parameters.forEach(function (entry) {
                        if(angular.isDefined(entry.value) && angular.isDefined(entry.key)) {

                            //Si c'est une date max, on définit l'heure à 23h59
                            if((entry.value instanceof Date) && (entry.operator == OPERATOR.LESS_EQUALS)){
                                entry.value.setHours(23);
                                entry.value.setMinutes(59);
                                entry.value.setSeconds(59);
                                entry.value.setMilliseconds(999);
                            }

                            if (result.length > 0) {
                                result += " and ";
                            }

                            //formattage ISO des dates
                            if (entry.value instanceof Date) {
                                entry.value = entry.value.toISOString();
                            }

                            if (entry.operator == OPERATOR.LIKE) {
                                entry.value = entry.value + '%';
                            }
                            result += entry.key + entry.operator + entry.value;
                        }
                    });
                }
                result = 'query=' + result;
                if (size != null && angular.isDefined(size) && size != '') {
                    result += "&size=" + this.size;
                }
                if (start != null && angular.isDefined(start) && start != '') {
                    result += "&start=" + this.start;
                }
                //le sorting en décroissant s'écrit -fieldName
                if (sort != undefined) {
                    if (this.sort.name != undefined) {
                        result += "&sort="
                        if (this.sort.direction == "desc") {
                            result += "-"
                        }
                        result += this.sort.name;
                    }
                }
                return result;

            };


        }

        return {
            create: function (parameters, start, size, sort) {
                return new Query(parameters, start, size, sort);
            }
        }
    }
    ]
);
"use strict";

/**
 * @ngdoc directive
 * @name itesoft.directive:itBusyIndicator
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * <li>Simple loading spinner displayed instead of the screen while waiting to fill the data.</li>
 * <li>It has 2 usage modes:
 * <ul>
 *     <li> manual : based on "is-busy" attribute value to manage into the controller.</li>
 *     <li> automatic : no need to use "is-busy" attribute , automatically displayed while handling http request pending.</li>
 * </ul>
 * </li>
 *
 * @usage
 * <it-busy-indicator is-busy="true">
 * </it-busy-indicator>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="LoaderDemoController">
     <it-busy-indicator is-busy="loading">
     <div class="container-fluid">
     <div class="jumbotron">
     <button class="btn btn-primary" ng-click="loadData()">Start Loading (manual mode)</button>
    <button class="btn btn-primary" ng-click="loadAutoData()">Start Loading (auto mode)</button>
     <div class="row">
     <table class="table table-striped table-hover ">
     <thead>
     <tr>
     <th>#</th>
     <th>title</th>
     <th>url</th>
     <th>image</th>
     </tr>
     </thead>
     <tbody>
     <tr ng-repeat="dataItem in data">
     <td>{{dataItem.id}}</td>
     <td>{{dataItem.title}}</td>
     <td>{{dataItem.url}}</td>
     <td><img ng-src="{{dataItem.thumbnailUrl}}" alt="">{{dataItem.body}}</td>
     </tr>
     </tbody>
     </table>
     </div>
     </div>
     </div>
     </it-busy-indicator>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft']);
 </file>
 <file name="PhotosService.js">
 angular.module('itesoft-showcase')
 .factory('Photos',['$resource', function($resource){
                                return $resource('http://jsonplaceholder.typicode.com/photos/:id',null,{});
                            }]);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase')
 .controller('LoaderDemoController',['$scope','Photos','$timeout', function($scope,Photos,$timeout) {
        $scope.loading = false;

        var loadInternalData = function () {
            var data = [];
            for (var i = 0; i < 15; i++) {
                var dataItem = {
                    "id" : i,
                    "title": "title " + i,
                    "url" : "url " + i
                };
                data.push(dataItem);
            }
            return data;
        };

        $scope.loadData = function() {
            $scope.data = [];
            $scope.loading = true;

            $timeout(function() {
                $scope.data = loadInternalData();
            },500)
            .then(function(){
                $scope.loading = false;
            });
        }

        $scope.loadAutoData = function() {
            $scope.data = [];
            Photos.query().$promise
            .then(function(data){
                $scope.data = data;
            });
        }
 }]);
 </file>

 </example>
 *
 **/

IteSoft
    .directive('itBusyIndicator', ['$timeout', '$http', function ($timeout, $http) {
        var _loadingTimeout;

        function link(scope, element, attrs) {
            scope.$watch(function () {
                return ($http.pendingRequests.length > 0);
            }, function (value) {
                if (_loadingTimeout) $timeout.cancel(_loadingTimeout);
                if (value === true) {
                    _loadingTimeout = $timeout(function () {
                        scope.hasPendingRequests = true;
                    }, 250);
                }
                else {
                    scope.hasPendingRequests = false;
                }
            });
        }

        return {
            link: link,
            restrict: 'AE',
            transclude: true,
            scope: {
                isBusy:'='
            },
            template:   '<div class="mask-loading-container" ng-show="hasPendingRequests"></div>' +
                '<div class="main-loading-container" ng-show="hasPendingRequests || isBusy"><i class="fa fa-circle-o-notch fa-spin fa-4x text-primary "></i></div>' +
                '<ng-transclude ng-show="!isBusy" class="it-fill"></ng-transclude>'
        };
    }]);
"use strict";


/**
 * @ngdoc directive
 * @name itesoft.directive:itLoader
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * Simple loading spinner that handle http request pending.
 *
 *
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">
            <div ng-controller="LoaderDemoController">
                 <div class="jumbotron ">
                 <div class="bs-component">
                 <button class="btn btn-primary" ng-click="loadMoreData()">Load more</button>
                 <it-loader></it-loader>
                 <table class="table table-striped table-hover ">
                 <thead>
                 <tr>
                 <th>#</th>
                 <th>title</th>
                 <th>url</th>
                 <th>image</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr ng-repeat="data in datas">
                 <td>{{data.id}}</td>
                 <td>{{data.title}}</td>
                 <td>{{data.url}}</td>
                 <td><img ng-src="{{data.thumbnailUrl}}" alt="">{{data.body}}</td>
                 </tr>
                 </tbody>
                 </table>
                 <div class="btn btn-primary btn-xs" style="display: none;">&lt; &gt;</div></div>
                 </div>
            </div>
        </file>
         <file name="Module.js">
             angular.module('itesoft-showcase',['ngResource','itesoft']);
         </file>
         <file name="PhotosService.js">
          angular.module('itesoft-showcase')
                .factory('Photos',['$resource', function($resource){
                                return $resource('http://jsonplaceholder.typicode.com/photos/:id',null,{});
                            }]);
         </file>
         <file name="Controller.js">
             angular.module('itesoft-showcase')
                     .controller('LoaderDemoController',['$scope','Photos', function($scope,Photos) {
                            $scope.datas = [];

                            $scope.loadMoreData = function(){
                                Photos.query().$promise.then(function(datas){
                                    $scope.datas = datas;
                                });
                     };
             }]);
         </file>

    </example>
 *
 **/
IteSoft
    .directive('itLoader',['$http','$rootScope', function ($http,$rootScope) {
        return {
            restrict : 'EA',
            scope:true,
            template : '<span class="fa-stack">' +
                            '<i class="fa fa-refresh fa-stack-1x" ng-class="{\'fa-spin\':$isLoading}">' +
                            '</i>' +
                        '</span>',
            link : function ($scope) {
                $scope.$watch(function() {
                    if($http.pendingRequests.length>0){
                        $scope.$applyAsync(function(){
                            $scope.$isLoading = true;
                        });

                    } else {
                        $scope.$applyAsync(function(){
                            $scope.$isLoading = false;
                        });

                    }
                });

            }
        }
    }]
);
"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetail
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for detail part of the master-detail main content.
 *
 * To use master details directive, add an {@link itesoft.directive:itMasterDetail `<it-master-detail>`} parent element. This will encompass all master details content,
 * and have 2 child elements: 1 {@link itesoft.directive:itMaster `<it-master>`} for the list selectable content,
 * and {@link itesoft.directive:itDetail `<it-detail>`} that display the content of the selected item.
 *
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *       </it-detail-header>
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 */
IteSoft
    .directive('itDetail',[function() {
        return {
            restrict: 'EA',
            require: '^itMasterDetail',
            transclude: true,
            scope: false,
            template: ' <div ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))"' +
                '   ng-if="currentItemWrapper.currentItem" ' +
                ' class="it-master-detail-slide-left col-md-{{$masterCol ? (12-$masterCol) : 6}} it-fill" >' +
                ' <div class="it-fill" ng-transclude>' +
                '</div>' +
                '</div>' +
                '<div  ng-show="($parent.$parent.desktop || ($parent.$parent.activeState == \'detail\' &&$parent.$parent.mobile))" ' +
                'class="col-md-{{$masterCol ? (12-$masterCol) : 6}} it-fill" ' +
                'ng-if="!currentItemWrapper.currentItem">' +
                '<div class="it-watermark" >{{$itNoDetail}}</div>' +
                '</div>'
        }
    }]);

"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailContent
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for detail part of the master-detail main content.
 *
 * To use master details directive, add an {@link itesoft.directive:itMasterDetail `<it-master-detail>`} parent element. This will encompass all master details content,
 * and have 2 child elements: 1 {@link itesoft.directive:itMaster `<it-master>`} for the list selectable content,
 * and {@link itesoft.directive:itDetail `<it-detail>`} that display the content of the selected item.
 *
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *       </it-detail-header>
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 */
IteSoft
    .directive('itDetailContent',function() {
        return {
            restrict: 'EA',
            require: '^itDetail',
            transclude: true,
            scope:false,
            template : '<div class="row it-fill">' +
                ' <div class="col-md-12  it-fill" ng-transclude>'+

                            '</div>'+
                       '</div>'

        }
    });
"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itDetailHeader
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for detail header, MUST be include in {@link itesoft.directive:itDetail `<it-detail>`} .
 * for more information see {@link itesoft.directive:itMasterDetail `<it-master-detail>`}.
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *           <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="myAction()"><span class="fa fa-plus fa-lg"></span></button>
 *       </it-detail-header>
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 */
IteSoft
    .directive('itDetailHeader',function() {
        return {
            restrict: 'EA',
            require : '^itDetail',
            scope : false,
            transclude: true,
            template : '<div class="fluid-container"><div class="row it-md-header">'+
                '<div class="col-md-2 it-fill  col-xs-2">' +
                '<a href="" ng-if="$parent.$parent.$parent.mobile" ng-click="$parent.$parent.$parent.$parent.goToMaster()" class="it-material-design-hamburger__icon pull-left it-fill "> ' +
                '<span  class="menu-animated it-material-design-hamburger__layer " ng-class="{\'it-material-design-hamburger__icon--to-arrow\':$parent.$parent.$parent.$parent.mobile}"> ' +
                '</span>' +
                ' </a>'+
                '</div>'+
                '<div class="col-md-10 col-xs-10 it-fill ">'+
                '<div class="btn-toolbar  it-fill pull-right " ng-transclude>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
        }

    });
"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMaster
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * Most important part of master-detail component, that
 *
 * To use master details directive, add an  {@link itesoft.directive:itMasterDetail `<it-master-detail>`} parent element. This will encompass all master details content,
 * and have 2 child elements: 1  {@link itesoft.directive:itMaster `<it-master>`} for the list selectable content,
 * and {@link itesoft.directive:itDetail `<it-detail>`} that display the content of the selected item.
 * * for more information see {@link itesoft.directive:itMasterDetail `<it-master-detail>`}.
 * <table class="table">
 *  <tr>
 *   <td><code>masterDetail.getSelectedItems()</code></td>
 *   <td>Method to get selected items in the master grid.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.getCurrentItemWrapper()</code></td>
 *   <td>Method to get the selected item wrapper that contain next attributes [originalItem ,currentItem, hasChanged ] .</td>
 *  </tr>
 * <tr>
 *   <td><code>attribute it-lock-on-change="true|false"</code></td>
 *   <td>lock navigation if the selected item has changed.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.undoChangeCurrentItem()</code></td>
 *   <td>Method to revert changes on the selected item.</td>
 *  </tr>
 * <tr>
 *   <td><code>masterDetail.getFilteredItems()</code></td>
 *   <td>Method to get displayed item after filter.</td>
 *  </tr>
 *  <tr>
 * <tr>
 *   <td><code>masterDetail.fillHeight()</code></td>
 *   <td>method refresh the master detail Height.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.setCurrentItem(entity)</code></td>
 *   <td>Method to define the selected item, return promise</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.scrollToItem(item)</code></td>
 *   <td>Method to scroll to the entity row.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('unlockCurrentItem')</code></td>
 *   <td>unlock the selected item from the editing mode.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('lockCurrentItem',unlockOnEquals)</code></td>
 *   <td>lock the selected item from the editing mode. unlockOnEquals : default true | auto unlock the item if the changed item is equals to the original selected item, if set to false only the $scope.$broadcast('unlockCurrentItem') can unlock it.</td>
 *  </tr>
 *  <tr>
 *   <td><code>grid.appScope.itAppScope</code></td>
 *   <td>access to your application scope from the master-detail context, mainly for template binding</td>
 *  </tr>
 *  <tr>
 *   <td><code>MASTER_ROW_CHANGED event</code></td>
 *   <td>When selected row changed an MASTER_ROW_CHANGED event is trigged. He provides the new selected row data.</td>
 *  </tr>
 * </table>
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 *
 */
IteSoft
    .directive('itMaster',function(){
        return {
            restrict : 'EA',
            require : '^itMasterDetail',
            priority : -1,
            transclude : true,
            scope : {
                itMasterData : '=',
                itLang:'=',
                itCol:'=',
                itMasterDetailControl:'=',
                itLockOnChange: '=',
                itNoDataMsg: '@',
                itNoDetailMsg:'@'
            },
            template : '<div  ng-show="($parent.$parent.activeState == \'master\')" class=" it-master it-master-detail-slide-right col-md-{{itCol ? itCol : 6}} it-fill " ui-i18n="{{itLang}}">'+
                '<div class="row" ng-transclude>'+
                '</div>'+
                '<div class="row it-master-grid it-fill" >'+
                '<div class="col-md-12 it-fill">'+
                '<div ui-grid="gridOptions" ui-grid-selection ui-grid-resize-columns  ui-grid-move-columns  ui-grid-auto-resize class="it-master-detail-grid it-fill ">' +
                '<div class="it-watermark" ng-show="!gridOptions.data.length" >{{itNoDataMsg}}</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>',
            controller : ['$scope',
                '$filter',
                '$q',
                '$timeout',
                'itPopup',
                '$templateCache',
                '$route',
                '$window',
                function ($scope,
                          $filter,
                          $q,
                          $timeout,
                          itPopup,
                          $templateCache,
                          $route,
                          $window){

                    $templateCache.put('ui-grid/selectionRowHeaderButtons','<div class="it-master-detail-row-select"' +
                        ' ng-class="{\'ui-grid-row-selected\': row.isSelected}" >' +
                        '<input type="checkbox" ng-disabled="grid.appScope.$parent.currentItemWrapper.hasChanged && grid.appScope.itLockOnChange " tabindex="-1" ' +
                        ' ng-checked="row.isSelected"></div>');

                    $templateCache.put('ui-grid/selectionSelectAllButtons','<div class="it-master-detail-select-all-header" ng-click="(grid.appScope.$parent.currentItemWrapper.hasChanged && grid.appScope.itLockOnChange  )? \'return false\':headerButtonClick($event)">' +
                        '<input type="checkbox" ' +
                        ' ng-change="headerButtonClick($event)" ng-disabled="grid.appScope.$parent.currentItemWrapper.hasChanged  && grid.appScope.itLockOnChange" ng-model="grid.selection.selectAll"></div>');

                    function ItemWrapper(item){
                        var _self = this;
                        angular.forEach($scope.itMasterData,function(entry,index){

                            if(angular.equals(entry,item)) {
                                _self.index = index;
                            }
                        });
                        _self.originalItem = item;
                        _self.currentItem = angular.copy(item);
                        _self.hasChanged = false;
                        _self.isWatched = false;
                        _self.unlockOnEquals = true;
                    }

                    $scope.$parent.$masterCol = $scope.itCol;
                    ItemWrapper.prototype.unlockCurrent = function(){
                        this.hasChanged = false;
                        this.isWatched = false;
                    };

                    ItemWrapper.prototype.lockCurrent = function(autoUnlock){
                        this.hasChanged = true;
                        this.isWatched = true;
                        this.unlockOnEquals = !autoUnlock;
                    };



                    $scope.$parent.currentItemWrapper = null;

                    function _selectionChangedHandler(row){
                        if(!$scope.itMasterDetailControl.disableMultiSelect){
                            if($scope.gridApi.selection.getSelectedRows().length > 1 ){
                                $scope.$parent.currentItemWrapper = null;
                            } else if($scope.gridApi.selection.getSelectedRows().length === 1) {
                                _displayDetail($scope.gridApi.selection.getSelectedRows()[0]);
                                _scrollToEntity($scope.gridApi.selection.getSelectedRows()[0]);
                            }
                            else if($scope.gridApi.selection.getSelectedRows().length === 0) {
                                $scope.$parent.currentItemWrapper = null;
                            }
                        }else {
//                            _displayDetail(row.entity);
//                            _scrollToEntity(row.entity);
                        }
                    }

                    $scope.$parent.$itNoDetail = $scope.itNoDetailMsg;


                    $scope.gridOptions  = {
                        rowHeight: 40,
                        data : $scope.itMasterData,
                        multiSelect: !$scope.itMasterDetailControl.disableMultiSelect,
                        enableSelectAll: !$scope.itMasterDetailControl.disableMultiSelect,
                        enableRowHeaderSelection:!$scope.itMasterDetailControl.disableMultiSelect,
                        showGridFooter: true,
                        enableMinHeightCheck :true,
                        enableColumnResizing: true,
                        enableHorizontalScrollbar : 0,
                        enableVerticalScrollbar : 2,
                        onRegisterApi : function(gridApi){
                            $scope.gridApi = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                                _selectionChangedHandler(row);
                            });
                            gridApi.selection.on.rowSelectionChangedBatch($scope,function(row){
                                _selectionChangedHandler(row);
                            });

                        },
                        gridFooterTemplate: '<div class="ui-grid-footer-info ui-grid-grid-footer"> ' +
                            '<span class="ngLabel badge ">{{"search.totalItems" |t}}  {{grid.appScope.itMasterData.length}}</span> ' +
                            '<span ng-show="grid.appScope.filterText.length > 0 && grid.appScope.itMasterData.length != grid.renderContainers.body.visibleRowCache.length" class="ngLabel badge alert-info ">{{"search.showingItems" |t}}  {{grid.renderContainers.body.visibleRowCache.length}}</span> ' +
                            '<span ng-show="!grid.appScope.itMasterDetailControl.disableMultiSelect" class="ngLabel badge">{{"search.selectedItems" | t}} {{grid.appScope.gridApi.selection.getSelectedRows().length}}</span>' +
                            '</div>',
                        rowTemplate: '<div ng-click="grid.appScope.onRowClick(col,row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>' +
                            '</div>'
                    };

                    if(typeof $scope.itMasterDetailControl.columnDefs !== 'undefined'){
                        angular.forEach($scope.itMasterDetailControl.columnDefs, function(columnDef){
                            columnDef['headerCellTemplate'] = '<div ng-class="{ \'sortable\': sortable }"> <!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --> ' +
                                '<div class="ui-grid-cell-contents" col-index="renderIndex" title="TOOLTIP"> ' +
                                '<span>{{ col.displayName CUSTOM_FILTERS }}</span> ' +
                                '<span ui-grid-visible="col.sort.direction" ' +
                                'ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }"> &nbsp; ' +
                                '</span> </div> <div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader && col.colDef.enableColumnMenu !== false" ' +
                                'ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}"> <i class="fa fa-align-justify"></i>' +
                                ' </div> <div ui-grid-filter></div> </div>';
                        },true)
                    }

                    $scope.gridOptions.columnDefs =
                        $scope.itMasterDetailControl.columnDefs;

                    function _displayDetail(item) {
                        var deferred = $q.defer();
                        if($scope.$parent.currentItemWrapper != null){
                            if($scope.$parent.currentItemWrapper.hasChanged &&
                                $scope.itLockOnChange){
                                deferred.reject('undo or save before change');
                                return deferred.promise;
                            }
                        }
                        $scope.$parent.currentItemWrapper  = new ItemWrapper(item);
                        deferred.resolve('');
                        return deferred.promise;
                    }

                    $scope.onRowClick = function(row,col) {
                        if (col.entity != undefined && typeof row.providedHeaderCellTemplate != 'undefined') {
                            _displayDetail(col.entity).then(function (msg) {
                                if (row.providedHeaderCellTemplate !== 'ui-grid/selectionHeaderCell') {
                                    $scope.gridApi.selection.clearSelectedRows();
                                    if ($scope.$parent.$parent.mobile) {
                                        $scope.$parent.$parent.goToDetail();
                                    }
                                }
                                $scope.gridApi.selection.toggleRowSelection(col.entity);
                                $scope.$emit("MASTER_ROW_CHANGED",col.entity);
                            }, function (msg) {
                                itPopup.alert($scope.itMasterDetailControl.navAlert);
                            });
                        }
                    };


                    function _scrollToEntity(entity){
                        $scope.gridApi.core.scrollTo(entity);
                    }

                    $scope.itMasterDetailControl.selectItem =function (item){
                        $scope.onRowClick(null,{entity:item});
                    };

                    /**
                     * Method to filter rows
                     */
                    $scope.refreshData = function() {
                        var renderableEntities = $filter('itUIGridGlobalFilter')
                        ($scope.gridOptions.data, $scope.gridOptions, $scope.filterText);

                        angular.forEach($scope.gridApi.grid.rows, function( row ) {
                            var match = false;
                            renderableEntities.forEach(function(entity){

                                if(angular.equals(row.entity,entity)){
                                    match  = true;
                                }
                            });
                            if ( !match ){
                                $scope.gridApi.core.setRowInvisible(row);
                            } else {
                                $scope.gridApi.core.clearRowInvisible(row);
                            }
                        });
                    };


                    function _unlockCurrent(){
                        $scope.$applyAsync(function(){
                            if($scope.$parent.currentItemWrapper!==null){
                                $scope.$parent.currentItemWrapper.hasChanged = false;
                                $scope.$parent.currentItemWrapper.isWatched = false;
                            }
                        });

                    }

                    $scope.itMasterDetailControl.getCurrentItem = function(){
                        return   $scope.$parent.currentItemWrapper.currentItem;
                    };

                    $scope.itMasterDetailControl.undoChangeCurrentItem = function(){
                        if($scope.$parent.currentItemWrapper!= null){
                            _displayDetail($scope.$parent.currentItemWrapper.originalItem)
                            $scope.$parent.currentItemWrapper.currentItem =
                                angular.copy($scope.$parent.currentItemWrapper.originalItem);
                            _unlockCurrent();
                        }
                    };

                    $scope.$on('unlockCurrentItem',function(){
                        _unlockCurrent();
                    });

                    /**
                     * Method to scroll to specific item.
                     * @param entity item to scroll to.
                     */
                    $scope.itMasterDetailControl.scrollToItem =function (entity){
                        _scrollToEntity(entity);
                    };

                    /**
                     * Method to get Selected items.
                     * @returns {Array} of selected items
                     */
                    $scope.itMasterDetailControl.getSelectedItems = function(){
                        if(typeof $scope.gridApi !== 'undefined' ) {
                            if (typeof $scope.gridApi.selection.getSelectedRows === 'function') {
                                return $scope.gridApi.selection.getSelectedRows();
                            }
                        }
                        return [];
                    };

                    /**
                     * Method to get Current item.
                     * @returns {$scope.$parent.currentItemWrapper.currentItem|*}
                     * @deprecated
                     */
                    $scope.itMasterDetailControl.getCurrentItem = function(){
                        return   $scope.$parent.currentItemWrapper.currentItem;
                    };

                    /**
                     * Method to get Current item.
                     * @returns {$scope.$parent.currentItemWrapper.currentItem|*}
                     */
                    $scope.itMasterDetailControl.getCurrentItemWrapper = function(){
                        return   $scope.$parent.currentItemWrapper;
                    };

                    /**
                     * Method to get filtered items.
                     * @returns {Array} of filtered items.
                     */
                    $scope.itMasterDetailControl.getFilteredItems = function(){
                        var rows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid);
                        var entities  = [];
                        angular.forEach(rows,function(row){
                            entities.push(row.entity);
                        });
                        return entities;
                    };


                    /**
                     * Method to select the current Item.
                     * @param entity item to select.
                     * @returns {deferred.promise|*} success if the item is found.
                     */
                    $scope.itMasterDetailControl.setCurrentItem = function(entity){

                        var deferred = $q.defer();
                        $scope.gridApi.selection.clearSelectedRows();
                        _displayDetail(entity).then(function(){
                            $timeout(function() {
                                var entityIndex = $scope.itMasterData.indexOf(entity);
                                if(entityIndex>=0) {

                                    $scope.gridApi.selection.selectRow(entity);
                                    _scrollToEntity(entity);
                                    if( $scope.$parent.$parent.mobile){
                                        $scope.$parent.$parent.goToDetail();
                                    }
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }

                            });
                        },function(){
                            deferred.reject();
                        });
                        return deferred.promise;
                    };

                    /**
                     * Method to undo changes on the current item.
                     */
                    $scope.itMasterDetailControl.undoChangeCurrentItem = function(){
                        if($scope.$parent.currentItemWrapper!= null){
                            _displayDetail($scope.$parent.currentItemWrapper.originalItem)
                            $scope.$parent.currentItemWrapper.currentItem =
                                angular.copy($scope.$parent.currentItemWrapper.originalItem);
                            $scope.$parent.currentItemWrapper.unlockCurrent();
                        }
                    };

                    /**
                     * Method to fill windows height to the master part.
                     */
                    $scope.itMasterDetailControl.fillHeight = function(){
                        //  evalLayout.fillHeight();
                    };


                    /**
                     * Handler to unlock the current item.
                     */
                    $scope.$on('unlockCurrentItem',function(){
                        $timeout(function(){
                            $scope.$parent.currentItemWrapper.unlockCurrent();
                        });
                    });

                    /**
                     * Handler to lock the current item.
                     */
                    $scope.$on('lockCurrentItem',function(unlockOnEquals){
                        $timeout(function(){
                            $scope.$parent.currentItemWrapper.lockCurrent(unlockOnEquals);
                        });
                    });

                    function confirmLeavePage(e) {
                        if($scope.$parent.currentItemWrapper!=null){
                            if ( $scope.$parent.currentItemWrapper.hasChanged
                                && $scope.itLockOnChange ) {
                                itPopup.alert( $scope.itMasterDetailControl.navAlert);
                                e.preventDefault();
                            }
                        }
                    }
                    $scope.itAppScope = $scope.$parent;

                    //  $scope.itAppScope.$navAlert = {};

                    $scope.itAppScope.$navAlert = $scope.itMasterDetailControl.navAlert;

                    var w = angular.element($window);
                    w.bind('resize', function () {
                        $scope.gridApi.core.handleWindowResize();
                    });

                    $scope.itMasterDetailControl.initState = true;
                    $scope.$on("$locationChangeStart", confirmLeavePage);
                    $scope.itMasterDetailControl = angular.extend({navAlert:{
                        text:'Please save or revert your pending change',
                        title:'Unsaved changes',
                        buttons: [
                            {
                                text: 'OK',
                                type: 'btn-info',
                                onTap: function () {
                                    return false;
                                }
                            }]
                    }}, $scope.itMasterDetailControl );


                    /*  watchers */
                    $scope.$watch('itLang',function(){
                        $scope.gridApi.grid.refresh();
                    });

                    $scope.$watch('itMasterData',function(){
                        $scope.gridOptions.data = [];
                        $scope.itMasterData.forEach(function(entry){
                            $scope.gridOptions.data.push(entry);
                        });

                        if( typeof $scope.itMasterData === 'undefined' || $scope.itMasterData === null){
                            $scope.$parent.currentItemWrapper = null;
                        } else {
                            if( $scope.itMasterData.length === 0){
                                $scope.$parent.currentItemWrapper = null;
                            }
                        }
                        $scope.gridApi.grid.refresh();
                        if($scope.itMasterDetailControl !== null){
                            if(typeof  $scope.itMasterDetailControl.getCurrentItemWrapper() !== 'undefined'
                                && $scope.itMasterDetailControl.getCurrentItemWrapper()!= null){

                                $scope.$applyAsync(function(){
                                    _scrollToEntity($scope.itMasterDetailControl.getCurrentItemWrapper().originalItem);
                                });
                            }
                        }
                        $scope.refreshData();

                    },true);

                   $timeout(function(){
                        var event = document.createEvent('Event');
                        event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                        $window.dispatchEvent(event);
                    },250);

                    $scope.$watch('$parent.currentItemWrapper.currentItem', function(newValue,oldValue){

                        if($scope.$parent.currentItemWrapper != null ){
                            if(!$scope.$parent.currentItemWrapper.isWatched)
                            {
                                $scope.$parent.currentItemWrapper.isWatched = true;
                            }
                            if($scope.$parent.currentItemWrapper.unlockOnEquals){
                                $scope.$parent.currentItemWrapper.hasChanged =
                                    !angular.equals(newValue,
                                        $scope.$parent.currentItemWrapper.originalItem);
                            } else   {
                                $scope.$parent.currentItemWrapper.hasChanged = true;
                            }
                        }
                    }, true);

                    $scope.$watch('filterText',function(){
                        $scope.refreshData();
                    },true);

                    $scope.$watch('itNoDetailMsg',function(){
                        $scope.$parent.$itNoDetail = $scope.itNoDetailMsg;

                    });
                }]


        }
    }).filter('itUIGridGlobalFilter',['$rootScope',function($rootScope) {
        return function(data, grid, query) {
            var matches = [];
            //no filter defined so bail
            if (query === undefined || query === '') {
                return data;
            }
            query = query.toLowerCase();

            function _deepFind(obj, path) {
                var paths = path.split('.')
                    , current = obj
                    , i;

                for (i = 0; i < paths.length; ++i) {
                    if (current[paths[i]] == undefined) {
                        return undefined;
                    } else {
                        current = current[paths[i]];
                    }
                }
                return current;
            }

            var scope = $rootScope.$new(true);
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < grid.columnDefs.length; j++) {
                    var dataItem = data[i];

                    var fieldName = grid.columnDefs[j].field;
                    var renderedData = _deepFind(dataItem,fieldName);
                    // apply cell filter
                    if (grid.columnDefs[j].cellFilter) {
                        scope.value = renderedData;
                        renderedData = scope.$eval('value | ' + grid.columnDefs[j].cellFilter);
                    }
                    //as soon as search term is found, add to match and move to next dataItem
                    if(typeof renderedData !== 'undefined' && renderedData != null){
                        if (renderedData.toString().toLowerCase().indexOf(query) > -1) {
                            matches.push(dataItem);
                            break;
                        }
                    }
                }
            }
            scope.$destroy();
            return matches;
        };
    }] );

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterDetail
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for master-detail main content.
 *
 * To use master details directive, add an `<it-master-detail>` parent element. This will encompass all master details content,
 * and have 2 child elements: 1 `<it-master>` for the list selectable content,
 * and `<it-detail>` that display the content of the selected item.
 *
 * You MUST pass an empty object  `<it-master it-master-detail-control="myMasterDetailControl"></it-master>`
 * this object will
 *
 * <table class="table">
 *  <tr>
 *   <td><code>myMasterDetailControl.navAlert = { <br/> text: 'my forbidden navigation text ', <br/> title : 'forbidden navigation title'  <br/>}</code></td>
 *   <td>Object passed to the navigation modal popup, when navigate triggered on unsaved item.</td>
 *  </tr>
 *  <tr>
 *   <td><code>myMasterDetailControl.disableMultiSelect  = true | false</code></td>
 *   <td>Disable | Enable  multiple row selection for entire grid .</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.getSelectedItems()</code></td>
 *   <td>Method to get selected items in the master grid.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.getCurrentItemWrapper()</code></td>
 *   <td>Method to get the selected item wrapper that contain next attributes [originalItem ,currentItem, hasChanged ] .</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.undoChangeCurrentItem()</code></td>
 *   <td>Method to revert changes on the selected item.</td>
 *  </tr>
 * <tr>
 *   <td><code>masterDetail.getFilteredItems()</code></td>
 *   <td>Method to get displayed item after filter.</td>
 *  </tr>
 *  <tr>
 * <tr>
 *   <td><code>masterDetail.fillHeight()</code></td>
 *   <td>method refresh the master detail Height.</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.setCurrentItem(entity)</code></td>
 *   <td>Method to define the selected item, return promise</td>
 *  </tr>
 *  <tr>
 *   <td><code>masterDetail.scrollToItem(item)</code></td>
 *   <td>Method to scroll to the entity row.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('unlockCurrentItem')</code></td>
 *   <td>unlock the selected item from the editing mode.</td>
 *  </tr>
 *  <tr>
 *   <td><code>$scope.$broadcast('lockCurrentItem',unlockOnEquals)</code></td>
 *   <td>lock the selected item from the editing mode. unlockOnEquals : default true | auto unlock the item if the changed item is equals to the original selected item, if set to false only the $scope.$broadcast('unlockCurrentItem') can unlock it.</td>
 *  </tr>
 *  <tr>
 *   <td><code>grid.appScope.itAppScope</code></td>
 *   <td>access to your application scope from the master-detail context, mainly for template binding</td>
 *  </tr>
 *
 *   <tr>
 *   <td><code><pre><it-master it-col="3"></it-master></pre></code></td>
 *   <td>number of bootstrap columns of the master element, detail element automatically take  (12 - it-col), if undefined = 6</td>
 *  </tr>
 *  <tr>
 *   <td><code>MASTER_ROW_CHANGED event</code></td>
 *   <td>When selected row changed an MASTER_ROW_CHANGED event is trigged. He provides the new selected row data.</td>
 *  </tr>
 * </table>
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 * @example
    <example module="itesoft">
         <file name="index.html">
             <div ng-controller="MasterDetailController">
                 <it-master-detail >
                 <it-master it-col="4" it-master-data="data" it-lang="'fr'" it-no-data-msg="No data available"  it-no-detail-msg="{{( masterDetails.initState ? (masterDetails.getSelectedItems().length > 0 ?  masterDetails.getSelectedItems().length +' items selected' :  'no item selected') : '') | translate}}"  it-master-detail-control="masterDetails"  it-lock-on-change="true">
                 <it-master-header it-search-placeholder="Recherche" >
                 <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="addNewItem()"><span class="fa fa-plus fa-lg"></span></button>
                 <button class="btn btn-danger" title="Delete" ng-disabled="currentItemWrapper.hasChanged" ng-click="deleteSelectedItems()"><span class="fa fa-trash fa-lg"></span></button>
                 <button class="btn btn-success" ng-disabled="currentItemWrapper.hasChanged" title="Down"><span class="fa fa-chevron-down fa-lg"></span></button>
                 <button class="btn btn-success" ng-disabled="currentItemWrapper.hasChanged" title="Up"><span class="fa fa-chevron-up fa-lg"></span></button>
                 </it-master-header>
                 </it-master>
                 <it-detail>
                 <it-detail-header>
                 <button class="btn btn-warning" title="Save"  ng-disabled="!currentItemWrapper.hasChanged" ng-click="saveCurrentItem()">
                 <span class="fa fa-floppy-o fa-lg"></span>
                 </button>
                 <button class=" btn btn-info" title="Check">
                 <span class="fa fa-file-code-o fa-lg"></span>
                 </button>
                 <button class="btn btn-success" title="Undo" ng-click="undoChange()">
                 <span class="fa fa-undo fa-lg"></span>
                 </button>

                 </it-detail-header>
                 <it-detail-content>
                 <it-modal-full-screen>
                             <div class="form-group">
                                 <input it-input type="text" class="form-control floating-label" id="priorityDescription"
                                     it-label="code"
                                     ng-model="currentItemWrapper.currentItem.code"
                                     name=""
                                     ng-required="true"/>
                             </div>
                             <div class="form-group">
                             <input it-input type="text" class="form-control floating-label" id="priorityCategory"
                                 it-label="description"
                                 ng-model="currentItemWrapper.currentItem.description" name=""/>
                             </div>
                             <div class="form-group">
                             <input type="checkbox"
                                 it-toggle
                                 ng-model="currentItemWrapper.currentItem.enabledde"
                                 it-label="tete"/>
                             </div>
                 </it-modal-full-screen>
                 </it-detail-content>
                 </it-detail>
                 </it-master-detail>
             </div>
         </file>
         <file name="controller.js">
             angular.module('itesoft')
              .controller('MasterDetailController', ['$scope', function($scope) {

                                            $scope.data =
                                               [
                                                    {
                                                        "code" : "Code 1",
                                                        "description": "Description 1",
                                                        "enabledde" : true
                                                    },
                                                    {
                                                        "code" : "Code 2",
                                                        "description": "Description 2",
                                                        "enabledde" : false
                                                    },
                                                    {
                                                        "code" : "Code 3",
                                                        "description": "Description 3",
                                                        "enabledde" : true
                                                    },
                                                    {
                                                        "code" : "Code 4",
                                                        "description": "Description 4",
                                                        "enabledde" : false
                                                    },
                                                    {
                                                        "code" : "Code 5",
                                                        "description": "Description 5",
                                                        "enabledde" : true
                                                    }
                                                ];

                                            $scope.masterDetails = {};

                                            $scope.masterDetails = {
                                                columnDefs : [{ field: 'code', displayName: 'My value 1',  sortable:true},
                                                    { field: 'description', displayName: 'My value 2',  sortable:true},
                                                    { field: 'enabledde', displayName: 'My value 3',   sortable:false}]

                                            };

                                             $scope.masterDetails.disableMultiSelect = false;
                                            $scope.masterDetails.navAlert = {
                                                text:'{{\'BUTTON_LANG_EN\' | translate}}',
                                                title:'{{\'FOO\' | translate}}',
                                                buttons: [
                                                        {
                                                            text:  '<span class="fa fa-floppy-o fa-lg"></span>',
                                                            type:  'btn-warning',
                                                            onTap: function() {
                                                                $scope.saveCurrentItem();
                                                                return true;
                                                            }
                                                        },
                                                        {
                                                            text: '<span  class="fa fa-file-code-o fa-lg"></span>',
                                                            type: 'btn-primary',
                                                            onTap: function () {
                                                                $scope.saveCurrentItem();
                                                                return true;

                                                            }
                                                        },
                                                        {
                                                            text: '<span class="fa fa-undo fa-lg"></span>',
                                                            type: 'btn-success',
                                                            onTap: function () {
                                                                $scope.undoChange();
                                                                return true;

                                                            }
                                                        }
                                                    ]
                                            };

                                            function _removeItems(items,dataList){
                                                angular.forEach(items,function(entry){
                                                    var index = dataList.indexOf(entry);
                                                    dataList.splice(index, 1);
                                                })
                                            }

                                            $scope.deleteSelectedItems = function(){
                                                _removeItems($scope.masterDetails.getSelectedItems(), $scope.data);
                                            };


                                            $scope.saveCurrentItem = function(){
                                                   angular.copy( $scope.masterDetails.getCurrentItemWrapper().currentItem,$scope.data[$scope.masterDetails.getCurrentItemWrapper().index])

                                                    $scope.$broadcast('unlockCurrentItem');
                                                };

                                            $scope.undoChange = function(){
                                                $scope.masterDetails.undoChangeCurrentItem();
                                                $scope.masterDetails.fillHeight();
                                            };

                                            $scope.addNewItem = function(){
                                                var newItem =  {
                                                    "code" : "Code " + ($scope.data.length+1) ,
                                                    "description": "Description " + ($scope.data.length+1),
                                                    "enabledde" : true
                                                };
                                                $scope.data.push(newItem);
                                                $scope.masterDetails.setCurrentItem(newItem).then(function(success){
                                                    $scope.$broadcast('lockCurrentItem',false);
                                                },function(error){

                                                });
                                            };

                                            $scope.hasChanged = function(){
                                                if($scope.masterDetails.getCurrentItemWrapper() != null){
                                                    return $scope.masterDetails.getCurrentItemWrapper().hasChanged;
                                                } else {
                                                    return false;
                                                }
                                            }
                                        }]);
          </file>
         <file src="test.css">
         </file>
    </example>
 */
IteSoft
    .directive('itMasterDetail',['itPopup','$timeout','$window',function(itPopup,$timeout,$window){
        return {
            restrict: 'EA',
            transclude : true,
            scope :true,
            template : '<div it-bottom-glue="" class="it-master-detail-container jumbotron "> <div class="it-fill row " ng-transclude></div></div>',
            controller : [
                '$scope',
                'screenSize',
                function(
                    $scope,
                    screenSize
                    )
                {
                    $scope.activeState = 'master';
                    $scope.desktop = screenSize.on('md, lg', function(match){
                        $scope.desktop = match;

                    });

                    $scope.mobile = screenSize.on('xs, sm', function(match){
                        $scope.mobile = match;
                    });

                    $scope.goToDetail = function(){
                        $scope.activeState = 'detail';
                    };

                    $scope.$watch('mobile',function(){
                        if($scope.mobile &&
                            (typeof $scope.$$childHead.currentItemWrapper !== 'undefined'
                                &&  $scope.$$childHead.currentItemWrapper != null )){
                            $scope.activeState = 'detail';
                        } else {
                            $scope.activeState = 'master';
                        }
                    });

                    $scope.$watch('$$childHead.currentItemWrapper',function() {
                        if($scope.mobile &&
                            (typeof $scope.$$childHead.currentItemWrapper === 'undefined'
                                ||  $scope.$$childHead.currentItemWrapper === null )){
                            $scope.activeState = 'master';
                        } else {
                            if($scope.mobile &&
                                (typeof $scope.$$childHead.currentItemWrapper.currentItem === 'undefined'
                                    ||  $scope.$$childHead.currentItemWrapper.currentItem === null )) {
                                $scope.activeState = 'master';
                            }
                        }
                    });

                    $scope.goToMaster = function(){

                        if($scope.mobile &&
                            (typeof $scope.$$childHead.currentItemWrapper !== 'undefined'
                                &&  $scope.$$childHead.currentItemWrapper != null )){
                            if($scope.$$childHead.currentItemWrapper.hasChanged &&
                                $scope.$$childHead.$$childHead.itLockOnChange){
                                itPopup.alert(  $scope.$$childHead.$navAlert);
                            } else {
                                $scope.activeState = 'master';
                                $timeout(function(){
                                    $window.dispatchEvent(new Event('resize'));
                                },300)

                            }
                        } else {
                            $scope.activeState = 'master';
                            $timeout(function(){
                                $window.dispatchEvent(new Event('resize'));
                            },300)

                        }

                    };
                }]
        }
    }]);

"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itMasterHeader
 * @module itesoft
 * @restrict EA
 * @since 1.0
 * @description
 * A container element for master headers, MUST be include in {@link itesoft.directive:itMaster `<it-master>`},
 * can contain the action buttons of selected items.
 * for more information see {@link itesoft.directive:itMasterDetail `<it-master-detail>`}.
 *
 * ```html
 * <it-master-detail>
 *   <!-- Master Content content -->
 *
 *   <it-master>
 *       <it-master-header>
 *             <button class="btn btn-primary" title="Add" ng-disabled="currentItemWrapper.hasChanged" ng-click="myAction()"><span class="fa fa-plus fa-lg"></span></button>
 *       </it-master-header>
 *   </it-master>
 *
 *   <!-- menu -->
 *   <it-detail>
 *        <it-detail-header>
 *
 *       </it-detail-header>
 *
 *
 *       <it-detail-content>
 *       </it-detail-content>
 *   </it-detail>
 *
 * </it-master-detail>
 * ```
 */
IteSoft
    .directive('itMasterHeader',function() {
        return {
            restrict: 'EA',
            require: '^itMaster',
            scope: false,
            transclude : true,
            template :'<div class="fuild-container">   <div class="row it-fill">   <div class="it-md-header col-xs-12 col-md-12">'+
                '<div class="btn-toolbar it-fill" ng-transclude>'+
                '</div>'+
                '</div>'+
                '<div class="col-xs-12 col-md-12 pull-right">'+
                '<div>'+
                '<form>'+
                '<div class="form-group has-feedback it-master-header-search-group  col-xs-12 col-md-{{$parent.itCol < 4 ? 12 :6 }} pull-right" >'+
                '<span class="glyphicon glyphicon-search form-control-feedback"></span>'+
                '<input  class="form-control " type="text" ng-model="$parent.filterText" class="form-control floating-label"  placeholder="{{placeholderText}}"/>'+
                '</div>'+
                '</form>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>',
            link: function (scope, element, attrs) {
                scope.$watch(function () { return attrs.itSearchPlaceholder }, function (newVal) {
                    scope.placeholderText = newVal;
                });
            }
        }

    });
'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itAutocomplete
 * @module itesoft
 * @restrict ECA
 * @since 1.1
 * @description
 * The ItAutocomplete widgets provides suggestions while you type into the field
 *
 *
 * ```html
 *   <it-autocomplete items="[{id=1,value='premiere option'}]" selected-option="selectedId" search-mode="'contains'"  />
 * ```
 *
 * <h1>Event</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Param
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          event-select
 *      </td>
 *      <td>
 *          Name of event to emit when value is selected
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          event-refresh
 *      </td>
 *      <td>
 *          Name of event to emit to force autocomplete to refresh items
 *      </td>
 *  </tr>
 *  </table>
 *
 *
 * <h1>Options</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Param
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *           items-getter
 *      </td>
 *      <td>
 *          Getter that return list of items to show in autocomplete
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *           items
 *      </td>
 *      <td>
 *          List of items to show in autocomplete
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          options
 *      </td>
 *      <td>
 *          Reference to autocomplete object :
 *
 *          $scope.options = {
 *              // call when lazyGrid is instantiate
 *              onRegisterApi: function (autocomplete) {
 *                  $scope.autocomplete = autocomplete;
 *                   // Call when user click
 *                  $scope.autocomplete.fn.searchPredicate= function(inputValue,itemToTest){
 *                      return (itemToTest.id.indexOf(inputValue) !== -1 || itemToTest.value.indexOf(inputValue) !== -1);
 *                  }
 *              }
 *          }
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *           converter
 *      </td>
 *      <td>
 *          Converter to transform object to id or label
 *           implements:
 *           {
 *           getIdFromObject,
 *           getLabelFromObject,
 *           getObject
 *           }
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          selected-option
 *      </td>
 *      <td>
 *          Reference to the selected item id
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          on-change
 *      </td>
 *      <td>
 *          Function to call when value changed
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          on-blur
 *      </td>
 *      <td>
 *          Function to when blur
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          on-focus
 *      </td>
 *      <td>
 *          Function to call when focus
 *      </td>
 *  </tr>
 *  </table>
 *
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
 *  <tr>
 *      <td>
 *          it-autocomplete-select
 *      </td>
 *      <td>
 *          Default option class
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-selected
 *      </td>
 *      <td>
 *          Selected option class
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-container
 *      </td>
 *      <td>
 *          Option container div
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-div
 *      </td>
 *      <td>
 *         parent  div
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-div-visible
 *      </td>
 *      <td>
 *          always visible part of autocomplete (input)
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-input
 *      </td>
 *      <td>
 *          input text of autocomplete
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          it-autocomplete-btn
 *      </td>
 *      <td>
 *          ... btn at the end of autocomplete fields
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          search-mode
 *      </td>
 *      <td>
 *         allow to specify a searchMode (startsWith,custom) see below. Default filter is contains
 *      </td>
 *  </tr>
 *
 *
 *  </table>
 *
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <style>
 .width300{width:300px};
 </style>
 <div ng-controller="HomeCtrl">

 <h1>Usage inside grid:</h1>
 <div id="grid1" ui-grid="gridOptions" class="grid"></div>
 <h1>Standalone usage:</h1>
 Selected Id:<input type="text" ng-model="selectedOption"/>

 <div class="row">
 <div  class="col-xs-3"> StartsWith:</div>
 <div  class="col-xs-9">
 <it-autocomplete items="firstNameOptions" selected-option="selectedOption" search-mode="'startsWith'"></it-autocomplete>
 </div>
 </div>
 <div class="row">
 </div>

 <h1>Custom search method</h1>
 <div class="row">
 <div class="col-xs-12">
 <span class="text" >
 You can use a custom filter method by adding search-mode="'custom'" parameter
 </span>
 </div>
 </div>
 <div class="row">
 <div class="col-xs-3">Custom predicate:</div>

 <div  class="col-xs-3">
 <it-autocomplete  items="firstNameOptions" name="'customPredicate'"  search-mode="'custom'" selected-option="firstRate"  options="options" ></it-autocomplete>
 </div>
 <div class="row">
 <div class="col-xs-3">Starts with:</div>
 <div  class="col-xs-3">
 <it-autocomplete  items="firstNameOptions" name="'customPredicate'"  search-mode="'startsWith'" selected-option="firstRate"  options="options" ></it-autocomplete>
 </div>
 </div>
 <h1>Linked autocomplete</h1>
 <div class="row">
     <div class="col-xs-12">
     <span class="text" >
     You can link autocomplete together by adding event-select and event-refresh params
     </span>
     </div>
 </div>

 <div class="row">
     <div  class="col-xs-3">
     Taux
     </div>
     <div  class="col-xs-3">
     Code
     </div>
 </div>
 <div class="row">
     <div  class="col-xs-3">
     <it-autocomplete  items-getter="getRate(code)" name="'firstRate'" selected-option="rate"  event-select="'firstEvent'" selected-option="firstRate" event-refresh="'secondEvent'" options="options" ></it-autocomplete>
     </div>

     <div  class="col-xs-3">
     <it-autocomplete   items-getter="getCode(rate)"  name="'firstCode'" selected-option="code"    event-select="'secondEvent'" selected-option="firstCode" event-refresh="'firstEvent'" options="options" ></it-autocomplete>
     </div>
 </div>

 <div class="row">
     <div  class="col-xs-3">
     {{rate}}
     </div>
     <div  class="col-xs-3">
     {{code}}
     </div>
 </div>
 <div class="row">
    <div class="col-xs-12">
        <h1>Autocomplete map with object</h1>
    </div>
 </div>
 <div class="row">
    <div class="col-xs-12">
        <span class="text" >
        You can map object directly inside autocomplete
        </span>
     </div>
 </div>
 <div class="row">
     <div  class="col-xs-3">
     Taux
     </div>
     <div  class="col-xs-3">
     Code
     </div>
 </div>
 <div class="row">
     <div  class="col-xs-3">
     <it-autocomplete  items="availablesTax" name="'objectAutoComplete'" converter="taxConverter"  selected-option="selectedtax" ></it-autocomplete>
     </div>
     <div  class="col-xs-3">
     {{selectedtax}}
    </div>
 </div>
 <h1>Disabled</h1>
 <div class="row">
     <div  class="col-xs-3">
     <it-autocomplete  items="firstNameOptions" name="'customPredicate'" disabled="'true'" search-mode="'custom'"      selected-option="firstRate"  options="options" ></it-autocomplete>
     </div>
 </div>
 <h1>ReadOnly</h1>
 <div class="row">
     <div  class="col-xs-3">
     <it-autocomplete  items="firstNameOptions" name="'customPredicate'" readonly="'true'" search-mode="'custom'"   selected-option="firstRate"  options="options" ></it-autocomplete>
     </div>
     </div>
 </div>
 <h1>Focus and Blur</h1>
 <div class="row">
 <div  class="col-xs-3">
 <it-autocomplete  items="firstNameOptions" name="'customPredicate'" readonly="'true'" search-mode="'custom'"       on-blur="test('blur')" on-focus="test('focus')"   selected-option="firstRate"  options="options" ></it-autocomplete>
 </div>
 </div>
 </div>

 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngMessages','itesoft']);
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl',
 ['$scope','$log','$timeout',function($scope,$log,$timeout) {
            $scope.myData = [];
            $scope.availablesTax = [];
            // sample values
            $scope.myDataInit = [ { "firstName": "Cox", "lastName": "Carney", "company": "Enormo", "employed": true }, { "firstName": "Lorraine", "lastName": "Wise", "company": "Comveyer", "employed": false }, { "firstName": "Nancy", "lastName": "Waters", "company": "Fuelton", "employed": false }];
            $scope.firstNameOptions = [{id:"Cox",value:"Cox"},{id:"Lorraine",value:"Lorraine"},{id:"Enormo",value:"Enormo"},{id:"Enormo1",value:"Enormo1"},{id:"Enormo2",value:"Enormo2"},{id:"Enormo3",value:"Enormo3"},{id:"Enormo4",value:"Enormo4"},{id:"Enormo5",value:"Enormo5"},{id:"Enormo6",value:"Enormo6"},{id:"Enormo7",value:"Enormo7"},{id:"Enormo8",value:"Enormo8"},{id:"Enormo9",value:"Enormo9"},{id:"Enormo10",value:"Enormo10"},{id:"Enormo11",value:"Enormo12"}];
            $scope.lastNameOptions = [{id:"Carney",value:"Carney"},{id:"Wise",value:"Wise"},{id:"Waters",value:"Waters"}];
            $scope.customOptions = [
            {id:20,value:"FR_20"},{id:19.6,value:"FR_19.6"},{id:7,value:"FR_7"},{id:"10",value:"FR_10"},{id:"19",value:"DE_19"},{id:"7",value:"DE_7"},{id:"0",value:"NO"},
            {id:"22",value:"FR_22"},{id:"23",value:"FR_23"},{id:"24",value:"FR_24"},{id:"25",value:"FR_25"},{id:"26",value:"DE_26"},{id:"27",value:"DE_27"},{id:"28",value:"28"}
            ];

            $scope.rate = "";
            $scope.code = "";


            $scope.tvas = [{rate:"19.6",code:"TVA_FR_OLD"},{rate:"20",code:"TVA_FR"}];


            $timeout(function(){
                $scope.availablesTax =[
                {"id":1,"companyId":1,"code":"D5.5","name":"TVA 5,5% Biens & Services Débit","rate":5.5,"content":{"JURIDICTION":"FR/FR","ACCOUNT":"445200","END_DATE":1522627200000,"START_DATE":1522627200000,"OFFSET_TAX":"","OFFSET_ACCOUNT":""}},
                {"id":2,"companyId":1,"code":"D20","name":"TVA 20% Biens & Services Débit","rate":20,"content":{"JURIDICTION":"FR/FR","ACCOUNT":"445100","END_DATE":1522627200000,"START_DATE":1522627200000,"OFFSET_TAX":"","OFFSET_ACCOUNT":""}}
                ];

                $scope.selectedtax =  {"id":1,"companyId":1,"code":"D5.5","name":"TVA 5,5% Biens & Services Débit","rate":5.5,"content":{"JURIDICTION":"FR/FR","ACCOUNT":"445200","END_DATE":1522627200000,"START_DATE":1522627200000,"OFFSET_TAX":"","OFFSET_ACCOUNT":""}}          ;
            },1000);
;
            angular.copy($scope.myDataInit,$scope.myData);


            $scope.options = {
                // call when lazyGrid is instantiate
                onRegisterApi: function (autocomplete) {
                    $scope.autocomplete = autocomplete;
                     // Call when user click
                    $scope.autocomplete.fn.searchPredicate= function(inputValue,itemToTest){
                        return (itemToTest.id.indexOf(inputValue) !== -1 || itemToTest.value.indexOf(inputValue) !== -1);
                    }
                }
            }

            $scope.taxConverter={
                getObject : function(item){
                    var resultItem = item;
                    resultItem.content = undefined;
                    return resultItem;
                },
                getIdFromObject: function(object){
                    if(angular.isDefined(object)){
                        return object.id;
                    }else{
                        $log.info("unable to get id of null object");
                    }
                },
                getLabelFromObject: function(object){
                    if(angular.isDefined(object)){
                        return object.code;
                    }else{
                        return "";
                    }
                }
            }

            $scope.firstRate ="";
            $scope.firstCode ="";
            $scope.secondRate ="";
            $scope.secondCode ="";

            $scope.getRate = function(code){
                var result = [];
                    $log.debug("getRate with code: "+code);
                    angular.forEach($scope.tvas, function(tva){
                        if( angular.isUndefined(code) || code == '' || tva.code==code){
                        result.push({id:tva.rate,value:tva.rate})
                        }
                    })
                  return result;
            };


            $scope.getCode = function(tax){
                 var result = [];
                if(angular.isDefined(tax)){
                    $log.debug("getCode with rate: "+tax);
                    angular.forEach($scope.tvas, function(tva){
                        if( angular.isUndefined(tax) || tax == '' ||  tva.rate==tax){
                        result.push({id:tva.code,value:tva.code})
                        }
                    })
                }else{
                    angular.forEach($scope.tvas, function(tva){
                        result.push({id:tva.rate,value:tva.rate})
                    })
                }
                return result;
            };


            $scope.gridOptions = {
                data:$scope.myData,
                useExternalFiltering: true,
                enableFiltering: true,
                onRegisterApi: function(gridApi){

                  $scope.gridApi = gridApi;
                  //quick an dirty example of filter that use it-autocomplete
                  $scope.gridApi.core.on.filterChanged($scope, function(){
                      $scope.myData = [];
                            var filterUse = false;
                      angular.forEach($scope.myDataInit,function(item){
                            var added = false;
                            var key = '';
                            var value = '';
                            for (var i = 0; i < $scope.gridApi.grid.columns.length; i++) {
                            if(!added){
                                    key = $scope.gridApi.grid.columns[i].field;
                                    for (var j = 0; j < $scope.gridApi.grid.columns[i].filters.length; j++) {
                                            value = $scope.gridApi.grid.columns[i].filters[j].term;
                                            if (value != undefined && value != '' && item[key] == value) {
                                                $scope.myData.push(item);
                                                added = true;
                                                filterUse = true;
                                            }
                                            if (value == undefined) {
                                                $scope.myData.push(item);
                                                added = true;
                                                filterUse = true;
                                            }
                                         }
                                    }
                                    }
                            if(! filterUse){
                             //angular.copy($scope.myDataInit,$scope.myData);
                            }
                            $scope.gridOptions.data = $scope.myData;
                            $scope.gridOptions.totalItems = $scope.myData.length;
                      })
                    });
                },
                columnDefs:[{
                    name: 'firstName',
                    cellClass: 'firstName',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete placeholder="\'filter\'" items="grid.appScope.firstNameOptions" selected-option="colFilter.term" input-class="\'firstNameFilter\'" option-container-class="\'width300\'" ></it-autocomplete></div>',
                    filter:[{
                      term: 1
                      }]
                    },
                    {
                    name: 'lastName',
                    cellClass: 'lastName',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete items="grid.appScope.lastNameOptions" selected-option="colFilter.term" input-class="\'lastNameFilter\'" option-container-class="\'width300\'"></it-autocomplete></div>',
                    filter:[{
                      term: 1 }]
                    }
                ]
            };
            $scope.selectedOption = "Lorraine";

            $scope.test = function(input){
                $log.debug(input);
            }
     }
 ]);
 </file>
 </example>
 */


IteSoft
    .directive('itAutocomplete', function () {
        return {
            restrict: 'AE',
            scope: {
                /**
                 * items list must contain id and value
                 */
                items: "=",
                /**
                 * items list must contain id and value
                 */
                itemsGetter: "&?",
                /**
                 * selected item id
                 */
                selectedOption: "=",
                /**
                 * stylesheet class added on input filter
                 */
                inputClass: "=",
                /**
                 * stylesheet class added on option
                 */
                optionClass: "=",
                /**
                 * stylesheet class added on option container
                 */
                optionContainerClass: "=",
                /**
                 * converter to transform object to id or label
                 * {
                 *           getIdFromObject : undefined,
                 *           getLabelFromObject : undefined,
                 *           getObjectFromId : undefined
                 *       }
                 */
                converter: "=",
                /**
                 * input searchMode value= startsWith,contains default contains
                 */
                searchMode: "=",
                /**
                 * input placeHolder
                 */
                placeholder: "=",
                /**
                 * register
                 */
                options: "=",
                /**
                 * change
                 */
                onChange: "&",
                /**
                 * focus
                 */
                onFocus: "&?",
                /**
                 * blur
                 */
                onBlur: "&?",
                /**
                 * eventToEmit
                 */
                eventSelect: "=",
                /**
                 * event to
                 */
                eventRefresh: "=",
                /**
                 * name
                 */
                name: "=",
                /**
                 * disabled input
                 */
                disabled: "=",
                /**
                 * readonly
                 */
                readonly: "="

            },
            controllerAs: 'itAutocompleteCtrl',
            controller: ['$scope', '$rootScope', '$translate', '$document', '$timeout', '$log', 'itStringUtilsService',
                function ($scope, $rootScope, $translate, $document, $timeout, $log, itStringUtilsService ) {

                    var self = this;

                    self.options = $scope.options;

                    /****************************************************************************************
                     *                                  DECLARATION
                     **************************************************************************************/

                    /**
                     * public fields
                     * @type {{}}
                     */
                    self.fields = {
                        items: [],
                        inputSearch: '',
                        showItems: false,
                        optionClass: $scope.optionClass,
                        optionContainerClass: $scope.optionContainerClass,
                        inputClass: $scope.inputClass,
                        defaultSelectClass: '',
                        selectedSelectClass: '',
                        selectedItem: {},
                        searchMode: $scope.searchMode,
                        placeholder: $scope.placeholder,
                        debug: false,
                        converter: $scope.converter,
                        disabled: false,
                        readonly: false,
                        event: {
                            refresh: {
                                name: $scope.eventRefresh,
                                value: undefined

                            },
                            select: $scope.eventSelect
                        }
                    };

                    if (angular.isUndefined(self.fields.optionClass)) {
                        self.fields.optionClass = '';
                    }
                    if (angular.isUndefined(self.fields.optionContainerClass)) {
                        self.fields.optionContainerClass = '';
                    }
                    if (angular.isUndefined(self.fields.inputClass)) {
                        self.fields.inputClass = 'it-autocomplete-input-class it-autocomplete-input';
                    }
                    if (angular.isUndefined(self.fields.placeholder)) {
                        self.fields.placeholder = '';
                    }
                    if(angular.isDefined($scope.disabled)){
                        self.fields.disabled = true;
                    }
                    if(angular.isDefined($scope.readonly)){
                        self.fields.readonly = true;
                    }

                    self.fields.optionContainerClass = self.fields.optionContainerClass + " it-autocomplete-container";
                    self.fields.defaultSelectClass = self.fields.optionClass + " it-autocomplete-select";
                    self.fields.selectedSelectClass = self.fields.defaultSelectClass + " it-autocomplete-selected";
                    /**
                     * Use unique id for container, all to find it if there are multiple itAutocomplete directive inside the same page
                     * @type {string}
                     */
                    self.fields.optionContainerId = _generateID();



                     /**
                     * Create a random name to have an autogenerate id for log
                     */
                    if (angular.isUndefined(self.fields.name)) {
                        self.fields.name = self.fields.optionContainerId;
                    }else{
                        self.fields.name = self.fields.name;
                    }

                    /**
                     * public function
                     * @type {{}}
                     */
                    self.fn = {
                        select: select,
                        change: change,
                        blur: blur,
                        focus: focus,
                        init: initSelect,
                        fullInit: initItems,
                        hideItems: hideItems,
                        showItems: showItems,
                        getIdFromObject: _getIdFromObject,
                        getLabelFromObject: _getLabelFromObject,
                        keyBoardInteration: keyBoardInteration

                    };

                    /**
                     * Listener
                     * @type {{}}
                     */
                    self.on = {};


                    if (angular.isDefined($scope.items) && angular.isDefined($scope.itemsGetter)) {
                        $log.error(self.fields.name + " Autocomplete must use items or items-getter, you are not allowed to use both")
                    }

                    if (angular.isUndefined($scope.items) && angular.isUndefined($scope.itemsGetter)) {
                        $log.error(self.fields.name + " Autocomplete must use items or items-getter, you need to add one parameter")
                    }
                    /**
                     * Call register function to give ref of current autocomplete to the controller
                     */
                    if (angular.isDefined(self.options) && angular.isDefined(self.options.onRegisterApi)) {
                        self.options.onRegisterApi(self);
                    }

                    /****************************************************************************************
                     *                                  CODE
                     **************************************************************************************/

                    /**
                     * initialize default data
                     */
                    initItems();
                    initSelect();
                    $scope.focusIndex = -1;
                    updateIndex();
                    //Apply default select
                    _selectItemWithId($scope.selectedOption);

                    /**
                     * Listern refresh event to refresh component when throw
                     */
                    if (self.fields.event.refresh.name) {
                        $rootScope.$on(self.fields.event.refresh.name, function (event, value) {

                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: refresh event emit, calling refresh items ");
                            }
                            self.fields.event.refresh.value = value;
                            initItems();
                            hideItems();
                            initSelect();
                        });

                    } else {
                        /**
                         * Watch items change to items to reload select if item is now present
                         */

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: refresh event is not defined, add watch to items");
                        }
                        $scope.$watch('items', function (newValue, oldValue) {
                            if (newValue != self.fields.item) {

                                if (self.fields.debug) {
                                    $log.debug(self.fields.name + " itAutocomplete: items value changed " + newValue + " " + oldValue);
                                }
                                initItems();
                                initSelect();
                                _selectItemWithId($scope.selectedOption);
                                hideItems();
                            }
                        });
                    }


                    /**
                     * Watch selectedOption change to select option if value change outside this directive
                     */
                    $scope.$watch('selectedOption', function (newValue, oldValue) {
                        if ($scope.onChange) {
                            $scope.onChange();
                        }

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: selectedOption value changed " + oldValue + " -> " + newValue);
                        }

                        if (angular.isUndefined(self.fields.selectedItem) || newValue != _getIdFromObject(self.fields.selectedItem)) {
                            _selectItemWithId(newValue);
                        }
                    });

                    /**
                     * Keyboard interation
                     */
                    function updateIndex() {

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: focusIndex value changed  -> " + $scope.focusIndex);
                        }
                        if ($scope.focusIndex < 0) {
                            $scope.focusIndex = -1;
                        } else if ($scope.focusIndex >= self.fields.items.length) {
                            $scope.focusIndex = self.fields.items.length - 1;
                        }
                        if (angular.isDefined(self.fields.items)) {
                            if (self.fields.items[$scope.focusIndex] != self.selectedItem) {
                                select(self.fields.items[$scope.focusIndex]);
                            }
                        }
                    };

                    /****************************************************************************************
                     *                                  FUNCTION
                     **************************************************************************************/
                    /**
                     * Select Item with it id
                     * @param id
                     * @private
                     */
                    function _selectItemWithId(id) {

                        id = _getIdFromObject(id);


                        var selected = false;
                        self.fields.selectedItem = {};
                        if (angular.isDefined(id)) {
                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: select with  id " + id);
                            }
                            angular.forEach(self.fields.items, function (item) {
                                if (_getIdFromObject(item) == id) {
                                    applySelection(item);
                                    selected = true;
                                }
                            });
                            if (!selected) {
                                initSelect();
                            }
                        }
                    }

                    /**
                     * init + copy of externalItems
                     */
                    function initItems() {
                        if (angular.isDefined($scope.items)) {
                            self.fields.items = angular.copy($scope.items);
                        } else {
                            self.fields.items = angular.copy($scope.itemsGetter({param: self.fields.event.refresh.value}));
                        }
                        self.fields.initialItems = angular.copy(self.fields.items);

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: copy option items " + self.fields.initialItems);
                        }
                    }

                    /**
                     * Style class and position initialization
                     */
                    function initSelect() {

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: init select ");
                        }
                        var i = 0;
                        angular.forEach(self.fields.items, function (item) {
                            if (angular.isDefined(self.fields.selectedItem)) {
                                if (self.fields.selectedItem == item) {
                                    select(item)
                                }
                            }
                            i++;
                        });
                    }

                    /**
                     * Call when option is selected
                     * @param id
                     */
                    function select(selectedItem) {
                        if (angular.isDefined(selectedItem)) {

                            applySelection(selectedItem);
                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: select " + JSON.stringify(selectedItem));
                            }
                            if(self.fields.converter){
                                $scope.selectedOption = _getObject(selectedItem);
                            }else{
                                $scope.selectedOption = _getIdFromObject(selectedItem);
                            }
                        } else {

                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: select empty");
                            }
                            $scope.selectedOption = undefined;
                        }
                        if (self.fields.event.select) {

                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: emit select event " + $scope.selectedOption);
                            }
                            $rootScope.$emit(self.fields.event.select, $scope.selectedOption);
                        }
                    }


                    function applySelection(selectedItem) {
                        if (angular.isDefined(selectedItem)) {

                            if (self.fields.debug) {
                                $log.debug(self.fields.name + " itAutocomplete: applySelection " + JSON.stringify(selectedItem));
                            }
                            var selectedPosition = _getPosition(selectedItem);
                            if ($scope.focusIndex != selectedPosition) {
                                $scope.focusIndex = selectedPosition;
                                updateIndex();
                            }
                            self.fields.inputSearch = _getLabelFromObject(selectedItem);
                            self.fields.selectedItem = _getObject(selectedItem);
                            //self.fields.selectedItem.class = self.fields.selectedSelectClass;

                            var selectedDiv = $document[0].querySelector("#options_" + itStringUtilsService.cleanDomRef.encode(_getIdFromObject(self.fields.selectedItem) + ""));
                            scrollTo(selectedDiv,selectedItem);
                        } else {
                            self.fields.selectedItem = undefined;
                            $scope.focusIndex = -1;
                            updateIndex();
                        }
                    }


                    /**
                     * Scroll on selectedItem when user use keyboard to select an item
                     * @param divId
                     */
                    function scrollTo(targetDiv,item) {

                        var containerDiv = $document[0].querySelector("#" + self.fields.optionContainerId + "");

                        if (self.fields.debug) {
                            $log.debug(self.fields.name + " itAutocomplete: scrollTo " + "#" + self.fields.optionContainerId + " to: " + targetDiv);
                        }

                        if (angular.isDefined(containerDiv) && containerDiv != null){
                            containerDiv.scrollTop = (_getPosition(item)+1)*20 - containerDiv.getBoundingClientRect().height ;
                        }
                        
                    }

                    /**
                     * Hide option items
                     */
                    function hideItems($event) {
                        $log.debug(self.fields.name + " itAutocomplete: hide "+self.fields.selectedItem);
                        // Si appelé lors du click sur la touche entrée
                        if (angular.isUndefined($event)) {
                            self.fields.showItems = false;
                            if (angular.isDefined(self.fields.selectedItem)) {
                                self.fields.inputSearch = _getLabelFromObject(self.fields.selectedItem)

                            }
                            // si appelé par le on blur, on vérifie que le onblur n'est pas émit par la scrollbar si ie
                        } else if (!document.activeElement.classList.contains('it-autocomplete-container')) {
                            self.fields.showItems = false;
                            if (angular.isDefined(self.fields.selectedItem)) {
                                self.fields.inputSearch = _getLabelFromObject(self.fields.selectedItem);
                            }

                            //si il s'agit de la scrollbar, on annule le onblur en remettant le focus sur l'element
                        } else {
                            $scope.$applyAsync(function () {
                                $event.srcElement.focus();
                            })
                        }
                        ;
                    }

                    /**
                     * Return internet explorer version
                     * @returns {number}
                     */
                    function getInternetExplorerVersion() {
                        var rv = -1;
                        if (navigator.appName == 'Microsoft Internet Explorer') {
                            var ua = navigator.userAgent;
                            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                            if (re.exec(ua) != null)
                                rv = parseFloat(RegExp.$1);
                        }
                        else if (navigator.appName == 'Netscape') {
                            var ua = navigator.userAgent;
                            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                            if (re.exec(ua) != null)
                                rv = parseFloat(RegExp.$1);
                        }
                        return rv;
                    }

                    /**
                     * Show option items
                     */
                    function showItems($event) {
                        //refresh modal position on internet explorer because fixed position doesn't follow scroll
                        if (angular.isDefined($event) && getInternetExplorerVersion() != -1) {
                            var container = $event.srcElement.parentElement.children[1];
                            var myParent = angular.element($event.srcElement.parentElement)[0];
                            //only needed with ie and fixed positiion
                            if (angular.isDefined(container) && angular.isDefined(myParent) && container.currentStyle["position"] == "fixed") {
                                var newTop = (myParent.getBoundingClientRect().top + myParent.getBoundingClientRect().height);
                                container.style.setProperty("top", newTop + "px");
                            }
                        }
                        self.fields.showItems = true;
                    }

                    /**
                     * Call when search input content change
                     */
                    function change(event) {
                        $log.debug(self.fields.name + " itAutocomplete: input search change value " + event + "->" + self.fields.inputSearch)
                        self.fields.items = [];
                        if (self.fields.inputSearch == "") {
                            select(undefined);
                            initItems();
                            initSelect();
                        } else {
                            var i = 0;
                            angular.forEach(self.fields.initialItems, function (item) {
                                //item.class = self.fields.defaultSelectClass;
                                /**
                                 * StartsWith
                                 */
                                if (self.fields.searchMode == "startsWith") {
                                    if (itStringUtilsService.clear(_getLabelFromObject(item)).startsWith(itStringUtilsService.clear(self.fields.inputSearch))) {
                                        self.fields.items.push(item);
                                        //self.fields.items[i].position = i;
                                        i++;
                                    }
                                    /**
                                     * Contains
                                     */
                                } else if (self.fields.searchMode == "custom") {
                                    if (angular.isUndefined(self.fn.searchPredicate)) {
                                        $log.error(self.fields.name + " When using searchMode = custom, you need to add a searchPredicate function by adding  self.fn.searchPredicate = function (inputValue,item) ");
                                    } else if (self.fn.searchPredicate(self.fields.inputSearch, item)) {
                                        self.fields.items.push(item);
                                        //self.fields.items[i].position = i;
                                        i++;
                                    }
                                    /**
                                     * Contains
                                     */
                                } else {
                                    if (itStringUtilsService.clear(_getLabelFromObject(item)).search(itStringUtilsService.clear(self.fields.inputSearch)) != -1) {
                                        self.fields.items.push(item);
                                        //self.fields.items[i].position = i;
                                        i++;
                                    }
                                }
                            });
                            if (self.fields.items.length == 1) {
                                select(self.fields.items[0]);
                            }
                        }
                        showItems();
                    }

                    /**
                     * Call when blur on input
                     * @param $event
                     */
                    function blur($event){
                        hideItems($event);
                        if($scope.onBlur){
                            $scope.onBlur();
                        }
                    }

                    /**
                     * Call when focus on input
                     * @param $event
                     */
                    function focus($event){
                        showItems($event);
                        if($scope.onFocus){
                            $scope.onFocus();
                        }
                    }

                    /**
                     * Manage keyboard interaction up down enter
                     * @type {Array}
                     */
                    $scope.keys = [];

                    var KEY_ENTER = 13;
                    var KEY_DOWN = 38;
                    var KEY_UP = 40;
                    var KEY_BACK = 8;
                    var KEY_DELETE = 8;
                    var KEY_ESCAPE = 27;

                    $scope.keys.push({
                        code: KEY_ENTER, action: function () {
                            if (self.fields.showItems) {
                                hideItems();
                            } else {
                                showItems();
                                if (self.fields.inputSearch == "") {
                                    $scope.focusIndex = -1;
                                    updateIndex();
                                }
                            }
                        }
                    });
                    $scope.keys.push({
                        code: KEY_BACK, action: function () {
                            self.fields.inputSearch = "";
                            $scope.focusIndex = -1;
                            updateIndex();
                            change();
                        }
                    });
                    $scope.keys.push({
                        code: KEY_DOWN, action: function () {
                            showItems();
                            $scope.focusIndex--;
                            updateIndex();
                        }
                    });
                    $scope.keys.push({
                        code: KEY_UP, action: function () {
                            showItems();
                            $scope.focusIndex++;
                            updateIndex();
                        }
                    });
                    $scope.keys.push({
                        code: KEY_ESCAPE, action: function () {
                            if (self.fields.showItems) {
                                hideItems();
                            }
                        }
                    });

                    /**
                     * Use to manage keyboard interaction
                     * @param event
                     */
                    function keyBoardInteration(event) {
                        var code = event.keyCode;
                        $scope.keys.forEach(function (o) {
                            if (o.code !== code) {
                                return;
                            }
                            o.action();
                        });
                    };

                    /**
                     * Generate unique Id
                     * @returns {string}
                     */
                    function _generateID() {
                        var d = new Date().getTime();
                        var uuid = 'option_container_xxxxxxxxxxxx4yxxxxx'.replace(/[xy]/g, function (c) {
                            var r = (d + Math.random() * 16) % 16 | 0;
                            d = Math.floor(d / 16);
                            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
                        return uuid;
                    };



                    /**
                     *  Return label from current object by using converter,
                     *  if converter doesn't exists, return object.value
                     * @param selectedItem
                     * @returns {string}
                     * @private
                     */
                    function _getLabelFromObject(item) {
                        var result = "";
                        if (angular.isDefined(self.fields.converter) && self.fields.converter.getLabelFromObject) {
                            result = self.fields.converter.getLabelFromObject(item);
                        } else {
                            result = item.value;
                        }
                        return result;
                    }

                    /**
                     *  Return id from current object by using converter,
                     *  if converter doesn't exists, return object.id if not null
                     * @param object
                     * @returns {string}
                     * @private
                     */
                    function _getIdFromObject(objectToTransform) {
                        var id = "";
                        if (angular.isDefined(self.fields.converter) && self.fields.converter.getIdFromObject) {
                            id = self.fields.converter.getIdFromObject(objectToTransform);
                        } else if (objectToTransform && angular.isDefined(objectToTransform) && typeof objectToTransform === "object") {
                            id = objectToTransform.id;
                        } else {
                            return objectToTransform;
                        }
                        return id;
                    }

                    /**
                     *  Return object that is selected
                     * @param id
                     * @returns {*}
                     * @private
                     */
                    function _getObject(item){
                        var result = {};
                        if (angular.isDefined(self.fields.converter) && self.fields.converter.getObject) {
                            //var resultItem = item;
                            //resultItem.class = undefined;
                            //resultItem.position = undefined;
                            result = self.fields.converter.getObject(item);
                        } else  {
                            result =  item;
                        }
                        return result;
                    }

                    /**
                     * Return position inside list of item
                     * @param item
                     * @returns {number}
                     * @private
                     */
                    function _getPosition(item){
                        return self.fields.items.indexOf(item);
                    }

                }
            ],
            template: '<div class="col-xs-12 it-autocomplete-div">' +
            '<div class="it-autocomplete-div-visible" > '+
            '   <input ng-disabled="itAutocompleteCtrl.fields.disabled" ng-focus="itAutocompleteCtrl.fn.focus($event)" ng-readonly="itAutocompleteCtrl.fields.readonly" ' +
            'placeholder="{{itAutocompleteCtrl.fields.placeholder}}" ng-keydown="itAutocompleteCtrl.fn.keyBoardInteration($event)"' +
            'ng-blur="itAutocompleteCtrl.fn.blur($event);" type="text" class="form-control it-autocomplete-input" ' +
            'ng-class="inputClass" ng-change="itAutocompleteCtrl.fn.change($event)" ng-model="itAutocompleteCtrl.fields.inputSearch"> ' +
            '   <div class="it-autocomplete-btn"  ng-disabled="itAutocompleteCtrl.fields.disabled" ng-click="itAutocompleteCtrl.fn.showItems($event)" ng-blur="itAutocompleteCtrl.fn.hideItems($event)" > ' +
            '&#9679;&#9679;&#9679;</div>'+
            '</div>'+
            '   <div  ng-class="itAutocompleteCtrl.fields.optionContainerClass" id="{{itAutocompleteCtrl.fields.optionContainerId}}" ng-show="itAutocompleteCtrl.fields.showItems" >' +
            '       <div class="it-autocomplete-content"  ng-repeat="item in itAutocompleteCtrl.fields.items"> ' +
            '          <div class=" {{item == itAutocompleteCtrl.fields.selectedItem?itAutocompleteCtrl.fields.selectedSelectClass: itAutocompleteCtrl.fields.defaultSelectClass}}"' +
            '               id="{{\'options_\'+itAutocompleteCtrl.itStringUtilsService.cleanDomRef.encode(itAutocompleteCtrl.fn.getIdFromObject(item))}}"  ' +
            '               ng-mousedown="itAutocompleteCtrl.fn.select(item)">' +
            '               {{itAutocompleteCtrl.fn.getLabelFromObject(item)}}' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        }
    })
;

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itCheckbox
 * @module itesoft
 * @restrict A
 * @since 1.0
 * @description
 * The checkbox is no different than the HTML checkbox input,
 * except it's styled differently.
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
            <div>
                 <input it-checkbox type="checkbox" it-label="Checkbox">
            </div>
        </file>
    </example>
 */
IteSoft
    .directive('itCheckbox',function(){
        return {
            restrict: 'A',
            transclude : true,
            replace : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);
                input.wrap('<div class="checkbox"></div>');
                input.wrap('<label></label>');
                input.after('<span class="checkbox-material"><span class="check" style="margin-right:16px;width: '+attrs.width+';height:'+ attrs.height+';"></span></span>&nbsp;'+(attrs.itLabel || ''));
            }
        }
});
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itInput
 * @module itesoft
 * @restrict ECA
 * @since 1.0
 * @description
 * Floating labels are just like Stacked Labels,
 * except that their labels animate, or "float" up whe
 * n text is entered in the input.
 *
 *
 * ```html
 *   <form class="form-group"  novalidate name="myForm" ng-submit="submit(myForm)">
 *       <input it-input
 *              class="form-control floating-label"
 *              type="text"
 *              name="Email"
 *              ng-minlength="5"
 *              ng-maxlength="10"
 *              required=""
 *              it-label="Email"
 *              ng-model="user.email">
 *              <div class="form-errors" ng-messages="myForm.Email.$error" style="color: red;">
         *            <div class="form-error" ng-message="required">This field is required.</div>
         *            <div class="form-error" ng-message="minlength">This field is must be at least 5 characters.</div>
         *            <div class="form-error" ng-message="maxlength">This field is must be less than 50 characters</div>
 *             </div>
 *   </form>
 * ```
 * @example
    <example module="itesoft-showcase">
        <file name="index.html">
            <div ng-controller="HomeCtrl">
               <form class="form-group"  novalidate name="myForm" ng-submit="submit(myForm)">
                <div class="form-group">
                        <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email">
                </div>
                <div class="form-group">
                        <input it-input class="form-control floating-label"   required="" ng-minlength="5"  ng-maxlength="10" type="text" it-label="Prénom" name="Prenom" ng-model="user.firstName">
                </div>
                  <div class="form-errors" ng-messages="myForm.Prenom.$error" style="color: red;">
                      <div class="form-error" ng-message="required">This field is required.</div>
                      <div class="form-error" ng-message="minlength">This field is must be at least 5 characters.</div>
                      <div class="form-error" ng-message="maxlength">This field is must be less than 50 characters</div>
                  </div>
                  <button class="btn btn-primary" type="submit">submit</button>
               </form>
            </div>
        </file>
         <file name="Module.js">
         angular.module('itesoft-showcase',['ngMessages','itesoft']);
         </file>
        <file name="controller.js">
            angular.module('itesoft-showcase').controller('HomeCtrl',['$scope', function($scope) {
                  $scope.user = {
                      email : 'test@itesoft.com',
                      firstName :''
                     };

                  $scope.submit = function(form){
                       if(form.$valid){
                         console.log('submit');
                       }
                  }
            }]);
        </file>

    </example>
 */
IteSoft
    .directive('itInput',function(){
        return {
            restrict: 'A',
            replace : true,
            require: '?ngModel',
            link : function (scope, element, attrs, ngModel ) {
                // Check if ngModel is there else go out
                if (!ngModel)
                    return;
                // Fix on input element
                var input = angular.element(element[0]);
                //If there is no floating-lbal do nothing
                if (input.hasClass('floating-label')) {
                    // Wrapper for material design
                    input.wrap('<div class="form-control-wrapper"></div>');
                    // If there is astatic placeholder use it
                    var placeholder = input.attr('placeholder');
                    if (placeholder) {
                        input.after('<div class="floating-label">' +  placeholder + '</div');
                    } else {
                        // Else user data binding text 
                        input.after('<div class="floating-label">' +  scope.itLabel + '</div');
                        scope.$watch('itLabel', function(value) {
                            scope.$applyAsync(function(){
                                if (!input[0].offsetParent) {
                                    return;
                                }
                                var elementDiv = input[0].offsetParent.children;
                                angular.forEach(elementDiv, function(divHtml) {
                                    var div = angular.element(divHtml);
                                    if (div.hasClass('floating-label')) {
                                        div.text(value);
                                    }
                                });
                            })

                        });
                    }
                    input.after('<span class="material-input"></span>');
                    input.attr('placeholder', '').removeClass('floating-label');
                }
                // Check if error message is set
                input.after('<small class="text-danger" style="display:none;"></small>');
                scope.$watch('itError', function(value) {
                    if (!input[0].offsetParent) {
                        return;
                    }
                    var elementDiv = input[0].offsetParent.children;
                    angular.forEach(elementDiv, function(divHtml) {
                        var div = angular.element(divHtml);
                        if (div.hasClass('text-danger')) {
                            div.text(value);
                            if (value != '' && value != undefined) {
                                div.removeClass('ng-hide');
                                div.addClass('ng-show');
                                div.css('display','block');
                            } else {
                                div.removeClass('ng-show');
                                div.addClass('ng-hide');
                                div.css('display','none');
                            }
                        }
                    });
                });
                if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                    input.addClass('empty');
                }
                // Watch value and update to move floating label
                scope.$watch(function () {return ngModel.$modelValue; }, function(value,oldValue) {
                    if (value === null || value == undefined || value ==="" ) {
                        input.addClass('empty');
                    } else {
                        input.removeClass('empty');
                    }
                });

                // wait for input
                input.on('change', function() {
                    if (input.val() === null || input.val() == "undefined" || input.val() === "") {
                        input.addClass('empty');
                    } else {
                        input.removeClass('empty');
                    }
                });
            },
            scope : {
                itError : '=',
                itLabel : '@'
            }
        }
});
"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itSearch
 * @module itesoft
 * @restrict A
 * @since 1.0
 * @description
 * Attribute providing on an input a single filter box that searches across multiple columns in a grid (ui-grid) or a table.
 *
 * You MUST pass an object `<input it-search it-search-control="searchControl" ng-model="searchControl.filterText" ></input>`.
 * This object will be used as following:
 * <table class="table">
 *  <tr>
 *   <td><code>searchControl = { <br/> columnDefs : [{field:'field1'}, {field:'field2'}, {field:'field3'}]  <br/>}</code></td>
 *   <td>Object passed to the multicolumns function filter inside the component to let it know on which columns to apply the filter.
 *   <br>This object is based on the columnDefs defined for the UI-GRID. Only property field and cellFilter are used.
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.multicolumnsFilter(renderableRows)</code></td>
 *   <td>Method to filter in the grid or table according the choosen column fields.<br/>It returns the new rows to be displayed.</td>
 *  </tr>
 *  <tr>
 *   <td><code>searchControl.filterText</code></td>
 *   <td>This property of the scope has to be associated to the input<br/>(through ng-model).</td>
 *  </tr>
 * </table>
 * You MUST also pass a function `<input it-search ng-change="filter()"></input>`.
 * This function should call searchControl.multicolumnsFilter() to refresh the displayed data and has to be written in the application controller.
 *
 * @usage
 * <input it-search it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()">
 * </input>
 *
 * @example
 * <span><b>SEARCH IN UI-GRID</b></span>
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="SearchDemoControllerGrid">
 <div class="container-fluid">
 <div class="jumbotron">
 <div class="row">
 <button class="btn btn-primary" ng-click="loadDataGrid()">DISPLAY DATA IN UI-GRID</button>
 <form>
 <div class="form-group has-feedback" >
 <input it-search class="form-control" type="text" placeholder="Recherche multicolonnes dans UI-GRID" it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()"/>
 </div>
 </form>
 <div ui-grid="latinGrid" id="latinGrid"></div>
 </div>
 </div>
 </div>
 </div>
 </file>

 <file name="Module.js">
 angular.module('itesoft-showcase',['ngResource','itesoft']);
 </file>
 <file name="LatinService.js">
 angular.module('itesoft-showcase')
 .factory('Latin',['$resource', function($resource){
                                                    return $resource('http://jsonplaceholder.typicode.com/posts');
                                                }]);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase')
 .controller('SearchDemoControllerGrid',['$scope','Latin', function($scope,Latin) {
                            $scope.searchControl = {
                                columnDefs : [{field:'title'}, {field:'body'}]
                            };

                            $scope.dataSource = [];

                            //---------------ONLY UI-GRID--------------------
                            $scope.myDefs = [
                                    {
                                        field: 'id',
                                        width: 50
                                    },
                                    {
                                        field: 'title'
                                    },
                                    {
                                        field: 'body'
                                    }
                            ];
                            $scope.latinGrid = {
                                data: 'dataSource',
                                columnDefs: $scope.myDefs,
                                onRegisterApi: function (gridApi) {
                                    $scope.gridApi = gridApi;
                                    $scope.gridApi.grid.registerRowsProcessor($scope.searchControl.multicolumnsFilter, 200);
                                }
                            };
                            //---------------ONLY UI-GRID--------------------

                            $scope.filter = function () {
                                $scope.gridApi.grid.refresh();
                            };

                            $scope.loadDataGrid = function() {
                                $scope.dataSource = [];

                                Latin.query().$promise
                                .then(function(data){
                                    $scope.dataSource = data;
                                });
                            };
                     }]);
 </file>

 </example>

 * <span><b>SEARCH IN TABLE</b></span>
 <example module="itesoft-showcase1">
 <file name="index.html">
 <div ng-controller="SearchDemoControllerTable">
 <div class="container-fluid">
 <div class="jumbotron">
 <div class="row">
 <button class="btn btn-primary" ng-click="loadDataTable()">DISPLAY DATA IN TABLE</button>
 <form>
 <div class="form-group has-feedback" >
 <input it-search class="form-control" type="text" placeholder="Recherche multicolonnes dans TABLE" it-search-control="searchControl" ng-model="searchControl.filterText" ng-change="filter()"/>
 </div>
 </form>
 <table class="table table-striped table-hover ">
 <thead>
 <tr><th>id</th><th>title</th><th>body</th></tr>
 </thead>
 <tbody>
 <tr ng-repeat="dataItem in data">
 <td>{{dataItem.id}}</td>
 <td>{{dataItem.title}}</td>
 <td>{{dataItem.body}}</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
 </file>
 <file name="Module1.js">
 angular.module('itesoft-showcase1',['ngResource','itesoft']);
 </file>
 <file name="LatinService1.js">
 angular.module('itesoft-showcase1')
 .factory('Latin1',['$resource', function($resource){
                                            return $resource('http://jsonplaceholder.typicode.com/posts');
                                        }]);
 </file>
 <file name="Controller1.js">
 angular.module('itesoft-showcase1')
 .controller('SearchDemoControllerTable',['$scope','Latin1', function($scope,Latin1) {
                    $scope.searchControl = {};
                    $scope.searchControl = {
                        columnDefs : [{field:'title'}, {field:'body'}]
                    };

                    $scope.dataSource = [];
                    $scope.data = [];

                    $scope.filter = function () {
                        $scope.data = $scope.searchControl.multicolumnsFilter($scope.dataSource);
                    };

                    $scope.loadDataTable = function() {
                        $scope.dataSource = [];
                        $scope.data = [];

                        Latin1.query().$promise
                        .then(function(data){
                           $scope.dataSource = data;
                           $scope.data = data;
                        });
                    };
             }]);
 </file>

 </example>
 **/
IteSoft
    .directive('itSearch',function() {
        return {
            restrict: 'A',
            replace : true,
            scope: {
                itSearchControl:'='
            },
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);

                input.after('<span class="glyphicon glyphicon-search form-control-feedback"/>');
            },
            controller : ['$scope',
                function ($scope) {
                    $scope.itSearchControl.multicolumnsFilter = function (renderableRows) {
                        var matcher = new RegExp($scope.itSearchControl.filterText, 'i');
                        var renderableRowTable = [];
                        var table = false;
                        if ($scope.itSearchControl.columnDefs) {
                            renderableRows.forEach(function (row) {
                                var match = false;
                                if (row.entity) {//UI-GRID
                                    $scope.itSearchControl.columnDefs.forEach(function (col) {
                                        if (!match && row.entity[col.field]) {
                                            var renderedData = row.entity[col.field].toString();
                                            if (col.cellFilter) {
                                                $scope.value = renderedData;
                                                renderedData = $scope.$eval('value | ' + col.cellFilter);
                                            }
                                            if(typeof renderedData !== 'undefined' && renderedData != null){
                                                if (renderedData.match(matcher)) {
                                                    match = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!match) {
                                        row.visible = false;
                                    }
                                }
                                else {//TABLE
                                    table = true;
                                    $scope.itSearchControl.columnDefs.forEach(function (col) {
                                        if (!match && row[col.field] && row[col.field].toString().match(matcher)) {
                                            match = true;
                                        }
                                    });
                                    if (match) {
                                        renderableRowTable.push(row);
                                    }
                                }
                            });
                        }
                        if (table){
                            renderableRows = renderableRowTable;
                        }
                        return renderableRows;
                    };
                }]
        }
    });
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itToggle
 * @module itesoft
 * @restrict A
 * @since 1.0
 * @description
 * A toggle is an animated switch which binds a given model to a boolean.
 * Allows dragging of the switch's nub.
 *
 *
 * ```html
 *     <input  it-toggle type="checkbox" it-label="Toggle button">
 * ```
 *
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
            <div>
                <input  it-toggle type="checkbox" ng-model="data" it-label="Toggle button">
            </div>
        </file>

    </example>
 */
IteSoft
    .directive('itToggle',['$compile',function($compile){
        return {
            restrict: 'A',
            transclude : true,
            link : function (scope, element, attrs ) {
                var input = angular.element(element[0]);
                input.wrap('<div class="togglebutton"></div>');
                if (scope.itLabel == undefined) {
                    input.wrap('<label></label>');
                    input.after('<span class="toggle"></span>');
                } else {
                    input.wrap('<label></label>');
                    input.after('<span class="toggle"></span><span>'+(scope.itLabel || '')+'</span>');

                    scope.$watch('itLabel', function(value) {
                        if ((value) && (input.context)) {
                            var label = angular.element(input.context.parentNode);
                            if ((label) && (attrs.itLabel)) {
                                var labelText = angular.element(label.get(0).firstChild);
                                labelText.get(0).textContent = value+'  ';
                            }
                        }
                    });
                }
            },
            scope: {
                itLabel: '@'
            }
        }
}]);
'use strict';
/**
 * TODO itInclude desc
 */
angular.module('itesoft.viewer').directive('itInclude', ['$timeout', '$compile', function($timeout, $compile) {
    var linker = function (scope, element, attrs) {
        var currentScope;
        scope.$watch(attrs.itInclude, function (template) {
            $timeout(function () {
                if(currentScope){
                    currentScope.$destroy();
                }
                currentScope = scope.$new();
                element.html( template || '');
                $compile(element.contents())(currentScope);
            }, 50);
        });
    };
    return {
        restrict: 'AE',
        link: linker
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itMediaViewer
 * @module itesoft
 * @since 1.2
 * @restrict AEC
 * @requires $translate (pascalprecht.translate)
 * @requires angular-ui-layout (ui.layout)
 *
 * @description
 * <table class="table">
 *  <tr>
 *   <td><code>src</code></td>
 *   <td>string url passed to the media viewer (the server must implement Allow cross origin in case of cross domain url).</td>
 *  </tr>
 *  <tr>
 *   <td><code>file</code></td>
 *   <td>stream passed to the media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>type</code></td>
 *   <td>to force type of document if the media viewer can't guess the type.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options = {}</code></td>
 *   <td>Object passed to the media viewer to apply options.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.onApiLoaded = function(api) { }</code></td>
 *   <td>Callback to be notify when the property api is available.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.onTemplateNotFound = function(extension) { }</code></td>
 *   <td>Callback to be notify when template not found for the specify extension.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.orientation = 'vertical' | 'horizontal'</code></td>
 *   <td>Set orientation of the viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showProgressbar = true | false</code></td>
 *   <td>Hide | Show progress bar.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showToolbar  = true | false</code></td>
 *   <td>Hide | Show tool bar.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showThumbnail  = true | false</code></td>
 *   <td>Hide | Show thumbnail.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.showSizeMenu  = true | false</code></td>
 *   <td>Hide | Show size menu.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.initialScale  = '20 - 500%' | 'fit_height' | 'fit_page' | 'fit_width'</code></td>
 *   <td>Set initial scale of media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.getApi()</code></td>
 *   <td>Api of media viewer.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getZoomLevel()</code></td>
 *   <td>Method to get the current zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomTo(zoomLevel)</code></td>
 *   <td>Method to zoom to the zoom level parameter.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomIn()</code></td>
 *   <td>Method to zoom to the next zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.zoomOut()</code></td>
 *   <td>Method to zoom to the prev zoom level.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getZoomLevels()</code></td>
 *   <td>Method to get the list of zoom level items.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onZoomLevelsChanged = function (zoomLevels) { }</code></td>
 *   <td>Callback to be notify when the property zoom levels change.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getCurrentPage()</code></td>
 *   <td>Method to get the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.goToPage(pageIndex)</code></td>
 *   <td>Method to go to the page index if possible.</td>
 *  </tr>
 *   <tr>
 *   <td><code>options.api.goToNextPage()</code></td>
 *   <td>Method to go to the next page if possible.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.goToPrevPage()</code></td>
 *   <td>Method to go to the prev page if possible.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.getNumPages()</code></td>
 *   <td>Method to get the number of pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePagesRight()</code></td>
 *   <td>Method to rotate to the right (90°) all pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePagesLeft()</code></td>
 *   <td>Method to rotate to the left (-90°) all pages.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePageRight()</code></td>
 *   <td>Method to rotate to the right (per 90°) the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.rotatePageLeft()</code></td>
 *   <td>Method to rotate to the left (per -90°) the current page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onError = function (operation, message) { }</code></td>
 *   <td>Callback to be notify on error.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onZoomToSelection = function (zoomSelection) { }</code></td>
 *   <td>Callback to be notify on zoom to rectangle.</td>
 *  </tr>
 *  <tr>
 *  <tr>
 *   <td><code>options.api.onPageClicked = function (pageIndex) { }</code></td>
 *   <td>Callback to be notify when click on a page.</td>
 *  </tr>
 *  <tr>
 *   <td><code>options.api.onPageRotation = function (args) { alert(args.pageIndex + " " + args.rotation); }</code></td>
 *   <td>Callback to be notify on page rotation.</td>
 *  </tr>
 *   <td><code>options.api.downloadProgress</code></td>
 *   <td>% of progress.</td>
 *  </tr>
 * </table>
 *
 * ```html
 *    <style>
         //override style selection
         .multipage-viewer .selected {
            border-style: solid;
            border-width: 1px;
            border-color: red;
         }

         .thumbnail-viewer .selected {
            border-style: solid;
            border-width: 1px;
            border-color: red;
         }

         //override thumbnail num-page
         .thumbnail-viewer .num-page {
         	text-align: center;
         }
      </style>
 *    <it-media-viewer></it-media-viewer>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
     <div ng-controller="HomeCtrl" class="row">
        <div class="col-md-12"><div style="height: 500px;"><it-media-viewer src="'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'" options="options"></it-media-viewer></div></div>
     </div>
 </file>
 <file name="Module.js">
    angular.module('itesoft-showcase',['itesoft.viewer'])
 </file>
 <file name="controller.js">
     angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { api.onZoomLevelsChanged = function (zoomLevels) { console.log(zoomLevels); } } }; }]);
 </file>
 </example>
 */

angular.module('itesoft.viewer').directive('itMediaViewer', ['itScriptService', function(itScriptService){

    var _splitLast = function (word, character) {
        if(word != undefined){
            var words = word.split(character);
            return words[words.length - 1];
        }
        return word;
    };

    var linker = function (scope, element, attrs) {

        var _setTemplate = function (ext, value) {
            var pathJs = (scope.options ? scope.options.libPath : null) || "assets/Scripts/vendor";
            switch (ext) {
                case 'pdf':
                    scope.pdfSrc = value;
                    itScriptService.LoadScripts([
                        pathJs + '/pdf.js',
                    ]).then(function() {
                        //Hack for IE http://stackoverflow.com/questions/26101071/no-pdfjs-workersrc-specified/26291032
                        PDFJS.workerSrc = pathJs + "/pdf.worker.js";
                        //PDFJS.cMapUrl = pathJs + "/cmaps/";
                        //PDFJS.imageResourcesPath = pathJs + "/images";
                        scope.template = '<it-pdf-viewer src="pdfSrc" options="options"></it-pdf-viewer>';
                    });
                    break;
                case 'png':
                case 'jpeg':
                case 'jpg':
                    scope.imageSrc = value;
                    scope.template = '<it-image-viewer src="imageSrc" options="options"></it-image-viewer>';
                    break;
                case 'tif':
                case 'tiff':
                    scope.tiffSrc = value;
                    itScriptService.LoadScripts([
                        pathJs + '/tiff.min.js'
                    ]).then(function() {
                        scope.template = '<it-tiff-viewer src="tiffSrc" options="options"></it-tiff-viewer>';
                    });
                    break;
                default :
                    if(scope.options && scope.options.onTemplateNotFound) {
                        scope.options.onTemplateNotFound(ext);
                    }
                    $log.debug('No template found for extension : ' + ext);
                    scope.template = null;
                    break;
            }
        };

        var _setValue = function(newValue, oldValue) {
            if(newValue){
                if(typeof newValue === typeof ""){
                    scope.ext = _splitLast(newValue, '.').toLowerCase();
                    _setTemplate(scope.ext, newValue);
                } else {
                    if(attrs.type) {
                        _setTemplate(attrs.type.toLowerCase(), newValue);
                    }else if(newValue.name != undefined) {
                        scope.ext = _splitLast(_splitLast(newValue.name, '.'), '/').toLowerCase();
                        _setTemplate(scope.ext, newValue);
                    } else {
                        $log.debug('must specify type when using stream');
                        scope.template = null;
                    }
                }
            } else if(newValue != oldValue) {
                scope.template = null;
            }
        };

        scope.$watch("src", _setValue);
        scope.$watch("file", _setValue);
    };

    return {
        scope: {
            src : '=',
            file: '=',
            type: '@',
            options : '=',
        },
        restrict: 'E',
        template :  '<div it-include="template"></div>',
        link: linker
    };
}]);


'use strict';
/**
 * TODO ScriptService desc
 */


angular.module('itesoft.viewer')
    .factory('itScriptService', ['$log' , '$window' , '$q', function($log, $window, $q){
    var _scipts = {};
    var _css = {};
    var defaultScriptPromise = $q.defer();
    var defaultScriptsPromise = $q.defer();

    //JS
    var _loadScripJs = function (js) {
        if(js){
            if(_scipts[js] != undefined){
                return _scipts[js];
            }else {
                var deferred = $q.defer();
                var script = document.createElement('script');
                _scipts[js] = deferred.promise;
                script.src = js;
                script.type = 'text/javascript';
                script.onload = function () {
                    deferred.resolve(script);
                };
                document.head.appendChild(script);
                return deferred.promise;
            }
        }
        defaultScriptPromise.resolve();
        return defaultScriptPromise.promise;
    };

    var _loadScriptsJs = function (scriptJs) {
        if(typeof scriptJs == typeof ""){
            return _loadScripJs(scriptJs);
        }else if(typeof scriptJs == typeof []){
            var promises = [];
            angular.forEach(scriptJs, function(js){
                promises.push(_loadScripJs(js));
            });
            return $q.all(promises);
        }
        defaultScriptsPromise.resolve();
        return defaultScriptsPromise.promise;
    };

    //CSS
    var _loadScriptCss = function (css) {
        if(css){
            if(_css[css] != undefined){
                return _css[css];
            }else {
                var deferred = $q.defer();
                var link = document.createElement('link');
                _css[css] = deferred.promise;
                link.href = css;
                link.rel ='stylesheet';
                link.type = 'text/css';
                link.onload = function () {
                    deferred.resolve(link);
                };
                document.head.appendChild(link);
                return deferred.promise;
            }
        }
        defaultScriptPromise.resolve();
        return defaultScriptPromise.promise;
    };

    var _loadScriptsCss = function (scriptCss) {
        if(typeof scriptCss == typeof ""){
            return _loadScriptCss(scriptCss);
        }else if(typeof scriptCss == typeof []){
            var promises = [];
            angular.forEach(scriptCss, function(css){
                promises.push(_loadScriptCss(css));
            });
            return $q.all(promises);
        }
        defaultScriptsPromise.resolve();
        return defaultScriptsPromise.promise;
    };

    //Scripts
    var _loadScripts = function (js, css) {
        return $q.all([_loadScriptsJs(js), _loadScriptsCss(css)]);
    };

    return {
        LoadScripts : _loadScripts
    };
}]);

"use strict";
/**
 * You do not talk about FIGHT CLUB!!
 */
IteSoft
    .directive("konami", ['$document','$uibModal', function($document,$modal) {
        return {
            restrict: 'A',
            template : '<style type="text/css"> @-webkit-keyframes easterEggSpinner { from { -webkit-transform: rotateY(0deg); } to { -webkit-transform: rotateY(-360deg); } } @keyframes easterEggSpinner { from { -moz-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg); } to { -moz-transform: rotateY(-360deg); -ms-transform: rotateY(-360deg); transform: rotateY(-360deg); } } .easterEgg { -webkit-animation-name: easterEggSpinner; -webkit-animation-timing-function: linear; -webkit-animation-iteration-count: infinite; -webkit-animation-duration: 6s; animation-name: easterEggSpinner; animation-timing-function: linear; animation-iteration-count: infinite; animation-duration: 6s; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; transform-style: preserve-3d; } .easterEgg img { position: absolute; border: 1px solid #ccc; background: rgba(255,255,255,0.8); box-shadow: inset 0 0 20px rgba(0,0,0,0.2); } </style>',
            link: function(scope) {
                var konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konami_index = 0;

                var handler = function(e) {
                    if (e.keyCode === konami_keys[konami_index++]) {
                        if (konami_index === konami_keys.length) {
                            $document.off('keydown', handler);

                            var modalInstance =  $modal.open({
                                template: '<div style="max-width: 100%;" class="easterEgg"> <img style="-webkit-transform: rotateY(0deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-72deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-144deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-216deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> <img style="-webkit-transform: rotateY(-288deg) translateX(180px); padding: 0 0 0 0px;" src="http://media1.woopic.com/493/f/470x264/q/85/fd/p/newsweb-finance-article%7Cc8c%7C177%7Cbe13e9df471d6c4469b3e3ac93/itesoft-la-sf2i-monte-a-9-9-des-parts%7Cl_itesoftlogo.png" width="100%" height="160" alt=""> </div>'
                                   ,
                                size: 'lg'
                            });
                            scope.cancel = function(){
                                modalInstance.dismiss('cancel');
                            } ;
                        }
                    } else {
                        konami_index = 0;
                    }
                };

                $document.on('keydown', handler);

                scope.$on('$destroy', function() {
                    $document.off('keydown', handler);
                });
            }
        };
    }]);
"use strict";
/**
 * @ngdoc directive
 * @name itesoft.directive:itPrettyprint

 * @module itesoft
 * @restrict EA
 * @parent itesoft
 * @since 1.0
 * @description
 * A container for display source code in browser with syntax highlighting.
 *
 * @usage
 * <it-prettyprint>
 * </it-prettyprint>
 *
 * @example
    <example module="itesoft">
        <file name="index.html">
             <pre it-prettyprint=""  class="prettyprint lang-html">
                 <label class="toggle">
                     <input type="checkbox">
                         <div class="track">
                         <div class="handle"></div>
                     </div>
                 </label>
             </pre>
        </file>
    </example>
 */
IteSoft
    .directive('itPrettyprint', ['$rootScope', '$sanitize', function($rootScope, $sanitize) {
        var prettyPrintTriggered = false;
        return {
            restrict: 'EA',
            terminal: true,  // Prevent AngularJS compiling code blocks
            compile: function(element, attrs) {
                if (!attrs['class']) {
                    attrs.$set('class', 'prettyprint');
                } else if (attrs['class'] && attrs['class'].split(' ')
                    .indexOf('prettyprint') == -1) {
                    attrs.$set('class', attrs['class'] + ' prettyprint');
                }
                return function(scope, element, attrs) {
                    var entityMap = {
                          "&": "&amp;",
                          "<": "&lt;",
                          ">": "&gt;",
                          '"': '&quot;',
                          "'": '&#39;',
                          "/": '&#x2F;'
                      };

                       function replace(str) {
                          return String(str).replace(/[&<>"'\/]/g, function (s) {
                              return entityMap[s];
                          });
                      }
                    element[0].innerHTML = prettyPrintOne(replace(element[0].innerHTML));

                };
            }

        };
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:itBottomGlue
 * @module itesoft
 * @restrict A
 * @since 1.0
 * @description
 * Simple directive to fill height.
 *
 *
 * @example
     <example module="itesoft">
         <file name="index.html">
             <div class="jumbotron " style="background-color: red; ">
                 <div class="jumbotron " style="background-color: blue; ">
                     <div class="jumbotron " style="background-color: yellow; ">
                         <div it-bottom-glue="" class="jumbotron ">
                            Resize the window height the component will  always fill the bottom !!
                         </div>
                     </div>
                 </div>
             </div>
         </file>
     </example>
 */
IteSoft
    .directive('itBottomGlue', ['$window','$timeout',
        function ($window,$timeout) {
    return function (scope, element) {
        function _onWindowsResize () {

            var currentElement = element[0];
            var elementToResize = angular.element(element)[0];
            var marginBottom = 0;
            var paddingBottom = 0;
            var  paddingTop = 0;
            var  marginTop =0;

            while(currentElement !== null && typeof currentElement !== 'undefined'){
                var computedStyles = $window.getComputedStyle(currentElement);
                var mbottom = parseInt(computedStyles['margin-bottom'], 10);
                var pbottom = parseInt(computedStyles['padding-bottom'], 10);
                var ptop = parseInt(computedStyles['padding-top'], 10);
                var mtop = parseInt(computedStyles['margin-top'], 10);
                marginTop += !isNaN(mtop)? mtop : 0;
                marginBottom += !isNaN(mbottom) ? mbottom : 0;
                paddingBottom += !isNaN(pbottom) ? pbottom : 0;
                paddingTop += !isNaN(ptop)? ptop : 0;
                currentElement = currentElement.parentElement;
            }

            var elementProperties = $window.getComputedStyle(element[0]);
            var elementPaddingBottom = parseInt(elementProperties['padding-bottom'], 10);
            var elementToResizeContainer = elementToResize.getBoundingClientRect();
            element.css('height', ($window.innerHeight
                - (elementToResizeContainer.top )-marginBottom -
                (paddingBottom - elementPaddingBottom)
                + 'px' ));
            element.css('overflow-y', 'auto');
        }

        $timeout(function(){
            _onWindowsResize();
        $window.addEventListener('resize', function () {
            _onWindowsResize();
        });
        },250)

    };

}]);
'use strict';

/**
 * @ngdoc directive
 * @name itesoft.directive:pixelWidth
 * @module itesoft
 * @restrict A
 * @since 1.1
 * @description
 * Simple Stylesheet class to manage width.
 * width-x increment by 25
 *
 *
 * @example
 <example module="itesoft">
 <file name="index.html">
         <!-- CSS adaptation for example purposes. Do not do this in production-->
         <div class="width-75" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .width-75
         </div>
         <div class="width-225" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .width-225
         </div>
         <div class="width-1000" style="background-color: rgba(86,61,124,.15);border: solid 1px white;padding:5px; ">
         .width-1000
         </div>
 </file>
 </example>
 */
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
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itCollapsedItem
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 * @since 1.0
 * @description
 * Directive to collapse grouped item in {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 *
 * <img src="../dist/assets/img/collapsed-item.gif" alt="">
 * @usage
 *  <li>
 *  </li>
 *  <li it-collapsed-item=""  >
 *    <a href=""><h5>Menu Title</h5></a>
 *    <ul  class=" nav navbar-nav  nav-pills nav-stacked it-menu-animated ">
 *        <li>
 *            <a  href="#/datatable">Normal</a>
 *        </li>
 *    </ul>
 *  </li>
 *  <li>
 *  </li>
 */
IteSoft
    .directive('itCollapsedItem', function() {
        return  {
            restrict : 'A',
            link : function ( scope,element, attrs) {
                var menuItems = angular.element(element[0]
                    .querySelector('ul'));
                var link = angular.element(element[0]
                    .querySelector('a'));
                menuItems.addClass('it-side-menu-collapse');
                element.addClass('it-sub-menu');
                var title = angular.element(element[0]
                    .querySelector('h5'));
                var i = angular.element('<i class="pull-right fa fa-angle-right" ></i>');
                title.append(i);
                link.on('click', function () {
                    if (menuItems.hasClass('it-side-menu-collapse')) {
                        menuItems.removeClass('it-side-menu-collapse');
                        menuItems.addClass('it-side-menu-expanded');
                        i.removeClass('fa-angle-right');
                        i.addClass('fa-angle-down');
                        element.addClass('toggled');
                    } else {
                        element.removeClass('toggled');
                        i.addClass('fa-angle-right');
                        i.removeClass('fa-angle-down');
                        menuItems.removeClass('it-side-menu-expanded');
                        menuItems.addClass('it-side-menu-collapse');

                    }
                });

            }
        }
    });


'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itNavActive
 * @module itesoft
 * @restrict A
 * @since 1.0
 * @description
 * Directive to set active view css class on side menu item {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 *
 *  <div class="jumborton ng-scope">
 *    <img src="../dist/assets/img/nav-active.gif" alt="">
 *  </div>
 *
 * ```html
 *     <it-side-menu>
 *            <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">
 *                <li>
 *                <a href="#"><h5><i class="fa fa-home fa-fw"></i>&nbsp; Content</h5></a>
 *                </li>
 *                <li>
 *                <a href="#/typo"><h5><i class="fa fa-book fa-fw"></i>&nbsp; Typography</h5></a>
 *                </li>
 *                <li>
 *                <a href=""><h5><i class="fa fa-book fa-fw"></i>&nbsp; Tables</h5></a>
 *                </li>
 *            </ul>
 *
 *     </it-side-menu>
 * ```
 *
 */

IteSoft.
    directive('itNavActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element,attrs) {
                var clazz = attrs.itActive || 'active';
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass(clazz);
                            } else {
                                angular.element(li).removeClass(clazz);
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        }
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenu
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 * @since 1.0
 * @description
 * A container for a side menu, sibling to an {@link itesoft.directive:itSideMenuContent} Directive.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 *
 * @usage
 * <it-side-menu>
 * </it-side-menu>
 */
IteSoft
    .directive('itSideMenu',function(){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope:false,
            link:function(scope, element, attrs ){

                calculateWidth();

                scope.$watch(function(){
                    calculateWidth();
                });

                var sideMenuHeader = angular.element(document
                    .querySelector('it-side-menu-header'));
                if(!sideMenuHeader[0]){
                   scope.$noMenuHeader = true;
                }

                function calculateWidth(){
                    scope.$itSideMenuWidth = attrs.itWidth ? attrs.itWidth : 260;
                    scope.sideMenuCalc1 = { 'width': (scope.itSideMenuWidth * 1) + (50 * 1) + 'px' };
                    scope.sideMenuCalc2 = { 'width': scope.$itSideMenuWidth + 'px' };
                }
            },
            template :
            '<div style="{{$noMenuHeader ? \'top:0px;padding-bottom:0px;left:0px;\':\'\'}}width:{{$itSideMenuWidth}}px;" class="it-side-menu it-side-menu-left it-side-menu-hide it-menu-animated" ng-class="{\'it-side-menu-hide\':!showmenu,\'it-side-menu-slide\':showmenu}">' +
                '<div ng-style="sideMenuCalc1"  class="it-sidebar-inner">' +
                    '<div ng-style="sideMenuCalc2" class="nav navbar navbar-inverse">' +
                    '<nav class="" ng-transclude ></nav>' +
                    '</div>'+
                '</div>'+
            '</div>'
        }
});
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenuContent
 * @since 1.0
 * @module itesoft
 * @restrict E
 * @parent itesoft/sideMenus
 *
 * @description
 * A container for a side menu, sibling to an directive.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}.
 * @usage
 * <it-side-menu>
 * </it-side-menu>
 */
IteSoft

    .directive('itSideMenuContent',function(){
        return {
            restrict : 'ECA',
            require : '^itSideMenus',
            transclude : true,
            scope : false,
            link : function(scope){
                var sideMenuHeader = angular.element(document
                    .querySelector('it-side-menu-header'));
                if(!sideMenuHeader[0]){
                    scope.showmenu = true;
                }

                calculatePadding();
                scope.$watch('$itSideMenuWidth',function(){
                    calculatePadding();
                });

                function calculatePadding(){
                    scope.menuOpenStyle = {'padding-left': (scope.$itSideMenuWidth ? scope.$itSideMenuWidth : 0) + 'px'};
                    scope.menuCloseStyle = {'padding-left': '0px'};
                }
            },
            template :
            '<div class="it-menu-content"  ng-style="showmenu && menuOpenStyle || menuCloseStyle">' +
                '<div class="it-container it-fill" ng-transclude></div>' +
            '</div>'
        }
    });
'use strict';

IteSoft
    .controller("$sideMenuCtrl",[
        '$scope',
        '$document',
        '$timeout'
        ,'$window',
        function($scope,
                 $document,
                 $timeout,
                 $window){
        var _self = this;
        _self.scope = $scope;

        _self.scope.showmenu = false;
        _self.toggleMenu = function(){

            _self.scope.showmenu=(_self.scope.showmenu) ? false : true;

            $timeout(function(){
                var event = document.createEvent('Event');
                event.initEvent('resize', true /*bubbles*/, true /*cancelable*/);
                $window.dispatchEvent(event);
            },300)
        };
        _self.hideSideMenu = function(){
            _self.scope.showmenu= false;
        }
    }]);

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenuHeader
 * @module itesoft
 * @restrict E
 * @parent sideMenus
 * @since 1.0
 * @description
 * A container for a side menu header.
 * see {@link itesoft.directive:itSideMenus `<it-side-menus>`}
 *
 * <table class="table">
 *  <tr>
 *   <td><code>it-animate="true | false"</code></td>
 *   <td>Static or animated button.</td>
 *  </tr>
 *  <tr>
 *   <td><code>it-button-menu="true | false"</code></td>
 *   <td>show or hide side menu button</td>
 *  </tr>
 *</table>
 *
 * @usage
 * <it-side-menu-header it-animate="true | false" it-hide-button-menu="true | false">
 * </it-side-menu-header>
 */
IteSoft
    .directive('itSideMenuHeader',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            require : '^itSideMenus',
            transclude : true,
            scope: true,
            link : function (scope, element, attrs ,sideMenuCtrl) {

                var child = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__layer'));
                var button = angular.element(element[0]
                    .querySelector('.it-material-design-hamburger__icon'));

                var menuContent = angular.element(document
                    .querySelector('it-side-menu-content'));


                if(menuContent){
                    menuContent.css('padding-top','60px');
                }

                scope.toggleMenu = sideMenuCtrl.toggleMenu;
                if(attrs.itAnimate === "true") {
                    scope.$watch('showmenu', function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            if (!newValue) {
                                child.removeClass('it-material-design-hamburger__icon--to-arrow');
                                child.addClass('it-material-design-hamburger__icon--from-arrow');
                                $rootScope.$broadcast('it-sidemenu-state', 'opened');
                            } else {
                                child.removeClass('it-material-design-hamburger__icon--from-arrow');
                                child.addClass('it-material-design-hamburger__icon--to-arrow');
                                $rootScope.$broadcast('it-sidemenu-state', 'closed');
                            }
                        }
                    }, true);
                }

                if(attrs.itHideButtonMenu){
                    scope.itHideButtonMenu = scope.$eval(attrs.itHideButtonMenu);

                }
                scope.$watch(attrs.itHideButtonMenu, function(newValue, oldValue) {
                    scope.itHideButtonMenu = newValue;
                    if(newValue){
                        sideMenuCtrl.hideSideMenu();
                    }
                });

            },
            template :
                '<nav id="header" class="it-side-menu-header nav navbar navbar-fixed-top navbar-inverse">' +
                    '<section class="it-material-design-hamburger" ng-hide="itHideButtonMenu">' +
                        '<button  ng-click="toggleMenu()" class="it-material-design-hamburger__icon">' +
                            '<span class="it-menu-animated it-material-design-hamburger__layer"> ' +
                            '</span>' +
                        '</button>' +
                    ' </section>' +
                    '<div class="container-fluid" ng-transclude>' +
                    '</div>' +
                '</nav>'
        }
    }]);

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSideMenus
 * @module itesoft
 * @restrict ECA
 * @since 1.0
 * @description
 * A container element for side menu(s) and the main content. Allows the left and/or right side menu
 * to be toggled by dragging the main content area side to side.
 *
 * To use side menus, add an `<it-side-menus>` parent element. This will encompass all pages that have a
 * side menu, and have at least 2 child elements: 1 `<it-side-menu-content>` for the center content,
 * and `<it-side-menu>` directives
 *
 * <table class="table">
 *  <tr>
 *  <td><code>it-width="400"  attribute on it-side-menu directive </code></td>
 *   <td>Width of the side menu, in pixels, max value 800.</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-animate="true"  on it-side-menu-header  </code></td>
 *   <td>to animate de side menu open and close button</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-hide-button-menu="true"  on it-side-menu-header  </code></td>
 *   <td>to hide header menu Close/open button</td>
 *  </tr>
 *  <tr>
 *  <td><code> it-side-menu-header </code></td>
 *   <td>headers are optionnal</td>
 *  </tr>
 *  </table>
 *
 * ```html
 * <it-side-menus>
 *
 *  <it-side-menu-header it-animate="true"  it-hide-button-menu="true">
 *  </it-side-menu-header>
 *
 *   <!-- Center content -->
 *
 *   <it-side-menu-content>
 *   </it-side-menu-content>
 *
 *   <!-- menu -->
 *
 *
 *   <it-side-menu >
 *   </it-side-menu>
 *
 * </it-side-menus>
 * ```
 * @example
    <example module="itesoft">
        <file name="index.html">

         <it-side-menus>
             <it-side-menu-header it-animate="true"  it-button-menu="true">

                 <!-- Header Menu-->
                 <div class="collapse navbar-collapse">
                 <div uib-dropdown class="nav navbar-nav navbar-right ">
                 <button class="btn loginButton" type="button" uib-dropdown-toggle>
                 <i class="glyphicon glyphicon-user ">&nbsp;John Doe&nbsp;</i><span class="caret"></span>
                 </button>
                 <ul class="dropdown-menu" role="menu">
                 <li>
                 <a ng-cloak>
                 français
                 <i class="pull-right">
                 </i>
                 </a>
                 </li>
                 <li>
                 <a ng-cloak>
                 anglais
                 <i class="pull-right glyphicon glyphicon-ok">
                 </i>
                 </a>
                 </li>
                 <li>
                 <a ng-cloak>
                 dothraki
                 <i class="pull-right">
                 </i>
                 </a>
                 </li>
                 <li class="divider"></li>
                 <li>
                 <a ng-cloak>
                 logout
                 </a>
                 </li>
                 </ul>
                 </div>
                 </div>
             </it-side-menu-header>

         <it-side-menu it-width="200">
             <ul it-nav-active="active" class="nav navbar-nav nav-pills nav-stacked list-group">
             <li it-collapsed-item>
             <a href=""><h5><i class="fa fa-music"></i>&nbsp; Menu 1</h5></a>
             <ul  class="nav navbar-nav nav-pills nav-stacked it-menu-animated">
             <li >
             <a href="#/menu1/sub1" translate>SubMenu 1</a>
             </li>
             <li >
             <a href="#/menu2/sub2" translate>SubMenu 2</a>
             </li>
             </ul>
             </li>
             <li>
             <a href="#/menu2"><h5><i class="fa fa-list"></i>&nbsp; Menu 2</h5></a>
             </li>
             <li>
             <a href="#/menu3"><h5><i class="fa fa-pied-piper-alt"></i>&nbsp; Menu 3</h5></a>
             </li>
             </ul>
         </it-side-menu>


         <it-side-menu-content>

             <div class="container-fluid">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, veritatis, earum ullam accusantium consectetur consequuntur totam enim nemo impedit atque blanditiis ratione eum provident libero illum laboriosam qui amet eius.</p>

             </div>


            </it-side-menu-content>
         </it-side-menus>

    </file>
  </example>
 */
IteSoft
    .directive('itSideMenus',function(){
        return {
            restrict: 'ECA',
            transclude : true,
            controller : '$sideMenuCtrl',
            template : '<div class="it-side-menu-group" ng-transclude></div>'
        }
});
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanel
 * @module itesoft
 * @restrict E
 * @since 1.0
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
 *              <li><b>none</b> :  Will take the default css "top" property of theSide Panel. Default "top" is "0px". This position can be override by 'it-side-panel .it-side-panel-container' css selector</li>
 *              <li><b>XX</b> : Has to be a number. It will override the default css top position of Side Panel. <i>Ex : with it-top-position="40", the top position of Side Panel will be "40px"</i>
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
 <h2>Paragraph 3</h2>
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
 <h2>Search 1</h2>
 <p>

 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, repudiandae, totam vel dignissimos saepe cum assumenda velit tempora blanditiis harum hic neque et magnam tenetur alias provident tempore cumque facilis.
 </p>

 <br>
 <h2>Search 2</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, delectus suscipit laboriosam commodi harum totam quas! Autem, quaerat, neque, unde qui nobis aperiam culpa dignissimos iusto ipsam similique dolorem dolor.</p>
 <br>
 <h2>Search 3</h2>
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


'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelContent
 * @module itesoft
 * @restrict E
 * @since 1.0
 * @description
 * A container for a Side Panel content, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-content>
 * </it-side-panel-content>
 */
IteSoft
    .directive('itSidePanelContent', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require: '^itSidePanel',
            template:
                '<div class="it-side-panel-content" ng-transclude></div>'
        };
    });


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
            var TOP_POSITION_NAME = 'it-top-position';

            var DEFAULT_SIDE_PANEL_BUTTON_WIDTH = 40;

            var Z_INDEX_CSS_KEY = 'z-index';

            var IT_HEIGHT_MODE_WINDOW = 'window';
            var IT_HEIGHT_MODE_FULL = 'full';
            var IT_HEIGHT_MODE_AUTO = 'auto';
            var IT_HEIGHT_MODES = [IT_HEIGHT_MODE_WINDOW, IT_HEIGHT_MODE_FULL, IT_HEIGHT_MODE_AUTO];

            var DEFAULT_HEIGHT_MODE = IT_HEIGHT_MODE_WINDOW;


            var DEFAULT_COL_MD = 4;
            var MAX_COL_MD = 12;
            var MIN_COL_MD = 1;

            var DEFAULT_ICON_CLASS = 'fa-search';


            var DEFAULT_TOP_POSITION = 'none';
            var TOP_POSITION_MODE_NONE = DEFAULT_TOP_POSITION;

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

            _self.scope.itSidePanelTopPosition = DEFAULT_TOP_POSITION;

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

                    var top = sidePanelContainer[0].getBoundingClientRect().top;

                    //Do not update side panel height property when
                    // Math.abs('top' value of side panel container) is greater than the height of the window
                    if (Math.abs(top) < _self.scope.windowHeight) {

                        var itTopPosition = _self.scope.itSidePanelTopPosition;
                        if (_self.scope.isNoneTopPosition()) {
                            itTopPosition = 0;
                        }

                        var newHeight = (_self.scope.windowHeight - top - itTopPosition);

                        var heightHeader = (newHeight * 0.10);
                        var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                        sidePanelHeader.css('height', heightHeader + 'px');

                        var heightFooter = (newHeight * 0.10);
                        var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                        sidePanelFooter.css('height', heightFooter + 'px');

                        var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                        sidePanelContent.css('height', (newHeight * 0.8) + 'px');

                    }
                }


                if (_self.scope.showPanel) {
                    var newWidth = (_self.scope.windowWidth / 12 * _self.scope.itSidePanelcolMd);
                    _self.scope.sidePanelContainerWidth = newWidth;
                    sidePanelContainer.css('width', newWidth + 'px');
                    //if its the firt time initialise all components width an right
                } else {
                    _self.scope.modifySidePanelCssProperties();
                }

            }, true);

            /**
             * Update Side panel Css properties (right and width)
             */
            _self.scope.modifySidePanelCssProperties = function () {

                var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                var sidePanelButtonRight = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_BUTTON_CLASS);
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

                if (_self.scope.showPanel) {

                    //Reset the right property of Side panel button
                    iconButtonElement.css('right', "");

                    //Do the transition in order to the side panel be visible
                    //Wait few ms to prevent unexpected "iconButtonElement" transition behaviour
                    $timeout(function () {
                        _self.scope.sidePanelContainerRight = 0;
                        sidePanelContainer.css('right', _self.scope.sidePanelContainerRight + 'px');
                    }, 50);


                } else {
                    var newRight = sidePanelContainer.css('width');
                    _self.scope.sidePanelContainerRight = -parseInt(newRight.slice(0, newRight.length - 2));
                    _self.scope.sidePanelButtonRight = _self.scope.sidePanelContainerWidth;

                    sidePanelContainer.css('right', _self.scope.sidePanelContainerRight + 'px');
                    iconButtonElement.css('right', _self.scope.sidePanelButtonRight + 'px');
                }
            };

            _self.scope.setItSidePanelElement = function (element) {
                _self.scope.itSidePanelElement = element;
            };


            /**
             * Set the Side Panel Height Mode from "it-height-mode" attributes
             * @param attrs directive attributes object
             */
            _self.scope.setHeightMode = function (attrs) {
                _self.scope.itHeightMode = attrs.itHeightMode;

                //If attribute is not defined set the default height Mode
                if (_self.scope.itHeightMode === '' || typeof _self.scope.itHeightMode === 'undefined') {
                    _self.scope.itHeightMode = DEFAULT_HEIGHT_MODE;

                } else if (IT_HEIGHT_MODES.indexOf(_self.scope.itHeightMode) != -1) {
                    var index = IT_HEIGHT_MODES.indexOf(_self.scope.itHeightMode);
                    //Get the provided mode
                    _self.scope.itHeightMode = IT_HEIGHT_MODES[index];
                } else {

                    //If height mode is defined but unknown set to the default  height mode
                    _self.scope.itHeightMode = DEFAULT_HEIGHT_MODE;
                    $log.error('"' + HEIGHT_MODE_NAME + '" with value "' + _self.scope.itHeightMode + '"is unknown. ' +
                        'The default value is taken : "' + DEFAULT_HEIGHT_MODE + '"');
                }

                //Set height of header, content and footer
                var sidePanelHeader = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_HEADER_CLASS);
                sidePanelHeader.css('height', '10%');

                var sidePanelFooter = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_FOOTER_CLASS);
                sidePanelFooter.css('height', '10%');

                var sidePanelContent = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTENT_CLASS);
                sidePanelContent.css('height', '80%');


                //Configure height of Side Panel elements depending on the provided height mode
                switch (_self.scope.itHeightMode) {
                    case IT_HEIGHT_MODE_FULL:

                        var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                        var sidePanelContainerHeight = sidePanelContainer.css('height');

                        if (sidePanelContainerHeight > _self.scope.windowHeight) {
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
                        $log.error('Height mode : "' + _self.scope.itHeightMode + '" is unknown.');
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

            _self.scope.setTopPosition = function (attrs) {
                var topPosition = attrs.itTopPosition;
                if (!isNaN(parseInt(topPosition))) {
                    _self.scope.itSidePanelTopPosition = attrs.itTopPosition;
                    var sidePanelContainer = _self.scope.getElementFromClass(_self.scope.itSidePanelElement, IT_SIDE_PANEL_CONTAINER_CLASS);
                    sidePanelContainer.css('top', _self.scope.itSidePanelTopPosition + 'px');

                } else if (!_self.scope.isNoneTopPosition() || typeof topPosition === 'undefined') {

                    _self.scope.itSidePanelTopPosition = TOP_POSITION_MODE_NONE;
                    $log.warn('Attribute "' + TOP_POSITION_NAME + '" of itSidePanel directive is not a number. ' +
                        'The mode taken is "' + TOP_POSITION_MODE_NONE + '"');
                }
            };

            /**
             *
             * @returns {boolean}
             */
            _self.scope.isNoneTopPosition = function () {
                return _self.scope.itSidePanelTopPosition === 'none';
            };
        }
    ]);

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelFooter
 * @module itesoft
 * @restrict E
 * @since 1.0
 * @description
 * A container for a Side Panel footer, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-footer>
 * </it-side-panel-footer>
 */
IteSoft
    .directive('itSidePanelFooter', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require : '^itSidePanel',
            template:
                '<div class="it-side-panel-footer" ng-transclude></div>'
        };
    });


'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itSidePanelHeader
 * @module itesoft
 * @restrict E
 * @since 1.0
 * @description
 * A container for a Side Panel header, sibling to an directive.
 * see {@link itesoft.directive:itSidePanel `<it-side-panel>`}.
 * @usage
 * <it-side-panel-header>
 * </it-side-panel-header>
 */
IteSoft
    .directive('itSidePanelHeader', function () {
        function _link(scope) {

        }

        return {
            scope: false,
            link: _link,
            restrict: 'E',
            transclude: true,
            require : '^itSidePanel',
            template:
                '<div class="it-side-panel-header text-center" ng-transclude></div>'
        };
    });


'use strict';

/**
 * @ngdoc directive
 * @name style2016.directive:loginForm
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
            <div class="container it-login-background ">
             <it-busy-indicator class="row-height-10">
                     <div class="row">
                         <div class="center-block col-xs-6 col-md-4 login-block">
                         <div class="it-login-logo">
                         <br>
                         </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="center-block col-xs-6 col-md-4 login-block">
                         <form class="form-login width-300" role="form" name="formLogin"
                         ng-submit="$ctrl.authService.login(formLogin.username.$viewValue)">
                                 <div class="form-group">
                                 <input class="form-control floating-label it-login-input"
                                 type="text"
                                 name="username"
                                 placeholder="{{'GLOBAL.LOGIN.USER_LABEL' | translate}}"
                                 ng-model="loginData.login"
                                 it-error="message"
                                 autocomplete
                                 required
                                 autofocus>
                                 </div>
                                 <div class="form-group">
                                 <input class="form-control floating-label it-login-input"
                                 type="password"
                                 name="password"
                                 placeholder="{{'GLOBAL.LOGIN.PASSWORD_LABEL' | translate}}"
                                 ng-model="loginData.password"
                                 autocomplete>
                                 </div>
                                 <div class="form-group">
                                 <button class="btn btn-lg btn-success btn-block it-login-button"
                                 type="submit"
                                 name="submit"
                                 translate>GLOBAL.LOGIN.SUBMIT_BUTTON_LABEL
                                 </button>
                                 </div>
                         </form>
                         </div>
                     </div>
                </it-block>
             </it-busy-indicator>
             </div>
     </file>
     <file name="Module.js">
        angular.module('itesoft-showcase',['itesoft'])
     </file>
     <file name="controller.js">
        angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) { }]);
     </file>
 </example>
 */
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
     <div style="background-color:#EEEEEE">
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
             <table ng-controller="HomeCtrl as $ctrl" class="table-condensed-small table-striped col-md-12"> <thead> <tr class="it-header-tab"> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.TASK_NAME' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.DATE' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.CATEGORY' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.INVOICE.CODE' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.DOC_NUMBER' | translate}} </th> <th class="nowrap text-right excel-style-header">{{'TASK.LINES.TABLE.NET_AMOUNT' | translate}} </th> <th class="nowrap text-right excel-style-header">{{'TASK.LINES.TABLE.TOTAL_AMOUNT' | translate}} </th> <th class="nowrap text-left excel-style-header">{{'TASK.LINES.TABLE.SUPPLIER' | translate}} </th> <th class="nowrap text-left excel-style-header"></th> <th class="nowrap text-left excel-style-header"><span class="excel-style-settings"></span></th> </tr> </thead> <tbody class="row-height-10"> <tr ng-repeat="item in $ctrl.invoices" class="it-line" ng-class="{'excel-style-row-selected': $ctrl.selectedLine.id == item.id}" ng-dblclick="$emit('goToCodingForm',{event: $event, invoiceId: $ctrl.selectedLine.invoice.id, attachmentId: $ctrl.selectedLine.attachment.id, taskId: $ctrl.selectedLine.id, taskName: $ctrl.selectedLine.name})"> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-task-name nowrap text-left excel-style-header no-border"> <span class="it-task-invoice-type">{{'TASK.DOCUMENT.TYPE.'+item.invoice.type | translate}}</span>&nbsp;{{$ctrl.taskService.getTranslatedTaskName(item.name)}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-invoice-date nowrap text-left excel-style-header no-border"> {{item.invoice.date | date:'dd/MM/yyyy HH:mm'}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-invoice-category nowrap text-left excel-style-header no-border"> {{'TASK.DOCUMENT.CATEGORY.'+item.invoice.category | translate}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-itesoft-id nowrap text-left excel-style-header no-border"> {{item.invoice.code}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-doc-number nowrap text-left excel-style-header no-border"> {{item.docNumber}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-net-amount nowrap text-right excel-style-header no-border"> {{item.netAmount | currency}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-total-amount nowrap text-right excel-style-header no-border"> {{item.totalAmount | currency}} </div> </td> <td ng-click="$ctrl.updateSelectedLine(item)"> <div class=" it-task-lines-table-supplier-name nowrap text-left excel-style-header no-border"> {{item.supplierName}} </div> </td> <td colspan="2" ng-click=""> <button class="small-btn btn-primary" title="{{'GLOBAL.BUTTON.FOLLOW_REMOVE' | translate}}"> <i class="fa fa-trash"></i> </button> </td> </tr> </tbody> </table>
        </div>
     </div>

 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {
  var self = this; self.selectedLine = {} ; self.invoices = [{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 }, { "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 },{ "id": 18900, "name": "Accounting Code", "invoice": { "id": "184a7026-cb81-4a59-b9b1-43f05cb5f14c", "code": "201607201642271", "date": "2016-02-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "18822"}, "supplierName": "EDF", "docNumber": "FAC1000006", "netAmount": 100000.0, "totalAmount": 118550.0 }, { "id": 20900, "name": "Accounting Code", "invoice": { "id": "184a7026-c231-4a59-b9b1-43f05cb5f14c", "code": "201607201642481", "date": "2017-08-15T00:00:00Z", "type": "INV", "category": "WOPO" }, "owner": null, "attachment": {"id": "19822"}, "supplierName": "PMU", "docNumber": "FAC1000006", "netAmount": 100010.0, "totalAmount": 122050.0 } ]; self.updateSelectedLine = function (item) { self.selectedLine = item; };
  }]) ;
 </file>
 </example>
 */
'use strict';

/**
 * @ngdoc service
 * @name itesoft.service:CurrentErrorsService
 * @module itesoft
 * @since 1.2
 *
 * @description
 * Service that keep reference to error inside tabs
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Function
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasFatal(tabId)
 *      </td>
 *      <td>
 *          Return true if there is a fatal inside tab
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasError(tabId)
 *      </td>
 *      <td>
 *          Return true if there is an error inside tab
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          hasWarning(tabId)
 *      </td>
 *      <td>
 *           Return true if there is a warning inside tab
 *      </td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {
    TabService.onTabChanged(function (selectedTabId) {
              self.isActiveTab = (selectedTabId == self.id);
          });
 }]
 );
 </file>
 </example>
 */

IteSoft.factory('CurrentErrors', [function () {

        function _isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        };

        function _isArrayEmpty(obj) {
            if (!angular.isDefined(obj) || !angular.isArray(obj)) {
                return false;
            }

            return obj.length == 0;
        };

        return {
            //Technical errors
            technicalErrors: [],

            //Error levels
            fatals: {},
            errors: {},
            warnings: {},

            // Errors levels by tabs
            fatalsByTabs: {},
            errorsByTabs: {},
            warningsByTabs: {},

            init: function () {
                this.fatals = {};
                this.errors = {};
                this.warnings = {};
                this.fatalsByTabs = {};
                this.errorsByTabs = {};
                this.warningsByTabs = {};
            },
            hasFatalOrHigher: function () {
                return this.hasFatal() || this.hasTechnical();
            },
            hasTechnical: function () {
                return !_isArrayEmpty(this.technicalErrors);
            },
            hasFatal: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.fatalsByTabs[tab])) {
                        return !_isEmpty(this.fatalsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.fatals);
                }
                return false;
            },
            hasError: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.errorsByTabs[tab])) {
                        return !_isEmpty(this.errorsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.errors);
                }
                return false;
            },
            hasWarning: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.warningsByTabs[tab])) {
                        return !_isEmpty(this.warningsByTabs[tab]);
                    } else {
                        return false;
                    }
                } else {
                    return !_isEmpty(this.warnings);
                }
                return false;
            }
        };
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name it-tab.directive:itTab
 * @module it-tab
 * @since 1.2
 * @restrict E
 *
 *
 * @description
 * Button that represent tab header
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Param
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          label
 *      </td>
 *      <td>
 *          Button Label
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          title
 *      </td>
 *      <td>
 *          Button title
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          id
 *      </td>
 *      <td>
 *          tab identifier (must be the same that tab content id)
 *      </td>
 *  </tr>
 *  </table>
 *  <h1>Exemple</h1>
 *
 *        <it-tab
 *          label="'FEATURE.COMPANY.TITLE'"
 *          id="'validate-header-tab-company'">
 *        </it-tab>
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 <it-tab label="'Company'" title="'COMPANY'"  id="'analyticalCoding-header-tab-company'"></it-tab>
 <it-tab label="'Supplier'" title="'SUPPLIER'" id="'analyticalCoding-header-tab-supplier'"></it-tab>
 <it-tab label="'Invoice'" title="'INVOICE'" id="'analyticalCoding-header-tab-invoice'"></it-tab>
 <it-tab-content id="'analyticalCoding-header-tab-company'" content-url="'app/features/settings/view/company.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-supplier'" content-url="'app/features/settings/view/supplier.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-invoice'" content-url="'app/features/settings/view/invoice.html'"></it-tab-content>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { api.onZoomLevelsChanged = function (zoomLevels) { console.log(zoomLevels); } } }; }]);
 </file>
 </example>
 */
itTab.component('itTab', {
        bindings: {
            id: '=',
            label: '<',
            title: '<'
        },
        template: '<button class="btn header-tab full-width " ng-click="$ctrl.changeTab()"' +
        ' title="{{$ctrl.title |translate}}" ng-disabled="$ctrl.isActiveTab"><i class="fa' +
        ' fa-exclamation-triangle color-danger" aria-hidden="true" ng-if="$ctrl.hasError()"></i> ' +
        '<i class="fa fa-exclamation-triangle color-warning" aria-hidden="true" ng-if="$ctrl.hasWarning()"></i> <span> {{$ctrl.label |translate }} </span> </button>',
    controller
:
['$rootScope',  'CurrentErrors', 'TabService', function ($rootScope, CurrentErrors, TabService) {

    var self = this;
    self.isActiveTab = false;

    self.hasError = _hasError;
    self.hasWarning = _hasWarning;
    self.changeTab = _changeTab;

    self.isActiveTab = (TabService.currentActiveTabId == self.id);
    TabService.onTabChanged(function (selectedTabId) {
        self.isActiveTab = (selectedTabId == self.id);
    });

    function _changeTab() {
        TabService.changeTab(self.id);
    }

    function _hasError() {
        return CurrentErrors.hasError(self.id);
    }

    function _hasWarning() {
        return CurrentErrors.hasWarning(self.id);
    }
}]
})
;
'use strict';

/**
 * @ngdoc directive
 * @name it-tab.directive:itTabContent
 * @module it-tab
 * @since 1.2
 * @restrict E
 *
 * @description
 * Div that represent tab content
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Param
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          view-controller
 *      </td>
 *      <td>
 *          allow to keep a reference to controller view
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          id
 *      </td>
 *      <td>
 *          tab identifier (must be the same that tab id)
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *         content-url
 *      </td>
 *      <td>
 *          Template html url
 *      </td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 <it-tab label="'Company'" id="'analyticalCoding-header-tab-company'"></it-tab>
 <it-tab label="'Supplier'" id="'analyticalCoding-header-tab-supplier'"></it-tab>
 <it-tab label="'Invoice'" id="'analyticalCoding-header-tab-invoice'"></it-tab>
 <it-tab-content id="'analyticalCoding-header-tab-company'" view-controller="$ctrl"  content-url="'app/features/settings/view/company.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-supplier'" view-controller="$ctrl"  content-url="'app/features/settings/view/supplier.html'"></it-tab-content>
 <it-tab-content id="'analyticalCoding-header-tab-invoice'" view-controller="$ctrl"  content-url="'app/features/settings/view/invoice.html'"></it-tab-content>
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {  $scope.options = {showProgressbar: true, showToolbar : true, initialScale : 'fit_height', renderTextLayer : true, libPath : 'http://alizarion.github.io/angular-common/docs/js/dist/assets/lib', onApiLoaded : function (api) { api.onZoomLevelsChanged = function (zoomLevels) { console.log(zoomLevels); } } }; }]);
 </file>
 </example>
 */

itTab.component('itTabContent', {
        restrict: 'E',
        bindings: {
            id: '=',
            contentUrl: '=',
            viewController: '='
        },
        template: '<div ng-show="$ctrl.isActiveTab"' +
        '                class="row-height-10 under-tabs-container bloc-border-left">' +
        '           <div id="{{$ctrl.id}}" class="it-scpas-bloc-content-scrollable it-fill content-tab"' +
        '               ng-include="$ctrl.contentUrl"></div>' +
        '           </div>',
        controller: ['$rootScope', 'TabService',
            function ($rootScope, TabService) {

                var self = this;
                self.isActiveTab = false;

                self.isActiveTab = (TabService.currentActiveTabId == self.id);

                TabService.onTabChanged(function (selectedTabId) {
                    self.isActiveTab = (selectedTabId == self.id);
                });

            }]
    });
'use strict';

/**
 * @ngdoc service
 * @name it-tab.service:TabService
 * @module it-tab
 * @since 1.2
 *
 * @description
 * Service that manage tab link to itTab
 *
 * <h1>Attribute</h1>
 *  <table class="table">
 *  <tr>
 *      <th>
 *          Function
 *      </th>
 *      <th>
 *          Description
 *      </th>
 *  </tr>
 *  <tr>
 *      <td>
 *          changeTab(newTabId)
 *      </td>
 *      <td>
 *          Change current tab to newTabId
 *      </td>
 *  </tr>
 *  <tr>
 *      <td>
 *          onTabChanged
 *      </td>
 *      <td>
 *          CallBack method call when tab changed
 *      </td>
 *  </tr>
 *  </table>
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl" class="row">
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['itesoft'])
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) {
    TabService.onTabChanged(function (selectedTabId) {
              self.isActiveTab = (selectedTabId == self.id);
          });
 }]
 );
 </file>
 </example>
 */

itTab.factory('TabService', [function () {
        var self = this;
        self.tabChangedCallBacks = [];
        self.changeTab = _changeTab;
        self.onTabChanged = _onTabChanged;
        self.currentActiveTabId = "";

        /**
         * Change current active tab
         * @param newTabId
         * @private
         */
        function _changeTab(newTabId) {
            self.currentActiveTabId = newTabId;
            self.tabChangedCallBacks.forEach(function (callBack) {
                if (angular.isDefined(callBack)) {
                    callBack(newTabId);
                }
            })
        }

        /**
         * Register listener changed
         * @param callBack
         * @private
         */
        function _onTabChanged(callBack) {
            self.tabChangedCallBacks.push(callBack)
        }

        return self;
    }]);

/**
 * Created by sza on 22/04/2016.
 */
'use strict';
IteSoft
    .factory('BlockService', ['$resource', 'itConfig',
        function ($resource, itConfig) {
            return {
                custom: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/blocks/custom/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                all: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/blocks/all/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                original: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/blocks/original/:name'),
                customByOriginal: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/original/' + itConfig.get().CURRENT_PACKAGE + '/:name/custom'),
                restore: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/blocks/restore/' + itConfig.get().CURRENT_PACKAGE + '/:name'),
                build: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/packages/build'),
                preview: $resource(
                    itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/packages/preview'),
                'new': function (name, ref, position, content, roleAllowed, version, removed, element) {
                    return {
                        'name': name,
                        'position': position,
                        'ref': ref,
                        'content': content,
                        'role': roleAllowed,
                        'version': version,
                        'removed': removed == "true" ? true : false,
                        'element': element
                    };
                },
            }
        }]);
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlock
 * @module itesoft
 * @restrict EAC
 * @since 1.2
 *
 * @description
 * The Block widgets provides  way to customize UI.
 *
 * <h1>Enable</h1>
 * Enable editMode with
 *
 * ```js
 * $rootScope.editSite
 * ```
 *
 * <h1>Config</h1>
 * ```config
 * REST_TEMPLATE_API_URL = url of template rest api
 * TEMPLATE_EDITOR_URL = template web editor url
 * TEMPLATE_USER_AUTO_LOGIN = login and password to use for autologin {login: "admin", password: "admin"}
 * SKIP_LOGIN = true if you want to skip login
 * CURRENT_PACKAGE = package used to saved modification (ex 10-PS)
 * CURRENT_ROLE = user usrole used to managed block (PS, RD ...)
 * ```
 *
 * ```html
 *   <it-block name="login_input" role="RD"></it-block>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div ng-controller="HomeCtrl">
 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
 <it-block-control-panel></it-block-control-panel>
 <it-block name="zone-coding-lines-actions3" style="margin:10px">
 <it-block name="login_input" role="RD">
 <div class="form-group">
 <input it-input class="form-control floating-label" type="text" it-label="Email" ng-model="user.email"/>
 </div>
 </it-block>
 <it-block name="coding-lines-add3" removed="true">
 <button class="btn btn-primary col-xs-2"
 title="{{'CODING.LINES.BUTTON.ADD' | translate}}"
 ng-click="codingController.addNewLine()">
 <span class="fa fa-plus fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-remove3">
 <button class="btn btn-danger col-xs-2"
 title="{{'CODING.LINES.BUTTON.REMOVE' | translate}}"
 ng-click="codingController.removeNewLine()">
 <span class="fa fa-trash fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-duplicate3">
 <button class="btn btn-primary col-xs-2" disabled="true"
 title="{{'CODING.LINES.BUTTON.DUPLICATE' | translate}}"
 ng-click="codingController.duplicateLine()">
 <span class="fa fa-copy fa-lg"/>
 </button>
 </it-block>
 <it-block name="coding-lines-memorize3" removed="true">
 <button class="btn btn-primary col-xs-2"
 title="{{'CODING.LINES.BUTTON.MEMORIZE' | translate}}"
 ng-click=""
 disabled>
 <span class="fa fa-folder fa-lg"/>
 </button>
 </it-block>
 </it-block>
 <br/>
 <br/>
 <br/>
 <br/>
 <it-block name="zone-grid-example">
 <div id="grid1" ui-grid="gridOptions" class="grid"></div>
 </it-block>
 </div>
 </file>
 <file name="config.json">

 {
       "CONFIG":{
       "REST_TEMPLATE_API_URL": "http://localhost:8082",
       "TEMPLATE_USER_AUTO_LOGIN": {"login": "admin", "password": "admin"},
       "ENABLE_TEMPLATE_EDITOR": true,
       "SKIP_LOGIN" : true,
       "CURRENT_PACKAGE" : "10-PS",
       "CURRENT_ROLE" : "PS",
       "VERSION": "v1"
       }
 }
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase',['itesoft','ngResource']).config(['itConfigProvider', function (itConfigProvider) {
			//configuration of default values
			itConfigProvider.defaultNamespace('CONFIG');
			itConfigProvider.allowOverride(true);
			itConfigProvider.configFile("config.json");
	}]).run(['itConfig', function (itConfig) {
	    //initialize itConfig
        itConfig.initialize();
    }]).controller('HomeCtrl',
 ['$scope','$rootScope','$http','uiGridGroupingConstants',
 function($scope,$rootScope,$http,uiGridGroupingConstants) {
                       $rootScope.editSite = true;
                       $scope.myData = [];
            // sample values
            $scope.myDataInit = [ { "firstName": "Cox", "lastName": "Carney", "company": "Enormo", "employed": true }, { "firstName": "Lorraine", "lastName": "Wise", "company": "Comveyer", "employed": false }, { "firstName": "Nancy", "lastName": "Waters", "company": "Fuelton", "employed": false }];
            angular.copy($scope.myDataInit,$scope.myData);
            $scope.gridOptions = {
                data:$scope.myData,
                useExternalFiltering: true,
                enableFiltering: true,
                onRegisterApi: function(gridApi){
                  $scope.gridApi = gridApi;
                  //quick an dirty example of filter that use it-autocomplete
                  $scope.gridApi.core.on.filterChanged($scope, function(){
                            $scope.myData = [];
                            var filterUse = false;
                              angular.forEach($scope.myDataInit,function(item){
                                    var added = false;
                                    var key = '';
                                    var value = '';
                                    $scope.gridOptions.data = $scope.myData;
                                    $scope.gridOptions.totalItems = $scope.myData.length;
                              })
                            });
                        },
                        columnDefs:[{
                            name: 'firstName',
                            cellClass: 'firstName',
                            cellTemplate:' <div class="ui-grid-cell-contents"> <it-block name="zone-firstName">test</it-block> </div>'
                            },{
                            name: 'lastName',
                            cellClass: 'lastName'
                           }
                        ]
                    };
                    $scope.selectedOption = "Lorraine";
                    }]);
 </file>
 </example>
 */
'use strict';
IteSoft.directive('itBlock', ['$timeout', 'BlockService', function ($timeout, BlockService) {
        return {
            restrict: 'EAC',
            link: function ($scope, element, attrs, ctrl) {
                $scope.$root.$emit("registerBlock", BlockService.new(attrs["name"], attrs["ref"], attrs["position"], element.html(), attrs["role"], attrs["version"], attrs["removed"], element));
            }
        }
    }
    ]
);

'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itBlockControlPanel
 * @module itesoft
 * @restrict E
 * @since 1.2
 *
 * @description
 * The Control Panel Block widgets provides a way to activate it-block edition
 *
 * <h1>Translate</h1>
 * ```config
 * GLOBAL.TEMPLATE.BLOCK.EDIT
 * GLOBAL.TEMPLATE.BLOCK.READONLY
 * GLOBAL.TEMPLATE.BLOCK.DELETE.TITLE
 * GLOBAL.TEMPLATE.BLOCK.DELETE.CONFIRM
 * ```
 *
 * <h1>Config</h1>
 * ```config
 * REST_TEMPLATE_API_URL = template API URL
 * REST_EDITOR_API_URL = editor pilot API URL
 * TEMPLATE_EDITOR_URL = template web editor url
 * ENABLE_TEMPLATE_EDITOR = true if you need to customize your web app
 * ```
 *
 * ```html
 *   <it-block-control-panel ></it-block-control-panel>
 * ```
 *
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">
 <div>
 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
 <it-block-control-panel></it-block-control-panel>
 </div>
 </file>
 <file name="config.json">

 {
       "CONFIG":{
       "REST_TEMPLATE_API_URL": "http://localhost:8082",
       "TEMPLATE_USER_AUTO_LOGIN": {"login": "admin", "password": "admin"},
       "ENABLE_TEMPLATE_EDITOR": true,
       "SKIP_LOGIN" : true,
       "CURRENT_PACKAGE" : "10-PS",
       "CURRENT_ROLE" : "PS",
       "VERSION": "v1"
       }
 }
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase',['itesoft','ngResource']).config(['itConfigProvider', function (itConfigProvider) {
			//configuration of default values
			itConfigProvider.defaultNamespace('CONFIG');
			itConfigProvider.allowOverride(true);
			itConfigProvider.configFile("config.json");
	}]).run(['itConfig', function (itConfig) {
	    //initialize itConfig
        itConfig.initialize();
    }]).controller('HomeCtrl',
 ['$scope','$rootScope',
 function($scope,$rootScope) {$rootScope.editSite=true;}]);
 </file>
 </example>
 */
IteSoft.directive('itBlockControlPanel',
    [
        function () {
            return {
                restrict: 'EA',
                scope: true,
                //language=html
                template: '<div class="block-control-panel col-xs-12" ng-if="itBlockControlPanelController.itConfig.get().ENABLE_TEMPLATE_EDITOR">' +
                '    <div class="col-xs-12"/>' +
                '    <div class="block-lists">        <div class=" btn btn-danger offline-editor" ng-if="!itBlockControlPanelController.editorIsOpen"             aria-label="Left Align">            <span class="fa fa-exclamation" aria-hidden="true"></span>            <a target="_blank" ng-href="{{itConfig.get().TEMPLATE_EDITOR_URL}}">{{\'GLOBAL.TEMPLATE.BLOCK.OPEN_EDITOR\'|                translate}}</a>        </div>' +
                '<div class="row" style="margin-bottom: 10px;">' +
                '        <div ng-if="!itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Press Ctrl                and move your mouse over a block)            </div>' +
                '        <div ng-if="itBlockControlPanelController.focusable" class="col-xs-12 block-control-panel-help">(Release                Ctrl over an element to select it)            </div>' +
                '    </div>' +
                '<div>' +
                '<it-circular-btn ng-if="!$root.editSite" ng-click="itBlockControlPanelController.editSite()">' +
                '   <i class="fa fa-pencil"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="$root.editSite" ng-click="itBlockControlPanelController.viewSite()">' +
                '   <i class="fa fa-eye"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.refresh()">' +
                '   <i class="fa fa-refresh"></i>            ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=false">' +
                '   <i class="fa fa-stop"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="!$root.autoRefreshTemplate" ng-click="$root.autoRefreshTemplate=true">' +
                '   <i class="fa fa-play"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn><a ng-href="{{itBlockControlPanelController.url}}" target="_blank">' +
                '<i class="fa fa-floppy-o"></i>' +
                '</a></it-circular-btn>' +
                '</div>' +
                '<div  ng-repeat="block in itBlockControlPanelController.blocks | orderBy:\'-name\'" ng-mouseover="itBlockControlPanelController.hilightBlock(block)" ng-mouseleave="itBlockControlPanelController.unHilightBlock(block)"' +
                ' class="{{itBlockControlPanelController.getClass(block)}}">' +
                '<div class="block-lists-name">{{block.name}}</div>' +
                '<div class="block-lists-action">' +
                '<it-circular-btn ng-click="itBlockControlPanelController.addBlock(block)">' +
                '   <i class="fa fa-plus "></i> ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-click="itBlockControlPanelController.editBlock(block)">' +
                '   <i class="fa fa-pencil"></i> ' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="block.removed" ng-click="itBlockControlPanelController.restoreBlock(block)">' +
                '   <i class="fa fa-eye"></i>' +
                '</it-circular-btn>' +
                '<it-circular-btn ng-if="!block.removed" ng-click="itBlockControlPanelController.deleteBlock(block)">' +
                '   <i class="fa fa-eye-slash block-btn"></i>' +
                '</it-circular-btn>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

                controllerAs: 'itBlockControlPanelController',
                controller: ['$scope', '$rootScope', '$location', '$log', '$document', '$filter',
                    'BlockService', 'PilotSiteSideService', 'PilotService', 'itConfig', 'itPopup', 'itNotifier',
                    function ($scope, $rootScope, $location, $log, $document, $filter,
                              BlockService, PilotSiteSideService, PilotService, itConfig, itPopup, itNotifier) {
                        var self = this;
                        if (itConfig.get().ENABLE_TEMPLATE_EDITOR) {
                            self.editorIsOpen = false;
                            self.itConfig = itConfig;
                            self.blocks = [];
                            self.availableBlocks = [];
                            self.url = itConfig.get().REST_TEMPLATE_API_URL + '/t4html/rest/export/' + itConfig.get().CURRENT_PACKAGE;
                            this.refresh = function () {
                                BlockService.build.get(function () {
                                    location.reload();
                                }, function (error) {
                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                });
                            };
                            self.interval = 0;

                            /**
                             * Wait WS before calling option
                             * @param response
                             */
                            PilotService.on.open = function (response) {
                                _options();
                            };

                            PilotSiteSideService.on.pong = function (res) {
                                $log.debug("pong");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = true;
                                    _options();
                                })
                            };

                            PilotSiteSideService.on.editorConnect = function (res) {
                                $log.debug("editorConnect");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = true;
                                    _options();
                                })
                            };

                            PilotSiteSideService.on.editorDisconnect = function (res) {
                                $log.debug("editorDisconnect");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = false;
                                })
                            };

                            PilotSiteSideService.on.close = function () {
                                $log.error("websocket api is deconnected, please restart APIs to enable connection");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = false;
                                })
                            };
                            PilotSiteSideService.on.error = function () {
                                $log.error("websocket api is deconnected, please restart APIs to enable connection");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = false;
                                })
                            };
                            PilotSiteSideService.on.transportFailure = function () {
                                $log.error("websocket api is deconnected, please restart APIs to enable connection");
                                $scope.$applyAsync(function () {
                                    self.editorIsOpen = false;
                                })
                            };

                            PilotSiteSideService.on.reload = this.refresh;

                            /*
                             We enable edit mode by default
                             */
                            $rootScope.editSite = true;
                            $rootScope.autoRefreshTemplate = true;

                            /*
                             * Capture du CTRL
                             */
                            $document.bind("keydown", function (event) {
                                if ($rootScope.editSite) {
                                    if (event.keyCode == 17 && !self.focusable) {
                                        $document.find("*").addClass("crosshair");
                                        self.focusable = true;
                                        self.init();
                                    }
                                }
                            });

                            /**
                             *
                             */
                            $document.bind("keyup", function (event) {
                                if ($rootScope.editSite) {
                                    if (event.keyCode == 17 && self.focusable) {
                                        $document.find("*").removeClass("crosshair");
                                        self.focusable = false;
                                    }
                                }
                            });


                            /**
                             * Call by block to register
                             */
                            $rootScope.$on("registerBlock", function (event, block) {
                                self.availableBlocks[block.name] = block;

                                block.element.bind('mouseenter', function (e) {
                                    $scope.$applyAsync(function () {
                                        self.selectBlock(block.name);
                                    });
                                });

                                block.element.bind('mouseleave', function (e) {
                                    $scope.$applyAsync(function () {
                                        self.unSelectBlock(block.name);
                                    });
                                });

                                self.blocks = [];
                                self.clearStyle();
                                self.hilightedBlock = undefined;
                            });

                            /**
                             * Init
                             */
                            self.init = function () {
                                self.blocks = [];
                                self.clearStyle();
                                self.hilightedBlock = undefined;
                            };

                            /*
                             * Catch event send when over block
                             */
                            self.selectBlock = function (blockName) {
                                var block = self.availableBlocks[blockName];
                                if (self.focusable && !self.exists(block)) {
                                    self.blocks.push(block)
                                }
                            };

                            /**
                             * Catch event send when leave block
                             */
                            self.unSelectBlock = function (blockName) {
                                var block = self.availableBlocks[blockName];
                                if (self.focusable && self.exists(block)) {
                                    self.blocks.splice(self.blocks.indexOf(block), 1);
                                }
                            };
                        }

                        /**
                         *
                         */
                        self.editSite = function () {
                            $rootScope.editSite = true;
                            self.clearStyle();
                        };

                        /**
                         *
                         */
                        self.viewSite = function () {
                            $rootScope.editSite = false;
                            self.clearStyle();
                            self.init();
                        };

                        /*
                         Do block edit action
                         */
                        self.editBlock = function (block) {
                            $log.debug("edit block");
                            if (angular.isDefined(block.ref) && block.ref != '') {
                                PilotSiteSideService.fn.editBlock(block, $location.path());

                            } else {
                                var replaceBlock = BlockService.new(itConfig.get().CURRENT_PACKAGE + '_replace' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'replace', block.content, itConfig.get().CURRENT_ROLE, 1);
                                PilotSiteSideService.fn.createBlock(replaceBlock, $location.path());
                            }
                        };

                        /**
                         * Do add block action
                         * @param block
                         */
                        self.addBlock = function (block) {
                            if (angular.isDefined(block.name) && block.name != '') {
                                $log.debug("add block");
                                var addBlock = BlockService.new(itConfig.get().CURRENT_PACKAGE + '_new_' + block.name + "_" + $filter('date')(new Date(), "yyyyMMddHHmmss"), block.name, 'before', '', itConfig.get().CURRENT_ROLE, 1);
                                PilotSiteSideService.fn.createBlock(addBlock, $location.path());
                            }
                        };

                        /**
                         * Do restore block action
                         * @param block
                         */
                        self.restoreBlock = function (block) {
                            $log.debug("restore block");
                            BlockService.restore.get({'name': block.name}, function () {
                                BlockService.build.get(function () {
                                    BlockService.build.get(function () {
                                        if ($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                            content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                            dismissOnTimeout: false
                                        }, error.data.body);
                                    })
                                }, function (error) {

                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                    $log.error("Unable to restore block " + JSON.stringify(block));
                                })
                            })
                        };

                        /**
                         * Do delete block action
                         * @param block
                         */
                        self.deleteBlock = function (block) {
                            $log.debug("delete block");
                            var confirmPopup = itPopup.confirm({
                                title: "{{'GLOBAL.TEMPLATE.BLOCK.DELETE.TITLE' | translate}}",
                                text: "{{'GLOBAL.TEMPLATE.BLOCK.DELETE.CONFIRM' | translate}}",
                                buttons: [

                                    {
                                        text: 'Cancel',
                                        type: '',
                                        onTap: function () {
                                            return false;
                                        }
                                    },
                                    {
                                        text: 'ok',
                                        type: '',
                                        onTap: function () {
                                            return true;
                                        }
                                    }
                                ]
                            });

                            confirmPopup.then(function () {
                                BlockService.all.delete({name: block.name}, function () {
                                    BlockService.build.get(function () {
                                        if ($rootScope.autoRefreshTemplate) {
                                            location.reload();
                                        }
                                    }, function (error) {
                                        itNotifier.notifyError({
                                            content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                            dismissOnTimeout: false
                                        }, error.data.body);
                                    })
                                }, function (error) {
                                    itNotifier.notifyError({
                                        content: $filter('translate')('GLOBAL.TEMPLATE.WS.ERROR'),
                                        dismissOnTimeout: false
                                    }, error.data.body);
                                });
                            }, function () {
                                itNotifier.notifyError({
                                    content: "{{'GLOBAL.TEMPLACE.WS.BLOCK_DELETED_KO' | translate}}"
                                });
                            });
                        };

                        /**
                         * Do hilight block action (means that user click on block name inside control panel)
                         * @param block
                         */
                        self.hilightBlock = function (block) {
                            if (angular.isDefined(block)) {
                                self.hilightedBlock = block;
                                self.clearStyle();
                                self.updateStyle(block.name);
                            }
                        };

                        self.unHilightBlock = function (block) {
                            if (angular.isDefined(block)) {
                                self.hilightedBlock = undefined;
                                self.clearStyle();
                            }
                        };

                        /**
                         * Update background selected style
                         * @param blockName
                         */
                        self.updateStyle = function (blockName) {
                            for (var name in self.availableBlocks) {
                                if (name == blockName) {
                                    self.availableBlocks[name].element.addClass("block-hilight");
                                }
                            }
                        };

                        /**
                         * Init style
                         */
                        self.clearStyle = function () {
                            for (var name in self.availableBlocks) {
                                var element = self.availableBlocks[name].element;

                                if (angular.isDefined(element)) {

                                    element.removeClass("block-removed");
                                    element.removeClass("block-hilight");
                                    element.css('display', '');

                                    if ($rootScope.editSite) {
                                        element.children().attr("disabled", false);
                                    }

                                    if (self.availableBlocks[name].removed) {
                                        if ($rootScope.editSite) {
                                            element.addClass("block-removed");
                                        } else {
                                            element.css('display', 'none');
                                        }
                                    }
                                }
                            }
                        };

                        /**
                         * Return class to use to display block name
                         * @param block
                         * @returns {*}
                         */
                        self.getClass = function (block) {
                            if (self.hilightedBlock && self.hilightedBlock.name == block.name) {
                                return "block-lists-element-hilight";
                            } else {
                                return "";
                            }
                        };

                        /**
                         * Block already exists
                         * @param block
                         * @returns {boolean}
                         */
                        self.exists = function (block) {
                            var find = false;
                            self.blocks.forEach(function (existingBlock) {
                                if (existingBlock.name == block.name) {
                                    find = true;
                                }
                            });
                            return find;
                        };

                        /**
                         * Send option to editor
                         * @private
                         */
                        function _options() {
                            PilotSiteSideService.fn.options({currentPackage: itConfig.get().CURRENT_PACKAGE});
                        }

                    }
                ]
            }
        }
    ]
);

/**
 * Created by stephen on 03/04/2016.
 * Service that pilot editor or web site web socket communication
 */

'use strict';


IteSoft.factory('PilotService', ['$resource', '$log', 'itConfig',
        function ($resource, $log, itConfig) {

            var self = this;

            self.ACTION_EDIT_BLOCK = "editBlock";
            self.ACTION_REMOVE_BLOCK = "removeBlock";
            self.ACTION_CREATE_BLOCK = "createBlock";
            self.ACTION_EDIT_PAGE = "editPage";
            self.ACTION_REMOVE_PAGE = "removePage";
            self.ACTION_CREATE_PAGE = "createPage";
            self.ACTION_PING = "ping";
            self.ACTION_PONG = "pong";
            self.ACTION_DISCONNECT = "disconnect";
            self.ACTION_TIMEOUT = "timeout";
            self.ACTION_CONNECT = "connect";
            self.ACTION_RELOAD = "reload";
            self.ACTION_OPTIONS = "options";
            self.DEST_EDITOR = "editor";
            self.DEST_SITE = "site";
            self.DEST_ALL = "all";

            self.fields = {
                socket: {},
                request: {
                    url: itConfig.get().REST_TEMPLATE_API_URL + "/t4html/editor",
                    contentType: 'application/json',
                    logLevel: 'debug',
                    transport: 'websocket',
                    trackMessageLength: true,
                    reconnectInterval: 5000,
                    enableXDR: true,
                    timeout: 60000
                },
                model: {},
                dest: ""
            };

            self.fn = {
                ping: _ping,
                pong: _pong
            };
            self.on = {
                message: {},
                open: undefined,
                close: undefined,
                reopen: undefined,
                transportFailure: undefined,
                error: undefined
            };

            /**
             *
             * @param response
             */
            self.fields.request.onOpen = function (response) {
                self.fields.model.transport = response.transport;
                self.fields.model.connected = true;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_CONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.open)) {
                    self.on.open();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onClientTimeout = function (response) {
                self.fields.model.connected = false;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_TIMEOUT,
                    params: []
                }));
                setTimeout(function () {
                    self.fields.socket = atmosphere.subscribe(self.fields.request);
                }, self.fields.request.reconnectInterval);
            };

            /**
             *
             * @param response
             */
            self.fields.request.onReopen = function (response) {
                self.fields.model.connected = true;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_CONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.reopen)) {
                    self.on.reopen();
                }
            };

            /**
             * Long polling Failure mode
             * @param errorMsg
             * @param request
             */
            self.fields.request.onTransportFailure = function (errorMsg, request) {
                atmosphere.util.info(errorMsg);
                request.fallbackTransport = 'long-polling';
                if (angular.isDefined(self.on.transportFailure)) {
                    self.on.transportFailure();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onMessage = function (response) {
                self.on.message(response);
            };

            /**
             *
             * @param response
             */
            self.fields.request.onClose = function (response) {
                self.fields.model.connected = false;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_DISCONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.close)) {
                    self.on.close();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onError = function (response) {
                self.fields.model.logged = false;
                if (angular.isDefined(self.on.error)) {
                    self.on.error();
                }
            };

            /**
             *
             * @param request
             * @param response
             */
            self.fields.request.onReconnect = function (request, response) {
                self.fields.model.connected = false;
            };

            /**
             * Used to test connection between editor and website
             * @param dest
             * @private
             */
            function _ping(dest) {
                $log.log("ping " + dest);
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': dest,
                    action: self.ACTION_PING,
                    params: []
                }));
            }

            /**
             * Reply to ping
             * @param dest
             * @private
             */
            function _pong(dest) {
                $log.log("pong " + dest);
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': dest,
                    action: self.ACTION_PONG,
                    params: []
                }));
            }


            if (itConfig.get().ENABLE_TEMPLATE_EDITOR) {
                self.fields.socket = atmosphere.subscribe(self.fields.request);
            }
            return self;
        }
    ]
)
;

/**
 * Created by stephen on 03/04/2016.
 * Service that pilot web site to editor communication
 */

'use strict';

IteSoft.factory('PilotSiteSideService', ['$resource', '$log', 'itConfig', 'PilotService',
    function ($resource, $log, itConfig, PilotService) {

        var self = this;

        self.fields = {};

        self.fn = {
            editBlock: _editBlock,
            removeBlock: _removeBlock,
            createBlock: _createBlock,
            editPage: _editPage,
            removePage: _removePage,
            createPage: _createPage,
            options: _options,
            ping: PilotService.fn.ping
        };

        self.on = {
            reload: undefined,
            pong: undefined,
            editorConnect: undefined,
            editorDisconnect: undefined,
            close: undefined,
            reopen: undefined,
            transportFailure: undefined,
            error: undefined
        };


        if (itConfig.get().ENABLE_TEMPLATE_EDITOR) {
            PilotService.fields.dest = PilotService.DEST_EDITOR;

            // test connection with editor when websocket is open
            PilotService.on.open = function (response) {
                $log.log("WebSocket connection is opened");
                self.fn.ping(PilotService.DEST_EDITOR);
            };

            PilotService.on.reopen = function (response) {
                $log.log("WebSocket connection is reopened");
                self.fn.ping(PilotService.DEST_EDITOR);
            };

            PilotService.on.close = function () {
                if (angular.isDefined(self.on.close)) {
                    self.on.close();
                }
            };
            PilotService.on.error = function () {
                if (angular.isDefined(self.on.error)) {
                    self.on.error();
                }
            };
            PilotService.on.transportFailure = function () {
                if (angular.isDefined(self.on.transportFailure)) {
                    self.on.transportFailure();
                }
            };

            /**
             * Call when message on websocket
             * @param response
             */
            PilotService.on.message = function (response) {
                var responseText = response.responseBody;
                try {
                    var message = atmosphere.util.parseJSON(responseText);

                    if (message.dest == PilotService.DEST_ALL) {
                        switch (message.action) {
                            case PilotService.ACTION_CONNECT:
                                $log.log(PilotService.ACTION_CONNECT);
                                if (angular.isDefined(self.on.editorConnect)) {
                                    self.on.editorConnect();
                                }
                                break;
                            case PilotService.ACTION_DISCONNECT:
                                $log.log(PilotService.ACTION_DISCONNECT);
                                if (angular.isDefined(self.on.editorDisconnect)) {
                                    self.on.editorDisconnect();
                                }
                                break;
                        }
                    }
                    if (message.dest == PilotService.DEST_SITE) {
                        switch (message.action) {
                            case PilotService.ACTION_RELOAD:
                                $log.log(PilotService.ACTION_RELOAD);
                                if (angular.isDefined(self.on.reload)) {
                                    self.on.reload();
                                }
                                break;
                            case PilotService.ACTION_PING:
                                $log.log(PilotService.ACTION_PING);
                                PilotService.pong(PilotService.DEST_EDITOR);
                                break;
                            case PilotService.ACTION_PONG:
                                $log.log(PilotService.ACTION_PONG);
                                if (angular.isDefined(self.on.pong)) {
                                    self.on.pong();
                                }
                                break;
                            case PilotService.ACTION_PONG:
                                $log.log(PilotService.ACTION_PONG);
                                if (angular.isDefined(self.on.pong)) {
                                    self.on.pong();
                                }
                                break;
                            case PilotService.ACTION_DISCONNECT:
                                $log.log(PilotService.ACTION_DISCONNECT);
                                if (angular.isDefined(self.on.editorDisconnect)) {
                                    self.on.editorDisconnect();
                                }
                                break;
                            case PilotService.ACTION_CONNECT:
                                $log.log(PilotService.ACTION_CONNECT);
                                if (angular.isDefined(self.on.editorConnect)) {
                                    self.on.editorConnect();
                                }
                                break;
                        }
                    }
                } catch (e) {
                    $log.error("Error parsing JSON: ", responseText);
                    throw e;
                }
            };
        }

        /**
         * Call when click on edit block
         * @param block
         * @param path
         * @private
         */
        function _editBlock(block, path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_EDIT_BLOCK,
                params: [{'block': block, 'path': path}]
            }));
        }

        /**
         * Call when click on remove block
         * @param block
         * @param path
         * @private
         */
        function _removeBlock(block, path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_REMOVE_BLOCK,
                params: [{'block': block, 'path': path}]
            }));
        }

        /**
         * Call when click on create block
         * @param block
         * @param path
         * @private
         */
        function _createBlock(block, path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_CREATE_BLOCK,
                params: [{'block': block, 'path': path}]
            }));
        }

        /**
         * Call when click on edit page
         * @param page
         * @private
         */
        function _editPage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_EDIT_PAGE,
                params: [{'page': page}]
            }));
        }

        /**
         * Call when click on remove page
         * @param page
         * @private
         */
        function _removePage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_REMOVE_PAGE,
                params: [{'page': page}]
            }));
        }

        /**
         * Call when click on create page
         * @param page
         * @private
         */
        function _createPage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_CREATE_PAGE,
                params: [{'page': page}]
            }));
        }

        function _options(options) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_OPTIONS,
                params: [{'options': options}]
            }));
        }

        return self;
    }
]);

'use strict';

IteSoft
    .directive('itFillHeight', ['$window', '$document', function($window, $document) {
        return {
            restrict: 'A',
            scope: {
                footerElementId: '@',
                additionalPadding: '@'
            },
            link: function (scope, element, attrs) {

                angular.element($window).on('resize', onWindowResize);

                onWindowResize();

                function onWindowResize() {
                    var footerElement = angular.element($document[0].getElementById(scope.footerElementId));
                    var footerElementHeight;

                    if (footerElement.length === 1) {
                        footerElementHeight = footerElement[0].offsetHeight
                            + getTopMarginAndBorderHeight(footerElement)
                            + getBottomMarginAndBorderHeight(footerElement);
                    } else {
                        footerElementHeight = 0;
                    }

                    var elementOffsetTop = element[0].offsetTop;
                    var elementBottomMarginAndBorderHeight = getBottomMarginAndBorderHeight(element);

                    var additionalPadding = scope.additionalPadding || 0;

                    var elementHeight = $window.innerHeight
                        - elementOffsetTop
                        - elementBottomMarginAndBorderHeight
                        - footerElementHeight
                        - additionalPadding;

                    element.css('height', elementHeight + 'px');
                }

                function getTopMarginAndBorderHeight(element) {
                    var footerTopMarginHeight = getCssNumeric(element, 'margin-top');
                    var footerTopBorderHeight = getCssNumeric(element, 'border-top-width');
                    return footerTopMarginHeight + footerTopBorderHeight;
                }

                function getBottomMarginAndBorderHeight(element) {
                    var footerBottomMarginHeight = getCssNumeric(element, 'margin-bottom');
                    var footerBottomBorderHeight = getCssNumeric(element, 'border-bottom-width');
                    return footerBottomMarginHeight + footerBottomBorderHeight;
                }

                function getCssNumeric(element, propertyName) {
                    return parseInt(element.css(propertyName), 10) || 0;
                }
            }
        };

    }]);


/**
 * Created by vco on 20/06/2016.
 */
'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itPanelForm
 * @module itesoft
 * @restrict E
 * @since 1.2
 * @description
 * The itPanelForm provides dynamic content panel in a form embedded.
 *
 *
 * ```html
 *    <it-panel-form option="option" ></it-panel-form>
 * ```
 *
 *
 * @example
 <example module="itesoft">
 <file name="index.html">
 <style>
 </style>
 <div ng-controller="HomeCtrl" >
 <it-panel-form options="options" date-format="dd/MM/yyyy" update-label="Mettre à jours" update="updateValue(options)" cancel-label="Annuler" cancel="cancel()"></it-panel-form>
 </div>
 </file>
 <file name="controller.js">
 angular.module('itesoft')
 .controller('HomeCtrl',['$scope', '$templateCache', function ($scope,$templateCache) {
        $scope.query = "";
        // require to link directive with scope
        $scope.options = [
          {"title":"label", "code": "codeLabel", "value":"valueLabel", "type":"label"},
          {"title":"titleInput1", "code": "codeInput1", "value":"valueInput1", "type":"input"},
          {"title":"titleInput2", "code": "codeInput2", "value":"valueInput2", "type":"input"},
          {"title":"titleSelect1", "code": "codeSelect1", "items":
             [{"code": "code1", "value": "value1"},
             {"code": "code2", "value": "value2"}], value:"code1",
          "type":"select"},
          {"title":"titleCheckBox", "code": "codeCheckBox", "value":"true", "type":"checkbox"},
          {"title":"titleTextArea", "code": "codeTextArea", "value":"Bonjour ziouee eirufh ieur ieurhf eriufb ieru ",
          "type":"textarea"},
          {"title":"titleDate", "code": "codeDate", "value":"2016-07-25T08:19:09.069Z", "type":"date"},
          {"title":"titleInput2", "code": "codeInput2", "value":"valueInput2", "type":"input"},
        ];
    }
 ]
 );
 </file>
 </example>
 */
IteSoft.component('itPanelForm', {
        bindings:{
            options:'=',
            dateFormat:'@',
            updateLabel:'@',
            update: '&',
            cancel: '&',
            cancelLabel:'@'
        },
    template:'<div class="it-ac-panel-form">' +
    '<form name="$ctrl.form" novalidate>'+
    '<div ng-repeat="option in $ctrl.options">' +
    '<div class="row panelFormRow">' +
    '<div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} :</label></div>' +
    '<div ng-switch on="option.type">'+
    '<div ng-switch-when="label" class="col-xs-3 col-md-4 col-lg-6 "><div ng-include=" \'labelTemplate.html\' "></div></div>'+
    '<div ng-switch-when="input" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'inputTemplate.html\' "></div></div>'+
    '<div ng-switch-when="select" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'selectTemplate.html\' "></div></div>'+
    '<div ng-switch-when="date" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'dateTemplate.html\' "></div></div>'+
    '<div ng-switch-when="checkbox" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'checkBoxTemplate.html\' "></div></div>'+
    '<div ng-switch-when="textarea" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'textAreaTemplate.html\' "></div></div>'+
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-xs-3 col-md-3 col-lg-5"></div><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<button type="submit" ng-click="$ctrl.update({message:options})" class="btn btn-primary">{{$ctrl.updateLabel}}</button>' +
    '<button type="submit" ng-click="$ctrl.cancel()" class="btn btn-primary">{{$ctrl.cancelLabel}}</button></div></form>'+
    '</div>'+
    '<!------------------- Template label ------------------->'+
    '<script type="text/ng-template" id="labelTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p>{{option.value}}</p></div>'+
    '</script>'+
    '<!------------------- Template input ------------------->'+
    '<script type="text/ng-template" id="inputTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p><input it-input class="form-control floating-label" type="text" ng-model="option[\'value\']" name="input" it-label=""></p></div>'+
    '</script>'+
    '<!------------------- Template select ------------------->'+
    '<script type="text/ng-template" id="selectTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p><select name="repeatSelect" id="repeatSelect" ng-model="option.value"' +
    ' ng-options="value.value for value in option.items"/>' +
    '</select></p></div> '+
    '</script>'+
    '<!------------------- Template checkbox ------------------->'+
    '<script type="text/ng-template" id="checkBoxTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p><input type="checkbox" ng-model="option[\'value\']" ng-true-value="\'true\'" ng-false-value="\'false\'"><br></p>'+
    '</script>' +
    '<!------------------- Template textArea ------------------->'+
    '<script type="text/ng-template" id="textAreaTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p><textarea ng-model="option[\'value\']" name="textArea"></textarea></p></div>'+
    '</script>'+
    '<!------------------- Template date Input format yyyy-mm-dd ------------------->'+
    '<script type="text/ng-template" id="dateTemplate.html"><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<p><input type="text" class="form-control" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
    'ng-model="option[\'value\']" data-autoclose="1" ' +
    'name="date" data-date-format="{{$ctrl.dateFormat}}" bs-datepicker></p></div>'+
    '</script>',
        controller: ['$scope', function($scope){

            var self = this;


        if (self.dateFormat == undefined) {
            self.dateFormat = "dd/MM/yyyy";
        }

        if (self.updateLabel == undefined) {
            self.updateLabel = "Update";
        }

            if(self.cancelLabel == undefined){
                self.cancelLabel = "Cancel";
            }


    }]

});
'use strict';

IteSoft
    .directive('itViewMasterHeader',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template :  '<div class="row">' +
                            '<div class="col-md-6">' +
                                '<div class="btn-toolbar" ng-transclude>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md-6 pull-right">' +
                                '<div>' +
            '<form>' +
            '<div class="form-group has-feedback">' +
            '<span class="glyphicon glyphicon-search form-control-feedback"></span>' +
            '<input it-input class="form-control" type="text" placeholder="Rechercher"/>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>'
        }
    });

'use strict';

IteSoft
    .directive('itViewPanel',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template : '<div class="jumbotron" ng-transclude></div>'
        }
    });

'use strict';

IteSoft
    .directive('itViewTitle',function(){
        return {
            restrict: 'E',
            transclude : true,
            scope:true,
            template : '<div class="row"><div class="col-xs-12"><h3 ng-transclude></h3><hr></div></div>'
        }
    });

'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itConfig
 * @module itesoft
 * @since 1.2
 * @requires $location
 *
 * @description
 * This is a configuration provider. It load a json file and let you inject everywhere, you can also override
 * each properties of the configuration through url parameters.
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td><code>configFile</code></td>
 *     <td>app/config/config.json</td>
 *     <td>Allows to override the default url to get JSON configuration object</td>
 * </tr>
 * <tr>
 *     <td><code>defaultNamespace</code></td>
 *     <td>''</td>
 *     <td>Set the default namespace of the configuration file when you use get() function</td>
 * </tr>
 * <tr>
 *     <td><code>allowOverride</code></td>
 *     <td>false</td>
 *     <td>Allows to use URL parameters to override JSON configuration peroperties in URL ?key=value&key=value</td>
 * </tr>
 * </table>
 *
 *
 *
 * @example
 <example module="itesoft">
 <file name="Controller.js">
 angular.module('itesoft').config(['itConfigProvider', function (itConfigProvider) {
			//configuration of default values
			itConfigProvider.defaultNamespace('CaptureOmnicanal');
			itConfigProvider.allowOverride(true);
			itConfigProvider.configFile("config.json");
	}]).controller('Mycontroller',['$scope','itConfig', function($scope, itConfig) {
			$scope.config=itConfig;
	}]);
 </file>
 <file name="index.html">
 <!-- CSS adaptation of ngToast for example purposes. Do not do this in production-->
 <div ng-controller="Mycontroller">
 <p>All properties : {{config.get() | json}}</p>
 <p>Other namespace properties : {{config.get('common') | json}}</p>
 <p>One propertie : {{config.get().baseUrl}}</p>
 </div>
 </file>
 <file name="config.json">
 {
     "CaptureOmnicanal" : {
         "baseUrl":"http://test/base"
     },
     "common": {
         "debug":true
     }
 }
 </file>
 </example>
 **/
IteSoft.provider('itConfig', [function itConfigProvider() {
    var allowOverride = false;
    var configFile = 'app/config/config.json';
    var defaultNamespace = null;
    var overrideConfig = undefined;
    var isLoaded = false;
    var baseConfig = undefined;

    this.allowOverride = function (value) {
        allowOverride = value;
    };

    this.configFile = function (value) {
        configFile = value;
    };

    this.defaultNamespace = function (value) {
        defaultNamespace = value;
    };

    this.get = function () {
        if (!isLoaded) {
            return _load(overrideConfig);
        } else {
            return baseConfig[defaultNamespace];
        }
    };

    /**
     * Return query parameter without $location.search
     * @returns {*|{}}
     * @private
     */
    function _getRequestParam() {
        var queryPart = location.search;
        if(queryPart == ""){
            queryPart = location.hash;
        }
        var search = queryPart
            .split(/[&||?]/)
            .filter(function (x) { return x.indexOf("=") > -1; })
            .map(function (x) { return x.split(/=/); })
            .map(function (x) {
                x[1] = x[1].replace(/\+/g, " ");
                return x;
            })
            .map(function (x) {
                if (x[1] == "true") {
                    x[1] = true;
                    return x;
                } else if (x[1] == "false") {
                    x[1] = false;
                    return x;
                } else {
                    return x;
                }
            })
            .reduce(function (acc, current) {
                acc[current[0]] = current[1];
                return acc;
            }, {});
        return search;
    };

    function _load(overrideConfig) {
        var defaultConfig = {};
        if (baseConfig == undefined) {
            overrideConfig = _getRequestParam();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    baseConfig = JSON.parse(xhttp.responseText);
                    isLoaded = true;
                    if (allowOverride) {
                        if ((defaultNamespace != undefined) && (defaultNamespace != null)) {
                            defaultConfig = baseConfig[defaultNamespace];
                            for (var propertyName in defaultConfig) {
                                if (typeof overrideConfig !== 'undefined' && typeof overrideConfig[propertyName] !== 'undefined') {
                                    defaultConfig[propertyName] = overrideConfig[propertyName];
                                }
                            }
                        }
                    }
                    isLoaded = true;
                }
            };
            xhttp.open("GET", configFile, false);
            xhttp.send();
        }
        return defaultConfig;
    }

    this.$get = ['$location', function itConfigFactory($location) {

        var self = this;
        return {
            get: function (namespace) {

                if (!isLoaded) {
                    _load(overrideConfig);
                }

                if ((namespace != null) && (namespace != undefined)) {
                    return baseConfig[namespace];
                } else {
                    if (defaultNamespace != null) {
                        return baseConfig[defaultNamespace];
                    } else {
                        return baseConfig;
                    }
                }
            }
        };
    }];
}]);


'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itLanguageChangeHandler
 * @module itesoft
 * @since 1.2
 * @requires localStorageService
 * @requires itPopup
 *
 * @description
 * itLanguageChangeHandlerProvider modifies the current language to a new language. Features:
 * <br/>1) Asks confirmation (optional) before changing the language;
 * <br/>2) Stores the new culture setting either in the browser's local storage ["local"] (default),  or as a query string parameter ["query"]
 * <br/>3) Allows the consuming service to receive returned results by a callback method.
 * <br/>
 * <table class="table">
 *  <tr>
 *   <td><code>itLanguageChangeHandler.changeLanguage(lang, [scope, callback])</code></td>
 *   <td>Method to change the current language.
 *    <br/>lang (required). The new language culture, e.g. "en_GB".
 *    <br/>scope (optional). The current scope.
 *    <br/>callback (optional). The callback function.
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getConfig()</code></td>
 *   <td>Method to get the current configuration options.
 *   <br />storage: local (default value) for localStorage or query for url query parameter
 *   <br />displayConfirm: Whether or not to display a confirmation popup. True by default.
 *   <br />onChangePopup:
 *   <br />title: title of popup confirmation
 *   <br />text: text of popup confirmation
 *   <br />buttonCancelLabel: label text for the cancel button
 *   <br />buttonOkLabel: label text for the ok button
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getCurrentLanguage()</code></td>
 *   <td>Method to get the current language.</td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getDefaultLocale(lang)</code></td>
 *   <td>Method to get the default locale from an optional language code.
 *    <br/>lang (optional). The language code, e.g. "en".
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getLanguageCode(locale)</code></td>
 *   <td>Method to get the language code from an optional locale.
 *    <br/>locale (optional). The locale, e.g. "en_GB".
 *   </td>
 *  </tr>
 * </table>
 *
 * @example
 <example module="itesoft">

 <file name="Controller.js">
    angular.module('itesoft')
        .config(['itLanguageChangeHandlerProvider','localStorageServiceProvider', function (itLanguageChangeHandlerProvider, localStorageServiceProvider) {
                    // example for storage option configuration value
                    itLanguageChangeHandlerProvider.options.storage = "local";
                     
                    localStorageServiceProvider.setPrefix('itesoft');

                }])
        .controller('MainController',['$translate', '$scope','itLanguageChangeHandler', function($translate, $scope,itLanguageChangeHandler) {
            $scope.initialLanguage = itLanguageChangeHandler.getCurrentLanguage();

            // new language setting returned by a callback function.
            var languageChanged = function(data){
              $scope.currentLanguage = data.currentLanguage;
            };
        
            $scope.changeLanguage = function(){
              if($scope.locale) {
                
                // new language setting returned by a promise.
                itLanguageChangeHandler.changeLanguage($scope.locale, languageChanged);
              }
            }
        }]);
 </file>
 <file name="index.html">
 <div ng-controller="MainController">
    <br /> Set language: <input type="text" ng-model="locale" /> 
    <button class="btn btn-warning" ng-click="changeLanguage()">change language</button>

    <br /> Storage type: {{itLanguageChangeHandler.getConfig().storage}}
    <br /> Initial language: {{initialLanguage}}
    <br /> Updated current language: {{currentLanguage}}
</div>
 </file>
 </example>
 */
angular.module('itesoft.language',['itesoft.popup','LocalStorageModule'])
    .provider('itLanguageChangeHandler', function () {
    var self = this;
    this.options = {
        storage: 'local', //local for localStorage or query for url query parameter
        displayConfirm: true,// true | false
        onChangePopup: {
            title: "Confirm language change",
            text: "By modifying the language any recent changes may be lost. Continue?",
            buttonCancelLabel: 'NO',
            buttonOkLabel: 'YES'
        }
    };

    this.$get = ['$rootScope', '$translate', '$location', '$q', 'localStorageService', 'itPopup', function ($rootScope, $translate, $location, $q, localStorageService, itPopup) {
        return {
            translate: $translate,
            getConfig: function () {
                return self.options;
            },
            changeLanguage: function (lang, scope, callback) {
                var data = {
                    currentLanguage:
                        this.getCurrentLanguage()
                };
                if (self.options.displayConfirm) {
                    var confirmPopup = itPopup.confirm({
                        title: self.options.onChangePopup.title,
                        text: self.options.onChangePopup.text,
                        cancelText: self.options.onChangePopup.buttonCancelLabel,
                        okText: self.options.onChangePopup.buttonOkLabel
                    });
                    (function (data) {
                        var locale = data;
                        confirmPopup.then(function (res) {

                            if (self.options.storage === 'query') {

                                try {
                                    $location.search('Locale', lang);
                                } catch (e) {
                                    reject("Error setting query parameter, lang, to locale value: " + lang + " Error: " + e.message);
                                }
                            }
                            else {
                                // Save to local storage
                                try {
                                    localStorageService.set('Locale', lang);
                                } catch (e) {
                                    reject("Error setting local storage parameter, lang, to locale value: " + lang + " Error: " + e.message);
                                }
                            }

                            // Change language to chosen language.
                            if (scope) {
                                scope.currentLanguage = lang;
                                if (scope.user) {
                                    scope.user.language = $translate.use();
                                }
                            }

                            data = {
                                currentLanguage: lang,
                            };

                            if (callback) {
                                callback(data);
                            }

                            //Reload de la page
                            $rootScope.$applyAsync(function () {
                                location.reload();
                            });

                        }, function () {
                            $translate.use(locale.currentLanguage);
                        });
                    })(data);
                }
                return;
            },
            getCurrentLanguage: function () {
                if (self.options.storage === 'query') {
                    if ($location.search().Locale) {
                        return $location.search().Locale.replace(/-/g, '_');
                    } 
                    else {
                        return this.getDefaultLocale(this.translate.use());
                    }
                }
                else {
                    // load from local storage
                    return localStorageService.get('Locale') || this.getDefaultLocale(this.translate.use());
                }
            },
            getDefaultLocale: function (lang) {
                if (!lang) {
                    lang = $translate.preferredLanguage();
                }

                switch (lang) {
                    case "en":
                        return "en_GB";
                    case "de":
                        return "de_DE";
                    default:
                    case "fr":
                        return "fr_FR";
                }
            },
            getLanguageCode: function (locale) {
                switch (locale) {
                    case "en_GB":
                    case "en-GB":
                    case "en_US":
                    case "en-US":
                        return "en";
                    case "de_DE":
                    case "de-DE":
                        return "de";
                    default:
                    case "fr_FR":
                    case "fr-FR":
                    case "fr_CA":
                    case "fr-CA":
                        return "fr";
                }
            }
        }
    }];
});

'use strict';

/**
 * @ngdoc service
 * @name itesoft.service:itMessaging
 * @module itesoft
 * @since 1.2
 * @requires $websocket
 * @requires $log
 * @requires $q
 *
 * @description
 * Service that provide all functions to connect and  dialog with itesoft-messaging system.
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 *
 * <tr>
 *     <td><code>ItMessagingProvider.SERVICE_URL = 'Your itesoft-messaging URL';</code></td>
 *     <td>''</td>
 *     <td>angular.module('myModule')<br>.config(['ItMessagingProvider', function(ItMessagingProvider) {<br>
 *      ItMessagingProvider.SERVICE_URL = 'tstbuydpoc01:3333/itesoft-messaging';
 *      <br>
 *  }])</td>
 * </tr>
 * <tr>
 *     <td><code>Message json format</code></td>
 *     <td>''</td>
 *     <td><div tabindex="-1" class="json"><span class="sBrace structure-1" id="s-1">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-2">"data"</span><span class="sColon" id="s-3">:</span><span class="sBrace structure-2" id="s-4">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-5">"youBusinessKey"</span><span class="sColon" id="s-6">:</span><span class="sObjectV" id="s-7">"some&nbsp;business&nbsp;data"</span><span class="sComma" id="s-8">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-9">"youBusinessKey2"</span><span class="sColon" id="s-10">:</span><span class="sObjectV" id="s-11">"other&nbsp;business&nbsp;data"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBrace structure-2" id="s-12">}</span><span class="sComma" id="s-13">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-14">"creationDate"</span><span class="sColon" id="s-15">:</span><span class="sObjectV" id="s-16">"2016-05-31T15:15:14.436+0000"</span><span class="sComma" id="s-17">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-18">"from"</span><span class="sColon" id="s-19">:</span><span class="sObjectV" id="s-20">"senderID"</span><span class="sComma" id="s-21">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-22">"notification"</span><span class="sColon" id="s-23">:</span><span class="sBrace structure-2" id="s-24">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-25">"title"</span><span class="sColon" id="s-26">:</span><span class="sObjectV" id="s-27">"notification&nbsp;title&nbsp;"</span><span class="sComma" id="s-28">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-29">"body"</span><span class="sColon" id="s-30">:</span><span class="sObjectV" id="s-31">"notification&nbsp;body"</span><span class="sComma" id="s-32">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-33">"icon"</span><span class="sColon" id="s-34">:</span><span class="sObjectV" id="s-35">"some-icon-to-render"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBrace structure-2" id="s-36">}</span><span class="sComma" id="s-37">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-38">"to"</span><span class="sColon" id="s-39">:</span><span class="sBracket structure-2" id="s-40">[ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sArrayV" id="s-41">"/topic/topicGroup:topicName"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBracket structure-2" id="s-42">]</span><br><span class="sBrace structure-1" id="s-43">}</span></div></td>
 * </tr>
 * <tr>
 *  <td>service constructor  var itmsg = new ItMessaging(BASE_URL);</td>
 *  <td>''</th>
 *  <td>new ItMessaging(BASE_URL), BASE_URL of your itesoft-messaging backend service without protocol ex: localhost:8080/itesoft-messaging </td>
 * </tr>
 * <tr>
 *     <td> itmsg.connect(token);</td>
 *     <td>''</td>
 *     <td>to establish a websocket connexion with itesoft-messaging service, using the token that have returned by your backend using his api key </td>
 * </tr>
 * <tr>
 *     <td>itmsg.subscribeToTopic('/topic/'+topicName,observers)</td>
 *     <td>''</td>
 *     <td>return promise, method to subscribe some users(observers) to topic ,<br>
 *         if topic does not exist, it will be automatically created<br>
 *         if you try to subscribe observers to topic which has been created by a backend system(using api key not with token) you will get and error.<br>
 *         commonly if your topic is conversation between observer, use the "/topic/conversation:" key to start naming it.
 *      </td>
 * </tr>
 * <tr>
 *     <td>itmsg.unSubscribeToTopic('/topic/'+topicName,observers)</td>
 *     <td>''</td>
 *     <td>return promise, method to unsubscribe some users(observers) from topic ,<br>
 *         if you try to unsubscribe observers to topic which has been created by a backend system(using api key not with token) you will get and error.<br>
 *         observers that has been registred to topic using api key, can be unregistred using api key not a token.
 *      </td>
 * </tr>
 * <tr>
 *     <td>itmsg.onClose(callbackFunction(event)</td>
 *     <td>''</td>
 *     <td>
 *         callback function will be triggered where websocket connexion is interupted.
 *      </td>
 * </tr>
 *
 * <tr>
 *     <td>itmsg.onMessage(callbackFunction(message,topics)</td>
 *     <td>''</td>
 *     <td>
 *        callback function is triggered when message arrive, they will pass 3 arguments, message that has been received <br>
 *        and topics, that represent list of the topics that the user have subscribe.
 *      </td>
 * </tr>
 *
 * </table>
 *
 * @example
    <example module="itesoft">

         <file name="Controller.js">
             var BASE_URL = 'tstbuydpoc01:3333/itesoft-messaging';
             var API_KEY = 'fbd0ca6b-e3e4-47e3-952a-c0e7630f9932';
                function Message(messageText){
                          this.to = [];
                          this.data =  {
                            "message" : messageText
                          };
                          this.notification = {
                            title: self.username + ' sent you a message',
                            body : self.username + ' sent you a message',
                            icon : 'comment-o'
                       }
                    }

                     angular.module('itesoft')
                     .config(['ItMessagingProvider', function(ItMessagingProvider) {
                            ItMessagingProvider.SERVICE_URL = BASE_URL;
                       }])
                     .filter('conversation',[ function() {
                      return function(input,args) {
                        var result ='';
                        var stringResult = '';
                        if(input.startsWith('conversation:')){
                          input = input.replace('conversation:','');
                          input = input.replace(args+':','');
                            input = input.replace(args,'');
                          result =  input.split(':');
                          angular.forEach(result,function(entry){
                              stringResult = stringResult + ' ' +entry;
                          })
                          return stringResult;
                        }

                        return input;
                      };
                      }])

                     .filter('topic',[ function() {
                          return function(input,arge) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                    if(entry.reference.startsWith('conversation:')){
                                      result.push(entry);
                                    }

                              });

                              return result;
                            }
                            return input;
                          };
                      }])

                     .filter('group',[ function() {
                          return function(input,groups) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                  angular.forEach(entry.to ,function(dest){
                                    angular.forEach(groups,function(group){
                                       if(dest.startsWith(group + ':')){
                                      result.push(entry);
                                    }
                                    })

                                  })
                              });
                              return result;
                            }
                            return input;

                          };
                      }])
                     .filter('recipient',[ function() {
                          return function(input,arge) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                  angular.forEach(entry.to, function(entry2){
                                    if(entry2.startsWith(arge+':')){
                                      result.push(entry);
                                    }

                              });
                             });
                              return result;
                            }
                            return input;
                          };
                      }])
                     .controller('MainController',['ItMessaging','itNotifier','$scope','FakeNotifierService',
                     function(ItMessaging,itNotifier,$scope,FakeNotifierService){

                        var self = this;

                        self.BASE_URL = BASE_URL;
                        self.SHOWCASE_TOPIC = "group:all";
                        self.INVOICES_TOPIC = "invoices:xxxxxx"
                        self.API_KEY = API_KEY;
                        var itmsg = new ItMessaging(self.BASE_URL);

                        self.messages = [];
                        self.topics = [];
                        self.selectedTopic = null;
                        self.username = null;

                        self.isConnected = false;
                        self.username = null;

                        itmsg.onMessage(function(message,topics){
                          self.topics = topics;
                          self.messages.push(message);

                          _scrollToBottom();
                        });

                        itmsg.onClose(function(event){
                           itNotifier.notifyError({
                                      content: "Error popup",
                                      dismissOnTimeout: false
                                  },
                                  {
                                      CODE:500,
                                      TYPE:'error',
                                      MESSAGE:'Something bad happened',
                                      DETAIL:'You don\'t wanna know',
                                      DONE:1
                                  });

                           self.isConnected = false;
                        });

                        this.login = function(username){
                          self.username = username;
                          itmsg.getToken(self.API_KEY ,{id : username, displayName : username},898090).then(function(token){
                            var fake  = new FakeNotifierService(token);
                            fake.startNotify();
                           self.isConnected = itmsg.connect(token);
                           itmsg.subscribeToTopic(self.SHOWCASE_TOPIC,[{id : self.username}]);
                           itmsg.subscribeToTopic(self.INVOICES_TOPIC,[{id : self.username}]);
                          });
                        }

                        this.sendMessage = function(messageText){
                          var m = new Message(messageText);
                          var r =  _textMessageExtractor(messageText);
                          var topicName = null;
                          if(r.topicName){
                            topicName =r.topicName;
                          } else if(self.selectedTopic) {
                             topicName =self.selectedTopic.reference;
                          } else {
                            topicName = self.SHOWCASE_TOPIC;
                          }
                          m.to.push('/topic/'+topicName);
                          itmsg.subscribeToTopic(topicName,r.observers)
                              .then(function(ok){
                                   itmsg.sendMessage(m);
                          });
                          self.$textMessage = '';
                        }

                        this.selectCurrentTopic = function(topic){
                          self.selectedTopic = topic;
                          _scrollToBottom();
                        }

                        this.unSubscribe = function(topicName){
                          itmsg.unsubscribeToTopic(topicName,[{id : self.username }])
                        }


                        function _textMessageExtractor(messageText){
                              var regex = new RegExp(/(^|[^@\w])@(\w{1,15})\b/g);
                     var myArray;
                     var users = [];
                     var result = {
                                          observers : [],
                                          topicName : null
                                      };
                     while ((myArray = regex.exec(messageText)) != null)
                     {
                       users.push(myArray[2])
                     }
                     users.sort();
                     if(users.length > 0){
                                        result.topicName = 'conversation:'+ self.username;
                                          for ( var user  in  users){
                                            result.topicName = result.topicName + ':' + users[user];
                                            result.observers.push(
                                              {
                                              'id' : users[user]
                                              }
                                          );
                                          }
                                          result.observers.push({
                                            'id': self.username
                                          });
                                  }
                     return result;
                     }


                     function _scrollToBottom(){
                               setTimeout(function() {
                               var scroller1 = document.getElementById('conversation-content');
                               scroller1.scrollTop = scroller1.scrollHeight;
                               var scroller2 = document.getElementById('notification-content');
                               scroller2.scrollTop = scroller2.scrollHeight;

                              },250);
                            }

                     }]).service('FakeNotifierService',['ItMessaging','$timeout','$http',function(ItMessaging,$timeout,$http){

                             function FakeNotifierService(token){
                               var self = this;

                               self.itmsg = new ItMessaging(token);
                               self.icons = ['warning','success','error','info']
                               this.startNotify = function(){
                                 var icon = self.icons[Math.floor(Math.random()*self.icons.length)];
                                 setTimeout(function () {
                                   $http({
                                     url : 'http://api.icndb.com/jokes/random',
                                     method:'GET'

                                   }).then(function(response){

                                      var m = new Message('');
                                      m.notification = {
                                        title :Math.random().toString(36).slice(2).substring(0,7),
                                        body : response.data.value.joke,
                                        icon: icon
                                      };
                                      m.to.push('/topic/invoices:xxxxxx');
                                      self.itmsg.sendMessage(m);
                                      self.startNotify()

                                   })


                               }, Math.floor(Math.random() * 3000));
                               }
                             }


                              return function(token){
                                   return new FakeNotifierService(token);
                               };
                    }]);

          </file>
         <file name="index.html">
             <div  style="height:600px !important;" ng-controller="MainController as main">
                 <div class="row-height-1">
                 <div ng-if="main.username">
                 <h9  id="example_source_hi-@{{mainusername}}" id="example_source_hi-@{{mainusername}}" id="example_source_hi-@{{mainusername}}">hi @{{main.username}}</h9>
                 <p>Use @Username to chat with other users</p>
                 </div>
                 </div>
                 <div class="row row-height-9" ng-if="main.isConnected">
                 <div class="col-md-6 col-xs-6  it-fill">
                 <div   class="col-xs-12 jumbotron  it-fill"  >
                 <div class="it-fill" id="notification-content" style="overflow-y:auto;">
                 <div ng-repeat="n in main.messages | group:['/topic/invoices'] | orderBy: 'creationDate':false ">
                 <div class="it-messaging-message">
                 <div class="it-messaging-notification {{n.notification.icon}}" >
                 <span class="sender">{{n.notification.title}} </span><b>&nbsp; Notification</b>
                 <span class="message-text">{{n.notification.body}}</span>

                 </div>

                 <div class="small">{{n.creationDate | date:'yyyy-MM-dd HH:mm'}}</div>
                 </div>

                 </div>

                 </div>

                 </div>
                 </div>
                 <div class="col-md-6 col-xs-6  it-fill">
                 <div class="col-xs-12 jumbotron  it-fill">
                 <div class="row-height-2 " style=" overflow-x: scroll!important;">
                 <div>
                 <div class="pull-left it-messaging-tag label label-info">
                 <a href=""  ng-click="main.selectCurrentTopic(null)">all</a>
                 </div>

                 <div class="pull-left it-messaging-tag label label-info" ng-repeat="t in main.topics |topic:t.reference  ">
                 <a href=""  ng-click="main.selectCurrentTopic(t)">{{t.reference | conversation:main.username:'conversation'}}</a><a href="" ng-click="main.unSubscribe(t.reference)">  x</a>
                 </div>
                 </div>

                 </div>
                 <div class="row-height-8 "  id="conversation-content"  style="overflow:auto;margin-top: -30px;background-color:white;">
                 <div ng-repeat="m in main.messages | group: ['/topic/conversation','/topic/group']| orderBy: 'creationDate':false">
                 <div class="it-messaging-message" ng-if="main.selectedTopic ? m.to.indexOf('/topic/'+main.selectedTopic.reference)>=0 :true">
                 <div class="it-messaging-chat" ng-if="m.data.message" ng-class="{mine :(main.username==m.from) ,others : (main.username!=m.from) }">
                 <span class="sender"> @{{m.from.displayName}} :</span>
                 <span class="message-text">{{m.data.message}}</span>

                 </div>
                 <div ng-if="!m.data.message">
                 <span ng-if="m.notification"><i class="fa fa-{{m.notification.icon}}"></i>  {{m.notification.body}} </span>
                 </div>

                 <div class="small">{{m.creationDate | date:'yyyy-MM-dd HH:mm'}}</div>
                 </div>
                 </div>
                 </div>
                 <div class="row-height-2 ">
                 <form  novalidate name="messageForm" ng-submit="main.sendMessage(main.$textMessage)">
                 <input ng-model="main.$textMessage" name=""  style="width : 100%">

                 </form>
                 </div>
                 </div>
                 </div>
                 </div>

                 <div class="row row-height-6" ng-if="!main.isConnected">
                 <div class="col-md-6  col-xs-6 col-xs-offset-3 col-md-offset-3 jumbotron  it-fill">
                 <br>
                 <form class="form-group"  novalidate name="myForm" ng-submit="main.login(username)">
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 disabled="true"
                 type="text"
                 it-label="API URL"
                 ng-model="main.BASE_URL">
                 </div>
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 disabled="true"
                 type="text"
                 it-label="API KEY"
                 ng-model="main.API_KEY">
                 </div>
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 required=""
                 ng-maxlength="10"
                 type="text"
                 it-label="Username"
                 name="Username"
                 ng-model="username">
                 </div>
                 <button class="btn btn-primary" type="submit">Sign in</button>
                 </form>
                 </div>

                 </div>

                 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>

             </div>
         </file>
 </example>
 **/
angular.module('itesoft.messaging',['ngWebSocket'])
.provider('ItMessaging',[
    function(){

        var providerState = this;
        providerState.SERVICE_URL = 'tstbuydpoc01:3333/itesoft-messaging';

        this.$get = ['$log',
            '$http',
            '$q',
            '$websocket',
            '$rootScope',
            function($log,
                     $http,
                     $q,
                     $websocket,
                     $rootScope){

        function ItMessaging(token){

            var self = this;
            self.URL = providerState.SERVICE_URL ;
            self.onMessageCallbacks = [];
            self.onCloseCallbacks   = [];

            self.token = token;

            this.getToken = function(apiKey,observer,ttl){
                console.warn('This function is only for demo purpose,'+
                    ' do NOT use it in production mode, ' +
                    'the security of your apiKey will not be granted');
                var deferred = $q.defer();

                $http({
                    url: 'http://'+ this.URL + '/rest/tokens' ,
                    method: "POST",
                    data:observer,
                    headers: {
                        'api-key': apiKey
                    }
                }).then(function(response){
                    deferred.resolve(response.data.jwt);
                },function(error){
                    $log.error('error on api endpoint');
                    deferred.reject('error on api endpoint');
                });
                return deferred.promise;
            };


            function _updateTopics(){
                var deferred = $q.defer();
                $http({
                    url: 'http://'+self.URL+'/rest/topics',
                    method: "GET",
                    headers: {
                        'token': self.token
                    }
                }).then(function(response){
                    deferred.resolve(response.data);
                },function(error){
                    $log.error(error);
                    deferred.reject(deferred);
                });
                return deferred.promise;
            }

            this.getServiceUrl = function(){
                return self.URL;
            };

            this.connect = function(token){
                if(token){
                    self.token = token;
                    self.dataStream = $websocket('ws://'+ self.URL  +'/websocket?token=' + token);
                    self.dataStream.onMessage(function(msg){
                        _updateTopics().then(function(topics){
                            _onMessageHandler(msg,topics);
                        })
                    });

                    self.dataStream.onClose(function(event){
                        _onCloseHandler(event);
                    })

                    return true;
                }
            };

            this.onMessage = function(callback) {
                self.onMessageCallbacks.push({
                    fn: callback
                });
                return self;
            };

            this.onClose = function(callback) {
                self.onCloseCallbacks.push({
                    fn: callback
                });
                return self;
            };

            function _onMessageHandler(message,topics){
                var pattern;
                var currentCallback;

                for (var i = 0; i < self.onMessageCallbacks.length; i++) {
                    currentCallback = self.onMessageCallbacks[i];
                    var jsonResult = angular.fromJson(message.data);
                    if(angular.isArray(jsonResult)){
                        angular.forEach(jsonResult,function(entry){
                            $rootScope.$applyAsync(function(){
                                currentCallback.fn.apply(this,[entry,topics]);
                            })

                        })

                    } else {
                        $rootScope.$applyAsync(function(){
                            currentCallback.fn.apply(this,[jsonResult,topics]);
                        })

                    }
                }
            }

            function _onCloseHandler(event){
                var pattern;
                var currentCallback;
                for (var i = 0; i < self.onCloseCallbacks.length; i++) {
                    currentCallback = self.onCloseCallbacks[i];
                    $rootScope.$applyAsync(function(){
                        currentCallback.fn.apply(this,event);
                    })
                }
            }

            this.subscribeToTopic = function(topicname,observers){
                var deferred = $q.defer();
                if(self.token!=null){
                    $http({
                        url: 'http://'+self.URL+'/rest/topics/'+topicname+'/subscribe',
                        method: "POST",
                        data : observers,
                        headers: {
                            'token': self.token
                        }
                    }).then(function(response){
                        deferred.resolve(response.data)
                        _updateTopics();
                    },function(error){
                        $log.error(error);
                        deferred.reject(error);
                    })
                } else {
                    $log.error('You cannot register observers to topic without token');
                    deferred.reject('no token');
                }
                return deferred.promise;
            }

            this.unsubscribeToTopic = function(topicname,observers){
                var deferred = $q.defer();
                if(self.token!=null){
                    $http({
                        url: 'http://'+self.URL+'/rest/topics/'+topicname+'/unsubscribe',
                        method: "POST",
                        data : observers,
                        headers: {
                            'token': self.token
                        }
                    }).then(function(response){
                        deferred.resolve(response.data)
                        _updateTopics();
                    },function(error){
                        $log.error(error);
                        deferred.reject(error);
                    })
                } else {
                    $log.error('You cannot register observers to topic without token');
                    deferred.reject('no token');
                }
                return deferred.promise;
            }

            this.sendMessage = function(messageObj){
                var deferred = $q.defer();
                $http({
                    url: 'http://'+self.URL+'/rest/messages',
                    method: "POST",
                    headers: {
                        'token': self.token
                    },
                    data : messageObj
                }).then(function(response){
                    deferred.resolve(response.data);
                },function(error){
                    $log.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            }

        }

        return function(url){
            return new ItMessaging(url);
        };
            }]
    }])

'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itNotifier
 * @module itesoft
 * @since 1.1
 * @requires ngToast
 * @requires $rootScope
 * @requires $log
 *
 * @description
 * Simple notifier service, that display toasters.
 *
 * You can personalise itNotifier behavior using attribute and modifying original object setting's toaster:
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td><code>additionalClasses</code></td>
 *     <td>''</td>
 *     <td>Allows to add some classes to the current ngToast</td>
 * </tr>
 * <tr>
 *     <td><code>animation</code></td>
 *     <td>'fade'</td>
 *     <td>Adds an openning/ending animation, for example 'fade'</td>
 * </tr>
 * <tr>
 *     <td><code>className</code></td>
 *     <td>"success"</td>
 *     <td>The className of the toast message</td>
 * </tr>
 * <tr>
 *     <td><code>content</code></td>
 *     <td>''</td>
 *     <td>Content of the toast message as String (HTML compliant)</td>
 * </tr>
 * <tr>
 *     <td><code>combineDuplications</code></td>
 *     <td>false</td>
 *     <td>Combine toaster in a unique one. A counter precede the toaster content</td>
 * </tr>
 * <tr>
 *     <td><code>compileContent</code></td>
 *     <td>false</td>
 *     <td>Re-compiles the toast message content within parent (or given) scope. Needs to be used with trusted HTML content. See here for more information. (boolean|object)</td>
 * </tr>
 * <tr>
 *     <td><code>dismissOnTimeout</code></td>
 *     <td>true</td>
 *     <td>Automatically remove toast message after specific time</td>
 * </tr>
 * <tr>
 *     <td><code>dismissButton:</code></td>
 *     <td>true</td>
 *     <td>Adds close button on toast message</td>
 * </tr>
 * <tr>
 *     <td><code>dismissButtonHtml</code></td>
 *     <td>"&#38;times;"</td>
 *     <td>Html of close button</td>
 * </tr>
 * <tr>
 *     <td><code>dismissOnClick</code></td>
 *     <td>false</td>
 *     <td>Allows to remove toast message with a click</td>
 * </tr>
 * <tr>
 *     <td><code>horizontalPosition</code></td>
 *     <td>"right"</td>
 *     <td>Horizontal position of the toast message. Possible values : "right", "left" or "center"</td>
 * </tr>
 * <tr>
 *     <td><code>maxNumber</code></td>
 *     <td>0</td>
 *     <td>Maximum number of toast message to display. (0 means unlimined)</td>
 * </tr>
 * <tr>
 *     <td><code>timeout</code></td>
 *     <td>4000</td>
 *     <td>Timer for remove toast message</td>
 * </tr>
 * <tr>
 *     <td><code>verticalPosition</code></td>
 *     <td>"bottom"</td>
 *     <td>Vertical position of the toast message. possible values "top" or "bottom"</td>
 * </tr>
 * </table>
 * It's possible to defines specific behavior for each type of error. When overloading ngToast configuration, add an attribute to ngToast.configure() parameter.
 *
 * Overload of defaults options value for each type of toasts are :
 * <ul>
 * <li>success:{dismissOnClick: true}</li>
 * <li>info:{dismissOnClick: true}</li>
 * <li>error:{dismissOnTimeout: false}</li>
 * <li>warning:{dismissOnTimeout: false}</li>
 * </ul>
 * For example, in the "Controller.js", the notifyError method override orginial settings and add some content and disable the dismiss on timeout.
 * The toasts success behavior is also overloaded for dissmiss the toast on click. (see .config(['ngToastProvider' for details)
 *
 *
 * <br/><br/>If Error log is enabled, you can pass errorDetail object to the methods. Here is the details of this object
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Possible value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>CODE</td>
 *     <td>EMPTY_REQUEST(1000), INCOMPLETE_OBJECT(1001), MALFORMED_OBJECT(1002), INTERNAL_ERROR(2000), BAD_REQUEST(400), INTERNAL_SERVER_ERROR(500), OK(200)</td>
 *     <td>The code bounds to the status of the action</td>
 * </tr>
 * <tr>
 *     <td>TYPE</td>
 *     <td>ERROR("error"), INFO("information"), WARN("warning"), DETAIL("detail"), SUCCESS("S");</td>
 *     <td>The type message received</td>
 * </tr>
 * <tr>
 *     <td>MESSAGE</td>
 *     <td></td>
 *     <td>The message received from the server</td>
 * </tr>
 * <tr>
 *     <td>DETAIL</td>
 *     <td></td>
 *     <td>The detail of the message received from the server</td>
 * </tr>
 * <tr>
 *     <td>DONE</td>
 *     <td>TRUE("1"), FALSE("0");</td>
 *     <td>A boolean that decribes the final result of the request</td>
 * </tr>
 * </table>
 * <br/>
 *
 * There is two ways to use it, by injecting the service in each controller or by using events. See Controller.js for details
 *
 * Possible itNotifier type : "SUCCESS", "ERROR", "INFO", "WARNING" and "DISMISS"<br/>
 * @example
     <example module="itesoft">

         <file name="Controller.js">

            angular.module('itesoft')
                .config(['itNotifierProvider', function (itNotifierProvider) {
                    //configuration of default values
                    itNotifierProvider.defaultOptions = {
                        dismissOnTimeout: true,
                        timeout: 4000,
                        dismissButton: true,
                        animation: 'fade',
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        compileContent: true,
                        dismissOnClick: false,
                        success:{dismissOnClick: true},//optional overload behavior toast success
                        info:{dismissOnClick: true},//optional overload behavior toast info
                        error:{dismissOnTimeout: false},//optional overload behavior toast error
                        warning:{dismissOnTimeout: false}//optional overload behavior toast warning
                    };

                }]).controller('NotifierCtrl',['$scope','itNotifier', function($scope,itNotifier) {
                    $scope.showSuccess = function(){
                        itNotifier.notifySuccess({
                        content: "Success popup"
                        });
                    };
                    $scope.showSuccessEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                            type: "SUCCESS",
                            options: {
                                content : "Success event popup"
                            }}
                         );
                    };
                    $scope.showError = function(){
                        itNotifier.notifyError({
                            content: "Error popup",
                            dismissOnTimeout: false
                        },
                        {
                            CODE:500,
                            TYPE:'error',
                            MESSAGE:'Something bad happened',
                            DETAIL:'You don\'t wanna know',
                            DONE:1
                        });
                    };
                    $scope.showErrorOnEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                        type: "ERROR",
                        options: {
                                content : "error event popup"
                            },
                        errorDetails :
                            {
                                CODE:500,
                                TYPE:'error',
                                MESSAGE:'Something bad happened',
                                DETAIL:'You don\'t wanna know',
                                DONE:1
                            }
                        });
                    }
                    $scope.showInfo = function(){
                        itNotifier.notifyInfo({
                        content: "Information popup"
                        });
                    };
                    $scope.showWarningOnEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                        type: "WARNING",
                        options: {
                                content : "Warning event popup"
                            },
                        errorDetails :
                            {
                                CODE:1000,
                                TYPE:'warning',
                                MESSAGE:'The request is empty',
                                DETAIL:'Nothing',
                                DONE:1
                            }
                        });
                    };
                    $scope.dismiss = function(){
                        itNotifier.notifyDismiss();
                        $scope.$emit('itNotifierEvent',{
                            type:"DISMISS"
                        });
                    };
                    $scope.dismissOnEvent = function(){
                        $scope.$emit("$locationChangeSuccess");

                    };
                }]);
         </file>
         <file name="index.html">
             <!-- CSS adaptation of ngToast for example purposes. Do not do this in production-->
             <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
             <div ng-controller="NotifierCtrl">
                 <button class="btn btn-success" ng-click="showSuccess()">
                    Success
                 </button>
                 <button class="btn btn-success" ng-click="showSuccessEvent()">
                    Success on event
                 </button>
                 <button class="btn btn-danger" ng-click="showError()">
                    Error
                 </button>
                 <button class="btn btn-danger" ng-click="showErrorOnEvent()">
                    Error on event
                 </button>
                 <button class="btn btn-info" ng-click="showInfo()">
                    Info
                 </button>
                 <button class="btn btn-warning" ng-click="showWarningOnEvent()">
                    Warning
                 </button>
                 <button class="btn btn-success" ng-click="dismiss()">
                    Dismiss all popups
                 </button>
                 <button class="btn btn-success" ng-click="dismissOnEvent()">
                    Dismiss on Change location event
                 </button>
             </div>
         </file>
     </example>
 **/
IteSoft.provider('itNotifier', [ function () {

    var self = this;

    //default behaviors
    self.defaultOptions = {
        dismissOnTimeout: true,
        timeout: 4000,
        dismissButton: true,
        animation: 'fade',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        compileContent: true,
        dismissOnClick: false,
        success:{dismissOnClick: true},//optional overload behavior toast success
        info:{dismissOnClick: true},//optional overload behavior toast info
        error:{dismissOnTimeout: false},//optional overload behavior toast error
        warning:{dismissOnTimeout: false}//optional overload behavior toast warning
    };

    //provide get method to build provider
    this.$get= ['ngToast', '$rootScope','$log', function(ngToast, $rootScope, $log){

        // service declaration
        var itNotifier = {};

        //configuration of the ngToast
        ngToast.settings = angular.extend(ngToast.settings,self.defaultOptions);

        /**
         * Private method that format error details message
         * @param errorDetails
         * @returns {string}
         * @private
         */
        function _formatErrorDetails(errorDetails){
            return " CODE : "+errorDetails.CODE +", TYPE : "+ errorDetails.TYPE +", MESSAGE : "+ errorDetails.MESSAGE +", DETAIL : "+ errorDetails.DETAIL +", DONE : "+ errorDetails.DONE;
        }

        /** method declaration**/
        /**
         * Display a toast configure as success element
         * @param options
         * @param errorDetails
         */
        itNotifier.notifySuccess= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, self.defaultOptions,self.defaultOptions.success,options,options.success);
            ngToast.success(localOptions);
            if(errorDetails != undefined) {
                $log.log("Success popup called : "+_formatErrorDetails(errorDetails));
            }
        };
        /**
         * Display a toast configure as error element
         * @param options
         * @param errorDetails
         */
        itNotifier.notifyError= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, self.defaultOptions,self.defaultOptions.error,options, options.error);

            ngToast.danger(localOptions);
            if(errorDetails != undefined) {
                $log.error("Error popup called : "+_formatErrorDetails(errorDetails));
            }
        };
        /**
         * Display a toast configure as info element
         * @param options
         * @param errorDetails
         */
        itNotifier.notifyInfo= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, self.defaultOptions,self.defaultOptions.info,options, options.info);

            ngToast.info(localOptions);
            if(errorDetails != undefined) {
                $log.info("Info popup called : "+_formatErrorDetails(errorDetails));
            }
        };
        /**
         * Display a toast configure as warning element
         * @param options
         * @param errorDetails
         */
        itNotifier.notifyWarning= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, self.defaultOptions,self.defaultOptions.warning,options, options.warning);

            ngToast.warning(localOptions);
            if(errorDetails != undefined) {
                $log.warn("Warning popup called : "+_formatErrorDetails(errorDetails));
            }
        };
        /**
         * Dismiss all toaster
         * @param options
         * @param errorDetails
         */
        itNotifier.notifyDismiss= function (options,errorDetails) {
            ngToast.dismiss();
        };
        /**
         * Log an error because this type is unknown
         * @param options
         */
        itNotifier.notify= function (options) {
            $log.error('Unknown type for itNotifier: '+options )
        }

        /** events declaration **/

        /**
         * Listen an event and dismiss all toaster
         */
        $rootScope.$on("$locationChangeSuccess", function () {
            // Remove all currently display toaster messages.
            itNotifier.notifyDismiss();
        });

        /**
         * Listen an event and display associated toast depending on his type
         */
        $rootScope.$on("itNotifierEvent",function(event, args){
            //Handle event and calls appropriate method depending on the type of request
            if (args) {
                switch (args.type) {
                    case "SUCCESS":
                        itNotifier.notifySuccess(args.options,args.errorDetails);
                        break;
                    case "ERROR":
                        itNotifier.notifyError(args.options,args.errorDetails);
                        break;
                    case "INFO":
                        itNotifier.notifyInfo(args.options,args.errorDetails);
                        break;
                    case "WARNING":
                        itNotifier.notifyWarning(args.options,args.errorDetails);
                        break;
                    case "DISMISS":
                        itNotifier.notifyDismiss(args.options,args.errorDetails);
                        break;
                    default:
                        itNotifier.notify(args.type);
                        break;
                }
            }
            else{
                $log.error('Bad usage of itNotifier. Check manual for details');
            }
        });
        return itNotifier;
    }];
}]);
'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itPopup
 * @module itesoft
 * @since 1.0
 * @requires $uibModal
 * @requires $uibModalStack
 * @requires $rootScope
 * @requires $q
 *
 * @description
 * The Itesoft Popup service allows programmatically creating and showing popup windows that require the user to respond in order to continue.
 * The popup system has support for more flexible versions of the built in alert(),
 * prompt(), and confirm() functions that users are used to,
 * in addition to allowing popups with completely custom content and look.
 *
 * @example
    <example module="itesoft">

        <file name="Controller.js">
             angular.module('itesoft')
             .controller('PopupCtrl',['$scope','itPopup', function($scope,itPopup) {

                  $scope.showAlert = function(){
                      var alertPopup = itPopup.alert({
                          title: "{{'POPUP_TITLE' | translate}}",
                          text: "{{'POPUP_CONTENT' | translate}}"
                      });
                      alertPopup.then(function() {
                         alert('alert callback');
                      });
                  };

                  $scope.showConfirm = function(){
                      var confirmPopup = itPopup.confirm({
                          title: "{{'POPUP_TITLE' | translate}}",
                          text: "{{'POPUP_CONTENT' | translate}}",
                          buttons: [

                              {
                                  text: 'Cancel',
                                  type: '',
                                  onTap: function () {
                                      return false;
                                  }
                              },
                              {
                                  text: 'ok',
                                  type: '',
                                  onTap: function () {
                                      return true;
                                  }
                              }
                             ]
                      });
                      confirmPopup.then(function(res) {

                          alert('confirm validate');
                      },function(){
                          alert('confirm canceled');
                      });
                  };

              $scope.data = {};
              $scope.data.user =  '';

              $scope.showCustomConfirm = function(){
              var customPopup = itPopup.custom({
                  title: 'My Custom title',
                  scope: $scope,
                  backdrop:false,
                  text: '<h3 id="example_my-custom-html-content">My custom html content</h3> <p>{{data.user}} </p>  <input it-input class="form-control floating-label" type="text" it-label="Email Required!!" ng-model="data.user">',
                  buttons: [{
                          text: 'My Custom Action Button',
                          type: 'btn-danger',
                          onTap: function (event,scope) {
                               console.log(scope.data );
                               if(typeof scope.data.user === 'undefined' ||scope.data.user ==='' ){
                                    event.preventDefault();
                               }
                              return true;
                          }
                      }
                  ]
              });
              customPopup.then(function(res) {
                 console.log(res);
                  alert('confirm validate');
              },function(){
                  alert('confirm canceled');
              });
              };

              $scope.showPrompt = function(){
                  var promptPopup = itPopup.prompt({
                      title: "{{'POPUP_TITLE' | translate}}",
                      text: "{{'POPUP_CONTENT' | translate}}",
                      inputLabel : "{{'POPUP_LABEL' | translate}}",
                      inputType: 'password'
                  });
                  promptPopup.then(function(data) {
                      alert('prompt validate with value ' + data.response);
                  },function(){
                      alert('prompt canceled');
                  });
              };

              }]);

         </file>
         <file name="index.html">
             <div ng-controller="PopupCtrl">
                 <button class="btn btn-info" ng-click="showAlert()">
                 Alert
                 </button>
                 <button class="btn btn-danger" ng-click="showConfirm()">
                 Confirm
                 </button>
                 <button class="btn btn-warning" ng-click="showPrompt()">
                 Prompt
                 </button>

                 <button class="btn btn-warning" ng-click="showCustomConfirm()">
                 My Custom popup
                 </button>
             </div>
         </file>
     </example>
 */
angular.module('itesoft.popup',['ui.bootstrap.modal'])
    .factory('itPopup',['$uibModal','$uibModalStack','$rootScope','$q','$compile',function($modal,$modalStack,$rootScope,$q,$compile){

        var MODAL_TPLS = '<div class="modal-header it-view-header">' +
                             '<h3 it-compile="options.title"></h3>'+
                         '</div>'+
                         '<div class="modal-body">'+
                            '<p it-compile="options.text"></p>'+
                         '</div>'+
                         '<div class="modal-footer">'+
                              '<button ng-repeat="button in options.buttons" class="btn btn-raised {{button.type}}" ng-click="itButtonAction($event,button)" it-compile="button.text"></button>'+
                         '</div>';

        var MODAL_TPLS_PROMT = '<div class="modal-header it-view-header">' +
            '<h3 it-compile="options.title"></h3>'+
            '</div>'+
            '</div>'+
            '<div class="modal-body">'+
            '<p it-compile="options.text"></p>'+
            '   <div class="form-group">'+
            '<div class="form-control-wrapper"><input type="{{options.inputType}}" class="form-control" ng-model="data.response"  placeholder="{{options.inputPlaceholder}}"></div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button ng-repeat="button in options.buttons" class="btn btn-raised {{button.type}}" ng-click="itButtonAction($event,button)" it-compile="button.text"></button>'+
            '</div>';

        var itPopup = {
            alert : _showAlert,
            confirm :_showConfirm,
            prompt : _showPromt,
            custom : _showCustom
        };

        function _createPopup(options){
            var self = {};
            self.scope = (options.scope || $rootScope).$new();

            self.responseDeferred = $q.defer();
            self.scope.$buttonTapped= function(event, button ) {
                var result = (button.onTap || noop)(event);
                self.responseDeferred.resolve(result);
            };

            function _noop(){
                return false;
            }

            options = angular.extend({
                scope: self.scope,
                template : MODAL_TPLS,

                controller :['$scope' ,'$uibModalInstance',function($scope, $modalInstance) {
                   // $scope.data = {};
                    $scope.itButtonAction= function(event, button ) {
                        var todo = (button.onTap || _noop)(event,$scope);

                        var result = todo;
                        if (!event.isDefaultPrevented()) {
                            self.responseDeferred.resolve(result ? close() : cancel());
                        }
                    };

                    function close(){
                        $modalInstance.close($scope.data);
                    }
                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }
                }],
                buttons: []
            }, options || {});

            options.scope.options = options;


            self.options = options;

            return self;

        }

        function _showPopup(options){
            $modalStack.dismissAll();
            var popup = _createPopup(options);

            return  $modal.open(popup.options).result;
        }

        function _showAlert(opts){
            $modalStack.dismissAll();

            return _showPopup(angular.extend({

                buttons: [{
                    text: opts.okText || 'OK',
                    type: opts.okType || 'btn-info',
                    onTap: function() {
                        return true;
                    }
                }]
            }, opts || {}));
        }

        function _showConfirm(opts){
            $modalStack.dismissAll();

            return _showPopup(angular.extend({
                buttons: [
                    {
                        text: opts.okText || 'OK',
                        type: opts.okType || 'btn-info',
                        onTap: function() { return true; }
                    },{
                        text: opts.cancelText || 'Cancel',
                        type: opts.cancelType || '',
                        onTap: function() { return false; }
                    }]
            }, opts || {}));
        }


        function _showCustom(opts){
            $modalStack.dismissAll();
         return   _showPopup(opts);
        }

        function _showPromt(opts){
            $modalStack.dismissAll();

            var scope = $rootScope.$new(true);
            scope.data = {};
            var text = '';
            if (opts.template && /<[a-z][\s\S]*>/i.test(opts.template) === false) {
                text = '<span>' + opts.template + '</span>';
                delete opts.template;
            }

            return _showPopup(angular.extend({
                template : MODAL_TPLS_PROMT,
                inputLabel : opts.inputLabel || '',
                buttons: [
                    {
                        text: opts.okText || 'OK',
                        type: opts.okType || 'btn-info',
                        onTap: function() {
                            return true;
                        }
                    },
                    {
                        text: opts.cancelText || 'Cancel',
                        type: opts.cancelType || '',
                        onTap: function() {}
                    } ]
            }, opts || {}));
        }
        return itPopup;
    }]);

/**
 * Created by SZA on 28/06/2016.
 */

IteSoft
    .factory('itStringUtilsService', [function () {
        return {
            getLower: _getLower,
            removeAccent: _removeAccent,
            clear: _clear,
            cleanDomRef: {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                encode: function (e) {
                    if (e) {
                        var t = "";
                        {
                        }
                        var n, r, i, s, o, u, a;
                        var f = 0;
                        e = this._utf8_encode(e);
                        while (f < e.length) {
                            n = e.charCodeAt(f++);
                            r = e.charCodeAt(f++);
                            i = e.charCodeAt(f++);
                            s = n >> 2;
                            o = (n & 3) << 4 | r >> 4;
                            u = (r & 15) << 2 | i >> 6;
                            a = i & 63;
                            if (isNaN(r)) {
                                u = a = 64
                            } else if (isNaN(i)) {
                                a = 64
                            }
                            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                        }
                        return t
                    }
                },
                decode: function (e) {
                    var t = "";
                    var n, r, i;
                    var s, o, u, a;
                    var f = 0;
                    if (e.replace) {
                        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                        while (f < e.length) {
                            s = this._keyStr.indexOf(e.charAt(f++));
                            o = this._keyStr.indexOf(e.charAt(f++));
                            u = this._keyStr.indexOf(e.charAt(f++));
                            a = this._keyStr.indexOf(e.charAt(f++));
                            n = s << 2 | o >> 4;
                            r = (o & 15) << 4 | u >> 2;
                            i = (u & 3) << 6 | a;
                            t = t + String.fromCharCode(n);
                            if (u != 64) {
                                t = t + String.fromCharCode(r)
                            }
                            if (a != 64) {
                                t = t + String.fromCharCode(i)
                            }
                        }
                    }
                    t = this._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    var t = "";
                    if (e.replace) {
                        e = e.replace(/rn/g, "n");
                        for (var n = 0; n < e.length; n++) {
                            var r = e.charCodeAt(n);
                            if (r < 128) {
                                t += String.fromCharCode(r)
                            } else if (r > 127 && r < 2048) {
                                t += String.fromCharCode(r >> 6 | 192);
                                t += String.fromCharCode(r & 63 | 128)
                            } else {
                                t += String.fromCharCode(r >> 12 | 224);
                                t += String.fromCharCode(r >> 6 & 63 | 128);
                                t += String.fromCharCode(r & 63 | 128)
                            }
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            }
        };

        /**
         * Clear content by removing accent and case
         * @param value
         * @returns {string}
         * @private
         */
        function _clear(value) {
            var result = "";
            result = _getLower(value);
            result = _removeAccent(result);
            return result;
        }

        /**
         *
         * @param value
         * @returns {string}
         * @private
         */
        function _getLower(value) {
            var result = "";
            if (angular.isDefined(value) && value.toLowerCase) {
                result += value.toLowerCase();
            } else {
                result += value;
            }
            return result;
        }

        /**
         *
         * @param value
         * @returns {string}
         * @private
         */
        function _removeAccent(value) {
            var diacritics = [
                {char: 'A', base: /[\300-\306]/g},
                {char: 'a', base: /[\340-\346]/g},
                {char: 'E', base: /[\310-\313]/g},
                {char: 'e', base: /[\350-\353]/g},
                {char: 'I', base: /[\314-\317]/g},
                {char: 'i', base: /[\354-\357]/g},
                {char: 'O', base: /[\322-\330]/g},
                {char: 'o', base: /[\362-\370]/g},
                {char: 'U', base: /[\331-\334]/g},
                {char: 'u', base: /[\371-\374]/g},
                {char: 'N', base: /[\321]/g},
                {char: 'n', base: /[\361]/g},
                {char: 'C', base: /[\307]/g},
                {char: 'c', base: /[\347]/g}
            ];
            var result = value;
            diacritics.forEach(function (letter) {
                result = result.replace(letter.base, letter.char);
            });
            return result;
        }


    }])

'use strict';

/**
 * @ngdoc directive
 * @name dependencies.directive:ui-layout
 * @module dependencies
 * @restrict AE
 * @since 1.2
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
'use strict';
/**
 * TODO Image implementation desc
 */
itImageViewer
    .factory('IMAGEPage', ['$log' , 'MultiPagesPage', 'PageViewport', 'MultiPagesConstants', function($log, MultiPagesPage, PageViewport, MultiPagesConstants) {

        function IMAGEPage(viewer, pageIndex, img, view) {
            this.base = MultiPagesPage;
            this.base(viewer, pageIndex, view);
            this.img = img;
        }

        IMAGEPage.prototype = new MultiPagesPage;

        IMAGEPage.prototype.renderPage = function (page, callback) {
            var self = this;
            /*if(this.rendered) {
             if(callback) {
             callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
             }
             return;
             };

             this.rendered = true;*/

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
            }else {
                //self.canvasRendered = true;
                page.wrapper.append(page.canvas);

                var ctx = page.canvas[0].getContext('2d');
                ctx.transform.apply(ctx, page.viewport.transform);
                ctx.drawImage(self.img , 0, 0); // Or at whatever offset you like


                if(callback) {
                    callback(page, MultiPagesConstants.PAGE_RENDERED);
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

        IMAGEViewer.prototype.open = function(obj, initialScale, pageMargin) {
            this.element.empty();
            this.pages = [];
            this.pageMargin = pageMargin;
            this.initialScale = initialScale;
            var isFile = typeof obj != typeof "";

            if(isFile){
                this.setFile(obj);
            }else {
                this.setUrl(obj);
            }
        };
        IMAGEViewer.prototype.setUrl = function(url) {
            if (url !== undefined && url !== null && url !== '') {
                var self = this;
                self.getAllPages(url, function(pageList) {
                    self.pages = pageList;
                    self.addPages();
                });
            }
        };
        IMAGEViewer.prototype.setFile = function(file) {
            if (file !== undefined && file !== null) {
                var self = this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var url = e.target.result;
                    self.getAllPages(url, function(pageList) {
                        self.pages = pageList;
                        self.addPages();
                    });
                };

                reader.onprogress = function (e) {
                    self.downloadProgress(e);
                };

                reader.onloadend = function (e) {
                    var error = e.target.error;
                    if(error !== null) {
                        var message = "File API error: ";
                        switch(e.code) {
                            case error.ENCODING_ERR:
                                message += "Encoding error.";
                                break;
                            case error.NOT_FOUND_ERR:
                                message += "File not found.";
                                break;
                            case error.NOT_READABLE_ERR:
                                message += "File could not be read.";
                                break;
                            case error.SECURITY_ERR:
                                message += "Security issue with file.";
                                break;
                            default:
                                message += "Unknown error.";
                                break;
                        }

                        self.onDataDownloaded("failed", 0, 0, message);
                    }
                };

                reader.readAsDataURL(file);
            }
        };
        IMAGEViewer.prototype.getAllPages = function(url, callback) {
            var pageList = [],
                self = this;

            pageList.push({});

            var img = new Image;
            img.onprogress = angular.bind(this, self.downloadProgress);
            img.onload = function() {
                var page =  new IMAGEPage(self, 0, img, [0,0, img.width, img.height]);
                pageList[0] = page;

                //self.addPage(page);

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
                file: "=",
                api: "=",
                options: "=",
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                var getOption = function(optionName) {
                    if($scope.options === null || $scope.options === undefined) {
                        return null;
                    }
                    return $scope.options[optionName];
                };

                var viewer = new IMAGEViewer($element); ;

                $scope.api = viewer.getAPI();

                $scope.onSrcChanged = function () {
                    viewer.open(this.src, getOption("initialScale"), pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open(this.file, getOption("initialScale"), pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', function (src) {
                    scope.onSrcChanged();
                });

                scope.$watch("file", function (file) {
                    scope.onFileChanged();
                });
            }
        };
    }]);


'use strict';
/**
 * TODO itImageViewer desc
 */
itImageViewer.directive('itImageViewer', ['$log', 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
     var linker = function(scope, element, attrs) {
         MultiPagesAddEventWatcher(scope);
     };

     return {
         scope: {
             src: "=",
             options: "="
         },
         restrict: 'E',
         template :  '<div class="multipage-container">' +
                         '<it-progressbar-viewer api="options.$$api" ng-if="options.showProgressbar"></it-progressbar-viewer>' +
                         '<it-toolbar-viewer api="options.$$api" ng-if="options.showToolbar"></it-toolbar-viewer>' +
                         '<image-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}"  api="options.$$api" options="options" ></image-viewer>' +
                     '</div>',
         link: linker
     };
 }]);

'use strict';
/**
 * TODO CustomStyle desc
 */
itPdfViewer.factory('CustomStyle', [function () {
        // As noted on: http://www.zachstronaut.com/posts/2009/02/17/
        //              animate-css-transforms-firefox-webkit.html
        // in some versions of IE9 it is critical that ms appear in this list
        // before Moz
        var prefixes = ['ms', 'Moz', 'Webkit', 'O'];
        var _cache = {};

        function CustomStyle() {}

        CustomStyle.getProp = function get(propName, element) {
            // check cache only when no element is given
            if (arguments.length === 1 && typeof _cache[propName] === 'string') {
                return _cache[propName];
            }

            element = element || document.documentElement;
            var style = element.style, prefixed, uPropName;

            // test standard property first
            if (typeof style[propName] === 'string') {
                return (_cache[propName] = propName);
            }

            // capitalize
            uPropName = propName.charAt(0).toUpperCase() + propName.slice(1);

            // test vendor specific properties
            for (var i = 0, l = prefixes.length; i < l; i++) {
                prefixed = prefixes[i] + uPropName;
                if (typeof style[prefixed] === 'string') {
                    return (_cache[propName] = prefixed);
                }
            }

            //if all fails then set to undefined
            return (_cache[propName] = 'undefined');
        };

        CustomStyle.setProp = function set(propName, element, str) {
            var prop = this.getProp(propName);
            if (prop !== 'undefined') {
                element.style[prop] = str;
            }
        };

        return (CustomStyle);
    }]);

'use strict';
/**
 * TODO itPdfViewer desc
 */
itPdfViewer.directive('itPdfViewer', ['$log' , 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
    var linker = function (scope, element, attrs) {

        scope.thumbnailCollapsed = false;
        scope.onPassword = function (reason) {
            return prompt("The selected PDF is password protected. PDF.js reason: " + reason, "");
        };

        scope.toggleThumbnail = function () {
            scope.thumbnailCollapsed = !scope.thumbnailCollapsed;
        };

        MultiPagesAddEventWatcher(scope);
    };

    return {
        scope: {
            src: "=",
            options: "="
        },
        restrict: 'E',
        template :
        '<div ui-layout="{ flow : \'column\', dividerSize : 0 }" class="multipage-container">' +
            '<it-progressbar-viewer api="options.$$api" ng-if="options.showProgressbar != false"></it-progressbar-viewer><it-toolbar-viewer  api="options.$$api" ng-if="options.showToolbar != false"></it-toolbar-viewer>' +
            '<div ng-if="options.showThumbnail != false" collapsed="thumbnailCollapsed" ui-layout-container size="210px" class="thumbnail-menu">' +
                '<it-thumbnail-menu-viewer orientation="\'vertical\'" options="options">' +
                    '<div class="ui-splitbar-container-column pull-right"  ng-click="toggleThumbnail()">' +
                        '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-left"></span>' +
                    '</div>' +
                '</it-thumbnail-menu-viewer>' +
            '</div>' +
            '<div ui-layout-container>' +
                '<pdf-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.$$api" options="options" password-callback="onPassword(reason)"></pdf-viewer>' +
            '</div>' +
            '<div class="ui-splitbar-container-column pull-left"  ng-click="toggleThumbnail()" ng-if="thumbnailCollapsed">' +
                '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-right"></span>' +
            '</div>' +
        '</div>',
        link: linker
    };
}]);
'use strict';
/**
 * TODO Pdf implementation desc
 */
itPdfViewer
    .factory('PDFViewerAPI', ['$log' , 'MultiPagesViewerAPI', function ($log, MultiPagesViewerAPI) {

        function PDFViewerAPI(viewer) {
            this.base = MultiPagesViewerAPI;
            this.base(viewer);
        };

        PDFViewerAPI.prototype = new MultiPagesViewerAPI;

        PDFViewerAPI.prototype.findNext = function () {
            if(this.viewer.searchHighlightResultID === -1) {
                return;
            }

            var nextHighlightID = this.viewer.searchHighlightResultID + 1;
            if(nextHighlightID >= this.viewer.searchResults.length) {
                nextHighlightID = 0;
            }

            this.viewer.highlightSearchResult(nextHighlightID);
        };

        PDFViewerAPI.prototype.findPrev = function () {
            if(this.viewer.searchHighlightResultID === -1) {
                return;
            }

            var prevHighlightID = this.viewer.searchHighlightResultID - 1;
            if(prevHighlightID < 0) {
                prevHighlightID = this.viewer.searchResults.length - 1;
            }

            this.viewer.highlightSearchResult(prevHighlightID);
        };

        return (PDFViewerAPI);
    }])

    .factory('PDFPage', ['$log' , 'MultiPagesPage',  'MultiPagesConstants' , 'TextLayerBuilder', function ($log, MultiPagesPage, MultiPagesConstants, TextLayerBuilder) {

        function PDFPage(viewer, pdfPage, hasTextLayer) {
            this.base = MultiPagesPage;
            this.base(viewer, pdfPage.pageIndex);

            this.pdfPage = pdfPage;
            this.renderTask = null;
            this.hasTextLayer = hasTextLayer;
        }

        PDFPage.prototype = new MultiPagesPage;

        PDFPage.prototype.clear = function () {
            if(this.renderTask !== null) {
                this.renderTask.cancel();
            }
            MultiPagesPage.prototype.clear.call(this);
            this.renderTask = null;
        };
        PDFPage.prototype.getViewport = function (scale , rotation) {
            return this.pdfPage.getViewport(scale, rotation, 0, 0);
        };
        /*PDFPage.prototype.transform = function () {
         MultiPagesPage.prototype.transform.call(this);

         this.textLayer = angular.element("<div class='text-layer'></div>");
         this.textLayer.css("width", this.viewport.width + "px");
         this.textLayer.css("height", this.viewport.height + "px");
         };*/
        PDFPage.prototype.renderPage = function (page, callback) {

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
                /*if(page.hasTextLayer) {
                 page.wrapper.append(page.textLayer);
                 }*/
            }else{

                page.wrapper.append(page.canvas);

                page.renderTask = this.pdfPage.render({
                    canvasContext: page.canvas[0].getContext('2d'),
                    viewport: page.viewport
                });

                page.renderTask.then(function () {

                    //self.rendered = true;
                    page.renderTask = null;
                    if(callback) {
                        callback(page, MultiPagesConstants.PAGE_RENDERED);
                    }
                    //wrapper.append(self.canvas);

                    /*if(page.hasTextLayer) {
                     page.pdfPage.getTextContent().then(function (textContent) {
                     // Render the text layer...
                     var textLayerBuilder = new TextLayerBuilder({
                     textLayerDiv: page.textLayer[0],
                     pageIndex: page.id,
                     viewport: page.viewport
                     });

                     textLayerBuilder.setTextContent(textContent);
                     textLayerBuilder.renderLayer();
                     //page.wrapper.append(page.textLayer);
                     page.addLayer(page.textLayer);
                     });
                     }*/
                }, function (message) {
                    page.rendered = false;
                    page.renderTask = null;

                    if(message === "cancelled") {
                        if(callback) {
                            callback(page, MultiPagesConstants.PAGE_RENDER_CANCELLED);
                        }
                    } else {
                        if(callback) {
                            callback(page, MultiPagesConstants.PAGE_RENDER_FAILED);
                        }
                    }
                });
            }
        };

        return (PDFPage);
    }])

    .factory('PDFViewer', ['$log', 'MultiPagesViewer', 'PDFViewerAPI', 'PDFPage', function ($log, MultiPagesViewer, PDFViewerAPI, PDFPage) {
        function PDFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new PDFViewerAPI(this), element);

            this.pdf = null;
            // Hooks for the client...
            this.passwordCallback = null;
        }

        PDFViewer.prototype = new MultiPagesViewer;

        PDFViewer.prototype.open = function (obj, initialScale, renderTextLayer, orientation, pageMargin) {
            this.element.empty();
            this.pages = [];
            if (obj !== undefined && obj !== null && obj !== '') {
                this.pageMargin = pageMargin;
                this.initialScale = initialScale;
                this.hasTextLayer = renderTextLayer;
                this.orientation = orientation;
                var isFile = typeof obj != typeof "";

                if(this.getDocumentTask != undefined){
                    var self = this;
                    this.getDocumentTask.destroy().then(function () {
                        if(isFile){
                            self.setFile(obj);
                        }else {
                            self.setUrl(obj);
                        }
                    });
                } else {
                    if(isFile){
                        this.setFile(obj);
                    }else {
                        this.setUrl(obj);
                    }
                }
            }
        };
        PDFViewer.prototype.setUrl = function (url) {
            var self = this;
            this.getDocumentTask = PDFJS.getDocument(url, null, angular.bind(this, this.passwordCallback), angular.bind(this, this.downloadProgress));
            this.getDocumentTask.then(function (pdf) {
                self.pdf = pdf;

                self.getAllPages( function (pageList, pagesRefMap) {
                    self.pages = pageList;
                    self.pagesRefMap = pagesRefMap;
                    self.addPages();
                    //self.setContainerSize(self.initialScale);
                });
            }, function (message) {
                self.onDataDownloaded("failed", 0, 0, "PDF.js: " + message);
            });
        };
        PDFViewer.prototype.setFile = function (file) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function(e) {
                var arrayBuffer = e.target.result;
                var uint8Array = new Uint8Array(arrayBuffer);
                var getDocumentTask = PDFJS.getDocument(uint8Array, null, angular.bind(self, self.passwordCallback), angular.bind(self, self.downloadProgress));
                getDocumentTask.then(function (pdf) {
                    self.pdf = pdf;

                    self.getAllPages(function (pageList, pagesRefMap) {
                        self.pages = pageList;
                        self.pagesRefMap = pagesRefMap;
                        self.addPages();
                        //self.setContainerSize(self.initialScale);
                    });
                }, function (message) {
                    self.onDataDownloaded("failed", 0, 0, "PDF.js: " + message);
                });
            };

            reader.onprogress = function (e) {
                self.downloadProgress(e);
            };

            reader.onloadend = function (e) {
                var error = e.target.error;
                if(error !== null) {
                    var message = "File API error: ";
                    switch(e.code) {
                        case error.ENCODING_ERR:
                            message += "Encoding error.";
                            break;
                        case error.NOT_FOUND_ERR:
                            message += "File not found.";
                            break;
                        case error.NOT_READABLE_ERR:
                            message += "File could not be read.";
                            break;
                        case error.SECURITY_ERR:
                            message += "Security issue with file.";
                            break;
                        default:
                            message += "Unknown error.";
                            break;
                    }

                    self.onDataDownloaded("failed", 0, 0, message);
                }
            };

            reader.readAsArrayBuffer(file);
        };
        PDFViewer.prototype.getAllPages = function (callback) {
            var pageList = [],
                pagesRefMap = {},
                numPages = this.pdf.numPages,
                remainingPages = numPages,
                self = this;

            if(this.hasTextLayer) {
                for(var iPage = 0;iPage < numPages;++iPage) {
                    pageList.push({});

                    var getPageTask = this.pdf.getPage(iPage + 1);
                    getPageTask.then(function (page) {
                        // Page reference map. Required by the annotation layer.
                        var refStr = page.ref.num + ' ' + page.ref.gen + ' R';
                        pagesRefMap[refStr] = page.pageIndex + 1;

                        var pdfPage = new PDFPage(self, page, true);
                        pageList[page.pageIndex] = pdfPage;

                        --remainingPages;
                        if(remainingPages === 0) {
                            callback(pageList, pagesRefMap);
                        }
                    });
                }
            } else {
                for(var iPage = 0;iPage < numPages;++iPage) {
                    pageList.push({});

                    var getPageTask = this.pdf.getPage(iPage + 1);
                    getPageTask.then(function (page) {
                        pageList[page.pageIndex] = new PDFPage(self, page, false);

                        --remainingPages;
                        if(remainingPages === 0) {
                            callback(pageList, pagesRefMap);
                        }
                    });
                }
            }
        };
        PDFViewer.prototype.onDestroy = function () {
            if(this.getDocumentTask){
                this.getDocumentTask.destroy();
                this.getDocumentTask = null;
            }
        };

        return (PDFViewer);
    }])

    .directive("pdfViewer", ['$log', 'PDFViewer', function ($log, PDFViewer) {
        var pageMargin = 10;

        return {
            restrict: "E",
            scope: {
                src: "@",
                file: "=",
                api: "=",
                options: "=",
                passwordCallback: "&"
            },
            controller: ['$scope', '$element', function ($scope, $element) {

                var getOption = function(optionName) {
                    if($scope.options === null || $scope.options === undefined) {
                        return null;
                    }
                    return $scope.options[optionName];
                };

                $scope.getPassword = function (passwordFunc, reason) {
                    if(this.passwordCallback) {
                        var self = this;
                        this.$apply(function () {
                            var password = self.passwordCallback({reason: reason});

                            if(password !== "" && password !== undefined && password !== null) {
                                passwordFunc(password);
                            } else {
                                $log.log("A password is required to read this document.");
                            }
                        });
                    } else {
                        $log.log("A password is required to read this document.");
                    }
                };

                var viewer = new PDFViewer($element);
                viewer.passwordCallback = angular.bind($scope, $scope.getPassword);

                $scope.api = viewer.getAPI();

                var shouldRenderTextLayer = function () {
                    var renderTextLayer = getOption("renderTextLayer");
                    if(typeof renderTextLayer === typeof true) {
                        return renderTextLayer;
                    }

                    return false;
                };

                $scope.onSrcChanged = function () {
                    viewer.open($scope.src, getOption("initialScale"), shouldRenderTextLayer(), getOption("orientation"), pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open($scope.file, getOption("initialScale"), shouldRenderTextLayer(), getOption("orientation"), pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function (scope, element, attrs) {
                attrs.$observe('src', scope.onSrcChanged);

                scope.$watch("file", scope.onFileChanged);
            }
        };
    }]);

'use strict';
/**
 * TODO TextLayerBuilder desc
 */
itPdfViewer.factory('TextLayerBuilder', ['CustomStyle', function (CustomStyle) {
        var MAX_TEXT_DIVS_TO_RENDER = 100000;

        var NonWhitespaceRegexp = /\S/;

        function isAllWhitespace(str) {
            return !NonWhitespaceRegexp.test(str);
        }

        function TextLayerBuilder(options) {
            this.textLayerDiv = options.textLayerDiv;
            this.renderingDone = false;
            this.divContentDone = false;
            this.pageIdx = options.pageIndex;
            this.pageNumber = this.pageIdx + 1;
            this.matches = [];
            this.viewport = options.viewport;
            this.textDivs = [];
            this.findController = options.findController || null;
        }

        TextLayerBuilder.prototype = {
            _finishRendering: function TextLayerBuilder_finishRendering() {
                this.renderingDone = true;

                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('textlayerrendered', true, true, {
                    pageNumber: this.pageNumber
                });
                this.textLayerDiv.dispatchEvent(event);
            },

            renderLayer: function TextLayerBuilder_renderLayer() {
                var textLayerFrag = document.createDocumentFragment();
                var textDivs = this.textDivs;
                var textDivsLength = textDivs.length;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // No point in rendering many divs as it would make the browser
                // unusable even after the divs are rendered.
                if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
                    this._finishRendering();
                    return;
                }

                var lastFontSize;
                var lastFontFamily;
                for (var i = 0; i < textDivsLength; i++) {
                    var textDiv = textDivs[i];
                    if (textDiv.dataset.isWhitespace !== undefined) {
                        continue;
                    }

                    var fontSize = textDiv.style.fontSize;
                    var fontFamily = textDiv.style.fontFamily;

                    // Only build font string and set to context if different from last.
                    if (fontSize !== lastFontSize || fontFamily !== lastFontFamily) {
                        ctx.font = fontSize + ' ' + fontFamily;
                        lastFontSize = fontSize;
                        lastFontFamily = fontFamily;
                    }

                    var width = ctx.measureText(textDiv.textContent).width;
                    if (width > 0) {
                        textLayerFrag.appendChild(textDiv);
                        var transform;
                        if (textDiv.dataset.canvasWidth !== undefined) {
                            // Dataset values come of type string.
                            var textScale = textDiv.dataset.canvasWidth / width;
                            transform = 'scaleX(' + textScale + ')';
                        } else {
                            transform = '';
                        }
                        var rotation = textDiv.dataset.angle;
                        if (rotation) {
                            transform = 'rotate(' + rotation + 'deg) ' + transform;
                        }
                        if (transform) {
                            CustomStyle.setProp('transform' , textDiv, transform);
                        }
                    }
                }

                this.textLayerDiv.appendChild(textLayerFrag);
                this._finishRendering();
                this.updateMatches();
            },

            /**
             * Renders the text layer.
             * @param {number} timeout (optional) if specified, the rendering waits
             *   for specified amount of ms.
             */
            render: function TextLayerBuilder_render(timeout) {
                if (!this.divContentDone || this.renderingDone) {
                    return;
                }

                if (this.renderTimer) {
                    clearTimeout(this.renderTimer);
                    this.renderTimer = null;
                }

                if (!timeout) { // Render right away
                    this.renderLayer();
                } else { // Schedule
                    var self = this;
                    this.renderTimer = setTimeout(function() {
                        self.renderLayer();
                        self.renderTimer = null;
                    }, timeout);
                }
            },

            appendText: function TextLayerBuilder_appendText(geom, styles) {
                var style = styles[geom.fontName];
                var textDiv = document.createElement('div');
                this.textDivs.push(textDiv);
                if (isAllWhitespace(geom.str)) {
                    textDiv.dataset.isWhitespace = true;
                    return;
                }
                var tx = PDFJS.Util.transform(this.viewport.transform, geom.transform);
                var angle = Math.atan2(tx[1], tx[0]);
                if (style.vertical) {
                    angle += Math.PI / 2;
                }
                var fontHeight = Math.sqrt((tx[2] * tx[2]) + (tx[3] * tx[3]));
                var fontAscent = fontHeight;
                if (style.ascent) {
                    fontAscent = style.ascent * fontAscent;
                } else if (style.descent) {
                    fontAscent = (1 + style.descent) * fontAscent;
                }

                var left;
                var top;
                if (angle === 0) {
                    left = tx[4];
                    top = tx[5] - fontAscent;
                } else {
                    left = tx[4] + (fontAscent * Math.sin(angle));
                    top = tx[5] - (fontAscent * Math.cos(angle));
                }
                textDiv.style.left = left + 'px';
                textDiv.style.top = top + 'px';
                textDiv.style.fontSize = fontHeight + 'px';
                textDiv.style.fontFamily = style.fontFamily;

                textDiv.textContent = geom.str;
                // |fontName| is only used by the Font Inspector. This test will succeed
                // when e.g. the Font Inspector is off but the Stepper is on, but it's
                // not worth the effort to do a more accurate test.
                if (PDFJS.pdfBug) {
                    textDiv.dataset.fontName = geom.fontName;
                }
                // Storing into dataset will convert number into string.
                if (angle !== 0) {
                    textDiv.dataset.angle = angle * (180 / Math.PI);
                }
                // We don't bother scaling single-char text divs, because it has very
                // little effect on text highlighting. This makes scrolling on docs with
                // lots of such divs a lot faster.
                if (textDiv.textContent.length > 1) {
                    if (style.vertical) {
                        textDiv.dataset.canvasWidth = geom.height * this.viewport.scale;
                    } else {
                        textDiv.dataset.canvasWidth = geom.width * this.viewport.scale;
                    }
                }
            },

            setTextContent: function TextLayerBuilder_setTextContent(textContent) {
                this.textContent = textContent;

                var textItems = textContent.items;
                for (var i = 0, len = textItems.length; i < len; i++) {
                    this.appendText(textItems[i], textContent.styles);
                }
                this.divContentDone = true;
            },

            convertMatches: function TextLayerBuilder_convertMatches(matches) {
                var i = 0;
                var iIndex = 0;
                var bidiTexts = this.textContent.items;
                var end = bidiTexts.length - 1;
                var queryLen = (this.findController === null ?
                    0 : this.findController.state.query.length);
                var ret = [];

                for (var m = 0, len = matches.length; m < len; m++) {
                    // Calculate the start position.
                    var matchIdx = matches[m];

                    // Loop over the divIdxs.
                    while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
                        iIndex += bidiTexts[i].str.length;
                        i++;
                    }

                    if (i === bidiTexts.length) {
                        console.error('Could not find a matching mapping');
                    }

                    var match = {
                        begin: {
                            divIdx: i,
                            offset: matchIdx - iIndex
                        }
                    };

                    // Calculate the end position.
                    matchIdx += queryLen;

                    // Somewhat the same array as above, but use > instead of >= to get
                    // the end position right.
                    while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
                        iIndex += bidiTexts[i].str.length;
                        i++;
                    }

                    match.end = {
                        divIdx: i,
                        offset: matchIdx - iIndex
                    };
                    ret.push(match);
                }

                return ret;
            },

            renderMatches: function TextLayerBuilder_renderMatches(matches) {
                // Early exit if there is nothing to render.
                if (matches.length === 0) {
                    return;
                }

                var bidiTexts = this.textContent.items;
                var textDivs = this.textDivs;
                var prevEnd = null;
                var pageIdx = this.pageIdx;
                var isSelectedPage = (this.findController === null ?
                    false : (pageIdx === this.findController.selected.pageIdx));
                var selectedMatchIdx = (this.findController === null ?
                    -1 : this.findController.selected.matchIdx);
                var highlightAll = (this.findController === null ?
                    false : this.findController.state.highlightAll);
                var infinity = {
                    divIdx: -1,
                    offset: undefined
                };

                function beginText(begin, className) {
                    var divIdx = begin.divIdx;
                    textDivs[divIdx].textContent = '';
                    appendTextToDiv(divIdx, 0, begin.offset, className);
                }

                function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
                    var div = textDivs[divIdx];
                    var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
                    var node = document.createTextNode(content);
                    if (className) {
                        var span = document.createElement('span');
                        span.className = className;
                        span.appendChild(node);
                        div.appendChild(span);
                        return;
                    }
                    div.appendChild(node);
                }

                var i0 = selectedMatchIdx, i1 = i0 + 1;
                if (highlightAll) {
                    i0 = 0;
                    i1 = matches.length;
                } else if (!isSelectedPage) {
                    // Not highlighting all and this isn't the selected page, so do nothing.
                    return;
                }

                for (var i = i0; i < i1; i++) {
                    var match = matches[i];
                    var begin = match.begin;
                    var end = match.end;
                    var isSelected = (isSelectedPage && i === selectedMatchIdx);
                    var highlightSuffix = (isSelected ? ' selected' : '');

                    if (this.findController) {
                        this.findController.updateMatchPosition(pageIdx, i, textDivs,
                            begin.divIdx, end.divIdx);
                    }

                    // Match inside new div.
                    if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
                        // If there was a previous div, then add the text at the end.
                        if (prevEnd !== null) {
                            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                        }
                        // Clear the divs and set the content until the starting point.
                        beginText(begin);
                    } else {
                        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
                    }

                    if (begin.divIdx === end.divIdx) {
                        appendTextToDiv(begin.divIdx, begin.offset, end.offset,
                            'highlight' + highlightSuffix);
                    } else {
                        appendTextToDiv(begin.divIdx, begin.offset, infinity.offset,
                            'highlight begin' + highlightSuffix);
                        for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
                            textDivs[n0].className = 'highlight middle' + highlightSuffix;
                        }
                        beginText(end, 'highlight end' + highlightSuffix);
                    }
                    prevEnd = end;
                }

                if (prevEnd) {
                    appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                }
            },

            updateMatches: function TextLayerBuilder_updateMatches() {
                // Only show matches when all rendering is done.
                if (!this.renderingDone) {
                    return;
                }

                // Clear all matches.
                var matches = this.matches;
                var textDivs = this.textDivs;
                var bidiTexts = this.textContent.items;
                var clearedUntilDivIdx = -1;

                // Clear all current matches.
                for (var i = 0, len = matches.length; i < len; i++) {
                    var match = matches[i];
                    var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
                    for (var n = begin, end = match.end.divIdx; n <= end; n++) {
                        var div = textDivs[n];
                        div.textContent = bidiTexts[n].str;
                        div.className = '';
                    }
                    clearedUntilDivIdx = match.end.divIdx + 1;
                }

                if (this.findController === null || !this.findController.active) {
                    return;
                }

                // Convert the matches on the page controller into the match format
                // used for the textLayer.
                this.matches = this.convertMatches(this.findController === null ?
                    [] : (this.findController.pageMatches[this.pageIdx] || []));
                this.renderMatches(this.matches);
            }
        };

        return (TextLayerBuilder);
    }]);

'use strict';
/**
 * TODO itProgressbarViewer desc
 */
itMultiPagesViewer.directive('itProgressbarViewer', [function(){
    return {
        scope: {
            api: "="
        },
        restrict: 'E',
        template :  '<div class="loader" >' +
        '<div class="progress-bar">' +
        '<span class="bar" ng-style=\'{width: api.downloadProgress + "%"}\'></span>' +
        '</div>' +
        '</div>'
    };
}]);
'use strict';
/**
 * TODO itToolbarViewer desc
 */
itMultiPagesViewer.directive('itToolbarViewer', ['$log', function($log){
    var linker = function (scope, element, attrs) {

        scope.$watch("api.getZoomLevel()", function (value) {
            scope.scale = value;
        });

        scope.$watch("api.getSelectedPage()", function (value) {
            scope.currentPage = value;
        });

        scope.onZoomLevelChanged = function() {
            scope.api.zoomTo(scope.scale);
        };

        scope.onPageChanged = function() {
            scope.api.goToPage(scope.currentPage);
        };
    };

    return {
        scope: {
            api: "="
        },
        restrict: 'E',
        template :  '<div class="toolbar">' +
        '<div class="zoom_wrapper" ng-show="api.getNumPages() > 0">' +
        '<button type="button" ng-click="api.zoomOut()">-</button> ' +
        '<select ng-model="scale" ng-change="onZoomLevelChanged()" ng-options="zoom as zoom.label for zoom in api.getZoomLevels()">' +
        '</select> ' +
        '<button type="button" ng-click="api.zoomIn()">+</button> ' +
        '</div>' +

        '<div class="select_page_wrapper" ng-show="api.getNumPages() > 1">' +
        '<span>Page : </span>' +
        '<button type="button" ng-click="api.goToPrevPage()"><</button> ' +
        '<input type="text" ng-model="currentPage" ng-change="onPageChanged()"/> ' +
        '<button type="button" ng-click="api.goToNextPage()">></button> ' +
        '<span> of {{api.getNumPages()}}</span> ' +
        '</div>' +

        '<div class="zoom_wrapper" ng-show="api.getNumPages() > 0">' +
        '<button type="button" ng-click="api.rotatePageRight()"><i class="fa fa-repeat" aria-hidden="true"></i></button>' +
        '<button type="button" ng-click="api.rotatePageLeft()"><i class="fa fa-undo" aria-hidden="true"></i></button>' +
        '</div>' +
        '</div>',
        link: linker
    };
}])

'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesAddEventWatcher', ['$sce', function ($sce) {
    return function (scope) {
        if(scope){
            scope.$watch("src", function (src) {
                if(typeof src === typeof "") {
                    scope.url = src;
                }else{
                    scope.file = src;
                }
            });

            scope.$watch("options.$$api", function (api) {
                if(api) {
                    scope.options.getApi = function() {
                        return api;
                    };
                    if(scope.options && scope.options.onApiLoaded) {
                        scope.options.onApiLoaded(api);
                    }
                }
            });

            scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src)
            }; 
        }
    };
}]);

'use strict';
/**
 * TODO MultiPagesConstants desc
 */
itMultiPagesViewer.constant("MultiPagesConstants", {
    PAGE_RENDER_FAILED : -1,
    PAGE_RENDER_CANCELLED : 0,
    PAGE_RENDERED : 1,
    PAGE_ALREADY_RENDERED : 2,
    ZOOM_LEVELS_LUT : [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
        1.0, 1.1, 1.3, 1.5, 1.7, 1.9,
        2.0, 2.2, 2.4, 2.6, 2.8,
        3.0, 3.3, 3.6, 3.9,
        4.0, 4.5,
        5.0],
    ZOOM_FIT_WIDTH : "fit_width",
    ZOOM_FIT_PAGE : "fit_page",
    ZOOM_FIT_HEIGHT : "fit_height",
    ORIENTATION_VERTICAL : "vertical",
    ORIENTATION_HORIZONTAL : "horizontal"
})

'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('MultiPagesPage', ['$log' , 'MultiPagesConstants', 'PageViewport' , 'ZoomSelection', function ($log, MultiPagesConstants, PageViewport, ZoomSelection) {

    function MultiPagesPage(viewer, pageIndex, view) {
        this.viewer = viewer;
        this.pageIndex = pageIndex;
        this.id = pageIndex + 1;


        this.container = angular.element('<div></div>');
        this.container.attr("id", "page_" + pageIndex);

        this.wrapper = angular.element('<div class="page {{api.isPageSelected(' + this.id + ')}}"  ></div>');
        this.container.append(this.wrapper);

        this.canvasRendered = false;
        this.rendered = false;

        //transform
        this.rotation = 0;
        this.scale = 1.0;
        this.view = view;

    }

    MultiPagesPage.prototype = {
        clear: function () {
            this.rendered = false;
            this.wrapper.empty();
            this.layer = null;
            if(this.cleanUp) {
                this.cleanUp();
            }
        },
        getViewport: function (scale, rotation) {
            return new PageViewport(this.view, scale, rotation, 0, 0, true);
        },
        transform : function() {
            this.clear();
            this.viewport = this.getViewport(this.scale, this.rotation);
            this.canvasRendered = false;
            this.canvas = angular.element("<canvas></canvas>");
            this.canvas.attr("width", this.viewport.width);
            this.canvas.attr("height", this.viewport.height);

            this.wrapper.css("width", this.viewport.width + "px");
            this.wrapper.css("height", this.viewport.height + "px");
        },
        resize: function (scale) {
            this.setOrientation();
            this.scale = scale;
            this.transform();
        },
        setOrientation : function(orientation) {
            //this.orientation = orientation;
            switch (this.viewer.orientation) {
                case MultiPagesConstants.ORIENTATION_HORIZONTAL :
                    this.container.addClass("horizontal");
                    this.container.removeClass("vertical");
                    break;
                default:
                    this.container.addClass("vertical");
                    this.container.removeClass("horizontal");
                    break;
            };
        },
        rotate: function (rotation) {
            this.rotation = rotation;
            this.transform();
        },
        isVisible: function () {
            var pageContainer = this.container[0];
            var parentContainer = this.container.parent()[0];
            switch (this.viewer.orientation) {
                case MultiPagesConstants.ORIENTATION_HORIZONTAL :
                    var pageLeft = pageContainer.offsetLeft - parentContainer.scrollLeft;
                    var pageRight = pageLeft + pageContainer.offsetWidth;
                    return (pageRight >= 0 && pageLeft <= parentContainer.offsetWidth);
                    break;
                default:
                    var pageTop = pageContainer.offsetTop - parentContainer.scrollTop;
                    var pageBottom = pageTop + pageContainer.offsetHeight;
                    return (pageBottom >= 0 && pageTop <= parentContainer.offsetHeight);
                    break;
            };
        },
        addLayer : function(layer) {
            if(this.layer == null) {
                this.layer = angular.element("<div class='selectable-layer'></div>");
                this.wrapper.append(this.layer);
            }
            this.layer.append(layer);
        },
        initSelectZoom : function () {
            function setMousePosition(e) {
                var ev = e || window.event; //Moz || IE
                var offset = self.wrapper[0].getBoundingClientRect();
                if (ev.pageX) { //Moz
                    mouse.x = (ev.pageX - offset.left);
                    mouse.y = (ev.pageY - offset.top);
                } else if (ev.clientX) { //IE
                    mouse.x = (ev.clientX - offset.left);
                    mouse.y = (ev.clientY  - offset.top);
                }
            };

            var self = this,
                mouse = {
                    x: 0,
                    y: 0,
                    startX: 0,
                    startY: 0
                },
                rect = null,
                element = null,
                onMouseDown = function (e) {
                    if(e.ctrlKey) {
                        if(rect == null) {
                            setMousePosition(e);

                            if(self.layer) {
                                self.layer.removeClass("selectable-layer");
                            }
                            mouse.startX = mouse.x;
                            mouse.startY = mouse.y;
                            rect = {};
                            rect.offsetX = mouse.x;
                            rect.offsetY = mouse.y;
                            element = angular.element('<div class="rectangle"></div>');
                            element.css("left",  mouse.x + 'px');
                            element.css("top",  mouse.y + 'px');
                            self.wrapper.append(element);
                            self.viewer.element.on('mouseup', onMouseUp);
                            self.viewer.element.on('mousemove', onMouseMove);
                            self.viewer.element.addClass("viewer-zoom-cursor");
                        }
                    } else {
                        self.viewer.selectedPage = self.id;
                        if(self.viewer.onPageClicked) {
                            self.viewer.onPageClicked(self.id);
                        }
                        if(self.viewer.api.onPageClicked) {
                            self.viewer.api.onPageClicked(self.id);
                        }
                    }

                },
                onMouseUp = function (e) {
                    self.viewer.element.removeClass("viewer-zoom-cursor");
                    self.viewer.element.off('mouseup', onMouseUp);
                    self.viewer.element.off('mousemove', onMouseMove);
                    if(rect != null) {
                        if(self.layer) {
                            self.layer.addClass("selectable-layer");
                        }
                        if(rect.width > 10 || rect.height > 10) {
                            self.viewer.zoomTo(new ZoomSelection(rect, self));
                        }

                        element.remove();
                        element = null;
                        rect = null;
                    }
                },
                onMouseMove = function (e) {
                    setMousePosition(e);
                    if (rect !== null) {
                        rect.width =  Math.abs(mouse.x - mouse.startX);
                        rect.height = Math.abs(mouse.y - mouse.startY);
                        rect.offsetLeft = (mouse.x - mouse.startX < 0) ? mouse.x : mouse.startX;
                        rect.offsetTop = (mouse.y - mouse.startY < 0) ? mouse.y : mouse.startY;
                        element.css("width", rect.width + 'px');
                        element.css("height", rect.height + 'px');
                        element.css("left", rect.offsetLeft + 'px');
                        element.css("top", rect.offsetTop + 'px');
                    }
                };

            self.container.on('mousedown', onMouseDown);

            self.cleanUp = function () {
                self.container.off('mousedown', onMouseDown);
            };
        },
        render: function (callback) {
            if(this.rendered) {
                if(callback) {
                    callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
                }
                return;
            };

            $log.debug("render page " + this.id +" started");
            var start = new Date();
            this.rendered = true;
            this.initSelectZoom();
            this.renderPage(this, function (page, status) {
                if(status === MultiPagesConstants.PAGE_RENDERED) {
                    page.canvasRendered = true;
                    $log.debug("render page " + page.id +" ended, duration : " + (( (new Date() - start)  % 60000) / 1000).toFixed(0) + " sec");
                }
                if(callback) {
                    callback(page, status);
                }
            });
        },
        renderPage: function (page, callback) {
            throw "NotImplementedError - renderPage(page, callback)";
        }
    };

    return (MultiPagesPage);
}]);

'use strict';
/**
 * TODO MultiPagesViewer desc
 */
itMultiPagesViewer.factory('MultiPagesViewer', ['$log' ,'$timeout', '$compile', '$document' , 'MultiPagesViewerAPI' , 'MultiPagesConstants' , 'SizeWatcher' ,'TranslateViewer', function ($log,$timeout,$compile, $document, MultiPagesViewerAPI, MultiPagesConstants, SizeWatcher, TranslateViewer) {
    function getElementInnerSize(element, margin) {
        var tallTempElement = angular.element("<div></div>");
        tallTempElement.css("height", "10000px");

        element.append(tallTempElement);

        var w = tallTempElement[0].offsetWidth;

        tallTempElement.remove();

        var h = element[0].offsetHeight;
        if(h === 0) {
            // TODO: Should we get the parent height?
            h = 2 * margin;
        }

        w -= 2 * margin;
        h -= 2 * margin + 10;

        return {
            width: w,
            height: h
        };
    };

    function MultiPagesViewer(api, element) {
        this.pages = [];
        this.scaleItem = null;
        this.fitWidthScale = 1.0;
        this.fitHeightScale = 1.0;
        this.fitPageScale = 1.0;
        this.element = element;
        this.pageMargin = 0;
        this.orientation = MultiPagesConstants.ORIENTATION_VERTICAL;
        this.currentPage = 0;
        this.lastScrollDir = 0;
        this.rotation = 0;
        this.scaleItems = {};
        this.zoomLevels = [];
        this.api = api;

        // Hooks for the client...
        this.onPageRendered = null;
        this.onDataDownloaded = null;
        this.onCurrentPageChanged = null;

        if(element != null) {
            this.toggleMouseDrag();
        }
    }

    MultiPagesViewer.prototype = {
        toggleMouseDrag : function() {
            var element = this.element;
            var container = element[0];
            var data = {
                acceptPropagatedEvent : true,
                preventDefault : true
            };
            var onMouseDown = function (event) {
                    if(event.ctrlKey != true) {
                        element.css("cursor", "-webkit-grabbing");
                        element.css("cursor", "grabbing");
                        // mousedown, left click, check propagation
                        if (event.which!=1 ||
                            (!data.acceptPropagatedEvent && event.target != this)){
                            return false;
                        }

                        // Initial coordinates will be the last when dragging
                        data.lastCoord = {left: event.clientX, top: event.clientY};

                        $document.on('mouseup', onMouseUp);
                        $document.on('mousemove', onMouseMove);
                        if (data.preventDefault) {
                            event.preventDefault();
                            return false;
                        }
                    }
                },
                onMouseMove = function (event) {
                    // How much did the mouse move?
                    var delta = {left: (event.clientX - data.lastCoord.left),
                        top: (event.clientY - data.lastCoord.top)};

                    // Set the scroll position relative to what ever the scroll is now
                    container.scrollLeft = container.scrollLeft - delta.left;
                    container.scrollTop = container.scrollTop - delta.top;

                    // Save where the cursor is
                    data.lastCoord={left: event.clientX, top: event.clientY};
                    if (data.preventDefault) {
                        event.preventDefault();
                        return false;
                    }
                },
                onMouseUp = function (event) {
                    $document.off('mouseup', onMouseUp);
                    $document.off('mousemove', onMouseMove);
                    element.css("cursor", "-webkit-grab");
                    element.css("cursor", "grab");
                    if (data.preventDefault) {
                        event.preventDefault();
                        return false;
                    }
                };

            element.on('mousedown', onMouseDown);
            element.css("cursor", "-webkit-grab");
            element.css("cursor", "grab");

            this.cleanUp = function () {
                element.off('mousedown', onMouseDown);
            };
        },
        getAPI: function () {
            return this.api;
        },
        zoomTo : function(zoomSelection) {
            var page = this.pages[zoomSelection.pageIndex];
            if(page != undefined) {
                var rect = {
                    width : (page.viewport.width * zoomSelection.percentWidth) / 100,
                    height : (page.viewport.height * zoomSelection.percentHeight) / 100
                };
                var containerSize = {
                    width: this.containerSize.width * this.scaleItem.value,
                    height: this.containerSize.height * this.scaleItem.value
                };

                var mainProperty = rect.width > rect.height ? "width" : "height";
                var numZoomLevels = this.zoomLevels.length;
                for (var i = 0; i < numZoomLevels; ++i) {
                    var zoomLevel = this.zoomLevels[i];
                    var nextZoomLevel = this.zoomLevels[i + 1];

                    var rectValue = rect[mainProperty];

                    if ((nextZoomLevel == null || (zoomLevel.value * rectValue) <= containerSize[mainProperty] && (nextZoomLevel.value * rectValue) >= containerSize[mainProperty])) {
                        if(this.scaleItem.value != zoomLevel.value) {
                            this.setScale(zoomLevel);
                        }

                        var scrollTop = ((page.viewport.height * zoomSelection.percentTop) / 100) + page.container[0].offsetTop;
                        var scrollLeft = ((page.viewport.width * zoomSelection.percentLeft) / 100) + page.container[0].offsetLeft;

                        this.element[0].scrollTop = scrollTop;
                        this.element[0].scrollLeft = scrollLeft;

                        if(zoomSelection.pageIndex === 0) {
                            this.renderAllVisiblePages();
                        }

                        if(this.api.onZoomToSelection) {
                            this.api.onZoomToSelection(zoomSelection);
                        }
                        break;
                    }
                }
            }
        },
        addPages : function () {
            // Append all page containers to the $element...
            var numPages = this.pages.length;
            for(var iPage = 0;iPage < numPages; ++iPage) {
                this.element.append(this.pages[iPage].container);
            }
            this.onPageRendered("loaded", 1, numPages, "");
            this.setContainerSize(this.initialScale);
        },
        updateScaleItem : function(scaleItem) {
            var result = this.scaleItems[scaleItem.id];
            if(result == undefined){
                this.scaleItems[scaleItem.id] = scaleItem;
                result = scaleItem;
            }else{
                result.value = scaleItem.value;
            }

            this.zoomLevels.push(result);

            return result;
        },
        setContainerSize: function (initialScale) {
            if(this.pages.length > 0) {
                var containerSize = getElementInnerSize(this.element, this.pageMargin);
                if(containerSize.width > 0 && containerSize.height > 0) {
                    if(this.onContainerSizeChanged) {
                        this.onContainerSizeChanged(containerSize);
                    }
                    this.containerSize = containerSize;

                    var oldScaleValue = this.scaleItem ? this.scaleItem.value : null;

                    this.fitWidthScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_WIDTH);
                    this.fitHeightScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_HEIGHT);
                    this.fitPageScale = this.calcScale(MultiPagesConstants.ZOOM_FIT_PAGE);

                    this.zoomLevels = [];
                    var numZoomLevels = MultiPagesConstants.ZOOM_LEVELS_LUT.length - 1;
                    for(var i = 0;i < numZoomLevels;++i) {
                        var scaleItem = null;
                        var scale = MultiPagesConstants.ZOOM_LEVELS_LUT[i];
                        var newScale = MultiPagesConstants.ZOOM_LEVELS_LUT[i + 1];
                        if (scale < this.fitWidthScale && newScale > this.fitWidthScale) {
                            scaleItem = this.updateScaleItem({
                                id: MultiPagesConstants.ZOOM_FIT_WIDTH,
                                value : this.fitWidthScale,
                                label: TranslateViewer.translate('GLOBAL.VIEWER.FIT_WIDTH_LABEL', 'Fit width')
                            });
                        }

                        if (scale < this.fitHeightScale && newScale > this.fitHeightScale) {
                            scaleItem = this.updateScaleItem({
                                id: MultiPagesConstants.ZOOM_FIT_HEIGHT,
                                value : this.fitHeightScale,
                                label: TranslateViewer.translate('GLOBAL.VIEWER.FIT_HEIGHT_LABEL', 'Fit height')
                            });
                        }

                        if (scale < this.fitPageScale && newScale > this.fitPageScale) {
                            scaleItem = this.updateScaleItem({
                                id: MultiPagesConstants.ZOOM_FIT_PAGE,
                                value : this.fitPageScale,
                                label: TranslateViewer.translate('GLOBAL.VIEWER.FIT_PAGE_LABEL', 'Fit page')
                            });
                        }

                        var label = (newScale * 100.0).toFixed(0) + "%";
                        scaleItem = this.updateScaleItem({
                            id: label,
                            value : newScale,
                            label: label
                        });
                    }

                    if (this.scaleItem == undefined && initialScale) {
                        if(this.scaleItems[initialScale] != undefined) {
                            this.scaleItem = this.scaleItems[initialScale];
                        }else{
                            $log.debug("InitialScale not found : " + initialScale);
                        }
                    }

                    if(this.api.onZoomLevelsChanged) {
                        this.api.onZoomLevelsChanged(this.zoomLevels);
                    }

                    if(this.scaleItem != null && this.scaleItem.value === oldScaleValue && this.pages[0] && this.pages[0].viewport != null) {
                        this.renderAllVisiblePages();
                        return;
                    }

                    this.setScale(this.scaleItem);
                    this.render();
                }
            }
        },
        hasMultiplePages: function() {
            return this.pages.length > 1;
        },
        setOrientation : function (orientation) {
            this.orientation = orientation;
            if(this.hasMultiplePages()) {
                this.setScale(this.scaleItem);
                this.render();
            }
        },
        setScale: function (scaleItem) {
            if(scaleItem != undefined){
                this.scaleItem = scaleItem;
            }
            var sci = scaleItem  || this.scaleItems["100%"];

            var numPages = this.pages.length;

            for(var iPage = 0;iPage < numPages;++iPage) {
                var page = this.pages[iPage];
                // Resize to current scaleItem...
                page.resize(sci.value);
            }
        },
        calcScale: function (desiredScale) {
            if(desiredScale === MultiPagesConstants.ZOOM_FIT_WIDTH) {
                // Find the widest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var page = this.pages[0];
                var maxWidth = page.getViewport(1.0, page.rotation).width;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    page = this.pages[iPage];
                    maxWidth = Math.max(maxWidth, page.getViewport(1.0, page.rotation).width);
                }

                return this.containerSize.width / maxWidth;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_HEIGHT) {
                // Find the highest page in the document and fit it to the container.
                var numPages = this.pages.length;
                var page = this.pages[0];
                var maxHeight = page.getViewport(1.0, page.rotation).height;
                for(var iPage = 1;iPage < numPages;++iPage) {
                    page = this.pages[iPage];
                    maxHeight = Math.max(maxHeight, page.getViewport(1.0, page.rotation).height);
                }

                return this.containerSize.height / maxHeight;
            } else if(desiredScale === MultiPagesConstants.ZOOM_FIT_PAGE) {
                // Find the smaller dimension of the container and fit the 1st page to it.
                var page = this.pages[0];
                var page0Viewport = page.getViewport(1.0, page.rotation);

                if(this.containerSize.height < this.containerSize.width) {
                    return this.containerSize.height / page0Viewport.height;
                }

                return this.containerSize.width / page0Viewport.width;
            }

            var scale = parseFloat(desiredScale);
            if(isNaN(scale)) {
                $log.debug("PDF viewer: " + desiredScale + " isn't a valid scaleItem value.");
                return 1.0;
            }

            return scale;
        },
        removeDistantPages: function (curPageID, lastPageID, distance) {
            var numPages = this.pages.length;

            var firstActivePageID = Math.max(curPageID - distance, 0);
            var lastActivePageID = Math.min(lastPageID + distance, numPages - 1);

            for(var iPage = 0;iPage < firstActivePageID;++iPage) {
                this.pages[iPage].clear();
            }

            for(var iPage = lastActivePageID + 1;iPage < numPages;++iPage) {
                this.pages[iPage].clear();
            }
        },
        renderAllVisiblePages: function (scrollDir) {
            if(scrollDir != undefined){
                this.lastScrollDir = scrollDir;
            }

            var self = this;
            var numPages = this.pages.length;
            var currentPageID = -1;
            var lastPageID = 0;
            var atLeastOnePageInViewport = false;
            for(var iPage = 0;iPage < numPages;++iPage) {
                var page = this.pages[iPage];

                if(page.isVisible()) {
                    var parentContainer = page.container.parent()[0];
                    var pageContainer = page.container[0];

                    if(self.hasMultiplePages()) {
                        if(currentPageID === -1) {
                            if(this.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                                var pageLeft = pageContainer.offsetLeft - parentContainer.scrollLeft;
                                var pageCenter = pageContainer.offsetWidth / 1.5;
                                if((pageCenter + pageLeft) >= 0) {
                                    currentPageID = iPage;
                                }
                            } else {
                                var pageTop = pageContainer.offsetTop - parentContainer.scrollTop;
                                var pageCenter = pageContainer.offsetHeight / 1.5;
                                if((pageCenter + pageTop) >= 0) {
                                    currentPageID = iPage;
                                }
                            }
                        }
                    } else {
                        currentPageID = iPage;
                    }



                    atLeastOnePageInViewport = true;
                    lastPageID = iPage;
                    page.render(function (page, status) {
                        if(status === MultiPagesConstants.PAGE_RENDERED) {
                            self.onPageRendered("success", page.id, self.pages.length, "");
                        } else if (status === MultiPagesConstants.PAGE_RENDER_FAILED) {
                            self.onPageRendered("failed", page.id, self.pages.length, "Failed to render page.");
                        }
                    });
                } else {
                    if(atLeastOnePageInViewport) {
                        break;
                    }
                }
            }

            if(currentPageID === -1) {
                currentPageID = lastPageID;
            }

            if(self.hasMultiplePages()) {
                this.clearDistantSelectedPage(currentPageID + 1, lastPageID + 1);

                if(this.lastScrollDir !== 0) {
                    var nextPageID = (this.lastScrollDir > 0 ? lastPageID : currentPageID) + this.lastScrollDir;
                    if(nextPageID >= 0 && nextPageID < numPages) {
                        this.pages[nextPageID].render(function (page, status) {
                            if(status === MultiPagesConstants.PAGE_RENDERED) {
                                self.onPageRendered("success", page.id, self.pages.length, "");
                            } else if (status === MultiPagesConstants.PAGE_RENDER_FAILED) {
                                self.onPageRendered("failed", page.id, self.pages.length, "Failed to render page.");
                            }
                        });
                    }
                }

                this.removeDistantPages(currentPageID, lastPageID, 1);
            }

            this.currentPage = currentPageID + 1;
            //this.currentPage = (this.lastScrollDir > 0 ? currentPageID : lastPageID) + 1;
            if(this.onCurrentPageChanged) {
                this.onCurrentPageChanged( currentPageID + 1);
            }
        },
        clearDistantSelectedPage: function (currentPageID, lastPageID) {
            if(this.selectedPage <= currentPageID || this.selectedPage > lastPageID) {
                this.selectedPage = null;
            }
        },
        render: function () {
            if(this.currentPage != 0 && this.currentPage != 1) {
                this.api.goToPage(this.api.getSelectedPage());
            }else{
                this.renderAllVisiblePages();
            }
        },
        rotate : function (args) {
            if(args != undefined) {
                var page = this.pages[args.pageIndex];
                if(page != undefined) {
                    var rotation = page.viewport.rotation + args.rotation;
                    if(rotation === 360 || rotation === -360){
                        rotation = 0;
                    }
                    page.viewport.rotation = rotation;
                    page.rotate(rotation);
                    if(this.api.onPageRotation) {
                        this.api.onPageRotation(args);
                    }
                    this.setContainerSize(this.initialScale);

                    if(this.thumbnail) {
                        this.thumbnail.rotate(args);
                    }
                }
            }
        },
        rotatePages : function (rotation) {
            var numPages = this.pages.length;
            var currentRotation = this.rotation - rotation;
            if(currentRotation === 360 || currentRotation === -360){
                currentRotation = 0;
            }
            this.rotation = currentRotation;
            for(var iPage = 0;iPage < numPages;++iPage) {
                this.pages[iPage].rotate(currentRotation);
            }

            this.setContainerSize(this.initialScale);

            if(this.thumbnail) {
                this.thumbnail.rotatePages(rotation);
            }
        },
        downloadProgress: function(progressData) {
            // JD: HACK: Sometimes (depending on the server serving the TIFFs) TIFF.js doesn't
            // give us the total size of the document (total == undefined). In this case,
            // we guess the total size in order to correctly show a progress bar if needed (even
            // if the actual progress indicator will be incorrect).
            var total = 0;
            if (typeof progressData.total === "undefined")
            {
                while (total < progressData.loaded)
                {
                    total += 1024 * 1024;
                }
            }
            else {
                total = progressData.total;
            }

            if(this.onDataDownloaded){
                this.onDataDownloaded("loading", progressData.loaded, total, "");
            }
        },
        hookScope: function(scope) {
            var self = this;
            var lastScrollY = 0;
            var watcher = new SizeWatcher(self.element[0], 200);
            scope.$watchGroup(watcher.group, function(values) {
                if (scope.sizeWatcherTimeout) $timeout.cancel(scope.sizeWatcherTimeout);
                scope.sizeWatcherTimeout = $timeout(function() {
                    $log.debug("SizeChanged");
                    self.setContainerSize(self.initialScale);
                }, 450);
            });

            scope.$watch("options.orientation", function (value) {
                self.setOrientation(value);
            });

            var onProgress = function(operation, state, value, total, message) {
                if (operation === "render" && value === 1) {
                    if (state === "loaded") {
                        $compile(self.element.contents())(scope);
                    }
                    else if (state === "success") {
                        $log.debug("onProgress(" + operation + ", " + state + ", " + value + ", " + total + ")");
                    }
                    else {
                        if(self.api.onError) {
                            self.api.onError(operation, message);
                        } else {
                            $log.debug("Failed to render 1st page!\n\n" + message);
                        }
                    }
                }
                else if (operation === "download" && state === "loading") {
                    self.api.downloadProgress = (value / total) * 100.0;
                }
                else {
                    if (state === "failed") {
                        if(self.api.onError) {
                            self.api.onError(operation, message);
                        } else {
                            $log.debug("Something went really bad!\n\n" + message);
                        }
                    }
                }
            };

            scope.onPageRendered = function(status, pageID, numPages, message) {
                onProgress("render", status, pageID, numPages, message);
            };

            scope.onDataDownloaded = function(status, loaded, total, message) {
                onProgress("download", status, loaded, total, message);
            };

            self.onPageRendered = angular.bind(scope, scope.onPageRendered);
            self.onDataDownloaded = angular.bind(scope, scope.onDataDownloaded);

            scope.$on('$destroy', function() {
                if(self.onDestroy != null){
                    try	{

                    }catch (ex)
                    {
                        $log.log(ex);
                    }
                    self.onDestroy();
                }
                self.thumbnail = null;
                watcher.cancel();
                self.element.empty();
                $log.debug("viewer destroyed");
            });

            self.element.bind("scroll", function(event) {
                if (scope.scrollTimeout) $timeout.cancel(scope.scrollTimeout);
                scope.scrollTimeout = $timeout(function() {
                    var scrollTop = self.element[0].scrollTop;

                    var scrollDir = scrollTop - lastScrollY;
                    lastScrollY = scrollTop;

                    var normalizedScrollDir = scrollDir > 0 ? 1 : (scrollDir < 0 ? -1 : 0);
                    self.renderAllVisiblePages(normalizedScrollDir);
                }, 350);
            });
        }
    };

    return (MultiPagesViewer);
}]);

'use strict';
/**
 * TODO MultiPagesViewerAPI desc
 */
itMultiPagesViewer.factory('MultiPagesViewerAPI', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {

    function MultiPagesViewerAPI(viewer) {
        this.viewer = viewer;
    };

    MultiPagesViewerAPI.prototype = {
        getViewer: function () {
            return this.viewer;
        },
        getZoomLevels: function () {
            return this.viewer.zoomLevels;
        },
        zoomTo: function (scaleItem) {
            if(scaleItem != undefined) {
                this.viewer.setScale(scaleItem);
                this.viewer.render();
            }
        },
        getZoomLevel: function () {
            return this.viewer.scaleItem;
        },
        zoomToSelection: function (zoomSelection) {
            this.viewer.zoomTo(zoomSelection);
        },
        zoomIn: function() {
            var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
            if(index < this.viewer.zoomLevels.length) {
                this.zoomTo(this.viewer.zoomLevels[index + 1]);
            }
        },
        zoomOut: function() {
            var index = this.viewer.zoomLevels.indexOf(this.getZoomLevel());
            if(index > 0) {
                this.zoomTo(this.viewer.zoomLevels[index - 1]);
            }
        },
        getCurrentPage: function () {
            return this.viewer.currentPage;
        },
        getSelectedPage: function () {
            return this.viewer.selectedPage || this.viewer.currentPage;
        },
        isPageSelected: function(pageIndex) {
            return (this.getSelectedPage() === pageIndex) ? "selected" : null;
        },
        goToPage: function (pageIndex) {
            if(pageIndex < 1 || pageIndex > this.getNumPages()) {
                return;
            }
            var pageContainer = this.viewer.pages[pageIndex - 1].container[0];
            var element = this.viewer.element[0];
            //this.viewer.pages[pageIndex - 1].container[0].scrollIntoView();
            if(this.viewer.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                var offsetLeft = pageContainer.offsetLeft - 10;
                if(Math.round(element.scrollLeft) === offsetLeft){
                    offsetLeft -= 1;
                }
                element.scrollLeft = offsetLeft;
                element.scrollTop = 0;
            } else {
                var offsetTop = pageContainer.offsetTop - 10;
                if(Math.round(element.scrollTop) === offsetTop){
                    offsetTop -= 1;
                }
                element.scrollTop = offsetTop;
                element.scrollLeft = 0;
            }
        },
        goToNextPage: function () {
            this.goToPage(this.getSelectedPage() + 1);
        },
        goToPrevPage: function () {
            this.goToPage(this.getSelectedPage() - 1);
        },
        getNumPages: function () {
            return this.viewer.pages.length;
        },
        rotatePagesRight: function() {
            this.viewer.rotatePages(90);
        },
        rotatePagesLeft: function() {
            this.viewer.rotatePages(-90);
        },
        rotatePageRight: function(pageIndex) {
            this.rotatePage({ pageIndex : (pageIndex | this.getSelectedPage() -1), rotation: 90 });
        },
        rotatePageLeft: function(pageIndex) {
            this.rotatePage({ pageIndex : (pageIndex | this.getSelectedPage() -1), rotation: -90 });
        },
        rotatePage: function(args) {
            this.viewer.rotate(args);
        }
    };

    return (MultiPagesViewerAPI);
}]);


'use strict';
/**
 * TODO PageViewport desc
 */
itMultiPagesViewer.factory('PageViewport', [function() {
    function PageViewport(viewBox, scale, rotation, offsetX, offsetY, dontFlip) {
        this.viewBox = viewBox;
        this.scale = scale;
        this.rotation = rotation;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        // creating transform to convert pdf coordinate system to the normal
        // canvas like coordinates taking in account scale and rotation
        var centerX = (viewBox[2] + viewBox[0]) / 2;
        var centerY = (viewBox[3] + viewBox[1]) / 2;
        var rotateA, rotateB, rotateC, rotateD;
        rotation = rotation % 360;
        rotation = rotation < 0 ? rotation + 360 : rotation;
        switch (rotation) {
            case 180:
                rotateA = -1; rotateB = 0; rotateC = 0; rotateD = 1;
                break;
            case 90:
                rotateA = 0; rotateB = 1; rotateC = 1; rotateD = 0;
                break;
            case 270:
                rotateA = 0; rotateB = -1; rotateC = -1; rotateD = 0;
                break;
            //case 0:
            default:
                rotateA = 1; rotateB = 0; rotateC = 0; rotateD = -1;
                break;
        }

        if (dontFlip) {
            rotateC = -rotateC; rotateD = -rotateD;
        }

        var offsetCanvasX, offsetCanvasY;
        var width, height;
        if (rotateA === 0) {
            offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
            offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
            width = Math.abs(viewBox[3] - viewBox[1]) * scale;
            height = Math.abs(viewBox[2] - viewBox[0]) * scale;
        } else {
            offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
            offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
            width = Math.abs(viewBox[2] - viewBox[0]) * scale;
            height = Math.abs(viewBox[3] - viewBox[1]) * scale;
        }
        // creating transform for the following operations:
        // translate(-centerX, -centerY), rotate and flip vertically,
        // scale, and translate(offsetCanvasX, offsetCanvasY)
        this.transform = [
            rotateA * scale,
            rotateB * scale,
            rotateC * scale,
            rotateD * scale,
            offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY,
            offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY
        ];

        this.width = width;
        this.height = height;
        this.fontScale = scale;
    }
    PageViewport.prototype = /** @lends PDFJS.PageViewport.prototype */ {
        /**
         * Clones viewport with additional properties.
         * @param args {Object} (optional) If specified, may contain the 'scale' or
         * 'rotation' properties to override the corresponding properties in
         * the cloned viewport.
         * @returns {PDFJS.PageViewport} Cloned viewport.
         */
        clone: function PageViewPort_clone(args) {
            args = args || {};
            var scale = 'scale' in args ? args.scale : this.scale;
            var rotation = 'rotation' in args ? args.rotation : this.rotation;
            return new PageViewport(this.viewBox.slice(), scale, rotation,
                this.offsetX, this.offsetY, args.dontFlip);
        },
        /**
         * Converts PDF point to the viewport coordinates. For examples, useful for
         * converting PDF location into canvas pixel coordinates.
         * @param x {number} X coordinate.
         * @param y {number} Y coordinate.
         * @returns {Object} Object that contains 'x' and 'y' properties of the
         * point in the viewport coordinate space.
         * @see {@link convertToPdfPoint}
         * @see {@link convertToViewportRectangle}
         */
        convertToViewportPoint: function PageViewport_convertToViewportPoint(x, y) {
            return Util.applyTransform([x, y], this.transform);
        },
        /**
         * Converts PDF rectangle to the viewport coordinates.
         * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
         * @returns {Array} Contains corresponding coordinates of the rectangle
         * in the viewport coordinate space.
         * @see {@link convertToViewportPoint}
         */
        convertToViewportRectangle:
            function PageViewport_convertToViewportRectangle(rect) {
                var tl = Util.applyTransform([rect[0], rect[1]], this.transform);
                var br = Util.applyTransform([rect[2], rect[3]], this.transform);
                return [tl[0], tl[1], br[0], br[1]];
            },
        /**
         * Converts viewport coordinates to the PDF location. For examples, useful
         * for converting canvas pixel location into PDF one.
         * @param x {number} X coordinate.
         * @param y {number} Y coordinate.
         * @returns {Object} Object that contains 'x' and 'y' properties of the
         * point in the PDF coordinate space.
         * @see {@link convertToViewportPoint}
         */
        convertToPdfPoint: function PageViewport_convertToPdfPoint(x, y) {
            return Util.applyInverseTransform([x, y], this.transform);
        }
    };

    return (PageViewport);
}]);

'use strict';
/**
 * TODO SizeWatcher desc
 */
itMultiPagesViewer.factory('SizeWatcher', ['$interval', function($interval) {
        return function (element, rate) {
            var self = this;
            (self.update = function() { self.dimensions = [element.offsetWidth, element.offsetHeight]; })();
            self.monitor = $interval(self.update, rate);
            self.group = [function() { return self.dimensions[0]; }, function() { return self.dimensions[1]; }];
            self.cancel = function() { $interval.cancel(self.monitor); };
        };
    }]);

'use strict';
/**
 * TODO TranslateViewer desc
 */
itMultiPagesViewer.factory('TranslateViewer', ['$translate', function($translate) {
   return {
        translate : function(key, defaultValue) {
            var result = $translate.instant(key);

            return result != key ? result : defaultValue;
        }
   };
}]);

'use strict';
/**
 * TODO MultiPagesPage desc
 */
itMultiPagesViewer.factory('ZoomSelection', ['$log' , 'MultiPagesConstants', function ($log, MultiPagesConstants) {
    function ZoomSelection(rect, page) {
        this.percentTop = (rect.offsetTop * 100) / page.viewport.height;
        this.percentLeft = (rect.offsetLeft * 100) / page.viewport.width;
        this.percentWidth = (rect.width * 100) / page.viewport.width;
        this.percentHeight = (rect.height * 100) / page.viewport.height;

        this.pageIndex = page.pageIndex;
    }

    return (ZoomSelection);
}]);


'use strict';
/**
 * TODO itTiffViewer desc
 */
itTiffViewer.directive('itTiffViewer', ['$log', 'MultiPagesAddEventWatcher', function($log, MultiPagesAddEventWatcher) {
    var linker = function(scope, element, attrs) {
        scope.thumbnailCollapsed = false;

        scope.toggleThumbnail = function () {
            scope.thumbnailCollapsed = !scope.thumbnailCollapsed;
        };

        MultiPagesAddEventWatcher(scope);
    };

    return {
        scope: {
            src: "=",
            options: "="
        },
        restrict: 'E',
        template :
        '<div ui-layout="{ flow : \'column\', dividerSize : 0 }" class="multipage-container">' +
        '<it-progressbar-viewer api="options.$$api" ng-if="options.showProgressbar != false"></it-progressbar-viewer><it-toolbar-viewer  api="options.$$api" ng-if="options.showToolbar != false"></it-toolbar-viewer>' +
        '<div ng-if="options.showThumbnail != false" collapsed="thumbnailCollapsed" ui-layout-container size="210px" class="thumbnail-menu">' +
        '<it-thumbnail-menu-viewer orientation="\'vertical\'" options="options">' +
        '<div class="ui-splitbar-container-column pull-right"  ng-click="toggleThumbnail()">' +
        '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-left"></span>' +
        '</div>' +
        '</it-thumbnail-menu-viewer>' +
        '</div>' +
        '<div ui-layout-container>' +
        '<tiff-viewer class="multipage-viewer" file="file" src="{{trustSrc(url)}}" api="options.$$api" options="options"></tiff-viewer>' +
        '</div>' +
        '<div class="ui-splitbar-container-column pull-left"  ng-click="toggleThumbnail()" ng-if="thumbnailCollapsed">' +
        '<span class="collapsed-splitbar-button ui-splitbar-icon ui-splitbar-icon-right"></span>' +
        '</div>' +
        '</div>',
        link: linker 
    };
}]);
'use strict';
/**
 * TODO Tiff implementation desc
 */
itTiffViewer
    .factory('TIFFPage', ['$log' , '$timeout', 'MultiPagesPage', 'MultiPagesConstants', function($log, $timeout, MultiPagesPage, MultiPagesConstants) {

        function TIFFPage(viewer, pageIndex, getSrc, view) {
            this.base = MultiPagesPage;
            this.base(viewer, pageIndex, view);

            this.getSrc = getSrc;
        }

        TIFFPage.prototype = new MultiPagesPage;

        TIFFPage.prototype.renderPage = function (page, callback) {
            var self = this;
            /*if(this.rendered) {
             if(callback) {
             callback(this, MultiPagesConstants.PAGE_ALREADY_RENDERED);
             }
             return;
             };

             this.rendered = true;*/

            if(page.canvasRendered){
                page.wrapper.append(page.canvas);
            }else {
                page.wrapper.append(page.canvas);

                var ctx = page.canvas[0].getContext('2d');
                ctx.transform.apply(ctx, page.viewport.transform);
                var img = new Image;
                img.onload = function(){
                    ctx.drawImage(img,0,0); // Or at whatever offset you like
                    //self.canvasRendered = true;
                    if(callback) {
                        callback(page, MultiPagesConstants.PAGE_RENDERED);
                    }
                };

                $timeout(function () {
                    if(self.src == undefined){
                        self.src =  self.getSrc(page.pageIndex);
                    }

                    img.src = self.src;
                }, 50);

            }
        };

        return (TIFFPage);
    }])

    .factory('TIFFViewer', ['$log', 'MultiPagesViewerAPI' , 'TIFFPage' , 'MultiPagesViewer', function($log, MultiPagesViewerAPI, TIFFPage, MultiPagesViewer) {
        try {
            Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});
        } catch(ex) {
            $log.debug("Lib tiff throw exception on set TOTAL_MEMORY : " + ex);
        }

        function TIFFViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new MultiPagesViewerAPI(this), element);

            this.tiff = null;
        }

        TIFFViewer.prototype = new MultiPagesViewer;

        TIFFViewer.prototype.open = function(obj, initialScale, orientation, pageMargin) {
            this.element.empty();
            this.pages = [];
            this.pageMargin = pageMargin;
            this.initialScale = initialScale;
            this.orientation = orientation;
            var isFile = typeof obj != typeof "";

            if(isFile){
                this.setFile(obj);
            }else {
                this.setUrl(obj);
            }
        };
        TIFFViewer.prototype.setUrl = function(url) {
            if (url !== undefined && url !== null && url !== '') {
                var self = this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'arraybuffer';
                xhr.onprogress =  angular.bind(this, self.downloadProgress);
                xhr.onload = function (e) {
                    self.loadTiff(xhr.response);
                };
                xhr.send();
            }
        };
        TIFFViewer.prototype.setFile = function(file) {
            if (file !== undefined && file !== null) {
                var self = this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    self.loadTiff(e.target.result);
                };

                reader.onprogress = function (e) {
                    self.downloadProgress(e);
                };

                reader.onloadend = function (e) {
                    var error = e.target.error;
                    if(error !== null) {
                        var message = "File API error: ";
                        switch(e.code) {
                            case error.ENCODING_ERR:
                                message += "Encoding error.";
                                break;
                            case error.NOT_FOUND_ERR:
                                message += "File not found.";
                                break;
                            case error.NOT_READABLE_ERR:
                                message += "File could not be read.";
                                break;
                            case error.SECURITY_ERR:
                                message += "Security issue with file.";
                                break;
                            default:
                                message += "Unknown error.";
                                break;
                        }

                        self.onDataDownloaded("failed", 0, 0, message);
                    }
                };

                reader.readAsArrayBuffer(file);
            }
        };
        TIFFViewer.prototype.loadTiff = function(arrayBuffer){
            var self = this;
            self.onDestroy();
            self.tiff = new Tiff({buffer: arrayBuffer});
            self.getAllPages(function(pageList) {
                self.pages = pageList;
                self.addPages();
                //self.setContainerSize(self.initialScale);
            });
        };
        TIFFViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.tiff.countDirectory(),
                remainingPages = numPages,
                self = this;

            function _getUrl(index) {
                self.tiff.setDirectory(index);
                return self.tiff.toDataURL();
            };
            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                self.tiff.setDirectory(iPage);
                var page =  new TIFFPage(self, iPage, _getUrl, [0,0, self.tiff.width(), self.tiff.height()]);
                pageList[iPage] = page;

                --remainingPages;
                if (remainingPages === 0) {
                    callback(pageList);
                }
            }
        };
        TIFFViewer.prototype.onDestroy = function () {
            if(self.tiff != null){
                self.tiff.close();
                self.tiff = null;
            }
        };

        return (TIFFViewer);
    }])

    .directive("tiffViewer", ['$log' , 'TIFFViewer', function($log, TIFFViewer) {
        var pageMargin = 10;

        return {
            restrict: "E",
            scope:
            {
                src: "@",
                file: "=",
                api: "=",
                options: "="

            },
            controller: ['$scope', '$element', function($scope, $element) {

                var getOption = function(optionName) {
                    if($scope.options === null || $scope.options === undefined) {
                        return null;
                    }
                    return $scope.options[optionName];
                };

                var viewer = new TIFFViewer($element);

                $scope.api = viewer.getAPI();

                $scope.onSrcChanged = function() {
                    viewer.open(this.src, getOption("initialScale"), getOption("orientation"), pageMargin);
                };

                $scope.onFileChanged = function () {
                    viewer.open(this.file, getOption("initialScale"), getOption("orientation"), pageMargin);
                };

                viewer.hookScope($scope);
            }],
            link: function(scope, element, attrs) {
                attrs.$observe('src', function(src) {
                    scope.onSrcChanged();
                });

                scope.$watch("file", function (file) {
                    scope.onFileChanged();
                });
            }
        };
    }]);

'use strict';
/**
 * TODO itThumbnailMenuViewer desc
 */
itMultiPagesViewer.directive('itThumbnailMenuViewer', ['$log' , 'TranslateViewer', function($log, TranslateViewer){
    var linker = function (scope, element, attrs) {
        scope.model = {};
        scope.model.sizes = [{ label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.SMALL", "small"), value : "small" }, { label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.MEDIUM", "medium"), value : "medium" }, { label : TranslateViewer.translate("GLOBAL.VIEWER.SIZE_MENU.BIG", "big"), value : "big" }];
        scope.model.currentSize = scope.model.sizes[2];
    };

    return {
        scope : { options : "=", orientation : "=" },
        transclude : true,
        restrict: 'E',
        template :  '<div class="thumbnail-menu-select" ng-if="options.showSizeMenu != false"><select ng-model="model.currentSize" ng-options="size as size.label for size in model.sizes"></select></div>' +
        '<div class="thumbnail-menu-{{orientation}}-{{model.currentSize.value}}" ><it-thumbnail-viewer viewer-api="options.$$api" orientation="orientation" show-num-pages="options.showNumPages"></it-thumbnail-viewer><ng-transclude></ng-transclude></div>',
        link: linker
    };
}]);
'use strict';
/**
 * TODO itThumbnailViewer desc
 */
itMultiPagesViewer.directive('itThumbnailViewer', ['$log' , 'ThumbnailViewer' , '$timeout', function($log, ThumbnailViewer, $timeout) {
    var pageMargin = 10;

    return {
        restrict: "E",
        scope: {
            viewerApi: "=",
            orientation : "=",
            showNumPages : "="
        },
        controller: ['$scope', '$element', function($scope, $element) {

            $scope.shouldShowNumPages = function () {
                var showNumPages = this.showNumPages;
                if(typeof showNumPages === typeof true) {
                    return showNumPages;
                }

                return true;
            };

            var viewer = new ThumbnailViewer($element);
            $element.addClass('thumbnail-viewer');
            $scope.api = viewer.getAPI();
            $scope.onViewerApiChanged = function () {
                viewer.open($scope.viewerApi, $scope.orientation, $scope.shouldShowNumPages(), pageMargin);
            };

            viewer.hookScope($scope);
        }],
        link: function(scope, element, attrs) {
            scope.$watchGroup(["viewerApi.getNumPages()", "showNumPages"], function() {
                 if (scope.onViewerApiChangedTimeout) $timeout.cancel(scope.onViewerApiChangedTimeout);
                  scope.onViewerApiChangedTimeout = $timeout(function() {
                      scope.onViewerApiChanged()
                  }, 300);
            });
        }
    };
}]);
'use strict';
/**
 * TODO Thumbnail implementation desc
 */
itMultiPagesViewer
    .factory('ThumbnailViewerAPI', ['$log' , 'MultiPagesViewerAPI', function ($log, MultiPagesViewerAPI) {

        function ThumbnailViewerAPI(viewer) {
            this.base = MultiPagesViewerAPI;
            this.base(viewer);
        };

        ThumbnailViewerAPI.prototype = new MultiPagesViewerAPI;

        ThumbnailViewerAPI.prototype.getSelectedPage = function () {
           return this.viewer.viewer.getAPI().getSelectedPage();
        };

        return (ThumbnailViewerAPI);
    }])

    .factory('ThumbnailPage', ['$log' , '$timeout', 'MultiPagesPage', 'MultiPagesConstants', function($log, $timeout, MultiPagesPage, MultiPagesConstants) {

        function ThumbnailPage(viewer, page, showNumPages) {
            this.base = MultiPagesPage;
            this.base(viewer, page.pageIndex, page.view);

            if(showNumPages) {
                this.pageNum = angular.element("<div class='num-page'>" + this.id + "</div>");
            }

            this.page = page;
        }

        ThumbnailPage.prototype = new MultiPagesPage;

        ThumbnailPage.prototype.getViewport = function (scale, rotation) {
            return this.page.getViewport(scale, rotation);
        };
        ThumbnailPage.prototype.renderPage = function (page, callback) {
            this.page.renderPage(page, callback);
            if(this.pageNum != undefined) {
                page.wrapper.append(this.pageNum);
            }
        };

        return (ThumbnailPage);
    }])

    .factory('ThumbnailViewer', ['$log', 'ThumbnailViewerAPI' , 'ThumbnailPage' , 'MultiPagesViewer' , 'MultiPagesConstants', function($log, ThumbnailViewerAPI, ThumbnailPage, MultiPagesViewer, MultiPagesConstants) {

        function ThumbnailViewer(element) {
            this.base = MultiPagesViewer;
            this.base(new ThumbnailViewerAPI(this), element);
        }

        ThumbnailViewer.prototype = new MultiPagesViewer;

        ThumbnailViewer.prototype.open = function(viewerApi, orientation, showNumPages, pageMargin) {
            this.element.empty();
            this.pages = [];
            if(viewerApi != null) {
                var self = this;
                this.viewer = viewerApi.getViewer();
                this.viewer.thumbnail = this;
                this.pageMargin = pageMargin;
                this.showNumPages = showNumPages;


                this.orientation = orientation;

                if(this.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                    this.initialScale = MultiPagesConstants.ZOOM_FIT_HEIGHT;
                } else {
                    this.initialScale = MultiPagesConstants.ZOOM_FIT_WIDTH;
                }

                this.getAllPages(function(pageList) {
                    self.pages = pageList;
                    self.addPages();
                    self.setContainerSize(self.initialScale);
                });
            }
        };
        ThumbnailViewer.prototype.getAllPages = function(callback) {
            var pageList = [],
                numPages = this.viewer.pages.length,
                remainingPages = numPages,
                self = this;
            for(var iPage = 0; iPage<numPages;++iPage) {
                pageList.push({});
                var page =  new ThumbnailPage(self, self.viewer.pages[iPage], self.showNumPages);
                pageList[iPage] = page;

                --remainingPages;
                if (remainingPages === 0) {
                    callback(pageList);
                }
            }
        };
        ThumbnailViewer.prototype.onContainerSizeChanged = function(containerSize) {
            if(this.showNumPages === true && this.orientation === MultiPagesConstants.ORIENTATION_HORIZONTAL) {
                containerSize.height -= 20;
            }
        };
        ThumbnailViewer.prototype.onPageClicked = function (pageIndex) {
            if(this.viewer) {
                this.viewer.api.goToPage(pageIndex);
                this.viewer.selectedPage = pageIndex;
            }
        };
        ThumbnailViewer.prototype.clearDistantSelectedPage = function (currentPageID, lastPageID) {
            //Keep selection
        };
        ThumbnailViewer.prototype.onDestroy = function () {
            if(self.viewer != null){
                this.viewer.thumbnail = null;
                self.viewer = null;
            }
        };

        ThumbnailViewer.prototype.zoomTo = function(zoomSelection) {
            this.viewer.zoomTo(zoomSelection);
        };

        return (ThumbnailViewer);
    }]);
