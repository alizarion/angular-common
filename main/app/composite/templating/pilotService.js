/**
 * Created by stephen on 03/04/2016.
 * Service that pilot editor or web site web socket communication
 */

'use strict';


IteSoft.factory('PilotService', ['$resource', '$log', 'itConfig',
        function ($resource, $log, itConfig) {

            var self = this;

            self.ACTION_EDIT_BLOCK = "editBlock";
            self.ACTION_REMOVE_BLOCK = "removeBlock";
            self.ACTION_CREATE_BLOCK = "createBlock";
            self.ACTION_EDIT_PAGE = "editPage";
            self.ACTION_REMOVE_PAGE = "removePage";
            self.ACTION_CREATE_PAGE = "createPage";
            self.ACTION_PING = "ping";
            self.ACTION_PONG = "pong";
            self.ACTION_DISCONNECT = "disconnect";
            self.ACTION_TIMEOUT = "timeout";
            self.ACTION_CONNECT = "connect";
            self.ACTION_RELOAD = "reload";
            self.ACTION_OPTIONS = "options";
            self.DEST_EDITOR = "editor";
            self.DEST_SITE = "site";
            self.DEST_ALL = "all";

            self.fields = {
                socket: {},
                request: {
                    url: itConfig.get().REST_TEMPLATE_API_URL + "/t4html/editor",
                    contentType: 'application/json',
                    logLevel: 'debug',
                    transport: 'websocket',
                    trackMessageLength: true,
                    reconnectInterval: 5000,
                    enableXDR: true,
                    timeout: 60000
                },
                model: {},
                dest: ""
            };

            self.fn = {
                ping: _ping,
                pong: _pong
            };
            self.on = {
                message: {},
                open: undefined,
                close: undefined,
                reopen: undefined,
                transportFailure: undefined,
                error: undefined
            };

            /**
             *
             * @param response
             */
            self.fields.request.onOpen = function (response) {
                self.fields.model.transport = response.transport;
                self.fields.model.connected = true;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_CONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.open)) {
                    self.on.open();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onClientTimeout = function (response) {
                self.fields.model.connected = false;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_TIMEOUT,
                    params: []
                }));
                setTimeout(function () {
                    self.fields.socket = atmosphere.subscribe(self.fields.request);
                }, self.fields.request.reconnectInterval);
            };

            /**
             *
             * @param response
             */
            self.fields.request.onReopen = function (response) {
                self.fields.model.connected = true;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_CONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.reopen)) {
                    self.on.reopen();
                }
            };

            /**
             * Long polling Failure mode
             * @param errorMsg
             * @param request
             */
            self.fields.request.onTransportFailure = function (errorMsg, request) {
                atmosphere.util.info(errorMsg);
                request.fallbackTransport = 'long-polling';
                if (angular.isDefined(self.on.transportFailure)) {
                    self.on.transportFailure();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onMessage = function (response) {
                self.on.message(response);
            };

            /**
             *
             * @param response
             */
            self.fields.request.onClose = function (response) {
                self.fields.model.connected = false;
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': self.fields.dest,
                    action: self.ACTION_DISCONNECT,
                    params: []
                }));
                if (angular.isDefined(self.on.close)) {
                    self.on.close();
                }
            };

            /**
             *
             * @param response
             */
            self.fields.request.onError = function (response) {
                self.fields.model.logged = false;
                if (angular.isDefined(self.on.error)) {
                    self.on.error();
                }
            };

            /**
             *
             * @param request
             * @param response
             */
            self.fields.request.onReconnect = function (request, response) {
                self.fields.model.connected = false;
            };

            /**
             * Used to test connection between editor and website
             * @param dest
             * @private
             */
            function _ping(dest) {
                $log.log("ping " + dest);
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': dest,
                    action: self.ACTION_PING,
                    params: []
                }));
            }

            /**
             * Reply to ping
             * @param dest
             * @private
             */
            function _pong(dest) {
                $log.log("pong " + dest);
                self.fields.socket.push(atmosphere.util.stringifyJSON({
                    'dest': dest,
                    action: self.ACTION_PONG,
                    params: []
                }));
            }


            if (itConfig.get().ENABLE_TEMPLATE_EDITOR) {
                self.fields.socket = atmosphere.subscribe(self.fields.request);
            }
            return self;
        }
    ]
)
;
