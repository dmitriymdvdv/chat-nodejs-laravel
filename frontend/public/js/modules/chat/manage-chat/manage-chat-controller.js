'use strict';

module.exports = [
    '$scope',
    'ChatService',
    'ChatFactory',
    'authService',
    function ($scope, ChatService, ChatFactory, authService) {

        var alertMsg = 'Are you sure ?';
        var errMsg = 'Something went wrong';
        $scope.currentUserId = authService.getIdentity().id;

        ChatFactory.getChatsList($scope.currentUserId)
            .then(function (response) {
                $scope.chats = response.data;
            });


        $scope.manageChat = function (params) {

            ChatService.setChatParams(params);

            return ChatService.openNewChatModal();
        };

        $scope.leaveChat = function (chat) {
            var params = {
                id: chat.id,
                //TODO:: use Auth on backend
                user_id: $scope.currentUserId
            };
            alertify
                .confirm(alertMsg, function () {
                    ChatFactory
                        .leaveChat(params)
                        .then(function () {
                            alertify.success('You successful leave from ' + chat.name + ' chat.');
                            unsetChat(chat.id);
                        }, function () {
                            alertify.error(errMsg);
                        });
                });
        };

        $scope.deleteChat = function (chat) {
            alertify
                .confirm(alertMsg, function () {
                    var params = {
                        id: chat.id
                    };
                    ChatFactory
                        .deleteChat(params)
                        .then(function () {
                            alertify.success('You successful delete ' + chat.name + ' chat');
                            unsetChat(chat.id);
                        }, function () {
                            alertify.error(errMsg);
                        });
                });

        };

        function unsetChat(params) {
            _.remove($scope.chats, 'id', params);
        }
    }
];
