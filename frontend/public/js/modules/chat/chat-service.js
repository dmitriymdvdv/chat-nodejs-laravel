'use strict';

module.exports = [
    '$modal',
    'ChatConst',
    function ($modal, ChatConst) {

        var data = {};
        var linked = {};

        this.openNewChatModal = function () {
            var $modalInstance;
            $modalInstance = $modal.open({
                template: require('./new-chat/template.html'),
                controller: 'NewModalController',
                resolve: {
                    data: function () {
                        return data
                    },
                    linked: function () {
                        return linked
                    }
                }
            });
        };
        this.setChatParams = function (params, link) {
            if (params.id) {
                data = params;
            } else {
                data = angular.copy(ChatConst.chat);
                _.merge(data, params);
            }
            if (link) {
                linked = link;
            }
        };
        this.getChatParams = function () {
            if (!data) {
                return ChatConst.chat;
            }
            return data;
        };
        this.openChatsList = function (data) {
            var $modalInstance;
            $modalInstance = $modal.open({
                template: require('./directives/sidebar/chat-list/template.html'),
                controller: 'ChatListController',
                resolve: {
                    data: function () {
                        return data
                    }

                }
            });
        };
        this.openUsersList = function (data) {
            var $modalInstance;
            $modalInstance = $modal.open({
                template: require('./directives/sidebar/user-list/template.html'),
                controller: 'UserListController',
                resolve: {
                    data: function () {
                        return data
                    }

                }
            });
        }
    }
];
