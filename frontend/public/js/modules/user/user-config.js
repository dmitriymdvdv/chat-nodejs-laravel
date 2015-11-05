'use strict';

module.exports = function() {

    userStates.$inject = [
        '$stateProvider',
        'authConfig'
    ];

    function userStates($stateProvider, authConfig) {

        $stateProvider
            .state('user', {
                url: '/api/v1/user',
                controller: 'UserController',
                data: {
                    access: [
                        authConfig.user
                    ]
                }
            });

    }

    return userStates;

};
