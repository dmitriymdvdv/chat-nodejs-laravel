'use strict';

module.exports = function() {
    var routes = {
        "chats": {
            url: '/api/v1/chats'
          , controller: 'ChatController'
          , requireLogin: true
            //, template: require('./template.html')
        },
        "chat-list": {
            url: '/api/v1/chats'
          , controller: 'ChatController'
          , requireLogin: false
            //, template: require('./template.html')
        }
    };

    return routes;
};