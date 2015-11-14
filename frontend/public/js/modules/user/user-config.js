'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function($stateProvider, authRoles) {

        $stateProvider
            .state('user', {
                url: '/user',
                template: '',
                controller: 'UserController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('profile', {
                url: '/profile',
                template: require('./profile/profile.html'),
                controller: 'UserController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('profileInfo', {
                url: '/user/info',
                template: require('./profile/userInfo.html'),
                controller: 'UserController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });
    }
];