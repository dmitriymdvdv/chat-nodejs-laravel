'use strict';

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                template: require('./template.html'),
                data: {
                    access: [
                        authRoles.guest
                    ]
                }
            });
    }
];
