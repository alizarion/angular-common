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
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete items="grid.appScope.firstNameOptions" selected-option="colFilter.term" input-class="\'firstNameFilter\'" option-container-class="\'width300\'" ></it-autocomplete></div>',
                    filter:[{
                      term: 1,
                      options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'} ]
                      }]
                    },
                    {
                    name: 'lastName',
                    cellClass: 'lastName',
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><it-autocomplete items="grid.appScope.lastNameOptions" selected-option="colFilter.term" input-class="\'lastNameFilter\'" option-container-class="\'width300\'"></it-autocomplete></div>',
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
                 * stylesheet class added on option container
                 */
                optionContainerClass: "=",
                /**
                 * input searchMode value= startsWith,contains default contains
                 */
                searchMode: "="
            },
            controllerAs: 'itAutocompleteCtrl',
            controller: ['$scope', '$rootScope', '$translate','$document',
                function ($scope, $rootScope, $translate, $document) {

                    var self = this;

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
                        searchMode: $scope.searchMode
                    };
                    self.fields.optionContainerClass = self.fields.optionContainerClass + " it-autocomplete-container";
                    self.fields.defaultSelectClass = self.fields.optionClass + " it-autocomplete-select";
                    self.fields.selectedSelectClass = self.fields.defaultSelectClass + " it-autocomplete-selected";
                    /**
                     * Use unique id for container, all to find it if there are multiple itAutocomplete directive inside the same page
                     * @type {string}
                     */
                    self.fields.optionContainerId = _generateID();


                    /**
                     * public function
                     * @type {{}}
                     */
                    self.fn = {
                        select: select,
                        change: change,
                        init: init,
                        fullInit: fullInit,
                        hideItems: hideItems,
                        showItems: showItems,
                        keyBoardInteration: keyBoardInteration,
                    };

                    /****************************************************************************************
                     *                                  CODE
                     **************************************************************************************/

                    /**
                     * initialize default data
                     */
                    fullInit();
                    $scope.focusIndex = 0;

                    /**
                     * Watch selectedOption whange to select option if value change outside this directive
                     */
                    $scope.$watch('selectedOption', function (newValue, oldValue) {
                        var selected = false;
                        if (angular.isDefined(newValue) && newValue != -1) {
                            angular.forEach(self.fields.items, function (item) {
                                if (item.id == newValue) {
                                    self.fields.inputSearch = item.value;
                                    item.class = self.fields.selectedSelectClass;
                                    $scope.focusIndex = item.position;
                                    selected = true;
                                } else {
                                    item.class = self.fields.defaultSelectClass;
                                }
                            });
                            if (!selected) {
                                init();
                            }
                        }
                    });

                    /**
                     * Watch item
                     */
                    $scope.$watch('items', function (newValue, oldValue) {
                        fullInit();
                    });
                    /**
                     * Keyboard interation
                     */
                    $scope.$watch('focusIndex', function (newValue, oldValue) {
                        if(newValue != -1) {
                            if (newValue < 0) {
                                $scope.focusIndex = 0;
                            } else if (newValue >= self.fields.items.length) {
                                $scope.focusIndex = self.fields.items.length - 1;
                            }
                            if (angular.isDefined(self.fields.items)) {
                                select(self.fields.items[$scope.focusIndex]);
                            }
                        }

                    });

                    /****************************************************************************************
                     *                                  FUNCTION
                     **************************************************************************************/

                    /**
                     * Style class initialization
                     */
                    function init() {
                        var i = 0;
                        angular.forEach(self.fields.items, function (item) {
                            item.class = self.fields.defaultSelectClass;
                            item.position = i;
                            i++;
                        });
                    }

                    /**
                     * init + copy of items
                     */
                    function fullInit() {
                        angular.copy($scope.items, self.fields.items);
                        init();
                    }

                    /**
                     * Call when option is selected
                     * @param id
                     */
                    function select(selectedItem) {
                        if (angular.isDefined(selectedItem)) {
                            $scope.selectedOption = selectedItem.id;
                            var selectedDiv = $document[0].querySelector("#options_" +  selectedItem.id);
                            scrollTo(selectedDiv);
                        }
                    }

                    /**
                     * Scroll on selectedItem when user use keyboard to select an item
                     * @param divId
                     */
                    function scrollTo(targetDiv){
                        var containerDiv = $document[0].querySelector("#" + self.fields.optionContainerId);
                        if( angular.isDefined(targetDiv) && targetDiv != null && angular.isDefined(targetDiv.getBoundingClientRect())
                        && angular.isDefined(containerDiv) && containerDiv != null ) {
                            var pos = targetDiv.getBoundingClientRect().top - containerDiv.getBoundingClientRect().top ;
                            containerDiv.scrollTop = pos;
                        }
                    }

                    /**
                     * Hide option items
                     */
                    function hideItems() {
                        self.fields.showItems = false;
                    }

                    /**
                     * Show option items
                     */
                    function showItems() {
                        self.fields.showItems = true;
                    }

                    /**
                     * Call when search input content change
                     */
                    function change() {
                        self.fields.items = [];
                        if (self.fields.inputSearch == "") {
                            fullInit();
                        } else {
                            angular.forEach($scope.items, function (item) {
                                /**
                                 * StartsWith
                                 */
                                if (self.fields.searchMode == "startsWith") {
                                    if (item.value.toLowerCase().startsWith(self.fields.inputSearch.toLowerCase())) {
                                        self.fields.items.push(item);
                                        item.class = self.fields.defaultSelectClass;
                                    }
                                    /**
                                     * Contains
                                     */
                                } else {
                                    if (item.value.toLowerCase().search(self.fields.inputSearch.toLowerCase()) != -1) {
                                        self.fields.items.push(item);
                                        item.class = self.fields.defaultSelectClass;
                                    }
                                }
                            });
                        }
                        showItems();
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

                    $scope.keys.push({
                        code: KEY_ENTER, action: function () {
                            hideItems();
                        }
                    });
                    $scope.keys.push({
                        code: KEY_DOWN, action: function () {
                            $scope.focusIndex--;
                        }
                    });
                    $scope.keys.push({
                        code: KEY_UP, action: function () {
                            $scope.focusIndex++;
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
                        var uuid = 'option_container_xxxxxxxxxxxx4yxxxxx'.replace(/[xy]/g, function(c) {
                            var r = (d + Math.random()*16)%16 | 0;
                            d = Math.floor(d/16);
                            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                        });
                        return uuid;
                    };
                }
            ],
            template: '<div>' +
            '<input ng-keydown="itAutocompleteCtrl.fn.keyBoardInteration($event)" ng-focus="itAutocompleteCtrl.fn.showItems()" ng-blur="itAutocompleteCtrl.fn.hideItems()" type="text" class="form-control" ' +
            'ng-class="inputClass" ng-change="itAutocompleteCtrl.fn.change()" ng-model="itAutocompleteCtrl.fields.inputSearch"> ' +
            '<div ng-class="itAutocompleteCtrl.fields.optionContainerClass" id="{{itAutocompleteCtrl.fields.optionContainerId}}" ng-show="itAutocompleteCtrl.fields.showItems" >' +
            '<div class="it-autocomplete-content"  ng-repeat="item in itAutocompleteCtrl.fields.items">' +
            '<div ng-class="item.class" id="options_{{item.id}}"  ng-mousedown="itAutocompleteCtrl.fn.select(item)">{{item.value | translate}}</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        }
    });
