'use strict';

module.exports = function() {

    chatStates.$inject = [
        '$stateProvider',
        'authConfig'
    ];

    function chatStates($stateProvider, authConfig) {

        $stateProvider
            .state('chats', {
                template: '',
                data: {
                    access: [
                        authConfig.user
                    ]
                }
            })
    }

    return chatStates;

};