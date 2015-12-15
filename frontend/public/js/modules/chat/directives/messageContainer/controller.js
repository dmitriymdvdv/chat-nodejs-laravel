'use strict';
var moment = require('moment');

module.exports = [
    '$scope',
    '$http',
    '$state',
    'authService',
    'MessageContainerFactory',
    'SocketFactory',
    function ($scope, $http, $state, authService, MessageContainerFactory, SocketFactory) {

        $scope.isLoading = false;
        $scope.messages = [];
        $scope.chatId = $state.params.chatId;

        SocketFactory.emit('join', {
            chatId: $state.params.chatId
        });

        SocketFactory.on('message', function (data) {
            $scope.$apply(function () {
                $scope.messages.push(data[0]);
            })
        });

        $scope.sendMessage = function () {

            if ($scope.newMessage.trim()) {

                $scope.isLoading = true;

                MessageContainerFactory.sendMessage({
                    chat_id: $state.params.chatId,
                    user_id: authService.getIdentity().id,
                    message: $scope.newMessage,
                    date_of_creation: moment().format()
                })
                    .then(
                        function () {
                            $scope.isLoading = false;
                            $scope.newMessage = "";
                        },
                        function () {
                            $scope.isLoading = false;
                            console.log('error sending');
                            $state.go('chats');
                        });
            }

        };

        MessageContainerFactory.getMessages({
            chat_id: $state.params.chatId,
            user_id: authService.getIdentity().id
        })
            .then(function (res) {
                if (res.data.length > 0) {
                    $scope.messages =  res.data;
                }
            }, function () {
                $state.go('chats');
            });
    }
];