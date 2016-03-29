/**
 * Created by dge on 14/12/2015.
 */
'use strict';
IteSoft.factory('itBlockModalService', ['$uibModal','$log','itPopup','BlockService','itNotifier',
    function ($uibModal,$log,itPopup,BlockService,itNotifier) {
        var self = this;
        function openModal(block) {
            self.itBlockModal = $uibModal.open({
                template: '<div class="modal-control-panel ">' +
                '<div>{{\'TEMPLATE.BLOCK.NAME\' | translate}}:{{block.name}}</div>' +
                '<div>{{\'TEMPLATE.BLOCK.POSITION\' | translate}}:{{block.position}}</div>' +
                '<div>{{\'TEMPLATE.BLOCK.REFERENCE\' | translate}}:{{block.ref}}</div>' +
                '<div>{{\'TEMPLATE.BLOCK.ROLE\' | translate}}:{{block.roleAllowed}}</div>' +
                '<div ng-click="exit()" class="glyphicon glyphicon-remove template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="delete()" class="glyphicon glyphicon-trash template-add-block template-circle-btn float-right"></div>' +
                '<div ng-click="save()" class="glyphicon glyphicon-floppy-save template-add-block template-circle-btn float-right"></div>' +
                '</div>' +
                '<div class="modal-header"> ' +
                ' </div>' +
                '<div class="modal-body row row-height-10""> ' +
                '<block-edit block="block" class="col-xs-6 row-height-10"></block-edit> ' +
                '<iframe id="previewIframe"  src="{{location}}" class="col-xs-6 row-height-10 "></iframe>' +
                '</div>',
                controller: ['$scope', '$uibModalInstance','$window','$location','$document', function ($scope, $uibModalInstance,$window,$location,$document) {
                    $scope.block = block;
                    $scope.location = $location.absUrl().replace("/dist/","/preview/");

                    $scope.exit = function () {
                        BlockService.build.get(function () {
                            location.reload();
                        }, function () {
                            $log.error("Unable to build dist  ")
                        })
                    };
                    $scope.save = function () {

                        $log.log("Save Block " + JSON.stringify($scope.block))
                        BlockService.custom.save($scope.block,function(){
                            itNotifier.notifySuccess({
                                content: "{{'BLOCK_SAVED_OK' | translate}}"
                            });
                            BlockService.preview.get(function(){
                                itNotifier.notifySuccess({
                                    content: "{{'PACKAGE_OK' | translate}}"
                                });

                                var iframe = document.getElementById("previewIframe");
                                iframe.contentWindow.location.reload(true);
                            });
                        });
                        
                    };
                    $scope.delete = function () {
                        var confirmPopup = itPopup.confirm({
                            title: "{{'DELETE_BLOCK_TITLE' | translate}}",
                            text: "{{'DELETE_BLOCK_CONFIRM' | translate}}",
                            buttons: [

                                {
                                    text: 'Cancel',
                                    type: '',
                                    onTap: function () {
                                        return false;
                                    }
                                },
                                {
                                    text: 'ok',
                                    type: '',
                                    onTap: function () {
                                        return true;
                                    }
                                }
                            ]
                        });
                        confirmPopup.then(function (res) {
                            BlockService.custom.delete($scope.block);
                            $scope.block = {};
                            $uibModalInstance.close($scope.selected.item);
                            itNotifier.notifySuccess({
                                content: "{{'BLOCK_DELETED_OK' | translate}}"
                            });
                        }, function () {
                            itNotifier.notifyError({
                                content: "{{'BLOCK_DELETED_KO' | translate}}"
                            });
                        });
                    };

                }],
                size: 'xxl',
                resolve: {}
            })

            return self.itBlockModal;
        }
        ;
        return {
            open: openModal,
        };
    }

]);