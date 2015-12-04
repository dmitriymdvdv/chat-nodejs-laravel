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

        $scope.tabs = [
            {
                title: 'Public',
                chats: []
            },
            {
                title: 'Private',
                chats: []
            }
        ];


        ChatFactory.getChatsList({
                type: 'all'
            })
            .then(function (response) {
                $scope.tabs[0].chats = response.data.public;
                $scope.tabs[1].chats = _.map(response.data.private);
            });


        $scope.manageChat = function (params) {

            ChatService.setChatParams(params);

            return ChatService.openNewChatModal();
        };

        $scope.leaveChat = function (chat) {
            var params = {
                id: chat.id
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
                        id: chat.id,
                        is_private: chat.is_private
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
            _.remove($scope.tabs[0].chats, 'id', params);
            _.remove($scope.tabs[1].chats, 'id', params);
        }
    }
];
