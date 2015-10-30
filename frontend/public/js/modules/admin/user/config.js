'use strict';

module.exports = [
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('admin.users', {
                url: '/users',
                controller: 'UserController',
                template: require('./template.html')
            })
            .state('admin.profile', {
                url: '/user/:userId',
                controller: 'ProfileController',
                template: require('./profile/template.html'),
                resolve: {
                    user: ['userService', '$stateParams', function(userService, $stateParams) {
                        return userService.getUser(parseInt($stateParams.userId, 10));
                    }]
                }
            });
    }
];
