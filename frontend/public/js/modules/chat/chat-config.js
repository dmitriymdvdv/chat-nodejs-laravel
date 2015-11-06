'use strict';

module.exports = function() {

    chatStates.$inject = [
        '$stateProvider',
        'authRoles'
    ];

    function chatStates($stateProvider, authRoles) {

        $stateProvider
            .state('chats', {
                template: '',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
    }

    return chatStates;

};