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
                url: '/edit-profile',
                template: require('./profile/edit-profile.html'),
                controller: 'EditProfileController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('userInfo', {
                url: '/user/profile',
                template: require('./profile/profile.html'),
                controller: 'EditProfileController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });
    }
];