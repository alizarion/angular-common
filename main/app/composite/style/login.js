'use strict';

/**
 * @ngdoc directive
 * @name style2016.directive:loginForm
 * @module style2016
 * @restrict C
 * @since 1.1
 * @description
 * Itesoft style 2016 (like SCPAS)
 *
 * To enable it just add
 * <pre class="prettyprint linenums">
 * @ import "../lib/angular-common/dist/assets/scss/style2016/style2016";
 * </pre>
 * add the begin of your principal scss file
 *
 * <h3>Icon</h3>
 *
 * Class that can be used to show itesoftIcons:
 * <ul>
 *     <li>
 *         error_validate
 *     </li>
 *     <li>
 *         menu_admin
 *     </li>
 *     <li>
 *         menu_home
 *     </li>
 *     <li>
 *         menu_rapport
 *     </li>
 *     <li>
 *         menu_search
 *     </li>
 *     <li>
 *         menu_settings
 *     </li>
 *     <li>
 *         menu_task
 *     </li>
 * </ul>
 *
 *
 *
 *
 * See http://seraimtfs11:8080/tfs/ItesoftCollection/ItesoftDev/_git/QuickStartSCPAS. to show how to use it ;)
 *
 * @example
 <example module="itesoft-showcase">
     <file name="index.html">
         <link rel="stylesheet" href="css/style2016.css" type="text/css">
            <div class="container it-login-background ">
             <it-busy-indicator class="row-height-10">
                     <div class="row">
                         <div class="center-block col-xs-6 col-md-4 login-block">
                         <div class="it-login-logo">
                         <br>
                         </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="center-block col-xs-6 col-md-4 login-block">
                         <form class="form-login width-300" role="form" name="formLogin"
                         ng-submit="$ctrl.authService.login(formLogin.username.$viewValue)">
                                 <div class="form-group">
                                 <input class="form-control floating-label it-login-input"
                                 type="text"
                                 name="username"
                                 placeholder="{{'GLOBAL.LOGIN.USER_LABEL' | translate}}"
                                 ng-model="loginData.login"
                                 it-error="message"
                                 autocomplete
                                 required
                                 autofocus>
                                 </div>
                                 <div class="form-group">
                                 <input class="form-control floating-label it-login-input"
                                 type="password"
                                 name="password"
                                 placeholder="{{'GLOBAL.LOGIN.PASSWORD_LABEL' | translate}}"
                                 ng-model="loginData.password"
                                 autocomplete>
                                 </div>
                                 <div class="form-group">
                                 <button class="btn btn-lg btn-success btn-block it-login-button"
                                 type="submit"
                                 name="submit"
                                 translate>GLOBAL.LOGIN.SUBMIT_BUTTON_LABEL
                                 </button>
                                 </div>
                         </form>
                         </div>
                     </div>
                </it-block>
             </it-busy-indicator>
             </div>
     </file>
     <file name="Module.js">
        angular.module('itesoft-showcase',['itesoft'])
     </file>
     <file name="controller.js">
        angular.module('itesoft-showcase').controller('HomeCtrl', ['$scope', function($scope) { }]);
     </file>
 </example>
 */