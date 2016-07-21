'use strict';

/**
 * @ngdoc service
 * @name itesoft.service:itMessaging
 * @module itesoft
 * @since 1.2
 * @requires $websocket
 * @requires $log
 * @requires $q
 *
 * @description
 * Service that provide all functions to connect and  dialog with itesoft-messaging system.
 *
 * <table class="table">
 * <tr>
 *     <th>Property</th>
 *     <th>Default value</th>
 *     <th>Description</th>
 * </tr>
 *
 * <tr>
 *     <td><code>ItMessagingProvider.SERVICE_URL = 'Your itesoft-messaging URL';</code></td>
 *     <td>''</td>
 *     <td>angular.module('myModule')<br>.config(['ItMessagingProvider', function(ItMessagingProvider) {<br>
 *      ItMessagingProvider.SERVICE_URL = 'tstbuydpoc01:3333/itesoft-messaging';
 *      <br>
 *  }])</td>
 * </tr>
 * <tr>
 *     <td><code>Message json format</code></td>
 *     <td>''</td>
 *     <td><div tabindex="-1" class="json"><span class="sBrace structure-1" id="s-1">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-2">"data"</span><span class="sColon" id="s-3">:</span><span class="sBrace structure-2" id="s-4">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-5">"youBusinessKey"</span><span class="sColon" id="s-6">:</span><span class="sObjectV" id="s-7">"some&nbsp;business&nbsp;data"</span><span class="sComma" id="s-8">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-9">"youBusinessKey2"</span><span class="sColon" id="s-10">:</span><span class="sObjectV" id="s-11">"other&nbsp;business&nbsp;data"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBrace structure-2" id="s-12">}</span><span class="sComma" id="s-13">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-14">"creationDate"</span><span class="sColon" id="s-15">:</span><span class="sObjectV" id="s-16">"2016-05-31T15:15:14.436+0000"</span><span class="sComma" id="s-17">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-18">"from"</span><span class="sColon" id="s-19">:</span><span class="sObjectV" id="s-20">"senderID"</span><span class="sComma" id="s-21">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-22">"notification"</span><span class="sColon" id="s-23">:</span><span class="sBrace structure-2" id="s-24">{ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-25">"title"</span><span class="sColon" id="s-26">:</span><span class="sObjectV" id="s-27">"notification&nbsp;title&nbsp;"</span><span class="sComma" id="s-28">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-29">"body"</span><span class="sColon" id="s-30">:</span><span class="sObjectV" id="s-31">"notification&nbsp;body"</span><span class="sComma" id="s-32">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-33">"icon"</span><span class="sColon" id="s-34">:</span><span class="sObjectV" id="s-35">"some-icon-to-render"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBrace structure-2" id="s-36">}</span><span class="sComma" id="s-37">,</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sObjectK" id="s-38">"to"</span><span class="sColon" id="s-39">:</span><span class="sBracket structure-2" id="s-40">[ <a href="javascript:;"><i class="fa fa-minus-square-o"></i></a> </span><br><span>&nbsp;&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;</span><span class="sArrayV" id="s-41">"/topic/topicGroup:topicName"</span><br><span>&nbsp;&nbsp;&nbsp;</span><span class="sBracket structure-2" id="s-42">]</span><br><span class="sBrace structure-1" id="s-43">}</span></div></td>
 * </tr>
 * <tr>
 *  <td>service constructor  var itmsg = new ItMessaging(BASE_URL);</td>
 *  <td>''</th>
 *  <td>new ItMessaging(BASE_URL), BASE_URL of your itesoft-messaging backend service without protocol ex: localhost:8080/itesoft-messaging </td>
 * </tr>
 * <tr>
 *     <td> itmsg.connect(token);</td>
 *     <td>''</td>
 *     <td>to establish a websocket connexion with itesoft-messaging service, using the token that have returned by your backend using his api key </td>
 * </tr>
 * <tr>
 *     <td>itmsg.subscribeToTopic('/topic/'+topicName,observers)</td>
 *     <td>''</td>
 *     <td>return promise, method to subscribe some users(observers) to topic ,<br>
 *         if topic does not exist, it will be automatically created<br>
 *         if you try to subscribe observers to topic which has been created by a backend system(using api key not with token) you will get and error.<br>
 *         commonly if your topic is conversation between observer, use the "/topic/conversation:" key to start naming it.
 *      </td>
 * </tr>
 * <tr>
 *     <td>itmsg.unSubscribeToTopic('/topic/'+topicName,observers)</td>
 *     <td>''</td>
 *     <td>return promise, method to unsubscribe some users(observers) from topic ,<br>
 *         if you try to unsubscribe observers to topic which has been created by a backend system(using api key not with token) you will get and error.<br>
 *         observers that has been registred to topic using api key, can be unregistred using api key not a token.
 *      </td>
 * </tr>
 * <tr>
 *     <td>itmsg.onClose(callbackFunction(event)</td>
 *     <td>''</td>
 *     <td>
 *         callback function will be triggered where websocket connexion is interupted.
 *      </td>
 * </tr>
 *
 * <tr>
 *     <td>itmsg.onMessage(callbackFunction(message,topics)</td>
 *     <td>''</td>
 *     <td>
 *        callback function is triggered when message arrive, they will pass 3 arguments, message that has been received <br>
 *        and topics, that represent list of the topics that the user have subscribe.
 *      </td>
 * </tr>
 *
 * </table>
 *
 * @example
    <example module="itesoft">

         <file name="Controller.js">
             var BASE_URL = 'tstbuydpoc01:3333/itesoft-messaging';
             var API_KEY = 'fbd0ca6b-e3e4-47e3-952a-c0e7630f9932';
                function Message(messageText){
                          this.to = [];
                          this.data =  {
                            "message" : messageText
                          };
                          this.notification = {
                            title: self.username + ' sent you a message',
                            body : self.username + ' sent you a message',
                            icon : 'comment-o'
                       }
                    }

                     angular.module('itesoft')
                     .config(['ItMessagingProvider', function(ItMessagingProvider) {
                            ItMessagingProvider.SERVICE_URL = BASE_URL;
                       }])
                     .filter('conversation',[ function() {
                      return function(input,args) {
                        var result ='';
                        var stringResult = '';
                        if(input.startsWith('conversation:')){
                          input = input.replace('conversation:','');
                          input = input.replace(args+':','');
                            input = input.replace(args,'');
                          result =  input.split(':');
                          angular.forEach(result,function(entry){
                              stringResult = stringResult + ' ' +entry;
                          })
                          return stringResult;
                        }

                        return input;
                      };
                      }])

                     .filter('topic',[ function() {
                          return function(input,arge) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                    if(entry.reference.startsWith('conversation:')){
                                      result.push(entry);
                                    }

                              });

                              return result;
                            }
                            return input;
                          };
                      }])

                     .filter('group',[ function() {
                          return function(input,groups) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                  angular.forEach(entry.to ,function(dest){
                                    angular.forEach(groups,function(group){
                                       if(dest.startsWith(group + ':')){
                                      result.push(entry);
                                    }
                                    })

                                  })
                              });
                              return result;
                            }
                            return input;

                          };
                      }])
                     .filter('recipient',[ function() {
                          return function(input,arge) {

                            var result = [];
                            if(input){
                              angular.forEach(input, function(entry){
                                  angular.forEach(entry.to, function(entry2){
                                    if(entry2.startsWith(arge+':')){
                                      result.push(entry);
                                    }

                              });
                             });
                              return result;
                            }
                            return input;
                          };
                      }])
                     .controller('MainController',['ItMessaging','itNotifier','$scope','FakeNotifierService',
                     function(ItMessaging,itNotifier,$scope,FakeNotifierService){

                        var self = this;

                        self.BASE_URL = BASE_URL;
                        self.SHOWCASE_TOPIC = "group:all";
                        self.INVOICES_TOPIC = "invoices:xxxxxx"
                        self.API_KEY = API_KEY;
                        var itmsg = new ItMessaging(self.BASE_URL);

                        self.messages = [];
                        self.topics = [];
                        self.selectedTopic = null;
                        self.username = null;

                        self.isConnected = false;
                        self.username = null;

                        itmsg.onMessage(function(message,topics){
                          self.topics = topics;
                          self.messages.push(message);

                          _scrollToBottom();
                        });

                        itmsg.onClose(function(event){
                           itNotifier.notifyError({
                                      content: "Error popup",
                                      dismissOnTimeout: false
                                  },
                                  {
                                      CODE:500,
                                      TYPE:'error',
                                      MESSAGE:'Something bad happened',
                                      DETAIL:'You don\'t wanna know',
                                      DONE:1
                                  });

                           self.isConnected = false;
                        });

                        this.login = function(username){
                          self.username = username;
                          itmsg.getToken(self.API_KEY ,{id : username, displayName : username},898090).then(function(token){
                            var fake  = new FakeNotifierService(token);
                            fake.startNotify();
                           self.isConnected = itmsg.connect(token);
                           itmsg.subscribeToTopic(self.SHOWCASE_TOPIC,[{id : self.username}]);
                           itmsg.subscribeToTopic(self.INVOICES_TOPIC,[{id : self.username}]);
                          });
                        }

                        this.sendMessage = function(messageText){
                          var m = new Message(messageText);
                          var r =  _textMessageExtractor(messageText);
                          var topicName = null;
                          if(r.topicName){
                            topicName =r.topicName;
                          } else if(self.selectedTopic) {
                             topicName =self.selectedTopic.reference;
                          } else {
                            topicName = self.SHOWCASE_TOPIC;
                          }
                          m.to.push('/topic/'+topicName);
                          itmsg.subscribeToTopic(topicName,r.observers)
                              .then(function(ok){
                                   itmsg.sendMessage(m);
                          });
                          self.$textMessage = '';
                        }

                        this.selectCurrentTopic = function(topic){
                          self.selectedTopic = topic;
                          _scrollToBottom();
                        }

                        this.unSubscribe = function(topicName){
                          itmsg.unsubscribeToTopic(topicName,[{id : self.username }])
                        }


                        function _textMessageExtractor(messageText){
                              var regex = new RegExp(/(^|[^@\w])@(\w{1,15})\b/g);
                     var myArray;
                     var users = [];
                     var result = {
                                          observers : [],
                                          topicName : null
                                      };
                     while ((myArray = regex.exec(messageText)) != null)
                     {
                       users.push(myArray[2])
                     }
                     users.sort();
                     if(users.length > 0){
                                        result.topicName = 'conversation:'+ self.username;
                                          for ( var user  in  users){
                                            result.topicName = result.topicName + ':' + users[user];
                                            result.observers.push(
                                              {
                                              'id' : users[user]
                                              }
                                          );
                                          }
                                          result.observers.push({
                                            'id': self.username
                                          });
                                  }
                     return result;
                     }


                     function _scrollToBottom(){
                               setTimeout(function() {
                               var scroller1 = document.getElementById('conversation-content');
                               scroller1.scrollTop = scroller1.scrollHeight;
                               var scroller2 = document.getElementById('notification-content');
                               scroller2.scrollTop = scroller2.scrollHeight;

                              },250);
                            }

                     }]).service('FakeNotifierService',['ItMessaging','$timeout','$http',function(ItMessaging,$timeout,$http){

                             function FakeNotifierService(token){
                               var self = this;

                               self.itmsg = new ItMessaging(token);
                               self.icons = ['warning','success','error','info']
                               this.startNotify = function(){
                                 var icon = self.icons[Math.floor(Math.random()*self.icons.length)];
                                 setTimeout(function () {
                                   $http({
                                     url : 'http://api.icndb.com/jokes/random',
                                     method:'GET'

                                   }).then(function(response){

                                      var m = new Message('');
                                      m.notification = {
                                        title :Math.random().toString(36).slice(2).substring(0,7),
                                        body : response.data.value.joke,
                                        icon: icon
                                      };
                                      m.to.push('/topic/invoices:xxxxxx');
                                      self.itmsg.sendMessage(m);
                                      self.startNotify()

                                   })


                               }, Math.floor(Math.random() * 3000));
                               }
                             }


                              return function(token){
                                   return new FakeNotifierService(token);
                               };
                    }]);

          </file>
         <file name="index.html">
             <div  style="height:600px !important;" ng-controller="MainController as main">
                 <div class="row-height-1">
                 <div ng-if="main.username">
                 <h9  id="example_source_hi-@{{mainusername}}" id="example_source_hi-@{{mainusername}}" id="example_source_hi-@{{mainusername}}">hi @{{main.username}}</h9>
                 <p>Use @Username to chat with other users</p>
                 </div>
                 </div>
                 <div class="row row-height-9" ng-if="main.isConnected">
                 <div class="col-md-6 col-xs-6  it-fill">
                 <div   class="col-xs-12 jumbotron  it-fill"  >
                 <div class="it-fill" id="notification-content" style="overflow-y:auto;">
                 <div ng-repeat="n in main.messages | group:['/topic/invoices'] | orderBy: 'creationDate':false ">
                 <div class="it-messaging-message">
                 <div class="it-messaging-notification {{n.notification.icon}}" >
                 <span class="sender">{{n.notification.title}} </span><b>&nbsp; Notification</b>
                 <span class="message-text">{{n.notification.body}}</span>

                 </div>

                 <div class="small">{{n.creationDate | date:'yyyy-MM-dd HH:mm'}}</div>
                 </div>

                 </div>

                 </div>

                 </div>
                 </div>
                 <div class="col-md-6 col-xs-6  it-fill">
                 <div class="col-xs-12 jumbotron  it-fill">
                 <div class="row-height-2 " style=" overflow-x: scroll!important;">
                 <div>
                 <div class="pull-left it-messaging-tag label label-info">
                 <a href=""  ng-click="main.selectCurrentTopic(null)">all</a>
                 </div>

                 <div class="pull-left it-messaging-tag label label-info" ng-repeat="t in main.topics |topic:t.reference  ">
                 <a href=""  ng-click="main.selectCurrentTopic(t)">{{t.reference | conversation:main.username:'conversation'}}</a><a href="" ng-click="main.unSubscribe(t.reference)">  x</a>
                 </div>
                 </div>

                 </div>
                 <div class="row-height-8 "  id="conversation-content"  style="overflow:auto;margin-top: -30px;background-color:white;">
                 <div ng-repeat="m in main.messages | group: ['/topic/conversation','/topic/group']| orderBy: 'creationDate':false">
                 <div class="it-messaging-message" ng-if="main.selectedTopic ? m.to.indexOf('/topic/'+main.selectedTopic.reference)>=0 :true">
                 <div class="it-messaging-chat" ng-if="m.data.message" ng-class="{mine :(main.username==m.from) ,others : (main.username!=m.from) }">
                 <span class="sender"> @{{m.from.displayName}} :</span>
                 <span class="message-text">{{m.data.message}}</span>

                 </div>
                 <div ng-if="!m.data.message">
                 <span ng-if="m.notification"><i class="fa fa-{{m.notification.icon}}"></i>  {{m.notification.body}} </span>
                 </div>

                 <div class="small">{{m.creationDate | date:'yyyy-MM-dd HH:mm'}}</div>
                 </div>
                 </div>
                 </div>
                 <div class="row-height-2 ">
                 <form  novalidate name="messageForm" ng-submit="main.sendMessage(main.$textMessage)">
                 <input ng-model="main.$textMessage" name=""  style="width : 100%">

                 </form>
                 </div>
                 </div>
                 </div>
                 </div>

                 <div class="row row-height-6" ng-if="!main.isConnected">
                 <div class="col-md-6  col-xs-6 col-xs-offset-3 col-md-offset-3 jumbotron  it-fill">
                 <br>
                 <form class="form-group"  novalidate name="myForm" ng-submit="main.login(username)">
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 disabled="true"
                 type="text"
                 it-label="API URL"
                 ng-model="main.BASE_URL">
                 </div>
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 disabled="true"
                 type="text"
                 it-label="API KEY"
                 ng-model="main.API_KEY">
                 </div>
                 <div class="form-group">
                 <input it-input class="form-control floating-label"
                 required=""
                 ng-maxlength="10"
                 type="text"
                 it-label="Username"
                 name="Username"
                 ng-model="username">
                 </div>
                 <button class="btn btn-primary" type="submit">Sign in</button>
                 </form>
                 </div>

                 </div>

                 <toast class="toaster" style="left:0px !important; bottom:0px !important"></toast>

             </div>
         </file>
 </example>
 **/
angular.module('itesoft.messaging',[])
.provider('ItMessaging',[
    function(){

        var providerState = this;
        providerState.SERVICE_URL = 'tstbuydpoc01:3333/itesoft-messaging';

        this.$get = ['$log',
            '$http',
            '$q',
            '$websocket',
            '$rootScope',
            function($log,
                     $http,
                     $q,
                     $websocket,
                     $rootScope){

        function ItMessaging(token){

            var self = this;
            self.URL = providerState.SERVICE_URL ;
            self.onMessageCallbacks = [];
            self.onCloseCallbacks   = [];

            self.token = token;

            this.getToken = function(apiKey,observer,ttl){
                console.warn('This function is only for demo purpose,'+
                    ' do NOT use it in production mode, ' +
                    'the security of your apiKey will not be granted');
                var deferred = $q.defer();

                $http({
                    url: 'http://'+ this.URL + '/rest/tokens' ,
                    method: "POST",
                    data:observer,
                    headers: {
                        'api-key': apiKey
                    }
                }).then(function(response){
                    deferred.resolve(response.data.jwt);
                },function(error){
                    $log.error('error on api endpoint');
                    deferred.reject('error on api endpoint');
                });
                return deferred.promise;
            };


            function _updateTopics(){
                var deferred = $q.defer();
                $http({
                    url: 'http://'+self.URL+'/rest/topics',
                    method: "GET",
                    headers: {
                        'token': self.token
                    }
                }).then(function(response){
                    deferred.resolve(response.data);
                },function(error){
                    $log.error(error);
                    deferred.reject(deferred);
                });
                return deferred.promise;
            }

            this.getServiceUrl = function(){
                return self.URL;
            };

            this.connect = function(token){
                if(token){
                    self.token = token;
                    self.dataStream = $websocket('ws://'+ self.URL  +'/websocket?token=' + token);
                    self.dataStream.onMessage(function(msg){
                        _updateTopics().then(function(topics){
                            _onMessageHandler(msg,topics);
                        })
                    });

                    self.dataStream.onClose(function(event){
                        _onCloseHandler(event);
                    })

                    return true;
                }
            };

            this.onMessage = function(callback) {
                self.onMessageCallbacks.push({
                    fn: callback
                });
                return self;
            };

            this.onClose = function(callback) {
                self.onCloseCallbacks.push({
                    fn: callback
                });
                return self;
            };

            function _onMessageHandler(message,topics){
                var pattern;
                var currentCallback;

                for (var i = 0; i < self.onMessageCallbacks.length; i++) {
                    currentCallback = self.onMessageCallbacks[i];
                    var jsonResult = angular.fromJson(message.data);
                    if(angular.isArray(jsonResult)){
                        angular.forEach(jsonResult,function(entry){
                            $rootScope.$applyAsync(function(){
                                currentCallback.fn.apply(this,[entry,topics]);
                            })

                        })

                    } else {
                        $rootScope.$applyAsync(function(){
                            currentCallback.fn.apply(this,[jsonResult,topics]);
                        })

                    }
                }
            }

            function _onCloseHandler(event){
                var pattern;
                var currentCallback;
                for (var i = 0; i < self.onCloseCallbacks.length; i++) {
                    currentCallback = self.onCloseCallbacks[i];
                    $rootScope.$applyAsync(function(){
                        currentCallback.fn.apply(this,event);
                    })
                }
            }

            this.subscribeToTopic = function(topicname,observers){
                var deferred = $q.defer();
                if(self.token!=null){
                    $http({
                        url: 'http://'+self.URL+'/rest/topics/'+topicname+'/subscribe',
                        method: "POST",
                        data : observers,
                        headers: {
                            'token': self.token
                        }
                    }).then(function(response){
                        deferred.resolve(response.data)
                        _updateTopics();
                    },function(error){
                        $log.error(error);
                        deferred.reject(error);
                    })
                } else {
                    $log.error('You cannot register observers to topic without token');
                    deferred.reject('no token');
                }
                return deferred.promise;
            }

            this.unsubscribeToTopic = function(topicname,observers){
                var deferred = $q.defer();
                if(self.token!=null){
                    $http({
                        url: 'http://'+self.URL+'/rest/topics/'+topicname+'/unsubscribe',
                        method: "POST",
                        data : observers,
                        headers: {
                            'token': self.token
                        }
                    }).then(function(response){
                        deferred.resolve(response.data)
                        _updateTopics();
                    },function(error){
                        $log.error(error);
                        deferred.reject(error);
                    })
                } else {
                    $log.error('You cannot register observers to topic without token');
                    deferred.reject('no token');
                }
                return deferred.promise;
            }

            this.sendMessage = function(messageObj){
                var deferred = $q.defer();
                $http({
                    url: 'http://'+self.URL+'/rest/messages',
                    method: "POST",
                    headers: {
                        'token': self.token
                    },
                    data : messageObj
                }).then(function(response){
                    deferred.resolve(response.data);
                },function(error){
                    $log.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            }

        }

        return function(url){
            return new ItMessaging(url);
        };
            }]
    }])
