'use strict';
/**
 * TODO SizeWatcher desc
 */
itMultiPagesViewer.factory('SizeWatcher', ['$interval', function($interval) {
        return function (element, rate) {
            var self = this;
            (self.update = function() { self.dimensions = [element.offsetWidth, element.offsetHeight]; })();
            self.monitor = $interval(self.update, rate);
            self.group = [function() { return self.dimensions[0]; }, function() { return self.dimensions[1]; }];
            self.cancel = function() { $interval.cancel(self.monitor); };
        };
    }]);
