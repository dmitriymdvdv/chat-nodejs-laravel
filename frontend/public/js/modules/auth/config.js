'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: require('./templates/login.html'),
                controller: 'AuthController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('passwordReset', {
                url: '/password_reset',
                template: require('./templates/password-reset.html'),
                controller: 'AuthController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('confirmPassword', {
                url: '/confirm_password',
                template: require('./templates/confirm-password.html'),
                controller: 'AuthController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('logout', {
                template: '',
                controller: 'AuthController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('register', {
                url: '/register',
                template: require('./templates/register-template.html'),
                controller: 'RegisterController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            });

    }
];