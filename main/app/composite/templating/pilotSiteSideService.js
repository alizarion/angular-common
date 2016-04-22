/**
 * Created by stephen on 03/04/2016.
 * Service that pilot web site to editor communication
 */

'use strict';

IteSoft.factory('PilotSiteSideService', ['$resource', '$log', 'CONFIG', 'PilotService',
    function ($resource, $log, CONFIG, PilotService) {

        var self = this;

        self.fields = {};

        self.fn = {
            editBlock: _editBlock,
            removeBlock: _removeBlock,
            createBlock: _createBlock,
            editPage: _editPage,
            removePage: _removePage,
            createPage: _createPage,
            ping: PilotService.fn.ping
        };

        self.on = {
            reload: undefined,
            pong: undefined,
            editorConnect: undefined,
            editorDisconnect: undefined,
            close:undefined,
            reopen:undefined,
            transportFailure:undefined,
            error:undefined
        };

        PilotService.fields.dest = PilotService.DEST_EDITOR;

        // test connection with editor when websocket is open
        PilotService.on.open = function (response) {
            $log.log("WebSocket connection is opened");
            self.fn.ping(PilotService.DEST_EDITOR);
        };

        PilotService.on.reopen = function (response) {
            $log.log("WebSocket connection is reopened");
            self.fn.ping(PilotService.DEST_EDITOR);
        };

        PilotService.on.close=function(){
            if(angular.isDefined(self.on.close)){
                self.on.close();
            }
        };
        PilotService.on.error=function(){
            if(angular.isDefined(self.on.error)){
                self.on.error();
            }
        };
        PilotService.on.transportFailure=function(){
            if(angular.isDefined(self.on.transportFailure)){
                self.on.transportFailure();
            }
        };

        /**
         * Call when message on websocket
         * @param response
         */
        PilotService.on.message = function (response) {
            var responseText = response.responseBody;
            try {
                var message = atmosphere.util.parseJSON(responseText);

                if (message.dest == PilotService.DEST_ALL) {
                    switch (message.action) {
                        case PilotService.ACTION_CONNECT:
                            $log.log(PilotService.ACTION_CONNECT);
                            if (angular.isDefined(self.on.editorConnect)) {
                                self.on.editorConnect();
                            }
                            break;
                        case PilotService.ACTION_DISCONNECT:
                            $log.log(PilotService.ACTION_DISCONNECT);
                            if (angular.isDefined(self.on.editorDisconnect)) {
                                self.on.editorDisconnect();
                            }
                            break;
                    }
                }
                if (message.dest == PilotService.DEST_SITE) {
                    switch (message.action) {
                        case PilotService.ACTION_RELOAD:
                            $log.log(PilotService.ACTION_RELOAD);
                            if (angular.isDefined(self.on.reload)) {
                                self.on.reload();
                            }
                            break;
                        case PilotService.ACTION_PING:
                            $log.log(PilotService.ACTION_PING);
                            PilotService.pong(PilotService.DEST_EDITOR);
                            break;
                        case PilotService.ACTION_PONG:
                            $log.log(PilotService.ACTION_PONG);
                            if (angular.isDefined(self.on.pong)) {
                                self.on.pong();
                            }
                            break;
                        case PilotService.ACTION_PONG:
                            $log.log(PilotService.ACTION_PONG);
                            if (angular.isDefined(self.on.pong)) {
                                self.on.pong();
                            }
                            break;
                        case PilotService.ACTION_DISCONNECT:
                            $log.log(PilotService.ACTION_DISCONNECT);
                            if (angular.isDefined(self.on.editorDisconnect)) {
                                self.on.editorDisconnect();
                            }
                            break;
                        case PilotService.ACTION_CONNECT:
                            $log.log(PilotService.ACTION_CONNECT);
                            if (angular.isDefined(self.on.editorConnect)) {
                                self.on.editorConnect();
                            }
                            break;
                    }
                }
            } catch (e) {
                $log.error("Error parsing JSON: ", responseText);
                throw e;
            }
        };

        /**
         * Call when click on edit block
         * @param block
         * @param path
         * @private
         */
        function _editBlock(block,path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_EDIT_BLOCK,
                params: [{'block': block,'path':path}]
            }));
        }

        /**
         * Call when click on remove block
         * @param block
         * @param path
         * @private
         */
        function _removeBlock(block,path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_REMOVE_BLOCK,
                params: [{'block': block,'path':path}]
            }));
        }

        /**
         * Call when click on create block
         * @param block
         * @param path
         * @private
         */
        function _createBlock(block,path) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_CREATE_BLOCK,
                params: [{'block': block,'path':path}]
            }));
        }

        /**
         * Call when click on edit page
         * @param page
         * @private
         */
        function _editPage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_EDIT_PAGE,
                params: [{'page': page}]
            }));
        }

        /**
         * Call when click on remove page
         * @param page
         * @private
         */
        function _removePage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_REMOVE_PAGE,
                params: [{'page': page}]
            }));
        }

        /**
         * Call when click on create page
         * @param page
         * @private
         */
        function _createPage(page) {
            PilotService.fields.socket.push(atmosphere.util.stringifyJSON({
                dest: PilotService.DEST_EDITOR,
                action: PilotService.ACTION_CREATE_PAGE,
                params: [{'page': page}]
            }));
        }

        return self;
    }
]);
