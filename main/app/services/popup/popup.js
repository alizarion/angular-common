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
    .factory('itPopup',['$uibModal','$uibModalStack','$rootScope','$q','$compile',function($uibModal,$uibModalStack,$rootScope,$q,$compile){

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

                controller :['$scope' ,'$uibModalInstance',function($scope, $uibModalInstance) {
                   // $scope.data = {};
                    $scope.itButtonAction= function(event, button ) {
                        var todo = (button.onTap || _noop)(event,$scope);

                        var result = todo;
                        if (!event.isDefaultPrevented()) {
                            self.responseDeferred.resolve(result ? close() : cancel());
                        }
                    };

                    function close(){
                        $uibModalInstance.close($scope.data);
                    }
                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                buttons: []
            }, options || {});

            options.scope.options = options;


            self.options = options;

            return self;

        }

        function _showPopup(options){
            $uibModalStack.dismissAll();
            var popup = _createPopup(options);

            return  $uibModal.open(popup.options).result;
        }

        function _showAlert(opts){
            $uibModalStack.dismissAll();

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
            $uibModalStack.dismissAll();

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
            $uibModalStack.dismissAll();
         return   _showPopup(opts);
        }

        function _showPromt(opts){
            $uibModalStack.dismissAll();

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
