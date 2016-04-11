
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
 <it-autocomplete items="firstNameOptions" selected-option="selectedOption" search-mode="'startsWith'" ></it-autocomplete>
 <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
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
                                            if (value != undefined && value != '') {
                                                if(item[key] == value &&  $scope.myData.push(item)){
                                                    $scope.myData.push(item);
                                                    added = true;
                                                    filterUse = true;
                                                 }
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
                searchMode: "=",
                /**
                 * input placeHolder
                 */
                placeholder: "="
            },
            controllerAs: 'itAutocompleteCtrl',
            controller: ['$scope', '$rootScope', '$translate', '$document', '$timeout', '$log',
                function ($scope, $rootScope, $translate, $document, $timeout, $log) {

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
                        selectedItem: {},
                        searchMode: $scope.searchMode,
                        placeholder: $scope.placeholder
                    };

                    if(angular.isUndefined(self.fields.optionClass)){
                        self.fields.optionClass = '';
                    }
                    if(angular.isUndefined(self.fields.optionContainerClass)){
                        self.fields.optionContainerClass = '';
                    }
                    if(angular.isUndefined(self.fields.inputClass)){
                        self.fields.inputClass = 'it-autocomplete-input-class';
                    }
                    if(angular.isUndefined(self.fields.placeholder)){
                        self.fields.placeholder = '';
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
                    $scope.focusIndex = -1;
                    //Apply default select
                    _selectItemWithId($scope.selectedOption);

                    /**
                     * Watch items change to items to reload select if item is now present
                     */
                    $scope.$watch('items', function (newValue, oldValue) {
                        $log.debug("itAutocomplete: items value changed");
                        fullInit();
                        _selectItemWithId($scope.selectedOption);
                        hideItems();
                    });

                    /**
                     * Watch selectedOption change to select option if value change outside this directive
                     */
                    $scope.$watch('selectedOption', function (newValue, oldValue) {
                        $log.debug("itAutocomplete: selectedOption value changed");
                        //if an oldValue is set
                        if(angular.isDefined(oldValue)){
                            _unselectItemWithId(oldValue);
                        }
                        if (angular.isUndefined(self.fields.selectedItem) || newValue != self.fields.selectedItem.id) {
                            _selectItemWithId(newValue);
                            hideItems();
                        }
                    });

                    /**
                     * Keyboard interation
                     */
                    $scope.$watch('focusIndex', function (newValue, oldValue) {
                        $log.debug("itAutocomplete: focusIndex value changed");
                        if (newValue != oldValue) {
                            if (newValue < 0) {
                                $scope.focusIndex = -1;
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
                     * Select Item with it id
                     * @param id
                     * @private
                     */
                    function _selectItemWithId(id) {
                        $log.debug("itAutocomplete: select with  id "+id);
                        var selected = false;
                        self.fields.selectedItem = {};
                        if (angular.isDefined(id)) {
                            angular.forEach(self.fields.items, function (item) {
                                if (item.id == id) {
                                    select(item);
                                    selected = true;
                                }
                            });
                            if (!selected) {
                                init();
                            }
                        }
                    }

                    /**
                     * Unselect Item with it id
                     * @param id
                     * @private
                     */
                    function _unselectItemWithId(id){
                        $log.debug("itAutocomplete: unselect with id "+id);
                        self.fields.selectedItem = {};
                        if (angular.isDefined(id)) {
                            angular.forEach(self.fields.items, function (item) {
                                if (item.id == id) {
                                    unselect(item);
                                }
                            });
                        }
                    }

                    /**
                     * init + copy of externalItems
                     */
                    function fullInit() {
                        $log.debug("itAutocomplete: copy option items");
                        angular.copy($scope.items, self.fields.items);
                        init();
                    }

                    /**
                     * Style class and position initialization
                     */
                    function init() {
                        var i = 0;
                        angular.forEach(self.fields.items, function (item) {
                            if (angular.isDefined(self.fields.selectedItem)){
                                if (self.fields.selectedItem != item) {
                                    unselect(item);
                                } else {
                                    select(item)
                                }
                            }
                            item.position = i;
                            i++;
                        });
                    }

                    /**
                     * Call when option is selected
                     * @param id
                     */
                    function select(selectedItem) {
                        $log.debug("itAutocomplete: select "+selectedItem.id);
                        // reset last selectedItem class
                        if (angular.isDefined(self.fields.selectedItem)) {
                            unselect(self.fields.selectedItem);
                        }
                        if (angular.isDefined(selectedItem)) {
                            $scope.focusIndex = selectedItem.position;
                            self.fields.selectedItem = selectedItem;
                            $scope.selectedOption = selectedItem.id;
                            self.fields.selectedItem.class = self.fields.selectedSelectClass;
                            var selectedDiv = $document[0].querySelector("#options_" + selectedItem.id);
                            scrollTo(selectedDiv);
                        }
                    }

                    /**
                     * Unselect item
                     * @param item
                     */
                    function unselect(item) {
                        item.class = self.fields.defaultSelectClass;
                    }

                    /**
                     * Scroll on selectedItem when user use keyboard to select an item
                     * @param divId
                     */
                    function scrollTo(targetDiv) {
                        var containerDiv = $document[0].querySelector("#" + self.fields.optionContainerId);
                        if (angular.isDefined(targetDiv) && targetDiv != null && angular.isDefined(targetDiv.getBoundingClientRect())
                            && angular.isDefined(containerDiv) && containerDiv != null) {
                            var targetPosition = targetDiv.getBoundingClientRect().top + targetDiv.getBoundingClientRect().height + containerDiv.scrollTop;
                            var containerPosition = containerDiv.getBoundingClientRect().top + containerDiv.getBoundingClientRect().height;
                            var pos = targetPosition - containerPosition;
                            containerDiv.scrollTop = pos;
                        }
                    }

                    /**
                     * Hide option items
                     */
                    function hideItems($event) {
                        // Si appelé lors du click sur la touche entrée
                        if(angular.isUndefined($event) ){
                            self.fields.showItems = false;
                            self.fields.inputSearch = self.fields.selectedItem.value;
                            // si appelé par le on blur, on vérifie que le onblur n'est pas émit par la scrollbar si ie
                        } else if(! document.activeElement.parentElement.firstElementChild.classList.contains(self.fields.inputClass)) {
                            self.fields.showItems = false;
                            self.fields.inputSearch = self.fields.selectedItem.value;

                            //si il s'agit de la scrollbar, on annule le onblur en remettant le focus sur l'element
                        }else{
                            $scope.$applyAsync(function(){
                                $event.srcElement.focus();
                            })
                        };
                    }

                    /**
                     * Return internet explorer version
                     * @returns {number}
                     */
                    function getInternetExplorerVersion()
                    {
                        var rv = -1;
                        if (navigator.appName == 'Microsoft Internet Explorer')
                        {
                            var ua = navigator.userAgent;
                            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                            if (re.exec(ua) != null)
                                rv = parseFloat( RegExp.$1 );
                        }
                        else if (navigator.appName == 'Netscape')
                        {
                            var ua = navigator.userAgent;
                            var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                            if (re.exec(ua) != null)
                                rv = parseFloat( RegExp.$1 );
                        }
                        return rv;
                    }

                    /**
                     * Show option items
                     */
                    function showItems($event) {
                        //refresh modal position on internet explorer because fixed position doesn't follow scroll
                        if(angular.isDefined($event) && getInternetExplorerVersion() != -1){
                                var container = $event.srcElement.parentElement.children[1];
                                var myParent = angular.element($event.srcElement.parentElement)[0];
                            //only needed with ie and fixed positiion
                            if( angular.isDefined(container) && angular.isDefined(myParent) && container.currentStyle["position"]== "fixed") {
                                var newTop = (myParent.getBoundingClientRect().top + myParent.getBoundingClientRect().height);
                                container.style.setProperty("top", newTop + "px");
                            }
                        }
                        self.fields.showItems = true;
                    }

                    /**
                     * Call when search input content change
                     */
                    function change() {
                        $log.debug("itAutocomplete: input search change value")
                        self.fields.items = [];
                        if (self.fields.inputSearch == "") {
                            fullInit();
                        } else {
                            var i = 0;
                            angular.forEach($scope.items, function (item) {
                                /**
                                 * StartsWith
                                 */
                                if (self.fields.searchMode == "startsWith") {
                                    if (item.value.toLowerCase().startsWith(self.fields.inputSearch.toLowerCase())) {
                                        self.fields.items.push(item);
                                        self.fields.items[i].position = i;
                                        i++;
                                    }
                                    /**
                                     * Contains
                                     */
                                } else {
                                    if (item.value.toLowerCase().search(self.fields.inputSearch.toLowerCase()) != -1) {
                                        self.fields.items.push(item);
                                        self.fields.items[i].position = i;
                                        i++;
                                    }
                                }
                            });
                        }
                        if (self.fields.items.length == 1) {
                            select(self.fields.items[0]);
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
                            if (self.fields.showItems) {
                                hideItems();
                            } else {
                                showItems();
                                if (self.fields.inputSearch == "") {
                                    $scope.focusIndex = -1;
                                }
                            }
                        }
                    });
                    $scope.keys.push({
                        code: KEY_DOWN, action: function () {
                            showItems();
                            $scope.focusIndex--;
                        }
                    });
                    $scope.keys.push({
                        code: KEY_UP, action: function () {
                            showItems();
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
                        var uuid = 'option_container_xxxxxxxxxxxx4yxxxxx'.replace(/[xy]/g, function (c) {
                            var r = (d + Math.random() * 16) % 16 | 0;
                            d = Math.floor(d / 16);
                            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
                        return uuid;
                    };
                }
            ],
            template: '<div class="col-xs-12 it-autocomplete-div">'+
            '<input placeholder="{{itAutocompleteCtrl.fields.placeholder}}" ng-keydown="itAutocompleteCtrl.fn.keyBoardInteration($event)" ng-focus="itAutocompleteCtrl.fn.showItems($event)" ng-blur="itAutocompleteCtrl.fn.hideItems($event)" type="text" class="form-control" ' +
            'ng-class="inputClass" ng-change="itAutocompleteCtrl.fn.change()" ng-model="itAutocompleteCtrl.fields.inputSearch"> ' +
            '<div  ng-class="itAutocompleteCtrl.fields.optionContainerClass" id="{{itAutocompleteCtrl.fields.optionContainerId}}" ng-show="itAutocompleteCtrl.fields.showItems" >' +
            '<div class="it-autocomplete-content"  ng-repeat="item in itAutocompleteCtrl.fields.items">' +
            '<div ng-class="item.class" id="options_{{item.id}}"  ng-mousedown="itAutocompleteCtrl.fn.select(item)">{{item.value | translate}}</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        }
    })
;
