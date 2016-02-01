'use strict';
/**
 * @ngdoc directive
 * @name itesoft.directive:itNotifier
 * @module itesoft
 * @since 1.0.1
 * @requires ngToast
 * @requires $rootScope
 * @requires $log
 *
 * @description
 * Simple notifier service, that display toasters.
 *
 * You can personalise itNotifier behavior using attribute and modifying original object setting's toaster:
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td><code>additionalClasses</code></td>
 *     <td>''</td>
 *     <td>Allows to add some classes to the current ngToast</td>
 * </tr>
 * <tr>
 *     <td><code>animation</code></td>
 *     <td>false</td>
 *     <td>Adds an openning/ending animation, for example 'fade'</td>
 * </tr>
 * <tr>
 *     <td><code>className</code></td>
 *     <td>"success"</td>
 *     <td>The className of the toast message</td>
 * </tr>
 * <tr>
 *     <td><code>content</code></td>
 *     <td>''</td>
 *     <td>Content of the toast message as String (HTML compliant)</td>
 * </tr>
 * <tr>
 *     <td><code>combineDuplications</code></td>
 *     <td>false</td>
 *     <td>Combine toaster in a unique one. A counter precede the toaster content</td>
 * </tr>
 * <tr>
 *     <td><code>compileContent</code></td>
 *     <td>false</td>
 *     <td>Re-compiles the toast message content within parent (or given) scope. Needs to be used with trusted HTML content. See here for more information. (boolean|object)</td>
 * </tr>
 * <tr>
 *     <td><code>dismissOnTimeout</code></td>
 *     <td>true</td>
 *     <td>Automatically remove toast message after specific time</td>
 * </tr>
 * <tr>
 *     <td><code>dismissButton: false</code></td>
 *     <td>false</td>
 *     <td>Adds close button on toast message</td>
 * </tr>
 * <tr>
 *     <td><code>dismissButtonHtml</code></td>
 *     <td>"&#38;times;"</td>
 *     <td>Html of close button</td>
 * </tr>
 * <tr>
 *     <td><code>dismissOnClick</code></td>
 *     <td>true</td>
 *     <td>Allows to remove toast message with a click</td>
 * </tr>
 * <tr>
 *     <td><code>horizontalPosition</code></td>
 *     <td>"right"</td>
 *     <td>Horizontal position of the toast message. Possible values : "right", "left" or "center"</td>
 * </tr>
 * <tr>
 *     <td><code>maxNumber</code></td>
 *     <td>0</td>
 *     <td>Maximum number of toast message to display. (0 means unlimined)</td>
 * </tr>
 * <tr>
 *     <td><code>timeout</code></td>
 *     <td>4000</td>
 *     <td>Timer for remove toast message</td>
 * </tr>
 * <tr>
 *     <td><code>verticalPosition</code></td>
 *     <td>"top"</td>
 *     <td>Vertical position of the toast message. possible values "top" or "bottom"</td>
 * </tr>
 * </table>
 * It's possible to defines specific behavior for each type of error. When overloading ngToast configuration, add an attribute to ngToast.configure() parameter.
 *
 * For example, in the "Controller.js", the notifyError method override orginial settings and add some content and disable the dismiss on timeout.
 * The toasts success behavior is also overloaded for dissmiss the toast on click. (see .config(['ngToastProvider' for details)
 *
 *
 * <br/><br/>If Error log is enabled, you can pass errorDetail object to the methods. Here is the details of this object
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Possible value</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>CODE</td>
 *     <td>EMPTY_REQUEST(1000), INCOMPLETE_OBJECT(1001), MALFORMED_OBJECT(1002), INTERNAL_ERROR(2000), BAD_REQUEST(400), INTERNAL_SERVER_ERROR(500), OK(200)</td>
 *     <td>The code bounds to the status of the action</td>
 * </tr>
 * <tr>
 *     <td>TYPE</td>
 *     <td>ERROR("error"), INFO("information"), WARN("warning"), DETAIL("detail"), SUCCESS("S");</td>
 *     <td>The type message received</td>
 * </tr>
 * <tr>
 *     <td>MESSAGE</td>
 *     <td></td>
 *     <td>The message received from the server</td>
 * </tr>
 * <tr>
 *     <td>DETAIL</td>
 *     <td></td>
 *     <td>The detail of the message received from the server</td>
 * </tr>
 * <tr>
 *     <td>DONE</td>
 *     <td>TRUE("1"), FALSE("0");</td>
 *     <td>A boolean that decribes the final result of the request</td>
 * </tr>
 * </table>
 * <br/>
 *
 * There is two ways to use it, by injecting the service in each controller or by using events. See Controller.js for details
 *
 * Possible itNotifier type : "SUCCESS", "ERROR", "INFO", "WARNING" and "DISMISS"<br/>
 * @example
     <example module="itesoft">

         <file name="Controller.js">

            angular.module('itesoft')
                .config(['ngToastProvider', function (ngToast) {
                    //configuration of default values
                    var defaultOptions = {
                        dismissOnTimeout: true,
                        timeout: 4000,
                        dismissButton: true,
                        animation: 'fade',
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        compileContent: true,
                        dismissOnClick: false,
                        success:{dismissOnClick: true},//optional overload behavior toast success
                        info:{dismissOnClick: true},//optional overload behavior toast info
                        error:{dismissOnTimeout: true},//optional overload behavior toast error
                        warning:{dismissOnTimeout: true}//optional overload behavior toast warning
                    };
                    ngToast.configure(defaultOptions);
                }]).controller('NotifierCtrl',['$scope','itNotifier', function($scope,itNotifier) {
                    $scope.showSuccess = function(){
                        itNotifier.notifySuccess({
                        content: "Success popup",
                        dismissOnTimeout: true
                        });
                    };
                    $scope.showSuccessEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                            type: "SUCCESS",
                            options: {
                                content : "Success event popup",
                                dismissOnTimeout: true
                            }}
                         );
                    };
                    $scope.showError = function(){
                        itNotifier.notifyError({
                            content: "Error popup",
                            dismissOnTimeout: false
                        },
                        {
                            CODE:500,
                            TYPE:'error',
                            MESSAGE:'Something bad happened',
                            DETAIL:'You don\'t wanna know',
                            DONE:1
                        });
                    };
                    $scope.showErrorOnEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                        type: "ERROR",
                        options: {
                                content : "error event popup",
                                dismissOnTimeout: false
                            },
                        errorDetails :
                            {
                                CODE:500,
                                TYPE:'error',
                                MESSAGE:'Something bad happened',
                                DETAIL:'You don\'t wanna know',
                                DONE:1
                            }
                        });
                    }
                    $scope.showInfo = function(){
                        itNotifier.notifyInfo({
                        content: "Information popup",
                        dismissOnTimeout: true
                        });
                    };
                    $scope.showWarningOnEvent = function(){
                        $scope.$emit('itNotifierEvent', {
                        type: "WARNING",
                        options: {
                                content : "Warning event popup",
                                dismissOnTimeout: false
                            },
                        errorDetails :
                            {
                                CODE:1000,
                                TYPE:'warning',
                                MESSAGE:'The request is empty',
                                DETAIL:'Nothing',
                                DONE:1
                            }
                        });
                    };
                    $scope.dismiss = function(){
                        itNotifier.notifyDismiss();
                        $scope.$emit('itNotifierEvent',{
                            type:"DISMISS"
                        });
                    };
                    $scope.dismissOnEvent = function(){
                        $scope.$emit("$locationChangeSuccess");

                    };
                }]);
         </file>
         <file name="index.html">
             <!-- CSS adaptation of ngToast for example purposes. Do not do this in production-->
             <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>
             <div ng-controller="NotifierCtrl">
                 <button class="btn btn-success" ng-click="showSuccess()">
                    Success
                 </button>
                 <button class="btn btn-success" ng-click="showSuccessEvent()">
                    Success on event
                 </button>
                 <button class="btn btn-danger" ng-click="showError()">
                    Error
                 </button>
                 <button class="btn btn-danger" ng-click="showErrorOnEvent()">
                    Error on event
                 </button>
                 <button class="btn btn-info" ng-click="showInfo()">
                    Info
                 </button>
                 <button class="btn btn-warning" ng-click="showWarningOnEvent()">
                    Warning
                 </button>
                 <button class="btn btn-success" ng-click="dismiss()">
                    Dismiss all popups
                 </button>
                 <button class="btn btn-success" ng-click="dismissOnEvent()">
                    Dismiss on Change location event
                 </button>
             </div>
         </file>
     </example>
 **/
IteSoft.service('itNotifier', ['ngToast', '$rootScope','$log', function (ngToast, $rootScope, $log) {

    // service declaration
    var itNotifier = {};

    function _formatErrorDetails(errorDetails){
        return " CODE : "+errorDetails.CODE +", TYPE : "+ errorDetails.TYPE +", MESSAGE : "+ errorDetails.MESSAGE +", DETAIL : "+ errorDetails.DETAIL +", DONE : "+ errorDetails.DONE;
    }

    // method declaration
    itNotifier.notifySuccess= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, options,options.success);
            ngToast.success(localOptions);
            if(errorDetails != undefined) {
                $log.log("Success popup called : "+_formatErrorDetails(errorDetails));
            }
        };
    itNotifier.notifyError= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, options, options.error);

            ngToast.danger(localOptions);
            if(errorDetails != undefined) {
                $log.error("Error popup called : "+_formatErrorDetails(errorDetails));
            }
        };
    itNotifier.notifyInfo= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, options, options.info);

            ngToast.info(localOptions);
            if(errorDetails != undefined) {
                $log.info("Info popup called : "+_formatErrorDetails(errorDetails));
            }
        };
    itNotifier.notifyWarning= function (options,errorDetails) {
            var localOptions = angular.extend(ngToast.settings, options, options.warning);

            ngToast.warning(localOptions);
            if(errorDetails != undefined) {
                $log.warn("Warning popup called : "+_formatErrorDetails(errorDetails));
            }
        };
    itNotifier.notifyDismiss= function (options,errorDetails) {
            ngToast.dismiss();
        };
    itNotifier.notify= function (options) {
        $log.error('Unknown type for itNotifier: '+options )
    }

    //events declaration

    $rootScope.$on("$locationChangeSuccess", function () {
        // Remove all currently display toaster messages.
        itNotifier.notifyDismiss();
    });

    $rootScope.$on("itNotifierEvent",function(event, args){
        //Handle event and calls appropriate method depending on the type of request
        if (args) {
            switch (args.type) {
                case "SUCCESS":
                    itNotifier.notifySuccess(args.options,args.errorDetails);
                    break;
                case "ERROR":
                    itNotifier.notifyError(args.options,args.errorDetails);
                    break;
                case "INFO":
                    itNotifier.notifyInfo(args.options,args.errorDetails);
                    break;
                case "WARNING":
                    itNotifier.notifyWarning(args.options,args.errorDetails);
                    break;
                case "DISMISS":
                    itNotifier.notifyDismiss(args.options,args.errorDetails);
                    break;
                default:
                    itNotifier.notify(args.type);
                    break;
            }
        }
        else{
            $log.error('Bad usage of itNotifier. Check manual for details');
        }
    });
    return itNotifier;
}]);