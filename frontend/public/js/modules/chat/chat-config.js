'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function chatStates($stateProvider, authRoles) {

        $stateProvider
            .state('chats', {
                url: '/chats',
                template: require('./templates/mainAppLayout.html'),
                controller: 'ChatController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('chats.overview', {
                template: '<section class="chatbar">' +
                '               <p class="choose-chat">' +
                '                   Please select a chat to start messaging' +
                '               </p>' +
                          '</section>'
            })
            .state('chats.active', {
                url: '/:chatId',
                template: require('./templates/chatbar.html')
            })
            .state('manage-chats', {
                url: '/chats/manage',
                controller: 'ManageChatsController',
                template: require('./manage-chat/template.html'),
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
    }
];