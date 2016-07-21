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
 * @example
 <example module="itesoft">
 <file name="index.html">
 <style>
 </style>
 <div ng-controller="HomeCtrl" >
 <it-panel-form options="options" ></it-panel-form>
 </div>
 </div>
 </file>
 <file name="controller.js">
 angular.module('itesoft')
 .controller('HomeCtrl',['$scope', '$templateCache', function ($scope,$templateCache) {
        $scope.query = "";
        // require to link directive with scope
        $scope.options = [
            {"title":"title", "value":"value", "type":$templateCache.get('inputElement.html')},
            {"title":"title2", "value":"value2", "type":"type2"},
            {"title":"title3", "value":"value3", "type":"type3"}
        ];

    }
 ]
 );
 </file>
 </example>
 */
IteSoft.directive('itPanelForm',['$q','$templateCache',function($q,$templateCache){
    return{
        restrict:'E',
        scope:{
            options:'='
        },
        template:'<div class="it-ac-panel-form">' +
        '<div ng-repeat="option in options">' +
        '<div class="row">' +
        '<div class="col-xs-3 col-md-4 col-lg-6"> <label>{{option.title}}</label></div>' +
        '<div class="col-xs-3 col-md-4 col-lg-6">{{option.value}}</div> : <ng-include src="inputElement.html"></ng-include>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!------------------------------------------------------------------------------------------------------------------------------- FILTER --------------------------------------------------------------------------------------------------------------------------------> ' +
        '<script type="text/ng-template" id="dropDownFilter.html"> ' +
        '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"> ' +
        '<it-autocomplete name="autocomplete" items="colFilter.options.data" selected-option="colFilter.term" input-class="col.headerCellClass" option-container-class="colFilter.class"> ' +
        '</div> ' +
        '</script> ' +
        '<script type="text/ng-template" id="dateRangeFilter.html"> ' +
        '<div class="ui-grid-filter-container"> ' +
        '<span class="{{col.headerCellClass}}"> ' +
        '<input type="text" class="form-control {{col.headerCellClass}}_{{col.filters[0].emptyOption}}" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
        'placeholder="{{col.filters[0].emptyOption | translate}}" ng-model="col.filters[0].term" data-min-date="{{col.filters[0].dateMin}}" data-max-date="{{col.filters[1].term}}" data-autoclose="1" ' +
        'name="date" data-date-format="{{\'GLOBAL.DATE.FORMAT\' | translate}}" bs-datepicker> ' +
        '<input type="text" class="form-control {{col.headerCellClass}}_{{col.filters[1].emptyOption}}" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
        'placeholder="{{col.filters[1].emptyOption | translate}}" ng-model="col.filters[1].term" data-min-date="{{col.filters[0].term}}" data-max-date="{{col.filters[1].dateMax}}" data-autoclose="1" ' +
        'name="date2" data-date-format="{{\'GLOBAL.DATE.FORMAT\' | translate}}" bs-datepicker> ' +
        '</span> ' +
        '</div> ' +
        '</script> ' +
        '<script type="text/ng-template" id="inputElement.html"> ' +
        '<input type="text" class="form-control" ng-model="value">' +
        //'<input type="text" class="form-control" ng-model="colFilter.term" pattern="{{colFilter.pattern}}" placeholder="{{colFilter.emptyOption | translate}}" maxlength="{{colFilter.maxLength}}"> ' +
        '</script> ',
        controllerAs: 'panelFormController',
        controller: ['$scope','$templateCache', function($scope,$templateCache){

            //TODO gérer la locale pour l'affichage des dates
            //Get current locale
           // var locale = localStorageService.get('Locale');

            var self = this;

            self.options = $scope.options;

            $templateCache.put('templateId.html', 'This is the content of the template');
        }]
    }
}]);