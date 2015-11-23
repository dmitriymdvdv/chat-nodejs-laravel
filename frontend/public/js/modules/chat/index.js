'use strict';

var angular = require('angular');

angular
    .module('Chat', [])
    .config(require('./chat-config'))
    .controller('ChatController', require('./chat-controller'))
    .factory('ChatFactory', require('./chat-factory'))
    .controller('NewModalController', require('./new-chat/new-modal-controller'))
    .controller('SideBarController', require('./directives/sidebar/controller'))
    .service('NewChatService', require('./new-chat/new-chat-service'))
    .factory('NewChatFactory', require('./new-chat/new-chat-factory'))
    .directive('sideBar', require('./directives/sidebar'))
    .directive('messageContainer', require('./directives/messageContainer'));