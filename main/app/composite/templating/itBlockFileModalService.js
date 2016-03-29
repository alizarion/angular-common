/**
 * Created by dge on 14/12/2015.
 */
'use strict';
IteSoft.factory('itBlockFileModalService', ['$uibModal','$log','itPopup','BlockService','itNotifier','JSService','CSSService',
    function ($uibModal,$log,itPopup,BlockService,itNotifier,JSService,CSSService) {
        var self = this;
        function openModal(type) {
            self.itBlockFileModal = $uibModal.open({
                template: '<div class="modal-control-panel ">' +
                '</div>' +
                '<div ng-click="exit()" class="glyphicon glyphicon-remove template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="delete()" class="glyphicon glyphicon-trash template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="save()" class="glyphicon glyphicon-floppy-save template-add-block template-circle-btn float-right"></div>' +
                '<div class="modal-header"> ' +
                ' </div>' +
                '<div class="modal-body row row-height-10""> ' +
                '<div ui-codemirror="{ lineNumbers: true, theme:\'dracula\', lineWrapping : false, mode: \'js\', ' +
                'smartIndent:  true, readOnly: false, viewportMargin: 1000 }" ' +
                'ng-model="content"> </div>'+
                '</div>',
                controller: ['$scope', '$uibModalInstance','$window','$location','$document', function ($scope, $uibModalInstance,$window,$location,$document) {
                    if(type == "CSS"){
                        CSSService.css.get({'packageName':'10-ps','fileName':'ps'},function(data){
                            $scope.content= data.content;
                        })
                        
                    }else if(type == "JS"){
                        JSService.js.get({'packageName':'10-ps','fileName':'ps'},function(data){
                            $scope.content= data.content;
                        })
                    }
                    
                    $scope.exit = function () {
                        BlockService.build.get(function () {
                            location.reload();
                        }, function () {
                            $log.error("Unable to build dist  ")
                        })
                    };
                    $scope.save = function () {

                        
                    };
                    $scope.delete = function () {

                    };

                }],
                size: 'xxl',
                resolve: {}
            })

            return self.itBlockFileModal;
        }
        ;
        return {
            open: openModal,
        };
    }

]);