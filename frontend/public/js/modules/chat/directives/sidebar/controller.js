'use strict';

module.exports = [
    '$scope',
    'ChatService',
    function($scope, ChatService) {

        $scope.openNewPrivateChat = function() {
            return ChatService.openNewChatModal({
                isPrivate: true
            });
        };
        $scope.openNewPublicChat = function() {
            return ChatService.openNewChatModal({
                isPrivate: false
            });
        }
    }
];