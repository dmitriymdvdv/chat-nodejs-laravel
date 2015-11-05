'use strict';

module.exports = function () {

    authStates.$inject = [
        '$stateProvider',
        'authConfig'
    ];

    function authStates($stateProvider, authConfig) {

        $stateProvider
            .state('login', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authConfig.guest
                    ]
                }
            })
            .state('logout', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authConfig.user
                    ]
                }
            })
            .state('register', {
                template: '',
                controller: 'authController',
                data: {
                    access: [
                        authConfig.guest
                    ]
                }
            });

    }

    return authStates;
};