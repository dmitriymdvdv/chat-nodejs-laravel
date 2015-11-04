'use strict';

module.exports = [
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('chats', {
                url: '/api/v1/chats'
              , controller: 'ChatController'
              //, template: require('./template.html')
            });
    }
];
