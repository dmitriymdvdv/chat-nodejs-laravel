'use strict';

module.exports = function () {

    authConfig.$inject = [
        '$stateProvider',
        'authRoles'
    ];

    function authConfig($stateProvider, authRoles) {

        $stateProvider
            .state('login', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('logout', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('register', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            });

    }

    return authConfig;
};