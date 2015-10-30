'use strict';

module.exports = [
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                controller: 'AdminController',
                template: require('./template.html')
            });
    }
];
