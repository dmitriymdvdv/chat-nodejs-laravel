'use strict';

var routes = require('./chat-routes');

module.exports = [
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        for (var path in routes) {
            $stateProvider.state(path, routes[path]);
        }
        $urlRouterProvider.otherwise("/");
    }
];
