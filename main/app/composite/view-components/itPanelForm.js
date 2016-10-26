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
         {"title":"titleCheckBox", "code": "codeCheckBox", "value":"true", "type":"toggle"},
         {"title":"titleTextArea", "code": "codeTextArea", "value":"Bonjour m'appelle Tito ",
         "type":"textarea"},
         {"title":"titleDate", "code": "codeDate", "value":"2016-07-25T08:19:09.069Z", "type":"date"},
         {"title":"titleInput3", "code": "codeInput2", "value":"valueInput2", "type":"input"},
         {"title":"titleAutocomplete1", "code": "codeSelect1", "items":
            [{"id": "code1", "value": "value1"},
            {"id": "code2", "value": "value2"}], value:"code1",
         "type":"autocomplete"},
          {"title":"titleInput4", "code": "codeInput1", "value":"valueInput1", "type":"number"},
          {"title":"titleHtml", "code": "codehtml", "value":"<a href=\"http://www.google.com\">Google</a>", "type":"html"}
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
    '<div ng-switch on="option.type">'+
    '<div ng-switch-when="title"><div ng-include=" \'titleTemplate.html\' "></div></div>'+
    '<div ng-switch-when="label"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'labelTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6 "></div></div>'+
    '<div ng-switch-when="input"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'inputTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="select"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'selectTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="date"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'dateTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="toggle"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'toggleTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="textarea"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'textAreaTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="autocomplete"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'autoCompleteTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="number"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'numberTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '<div ng-switch-when="html"><div class="col-xs-3 col-md-3 col-lg-5"> <label>{{option.title}} </label></div><div ng-include=" \'htmlTemplate.html\' " class="col-xs-3 col-md-4 col-lg-6"></div></div>'+
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-xs-3 col-md-3 col-lg-5"></div><div class="col-xs-3 col-md-4 col-lg-4">' +
    '<button ng-show="{{$ctrl.showButtonUpdate}}"  type="submit" ng-click="$ctrl.update({message:options})" class="btn btn-primary">{{$ctrl.updateLabel}}</button>' +
    '<button ng-show="{{$ctrl.showButtonCancel}}"  type="submit" ng-click="$ctrl.cancel()" class="btn btn-primary">{{$ctrl.cancelLabel}}</button></div></form>'+
    '</div>'+
    '<!------------------- Template title ------------------->'+
    '<script type="text/ng-template" id="titleTemplate.html"><div class="col-xs-9 col-md-9 col-lg- it-panel-form-group">' +
    '<p>{{option.value}}</p><hr style="background-color:black;margin-top: 0px;"></div>'+
    '</script>'+
    '<!------------------- Template label ------------------->'+
    '<script type="text/ng-template" id="labelTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-label">' +
    '<p>{{option.value}}</p></div>'+
    '</script>'+
    '<!------------------- Template input ------------------->'+
    '<script type="text/ng-template" id="inputTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-input">' +
    '<p><input it-input class="form-control floating-label" type="text" ng-model="option[\'value\']" name="input" it-label=""></p></div>'+
    '</script>'+
    '<!------------------- Template select ------------------->'+
    '<script type="text/ng-template" id="selectTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-select">' +
    '<p><select name="repeatSelect" id="repeatSelect" ng-model="option.value"' +
    ' ng-options="value.value for value in option.items"/>' +
    '</select></p></div> '+
    '</script>'+
    '<!------------------- Template toggle ------------------->'+
    '<script type="text/ng-template" id="toggleTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-toggle">' +
    '<p><input it-toggle type="checkbox" ng-model="option[\'value\']" ng-true-value="\'true\'" ng-false-value="\'false\'"><br></p>'+
    '</script>' +
    '<!------------------- Template textArea ------------------->'+
    '<script type="text/ng-template" id="textAreaTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-textarea">' +
    '<p><textarea ng-model="option[\'value\']" name="textArea"></textarea></p></div>'+
    '</script>'+
    '<!------------------- Template date Input format yyyy-mm-dd ------------------->'+
    '<script type="text/ng-template" id="dateTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-date">' +
    '<p><input type="text" class="form-control" style="width: 75px;display:inline;margin-left: 1px;margin-right: 1px" ' +
    'ng-model="option[\'value\']" data-autoclose="1" ' +
    'name="date" data-date-format="{{$ctrl.dateFormat}}" bs-datepicker></p></div>'+
    '</script>'+
    '<!------------------- Template autoComplete Input ------------------->'+
    '<script type="text/ng-template" id="autoCompleteTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-auto">' +
    '<p><it-autocomplete name="autoComplete" id="autoComplete" items="option.items" selected-option="option.value"></it-autocomplete></p></div>'+
    '</script>'+
    '<!------------------- Template number Input ------------------->'+
    '<script type="text/ng-template" id="numberTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-number">' +
    '<p><input it-input class="form-control floating-label" type="number" name="input" it-label=""></p></div>'+
    '</script>'+
    '<!------------------- Template html Input ------------------->'+
    '<script type="text/ng-template" id="htmlTemplate.html"><div class="col-xs-5 col-md-4 col-lg-4 it-panel-form-html">' +
    '<p><div  ng-bind-html="option[\'value\']"/></p></div>'+
    '</script>',
    controller: ['$scope', function($scope){

        var self = this;

        if (self.updateLabel == undefined) {
            self.showButtonUpdate = false;
        }else{
            self.showButtonUpdate = true;
        }

        if (self.cancelLabel == undefined) {
            self.showButtonCancel = false;
        }else{
            self.showButtonCancel = true;
        }

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