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
                template: '<section class="chatbar">Please choose chat</section>'
            })
            .state('chats.active', {
                url: '/chat/:chatId',
                template: require('./templates/chatbar.html')
            })
            .state('manage-chats', {
                url: '/chats/manage',
                template: require('./templates/manageChatPage.html'),
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
    }
];