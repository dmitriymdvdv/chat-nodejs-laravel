'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {
        $stateProvider
            .state('chats', {
                url: '/chats',
                template: require('./templates/mainAppLayout.html'),
                controller: [
                    '$state',
                    function($state) {
                        $state.go('chats.overview');
                    }
                ],
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