'use strict';
/**
 * TODO TranslateViewer desc
 */
itMultiPagesViewer.factory('TranslateViewer', ['$translate', function($translate) {
   return {
        translate : function(key, defaultValue) {
            var result = $translate.instant(key);

            return result != key ? result : defaultValue;
        }
   };
}]);
