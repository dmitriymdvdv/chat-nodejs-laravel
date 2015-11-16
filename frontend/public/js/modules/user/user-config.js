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
                controller: 'ProfileController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('userInfo', {
                url: '/user/info',
                template: require('./profile/userInfo.html'),
                controller: 'UserInfoController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });
    }
];