'use strict';

module.exports = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        var access = routingConfig.accessLevels;

        // Guest routes
        $stateProvider
            .state('public', {
                abstract: true,
                template: '<ui-view>',
                data: {
                    access: access.public
                }
            })
            .state('public.404', {
                url: '/api/v1/#/404',
                templateUrl: '404'
            });

        // User routes
        $stateProvider
            .state('chat', {
                abstract: true,
                template: '<ui-view>',
                data: {
                    access: access.user
                }
            })
            .state('chat.home', {
                url: '/api/v1/#/chat/home',
                templateUrl: 'chatHome'
            });

        $urlRouterProvider.otherwise("/api/v1/#/404");
    }
];
