'use strict';

module.exports = [
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/api/v1/user'
              , controller: 'UserController'
              //, template: require('./template.html')
            });
    }
];

