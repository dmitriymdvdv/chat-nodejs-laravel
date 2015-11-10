'use strict';

/*module.exports = function () {

    authConfig.$inject = [
        '$stateProvider',
        'authRoles'
    ];

    function authConfig($stateProvider, authRoles) {
        $stateProvider
            .state('login', {
                //url: '/api/v1/login',
                templateUrl: '<div>hello</div>',
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
};*/

module.exports = [
    '$stateProvider',
    'authRoles',
    function ($stateProvider, authRoles) {
        $stateProvider
            .state('login', {
                url: '/api/v1/login',
                template: require('./templates/login.html'),
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