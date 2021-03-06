
'use strict';
/**
 * @ngdoc service
 * @name itesoft.service:itLanguageChangeHandler
 * @module itesoft
 * @since 1.2
 * @requires localStorageService
 * @requires itPopup
 *
 * @description
 * itLanguageChangeHandlerProvider modifies the current language to a new language. Features:
 * <br/>1) Asks confirmation (optional) before changing the language;
 * <br/>2) Stores the new culture setting either in the browser's local storage ["local"] (default),  or as a query string parameter ["query"]
 * <br/>3) Allows the consuming service to receive returned results by a callback method.
 * <br/>
 * <table class="table">
 *  <tr>
 *   <td><code>itLanguageChangeHandler.changeLanguage(lang, [scope, callback])</code></td>
 *   <td>Method to change the current language.
 *    <br/>lang (required). The new language culture, e.g. "en_GB".
 *    <br/>scope (optional). The current scope.
 *    <br/>callback (optional). The callback function.
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getConfig()</code></td>
 *   <td>Method to get the current configuration options.
 *   <br />storage: local (default value) for localStorage or query for url query parameter
 *   <br />displayConfirm: Whether or not to display a confirmation popup. True by default.
 *   <br />onChangePopup:
 *   <br />title: title of popup confirmation
 *   <br />text: text of popup confirmation
 *   <br />buttonCancelLabel: label text for the cancel button
 *   <br />buttonOkLabel: label text for the ok button
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getCurrentLanguage()</code></td>
 *   <td>Method to get the current language.</td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getDefaultLocale(lang)</code></td>
 *   <td>Method to get the default locale from an optional language code.
 *    <br/>lang (optional). The language code, e.g. "en".
 *   </td>
 *  </tr>
 *  <tr>
 *   <td><code>itLanguageChangeHandler.getLanguageCode(locale)</code></td>
 *   <td>Method to get the language code from an optional locale.
 *    <br/>locale (optional). The locale, e.g. "en_GB".
 *   </td>
 *  </tr>
 * </table>
 *
 * @example
 <example module="itesoft">

 <file name="Controller.js">
    angular.module('itesoft')
        .config(['itLanguageChangeHandlerProvider','localStorageServiceProvider', function (itLanguageChangeHandlerProvider, localStorageServiceProvider) {
                    // example for storage option configuration value
                    itLanguageChangeHandlerProvider.options.storage = "local";
                     
                    localStorageServiceProvider.setPrefix('itesoft');

                }])
        .controller('MainController',['$translate', '$scope','itLanguageChangeHandler', function($translate, $scope,itLanguageChangeHandler) {
            $scope.initialLanguage = itLanguageChangeHandler.getCurrentLanguage();

            // new language setting returned by a callback function.
            var languageChanged = function(data){
              $scope.currentLanguage = data.currentLanguage;
            };
        
            $scope.changeLanguage = function(){
              if($scope.locale) {
                
                // new language setting returned by a promise.
                itLanguageChangeHandler.changeLanguage($scope.locale, languageChanged);
              }
            }
        }]);
 </file>
 <file name="index.html">
 <div ng-controller="MainController">
    <br /> Set language: <input type="text" ng-model="locale" /> 
    <button class="btn btn-warning" ng-click="changeLanguage()">change language</button>

    <br /> Storage type: {{itLanguageChangeHandler.getConfig().storage}}
    <br /> Initial language: {{initialLanguage}}
    <br /> Updated current language: {{currentLanguage}}
</div>
 </file>
 </example>
 */
angular.module('itesoft.language',['itesoft.popup','LocalStorageModule'])
    .provider('itLanguageChangeHandler', function () {
    var self = this;
    this.options = {
        storage: 'local', //local for localStorage or query for url query parameter
        displayConfirm: true,// true | false
        onChangePopup: {
            title: "Confirm language change",
            text: "By modifying the language any recent changes may be lost. Continue?",
            buttonCancelLabel: 'NO',
            buttonOkLabel: 'YES'
        }
    };

    this.$get = ['$rootScope', '$translate', '$location', '$q', 'localStorageService', 'itPopup', function ($rootScope, $translate, $location, $q, localStorageService, itPopup) {
        return {
            translate: $translate,
            getConfig: function () {
                return self.options;
            },
            changeLanguage: function (lang, scope, callback) {
                var data = {
                    currentLanguage:
                        this.getCurrentLanguage()
                };
                if (self.options.displayConfirm) {
                    var confirmPopup = itPopup.confirm({
                        title: self.options.onChangePopup.title,
                        text: self.options.onChangePopup.text,
                        cancelText: self.options.onChangePopup.buttonCancelLabel,
                        okText: self.options.onChangePopup.buttonOkLabel
                    });
                    (function (data) {
                        var locale = data;
                        confirmPopup.then(function (res) {

                            if (self.options.storage === 'query') {

                                try {
                                    $location.search('Locale', lang);
                                } catch (e) {
                                    reject("Error setting query parameter, lang, to locale value: " + lang + " Error: " + e.message);
                                }
                            }
                            else {
                                // Save to local storage
                                try {
                                    localStorageService.set('Locale', lang);
                                } catch (e) {
                                    reject("Error setting local storage parameter, lang, to locale value: " + lang + " Error: " + e.message);
                                }
                            }

                            // Change language to chosen language.
                            if (scope) {
                                scope.currentLanguage = lang;
                                if (scope.user) {
                                    scope.user.language = $translate.use();
                                }
                            }

                            data = {
                                currentLanguage: lang,
                            };

                            if (callback) {
                                callback(data);
                            }

                            //Reload de la page
                            $rootScope.$applyAsync(function () {
                                location.reload();
                            });

                        }, function () {
                            $translate.use(locale.currentLanguage);
                        });
                    })(data);
                }
                return;
            },
            getCurrentLanguage: function () {
                if (self.options.storage === 'query') {
                    if ($location.search().Locale) {
                        return $location.search().Locale.replace(/-/g, '_');
                    } 
                    else {
                        return this.getDefaultLocale(this.translate.use());
                    }
                }
                else {
                    // load from local storage
                    return localStorageService.get('Locale') || this.getDefaultLocale(this.translate.use());
                }
            },
            getDefaultLocale: function (lang) {
                if (!lang) {
                    lang = $translate.preferredLanguage();
                }

                switch (lang) {
                    case "en":
                        return "en_GB";
                    case "de":
                        return "de_DE";
                    default:
                    case "fr":
                        return "fr_FR";
                }
            },
            getLanguageCode: function (locale) {
                switch (locale) {
                    case "en_GB":
                    case "en-GB":
                    case "en_US":
                    case "en-US":
                        return "en";
                    case "de_DE":
                    case "de-DE":
                        return "de";
                    default:
                    case "fr_FR":
                    case "fr-FR":
                    case "fr_CA":
                    case "fr-CA":
                        return "fr";
                }
            }
        }
    }];
});
