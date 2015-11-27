'use strict';

module.exports = [
    '$modal',
    'ChatValues',
    'ChatConst',
    function ($modal, ChatValues, ChatConst) {

        this.openNewChatModal = function () {
            var $modalInstance;
            $modalInstance = $modal.open({
                template: require('./new-chat/template.html'),
                controller: 'NewModalController',
                resolve: {
                    data: function () {
                        return ChatValues.chat

                    }
                }
            });
        };
        this.setChatParams = function (params) {
            if(params.id) {
                ChatValues.chat = params;
            }else{
                ChatValues.chat = angular.copy(ChatConst.chat);
                _.merge(ChatValues.chat, params);
            }
        };
        this.getChatParams = function () {
            return ChatValues.chat;
        }
    }
];
