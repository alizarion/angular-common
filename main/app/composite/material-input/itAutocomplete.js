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
            controller: ['$scope', '$rootScope', '$translate', '$document', '$timeout', '$log',
                function ($scope, $rootScope, $translate, $document, $timeout, $log) {

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

                    self.cleanDomRef = {
                        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                        encode: function (e) {
                            if (e) {
                                var t = "";
                                {
                                }
                                var n, r, i, s, o, u, a;
                                var f = 0;
                                e = self.cleanDomRef._utf8_encode(e);
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
                            t = cleanDomRef._utf8_decode(t);
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
                    };

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

                            var selectedDiv = $document[0].querySelector("#options_" + self.cleanDomRef.encode(_getIdFromObject(self.fields.selectedItem) + ""));
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
                                    if (_getLower(_getLabelFromObject(item)).startsWith(_getLower(self.fields.inputSearch))) {
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
                                    if (_getLower(_getLabelFromObject(item)).search(_getLower(self.fields.inputSearch)) != -1) {
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

                    const KEY_ENTER = 13;
                    const KEY_DOWN = 38;
                    const KEY_UP = 40;
                    const KEY_BACK = 8;
                    const KEY_DELETE = 8;
                    const KEY_ESCAPE = 27;

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
            '               id="{{\'options_\'+itAutocompleteCtrl.cleanDomRef.encode(itAutocompleteCtrl.fn.getIdFromObject(item))}}"  ' +
            '               ng-mousedown="itAutocompleteCtrl.fn.select(item)">' +
            '               {{itAutocompleteCtrl.fn.getLabelFromObject(item)}}' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        }
    })
;
