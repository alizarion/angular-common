'use strict';
/**
 * TODO EventBus desc
 */
itPdfViewer .factory('EventBus', [function () {
        function EventBus() {
            this._listeners = Object.create(null);
        }

        EventBus.prototype = {
            on: function EventBus_on(eventName, listener) {
                var eventListeners = this._listeners[eventName];
                if (!eventListeners) {
                    eventListeners = [];
                    this._listeners[eventName] = eventListeners;
                }
                eventListeners.push(listener);
            },
            off: function EventBus_on(eventName, listener) {
                var eventListeners = this._listeners[eventName];
                var i;
                if (!eventListeners || ((i = eventListeners.indexOf(listener)) < 0)) {
                    return;
                }
                eventListeners.splice(i, 1);
            },
            dispatch: function EventBus_dispath(eventName) {
                var eventListeners = this._listeners[eventName];
                if (!eventListeners || eventListeners.length === 0) {
                    return;
                }
                // Passing all arguments after the eventName to the listeners.
                var args = Array.prototype.slice.call(arguments, 1);
                // Making copy of the listeners array in case if it will be modified
                // during dispatch.
                eventListeners.slice(0).forEach(function (listener) {
                    listener.apply(null, args);
                });
            }
        };

        return (EventBus);
    }]);
