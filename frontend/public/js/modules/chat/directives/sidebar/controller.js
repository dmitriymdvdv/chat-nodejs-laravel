'use strict';

module.exports = [
    '$scope',
    'ChatService',
    'ChatFactory',
    'authService',
    'Auth',
    function ($scope, ChatService, ChatFactory, authService, Auth) {

        $scope.currentUserName = authService.getIdentity().first_name;

        ChatFactory
            .getChatsList({
                type: 'public',
                all: 'true'
            })
            .then(function (response) {
                $scope.publicChats = _.map(response.data);
            });

        ChatFactory
            .getChatsList({
                type: 'private',
                'all': 'true'
            })
            .then(function (response) {
                $scope.privateChats = _.map(response.data);
            });

        ChatFactory
            .getUsers({
                query: ''
            })
            .then(function (response) {
                $scope.users = response.data;
            });

        $scope.openNewPrivateChat = function () {

            ChatService.setChatParams({
                is_private: true
            });

            return ChatService.openNewChatModal();
        };

        $scope.openNewPublicChat = function () {

            ChatService.setChatParams({
                is_private: false
            });

            return ChatService.openNewChatModal();
        };

        $scope.logout = function () {
            Auth.logout();
        };

        $scope.$on('newChatCreated', function (event, data) {
            if(data.is_private == 0) {
                $scope.publicChats.push(data);
            }else if(data.is_private == 1) {
                $scope.privateChats.push(data);
            }
        });

        $scope.openPrivateChatsList = function () {
            ChatService.openChatsList($scope.privateChats);
        };

        $scope.openPublicChatsList = function () {
            ChatService.openChatsList($scope.publicChats);
        };

        $scope.openUsersList = function () {
            ChatService.openUsersList($scope.users)
        }


    }
];