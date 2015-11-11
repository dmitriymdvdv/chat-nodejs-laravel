'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function chatStates($stateProvider, authRoles) {

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