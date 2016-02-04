'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itAutocomplete
 * @module itesoft
 * @restrict ECA
 *
 * @description
 * The ItAutocomplete widgets provides suggestions while you type into the field
 *
 *
 * ```html
 *   <itAutocomplete items="[{id=1,value='premiere option'}]" selected-option="selectedId" search-mode="'contains'"  />
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
 <it-autocomplete items="firstNameOptions" selected-option="selectedOption" search-mode="'startsWith'" ></it-autocomplete>
 selected id: {{selectedOption}}
 </div>
 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['ngMessages','itesoft']);
 </file>
 <file name="controller.js">
 angular.module('itesoft-showcase').controller('HomeCtrl',
        ['$scope',function($scope) {
            $scope.myData = [];
            // sample values
            $scope.myDataInit = [ { "firstName": "Cox", "lastName": "Carney", "company": "Enormo", "employed": true }, { "firstName": "Lorraine", "lastName": "Wise", "company": "Comveyer", "employed": false }, { "firstName": "Nancy", "lastName": "Waters", "company": "Fuelton", "employed": false }];
            $scope.firstNameOptions = [{id:"Cox",value:"Cox"},{id:"Lorraine",value:"Lorraine"},{id:"Enormo",value:"Enormo"},{id:"Enormo1",value:"Enormo1"},{id:"Enormo2",value:"Enormo2"},{id:"Enormo3",value:"Enormo3"},{id:"Enormo4",value:"Enormo4"},{id:"Enormo5",value:"Enormo5"},{id:"Enormo6",value:"Enormo6"},{id:"Enormo7",value:"Enormo7"},{id:"Enormo8",value:"Enormo8"},{id:"Enormo9",value:"Enormo9"},{id:"Enormo10",value:"Enormo10"},{id:"Enormo11",value:"Enormo12"}];
            $scope.lastNameOptions = [{id:"Carney",value:"Carney"},{id:"Wise",value:"Wise"},{id:"Waters",value:"Waters"}];
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
                      angular.forEach($scope.myDataInit,function(item){
                            var key = '';
                            var value = '';
                            var filterUse = false;
                            for (var i = 0; i < $scope.gridApi.grid.columns.length; i++) {
                                key = $scope.gridApi.grid.columns[i].field;
                                for (var j = 0; j < $scope.gridApi.grid.columns[i].filters.length; j++) {
                                    filterUse = true;
                                    value = $scope.gridApi.grid.columns[i].filters[j].term;
                                    if (value != undefined && value != '') {
                                        if(item[key] == value){
                                            $scope.myData.push(item);
                                         }
                                    }
                                }
                            }
                            if(! filterUse){
                                angular.copy($scope.myDataInit,$scope.myData);
                            }
                            $scope.gridOptions.data = $scope.myData;
                            $scope.gridOptions.totalItems = $scope.myData.length;
                      })
                    });
                },
                columnDefs:[{
                    name: 'firstName',
                    cellClass: 'firstName',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete items="grid.appScope.firstNameOptions" selected-option="colFilter.term" input-class="\'firstNameFilter\'" option-class="\'width300\'" ></it-autocomplete></div>',
                    filter:[{
                      term: 1,
                      options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'} ]
                      }]
                    },
                    {
                    name: 'lastName',
                    cellClass: 'lastName',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete items="grid.appScope.lastNameOptions" selected-option="colFilter.term" input-class="\'lastNameFilter\'" option-class="\'width300\'"></it-autocomplete></div>',
                    filter:[{
                      term: 1,
                      options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'} ]
                      }]
                    }
                ]
            };
            $scope.selectedOption = {};
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
                 * input searchMode value= startsWith,contains default contains
                 */
                searchMode: "="
            },
            controllerAs: 'itAutocompleteCtrl',
            controller: ['$scope', '$rootScope', '$translate',
                function ($scope, $rootScope, $translate) {

                    var self = this;

                    /**
                     * public fields
                     * @type {{}}
                     */
                    self.fields = {
                        items: [],
                        inputSearch: '',
                        showItems: false,
                        optionClass: $scope.optionClass,
                        inputClass: $scope.inputClass,
                        defaultSelectClass: '',
                        selectedSelectClass: '',
                        searchMode: $scope.searchMode
                    };
                    self.fields.defaultSelectClass= self.fields.optionClass+" it-autocomplete-select";
                    self.fields.selectedSelectClass= self.fields.defaultSelectClass+" it-autocomplete-selected";

                    /**
                     * public function
                     * @type {{}}
                     */
                    self.fn = {
                        select: select,
                        change: change,
                        click: click
                    };

                    /**
                     * initialize default data
                     */
                    angular.copy($scope.items, self.fields.items);
                    init();

                    /**
                     * Style class initialization
                     */
                    function init() {
                        angular.forEach(self.fields.items, function (item) {
                            item.class = self.fields.defaultSelectClass ;
                        });
                    }

                    /**
                     * Call when option is selected
                     * @param id
                     */
                    function select(selectedItem) {
                        init();
                        selectedItem.class = self.fields.selectedSelectClass;
                        $scope.selectedOption = selectedItem.id;
                        self.fields.inputSearch = selectedItem.value;
                    }

                    /**
                     * Call on click on the filter
                     */
                    function click() {
                        if (self.fields.showItems) {
                            self.fields.showItems = false;
                        } else {
                            self.fields.showItems = true;
                        }
                    }

                    /**
                     * Call when input content change
                     */
                    function change() {
                        self.fields.items = [];
                        if (self.fields.inputSearch == "") {
                            angular.copy($scope.items, self.fields.items);
                            init();
                        } else {
                            angular.forEach($scope.items, function (item) {
                                /**
                                 * StartsWith
                                 */
                                if(self.fields.searchMode == "startsWith") {
                                    if (item.value.toLowerCase().startsWith(self.fields.inputSearch.toLowerCase())) {
                                        self.fields.items.push(item);
                                        item.class = self.fields.defaultSelectClass;
                                    }
                                /**
                                 * Contains
                                 */
                                }else{
                                    if (item.value.toLowerCase().search(self.fields.inputSearch.toLowerCase())!=-1) {
                                        self.fields.items.push(item);
                                        item.class = self.fields.defaultSelectClass;
                                    }
                                }
                            });
                        }
                    }
                }
            ],
            template: '<div >' +
            '<input ng-focus="itAutocompleteCtrl.fn.click()" ng-blur="itAutocompleteCtrl.fn.click()" type="text" class="form-control" ng-class="inputClass" ng-change="itAutocompleteCtrl.fn.change()" ng-model="itAutocompleteCtrl.fields.inputSearch"> ' +
            '<div class="it-autocomplete-container">' +
                '<div class="it-autocomplete-content" >' +
                    '<div ng-show="itAutocompleteCtrl.fields.showItems" ng-repeat="item in itAutocompleteCtrl.fields.items">' +
                        '<div ng-class="item.class" ng-mousedown="itAutocompleteCtrl.fn.select(item)">{{item.value | translate}}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        }
    });
