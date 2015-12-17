'use strict';

module.exports = [
    '$scope',
    '$q',
    '$state',
    'ChatService',
    'ChatFactory',
    'authService',
    'Auth',
    'SocketFactory',
    function ($scope, $q, $state, ChatService, ChatFactory, authService, Auth, SocketFactory) {

        $scope.currentUser = authService.getIdentity();
        $scope.notify = {
            count: 0
        };

        var publicChatsPromise = ChatFactory
            .getChatsList({
                type: 'public',
                all: 'true'
            })
            .then(function (response) {
                $scope.publicChats = _.map(response.data);
                return _.map(response.data, 'id');
            });

        var privateChatsPromise = ChatFactory
            .getChatsList({
                type: 'private',
                'all': 'true'
            })
            .then(function (response) {
                $scope.privateChats = _.map(response.data);
                return _.map(response.data, 'id');
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
            if (data.is_private == 0) {
                $scope.publicChats.push(data);
            } else if (data.is_private == 1) {
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
        };

        SocketFactory.on('notify', function (data) {

            if ($state.params.chatId != data) {
                var chat = findPrivateChat(data) || findPublicChat(data);
                if (chat.notify) {
                    $scope.$apply(function () {
                        chat.notify.count++;
                    });

                } else {
                    $scope.$apply(function () {
                        $scope.notify.count = 1;
                        chat.notify = angular.copy($scope.notify);
                    });
                }
            }
        });

        $q.all([
            publicChatsPromise,
            privateChatsPromise
        ]).then(function (values) {
            var chatsId;
            if (values[0].length > 6) {
                values[0] = _.slice(values[0], 0, 6);
            }
            if (values[1].length > 6) {
                values[1] = _.slice(values[1], 0, 6);
            }
            chatsId = _.union(values[0], values[1]);

            SocketFactory.emit('join-to-all', chatsId);
        });

        function findPrivateChat(data) {
            return _.find($scope.publicChats, function (res) {
                return res.id == data
            });

        }

        function findPublicChat(data) {
            return _.find($scope.privateChats, function (res) {
                return res.id == data
            });
        }

        $scope.unsetNotify = function (chatId) {
            var chat = findPrivateChat(chatId) || findPublicChat(chatId);
            if (typeof chat.notify !== 'undefined') {
                chat.notify = {
                    count: 0
                }
            }
        };

        $scope.activeChat = function (chatName) {
            $scope.$emit('chatName', chatName);
        };
    }
];