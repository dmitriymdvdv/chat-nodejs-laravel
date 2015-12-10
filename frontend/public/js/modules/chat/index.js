'use strict';

var angular = require('angular');

angular
    .module('Chat', [])
    .config(require('./chat-config'))
    .constant('ChatConst', require('./chat-const'))
    .controller('ChatController', require('./chat-controller'))
    .factory('ChatFactory', require('./chat-factory'))
    .controller('NewModalController', require('./new-chat/new-modal-controller'))
    .controller('SideBarController', require('./directives/sidebar/controller'))
    .controller('ChatListController', require('./directives/sidebar/chat-list/chat-list-controller'))
    .controller('UserListController', require('./directives/sidebar/user-list/user-list-controller'))
    .service('NewChatService', require('./new-chat/new-chat-service'))
    .service('ChatService', require('./chat-service'))
    .controller('ManageChatsController', require('./manage-chat/manage-chat-controller'))
    .directive('sideBar', require('./directives/sidebar'))
    .directive('messageContainer', require('./directives/messageContainer'))
    .factory('MessageContainerFactory', require('./directives/messageContainer/message-container-factory'))
    .factory('SocketFactory', require('./directives/messageContainer/socket-factory'));
