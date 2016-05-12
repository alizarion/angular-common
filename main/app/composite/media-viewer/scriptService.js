'use strict';
/**
 * TODO ScriptService desc
 */
IteSoft.factory('itScriptService', ['$log' , '$window' , '$q', function($log, $window, $q){
    var _scipts = {};
    var _css = {};
    var defaultScriptPromise = $q.defer();
    var defaultScriptsPromise = $q.defer();

    //JS
    var _loadScripJs = function (js) {
        if(js){
            if(_scipts[js] != undefined){
                return _scipts[js];
            }else {
                var deferred = $q.defer();
                var script = document.createElement('script');
                _scipts[js] = deferred.promise;
                script.src = js;
                script.type = 'text/javascript';
                script.onload = function () {
                    deferred.resolve(script);
                };
                document.head.appendChild(script);
                return deferred.promise;
            }
        }
        defaultScriptPromise.resolve();
        return defaultScriptPromise.promise;
    };

    var _loadScriptsJs = function (scriptJs) {
        if(typeof scriptJs == typeof ""){
            return _loadScripJs(scriptJs);
        }else if(typeof scriptJs == typeof []){
            var promises = [];
            angular.forEach(scriptJs, function(js){
                promises.push(_loadScripJs(js));
            });
            return $q.all(promises);
        }
        defaultScriptsPromise.resolve();
        return defaultScriptsPromise.promise;
    };

    //CSS
    var _loadScriptCss = function (css) {
        if(css){
            if(_css[css] != undefined){
                return _css[css];
            }else {
                var deferred = $q.defer();
                var link = document.createElement('link');
                _css[css] = deferred.promise;
                link.href = css;
                link.rel ='stylesheet';
                link.type = 'text/css';
                link.onload = function () {
                    deferred.resolve(link);
                };
                document.head.appendChild(link);
                return deferred.promise;
            }
        }
        defaultScriptPromise.resolve();
        return defaultScriptPromise.promise;
    };

    var _loadScriptsCss = function (scriptCss) {
        if(typeof scriptCss == typeof ""){
            return _loadScriptCss(scriptCss);
        }else if(typeof scriptCss == typeof []){
            var promises = [];
            angular.forEach(scriptCss, function(css){
                promises.push(_loadScriptCss(css));
            });
            return $q.all(promises);
        }
        defaultScriptsPromise.resolve();
        return defaultScriptsPromise.promise;
    };

    //Scripts
    var _loadScripts = function (js, css) {
        return $q.all([_loadScriptsJs(js), _loadScriptsCss(css)]);
    };

    return {
        LoadScripts : _loadScripts
    };
}]);
