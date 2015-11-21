'use strict';

module.exports = [
    '$scope',
    '$modal',
    'authService',
    function($scope, $modal, authService) {

        function openNewChatModal(params) {
            var $modalInstance;

            $modalInstance = $modal.open({
                template: require('../../new-chat/template.html'),
                controller: 'NewModalController',
                resolve: {
                    data: function() {
                        return {

                            modalTitle: params.isPrivate ? 'private' : 'public',
                            isPrivate: params.isPrivate,
                            authData: authService.getIdentity()
                        }

                    }
                }
            });
        }

        $scope.openNewPrivateChat = function() {
            return openNewChatModal({
                isPrivate: true
            });
        };
        $scope.openNewPublicChat = function() {
            return openNewChatModal({
                isPrivate: false
            });
        }
    }
];