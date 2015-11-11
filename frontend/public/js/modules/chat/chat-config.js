'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {

        $stateProvider
            .state('chats', {
                url: '/chats',
                template: require('./templates/mainAppLayout.html'),
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('chats.active', {
                url: '/chat',
                template: require('./templates/chatbar.html'),
                data: {
                    access: [
                        authRoles.user
                    ]
                }
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