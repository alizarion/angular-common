'use strict';


/**
 * @ngdoc directive
 * @name dependencies.directive:timeline
 * @module dependencies
 * @since 1.2
 * @description
 * An Angular.js directive that generates a responsive, data-driven vertical timeline to tell a story, show history or describe a sequence of events.
 * See more :  {@link https://gitlab.com/itesoft/timeline}
 * @example
 <example module="itesoft-showcase">
 <file name="index.html">


 <div class="container-fluid"  ng-controller="mainController">
 <h1>Angular Timeline</h1>
 <button ng-click="addEvent()">Add New Event</button>
 <button ng-click="leftAlign()">Left Side</button>
 <button ng-click="rightAlign()">Right Side</button>
 <button ng-click="defaultAlign()">Alternate Sides</button>
 <br/>
 <br/>
 <timeline>
 <!-- can also hard-code to side="left" or side="right" -->
 <timeline-event ng-repeat="event in events" side="{{side}}">
 <!-- uses angular-scroll-animate to give it some pop -->
 <timeline-badge class="{{event.badgeClass}} timeline-hidden"
 when-visible="animateElementIn" when-not-visible="animateElementOut">
 <i class="glyphicon {{event.badgeIconClass}}"></i>
 </timeline-badge>

 <!-- uses angular-scroll-animate to give it some pop -->
 <timeline-panel class="{{event.badgeClass}} timeline-hidden"
 when-visible="animateElementIn" when-not-visible="animateElementOut">
 <timeline-heading>
 <h4>{{event.title}}</h4>

 <p ng-if="event.when">
 <small class="text-muted"><i class="glyphicon glyphicon-time"></i>{{event.when}}</small>
 </p>
 <p ng-if="event.titleContentHtml" ng-bind-html="event.titleContentHtml">
 </p>
 </timeline-heading>
 <p ng-bind-html="event.contentHtml"></p>
 <timeline-footer ng-if="event.footerContentHtml">
 <span ng-bind-html="event.footerContentHtml"></span>
 </timeline-footer>
 </timeline-panel>
 </timeline-event>
 </timeline>
 </div>



 </file>
 <file name="Module.js">
 angular.module('itesoft-showcase',['angular-timeline','itesoft']);
 </file>
 <file name="Controller.js">
 angular.module('itesoft-showcase').controller('mainController', ['$rootScope','$document','$timeout','$scope',
 function($rootScope, $document, $timeout, $scope) {

        var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. " +
                      "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor." +
                      "Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, " +
                      "ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor." +
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

        $scope.side = '';



        $scope.events = [{
            badgeClass: 'info',
            badgeIconClass: 'fa fa-check-square',
            title: 'First heading',
            when: '11 hours ago via Twitter',
            content: 'Some awesome content.'
        }, {
            badgeClass: 'warning',
            badgeIconClass: 'fa fa-credit-card',
            title: 'Second heading',
            when: '12 hours ago via Twitter',
            content: 'More awesome content.'
        }, {
            badgeClass: 'default',
            badgeIconClass: 'glyphicon-credit-card',
            title: 'Third heading',
            titleContentHtml: '<img class="img-responsive" src="http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg">',
            contentHtml: lorem,
            footerContentHtml: '<a href="">Continue Reading</a>'
        }];

        $scope.addEvent = function() {
            $scope.events.push({
                badgeClass: 'info',
                badgeIconClass: 'glyphicon-check',
                title: 'First heading',
                when: '3 hours ago via Twitter',
                content: 'Some awesome content.'
            });

        };
        // optional: not mandatory (uses angular-scroll-animate)
        $scope.animateElementIn = function($el) {
            $el.removeClass('timeline-hidden');
            $el.addClass('bounce-in');
        };

        // optional: not mandatory (uses angular-scroll-animate)
        $scope.animateElementOut = function($el) {
            $el.addClass('timeline-hidden');
            $el.removeClass('bounce-in');
        };

        $scope.leftAlign = function() {
            $scope.side = 'left';
        }

        $scope.rightAlign = function() {
            $scope.side = 'right';
        }

        $scope.defaultAlign = function() {
            $scope.side = '';
        }
    }
 ]);
 </file>

 </example>
 */