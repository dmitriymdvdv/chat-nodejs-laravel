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
            .state('edit', {
                url: '/user/edit',
                template: require('./profile/edit-profile.html'),
                controller: 'EditProfileController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            })
            .state('profile', {
                url: '/user/profile',
                template: require('./profile/profile.html'),
                controller: 'ProfileController',
                data: {
                    access: [
                        authRoles.user
                    ]
                }
            });
    }
];
