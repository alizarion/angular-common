'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itPopup
 * @module itesoft
 * @restrict ECA
 *
 * @description
 * The Itesoft Popup service allows programmatically creating and showing popup windows that require the user to respond in order to continue.
 * The popup system has support for more flexible versions of the built in alert(),
 * prompt(), and confirm() functions that users are used to,
 * in addition to allowing popups with completely custom content and look.
 *
 */
IteSoft
    .factory('itPopup',['$modal','$rootScope','$q',function($modal,$rootScope,$q){

        var MODAL_TPLS = '<div class="modal-header it-view-header">' +
                             '<h3>{{options.title | translate}}</h3>'+
                         '</div>'+
                         '<div class="modal-body">'+
                            '<p ng-bind-html="options.text | translate"></p>'+
                         '</div>'+
                         '<div class="modal-footer">'+
                              '<button ng-repeat="button in options.buttons" class="btn btn-raised {{button.type}}" ng-click="itButtonAction(button)">{{button.text | translate}}</button>'+
                         '</div>'

        var MODAL_TPLS_PROMT = '<div class="modal-header it-view-header">' +
            '<h3>{{options.title | translate}}</h3>'+
            '</div>'+
            '<div class="modal-body">'+
            '<p ng-bind-html="options.text | translate"></p>'+
            '   <div class="form-group">'+
            '<input it-input="" it-text="{{options.inputLabel | translate}}" class="form-control floating-label" ng-model="data.response" >'+
            '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button ng-repeat="button in options.buttons" class="btn btn-raised {{button.type}}" ng-click="itButtonAction(button)">{{button.text | translate}}</button>'+
            '</div>'

        var itPopup = {
            alert : _showAlert,
            confirm :_showConfirm,
            prompt : _showPromt
        };

        function _createPopup(options){
            var self = {};
            self.scope = (options.scope || $rootScope).$new();
            self.responseDeferred = $q.defer();
            self.scope.$buttonTapped= function(button, event) {
                var result = (button.onTap || noop)(event);
                self.responseDeferred.resolve(result);
            };

            options =  angular.extend({
                scope: self.scope,
                template : MODAL_TPLS,
                controller :['$scope' ,'$modalInstance','$translate',function($scope, $modalInstance,$translate) {
                    $translate.refresh();
                    $scope.data={};
                    $scope.itButtonAction= function(button, event) {
                        var todo = (button.onTap || noop)(event);
                        var result = todo;
                        self.responseDeferred.resolve(result ? close() : cancel());
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
            var popup = _createPopup(options);
            var popupPromise =  $modal.open(popup.options).result;

            return popupPromise;
        }

        function _showAlert(opts){
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
            return _showPopup(angular.extend({
                buttons: [{
                    text: opts.cancelText || 'Cancel',
                    type: opts.cancelType || '',
                    onTap: function() { return false; }
                }, {
                    text: opts.okText || 'OK',
                    type: opts.okType || 'btn-info',
                    onTap: function() { return true; }
                }]
            }, opts || {}));
        }

        function _showPromt(opts){
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
                buttons: [{
                    text: opts.cancelText || 'Cancel',
                    type: opts.cancelType || '',
                    onTap: function() {}
                }, {
                    text: opts.okText || 'OK',
                    type: opts.okType || 'btn-info',
                    onTap: function() {
                        return true;
                    }
                }]
            }, opts || {}));
        }
        return itPopup;
    }]);