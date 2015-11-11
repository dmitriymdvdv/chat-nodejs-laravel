'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: require('./templates/login.html'),
                controller: 'authController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('passwordReset', {
                url: '/password_reset',
                template: require('./templates/password-reset.html'),
                controller: 'authController',
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            })
            .state('confirmPassword', {
                url: '/confirm_password',
                template: require('./templates/confirm-password.html'),
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
];