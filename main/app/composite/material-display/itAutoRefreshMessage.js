'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itAutoRefreshMessage
 * @module itesoft
 * @restrict E
 * @since 1.2
 * @description
 * The itAutoRefreshMessage provides dynamic message refresh.
 *
 *
 * ```html
 *     <it-auto-refresh-message refresh="5000" transition="500"
 *     elements="elements"
 *        add-message-function="function()"
 *        add-message-button-visible="true">
 *        </it-auto-refresh-message>
 * ```
 *
 *
 * @example
 <example module="itesoft">
 <file name="index.html">
 <style>
 </style>
 <div ng-controller="HomeCtrl" >
 <it-auto-refresh-message refresh="5000" transition="500"
 elements="elements"
 add-message-function="addMessage()"
 add-message-button-visible="true">
 </it-auto-refresh-message>
 </div>
 </file>
 <file name="controller.js">
 angular.module('itesoft')
 .controller('HomeCtrl',['$scope', '$templateCache', 'itPopup', function ($scope,$templateCache,itPopup) {

        $scope.elements = [
           {"data" : {"from":"admin", "date": new Date(), "message":"Ceci est un exemple"}},
          {"data" : {"from":"admin", "date": new Date(), "message":"Ceci est un second exemple"}}
        ];

        $scope.currentMessage= '';

        $scope.addMessage= function(){
                var adminMessagePopup = itPopup.custom({
                    title: 'Ajouter un message',
                    backdrop: true,
                    scope: $scope,
                    text: '<div class="form-group full-with"> <label class="col-xs-12 col-md-6 col-lg-4 control-label">Message</label> <textarea class="comment-input" ng-model="currentMessage"></textarea></div>',
                     buttons: [{
                        text: 'Envoyer',
                        type: 'btn-success',
                        onTap: function (event,scope) {

                        var mess = {
                            data : {
                            date : new Date(),
                            from : "admin",
                            message : scope.currentMessage
                            }
                        }
                        scope.currentMessage = '';
                        $scope.elements.push(mess);

                        return true;
                        }
                    }, {
                        text: 'Annuler',
                        type: 'btn-primary',
                        onTap: function () {
                            return false;
                        }
                    }
                    ]
                });
        }
    }
 ]
 );
 </file>
 </example>
 */
IteSoft.component('itAutoRefreshMessage', {
    bindings: {
        elements: '=',
        refresh: '=',
        transition: '=',
        dateFormat: '=',
        addMessageButtonVisible: '=',
        addMessageFunction: '&'
    },
    template: '<div class="it-message"><div ng-class="{\'it-message-comment-transition-opacity-0\':$ctrl.fields.currentOpacity, \'it-message-comment-transition-opacity-1\':!$ctrl.fields.currentOpacity}">'
    + '<span class="it-message-comment-from" ng-show="$ctrl.elements.length > 0">{{$ctrl.fields.element.data.from}}&nbsp;:&nbsp; {{$ctrl.fields.element.data.message}}</span>'
    + '<div class="it-message-comment-time">{{$ctrl.fields.element.data.date | date:$ctrl.dateFormat}}</div>'
    + '</div>'
    + '<div class="it-message-comment-add-button" ng-show="$ctrl.addMessageButtonVisible">'
    + '<button class="small-btn btn-primary" title="ADD" data-ng-click="$ctrl.fn.addMessageFunction()">'
    + '<i class="fa fa-plus"></i>'
    + '</button>'
    + '</div></div>',
    controller: [
        '$timeout',
        '$interval',
        '$scope',
        function ($timeout,
                  $interval,
                  $scope) {

            var self = this;

            self.fn = {
                addMessageFunction: self.addMessageFunction,
                refreshItems: _refreshItems
            };
            self.fields = {
                currentOpacity: false,
                element: {}
            };

            var currentItemPosition = 0;

            //this function is used to get your data
            function _refreshItems() {

                if (self.elements.length > 1) {
                    if (currentItemPosition > self.elements.length - 1) {
                        currentItemPosition = 0;
                    }
                    self.fields.currentOpacity = true;

                    $timeout(function () {
                        angular.copy(self.elements[currentItemPosition], self.fields.element);
                        currentItemPosition++;
                        self.fields.currentOpacity = false;
                    }, self.transition);

                }
            }

            $scope.$watch('$ctrl.elements', function (newVal, oldVal) {
                if (angular.isDefined(oldVal) && angular.isDefined(newVal)) {
                    if (newVal.length > 0 && (oldVal.length === 0 || Object.keys(self.fields.element).length === 0)) {
                        angular.copy(self.elements[currentItemPosition], self.fields.element);
                        currentItemPosition++;
                        $interval(_refreshItems, self.refresh);
                    }
                }
            }, true);
        }]
})
;