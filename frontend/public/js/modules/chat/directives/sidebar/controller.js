'use strict';

module.exports = [
    '$scope',
    'ChatService',
    function($scope, ChatService) {

        $scope.openNewPrivateChat = function() {

            ChatService.setChatParams({
                is_private: true
            });

            return ChatService.openNewChatModal();
        };
        $scope.openNewPublicChat = function() {

            ChatService.setChatParams({
                is_private: false
            });

            return ChatService.openNewChatModal();
        }
    }
];