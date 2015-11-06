'use strict';

module.exports = function() {

    userStates.$inject = [
        '$stateProvider',
        'authRoles'
    ];

    function userStates($stateProvider, authRoles) {

        $stateProvider
            .state('user', {
                url: '/api/v1/user',
                controller: 'UserController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });

    }

    return userStates;

};
