/**
 * Created by stephen on 03/04/2016.
 */

'use strict';

IteSoft.factory('PilotService', ['$resource', '$log', 'CONFIG',
    function ($resource, $log, CONFIG) {

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
        self.DEST_EDITOR = "editor";
        self.DEST_SITE = "site";
        self.DEST_ALL = "all";

        self.fields = {
            socket: {},
            request: {
                url: CONFIG.REST_EDITOR_API_URL,
                contentType: 'application/json',
                logLevel: 'debug',
                transport: 'websocket',
                trackMessageLength: true,
                reconnectInterval: 5000,
                enableXDR: true,
                timeout: 60000},
            model: {},
            dest: ""
        };

        self.fn = {
            ping: _ping,
            pong: _pong
        };
        self.on = {
            message:{},
            open:undefined,
            close:undefined,
            reopen:undefined,
            transportFailure:undefined,
            error:undefined
        };

        self.fields.request.onOpen = function (response) {
            self.fields.model.transport = response.transport;
            self.fields.model.connected = true;
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': self.fields.dest, action: self.ACTION_CONNECT, params: []}));
            if(angular.isDefined(self.on.open)){
                self.on.open();
            }
        };

        self.fields.request.onClientTimeout = function (response) {
            self.fields.model.connected = false;
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': self.fields.dest, action: self.ACTION_TIMEOUT, params: []}));
            setTimeout(function () {
                self.fields.socket = atmosphere.subscribe(self.fields.request);
            }, self.fields.request.reconnectInterval);
        };

        self.fields.request.onReopen = function (response) {
            self.fields.model.connected = true;
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': self.fields.dest, action: self.ACTION_CONNECT, params: []}));
            if(angular.isDefined(self.on.reopen)){
                self.on.reopen();
            }
        };

        //For demonstration of how you can customize the fallbackTransport using the onTransportFailure function
        self.fields.request.onTransportFailure = function (errorMsg, request) {
            atmosphere.util.info(errorMsg);
            request.fallbackTransport = 'long-polling';
            if(angular.isDefined(self.on.transportFailure)){
                self.on.transportFailure();
            }
        };

        self.fields.request.onMessage = function (response) {
            self.on.message(response);
        };

        self.fields.request.onClose = function (response) {
            self.fields.model.connected = false;
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': self.fields.dest,action: self.ACTION_DISCONNECT, params: []}));
            if(angular.isDefined(self.on.close)){
                self.on.close();
            }
        };

        self.fields.request.onError = function (response) {
            self.fields.model.logged = false;
            if(angular.isDefined(self.on.error)){
                self.on.error();
            }
        };

        self.fields.request.onReconnect = function (request, response) {
            self.fields.model.connected = false;
        };


        function _ping(dest) {
            $log.log("ping "+dest);
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': dest, action: self.ACTION_PING, params: []}));
        }

        function _pong(dest) {
            $log.log("pong "+dest);
            self.fields.socket.push(atmosphere.util.stringifyJSON({'dest': dest, action: self.ACTION_PONG, params: []}));
        }

        self.fields.socket = atmosphere.subscribe(self.fields.request);
        return self;
    }
]
)
;
