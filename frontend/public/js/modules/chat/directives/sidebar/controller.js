'use strict';

module.exports = [
    '$scope',
    'ChatService',
    'authFactory',
    function($scope, ChatService, authFactory) {

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
        $scope.logout = function(){

            authFactory.logOut();
            $scope.error = $state.params.E;
        };
    }
];