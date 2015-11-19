'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function userStates($stateProvider, authRoles) {

        $stateProvider
            .state('user', {
                url: '/user',
                controller: 'UserController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });

    }
];