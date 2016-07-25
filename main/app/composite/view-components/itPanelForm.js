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
 <it-panel-form options="options" date-format="dd/MM/yyyy" update-label="Mettre à jours" update="updateValue(options)"></it-panel-form>
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
          {"title":"titleCheckBox", "code": "codeCheckBox", "value":"true", "type":"checkBox"},
          {"title":"titleTextArea", "code": "codeTextArea", "value":"Bonjour ziouee eirufh ieur ieurhf eriufb ieru ",
          "type":"textArea"},
          {"title":"titleDate", "code": "codeDate", "value":"2016-07-25T08:19:09.069Z", "type":"date"},
          {"title":"titleInput2", "code": "codeInput2", "value":"valueInput2", "type":"input"},
        ];

    }
 ]
 );
 </file>
 </example>
 */
IteSoft.component('itPanelForm',{

        bindings:{
            options:'=',
            dateFormat:'@',
            updateLabel:'@',
            update: '&'
        },
        template:'<div class="it-ac-panel-form">' +
        '<form name="$ctrl.form" novalidate>'+
        '<div ng-repeat="option in $ctrl.options">' +
        '<div class="row">' +
        '<div class="col-xs-3 col-md-4 col-lg-6"> <label>{{option.title}} :</label></div>' +
        '<div ng-switch on="option.type">'+
        '<div ng-switch-when="label" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'labelTemplate.html\' "></div></div>'+
        '<div ng-switch-when="input" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'inputTemplate.html\' "></div></div>'+
        '<div ng-switch-when="select" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'selectTemplate.html\' "></div></div>'+
        '<div ng-switch-when="date" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'dateTemplate.html\' "></div></div>'+
        '<div ng-switch-when="checkBox" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'checkBoxTemplate.html\' "></div></div>'+
        '<div ng-switch-when="textArea" class="col-xs-3 col-md-4 col-lg-6"><div ng-include=" \'textAreaTemplate.html\' "></div></div>'+
        '</div>' +
        '</div>' +
        '</div>' +
        '<button type="submit" ng-click="$ctrl.update({message:options})" class="btn btn-primary">{{$ctrl.updateLabel}}</button></form>'+
        '</div>'+
        '<!------------------- Template label ------------------->'+
        '<script type="text/ng-template" id="labelTemplate.html">' +
        '<p>{{option.value}}</p>'+
        '</script>'+
        '<!------------------- Template input ------------------->'+
        '<script type="text/ng-template" id="inputTemplate.html">' +
        '<p><input type="text" ng-model="option[\'value\']" name="input" value="{{option.value}}"></p>'+
        '</script>'+
        '<!------------------- Template select ------------------->'+
        '<script type="text/ng-template" id="selectTemplate.html">' +
        '<p><select name="repeatSelect" id="repeatSelect" ng-model="option.value"' +
        ' ng-options="value.value for value in option.items"/>' +
        '</select></p> '+
        '</script>'+
        '<!------------------- Template checkbox ------------------->'+
        '<script type="text/ng-template" id="checkBoxTemplate.html">' +
        '<p><input type="checkbox" ng-model="option[\'value\']" ng-true-value="\'true\'" ng-false-value="\'false\'"><br></p>'+
        '</script>' +
        '<!------------------- Template textArea ------------------->'+
        '<script type="text/ng-template" id="textAreaTemplate.html">' +
        '<p><textarea ng-model="option[\'value\']" name="textArea"></textarea></p>'+
        '</script>'+
        '<!------------------- Template date ------------------->'+
        '<script type="text/ng-template" id="dateTemplate.html">' +
        '<p><input type="text" class="form-control" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
        'ng-model="option[\'value\']" data-autoclose="1" ' +
        'name="date" data-date-format="{{$ctrl.dateFormat}}" bs-datepicker></p>'+
        '</script>',
        controller: ['$scope', function($scope){

            //TODO gérer la locale pour l'affichage des dates
            //Get current locale
           // var locale = localStorageService.get('Locale');

            var self = this;

            if(self.dateFormat == undefined){
                self.dateFormat = "dd/MM/yyyy";
            }

            if(self.updateLabel == undefined){
                self.updateLabel = "Update";
            }


        }]

}).config(function($datepickerProvider) {
    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        startWeek: 1
    });
});