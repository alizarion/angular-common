'use strict';
IteSoft.factory('CurrentErrors', [function () {


        function _isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        };

        function _isArrayEmpty(obj) {
            if (!angular.isDefined(obj) || !angular.isArray(obj)) {
                return false;
            }

            return obj.length == 0;
        };

        return {
            //Technical errors
            technicalErrors: [],

            //Error levels
            fatals: {},
            errors: {},
            warnings: {},

            // Errors levels by tabs
            fatalsByTabs: {},
            errorsByTabs: {},
            warningsByTabs: {},

            init: function () {
                this.fatals = {};
                this.errors = {};
                this.warnings = {};
                this.fatalsByTabs = {};
                this.errorsByTabs = {};
                this.warningsByTabs = {};
            },
            hasFatalOrHigher: function () {
                return this.hasFatal() || this.hasTechnical();
            },
            hasTechnical: function () {
                return !_isArrayEmpty(this.technicalErrors);
            },
            hasFatal: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.fatalsByTabs[tab])) {
                        return !_isEmpty(this.fatalsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.fatals);
                }
                return false;
            },
            hasError: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.errorsByTabs[tab])) {
                        return !_isEmpty(this.errorsByTabs[tab]);
                    } else {
                        return false;
                    }

                } else {
                    return !_isEmpty(this.errors);
                }
                return false;
            },
            hasWarning: function (tab) {
                if (angular.isDefined(tab)) {
                    if (angular.isDefined(this.warningsByTabs[tab])) {
                        return !_isEmpty(this.warningsByTabs[tab]);
                    } else {
                        return false;
                    }
                } else {
                    return !_isEmpty(this.warnings);
                }
                return false;
            }
        };
    }]);