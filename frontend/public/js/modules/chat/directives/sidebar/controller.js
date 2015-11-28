'use strict';

module.exports = [
    '$scope',
    'ChatService',
    'Auth',
    function($scope, ChatService, Auth) {

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
        };
        $scope.logout = function(){
            Auth.logout();
        };
    }
];