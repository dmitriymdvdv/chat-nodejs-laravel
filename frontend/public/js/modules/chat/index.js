'use strict';

var angular = require('angular');

angular
    .module('Chat', [])
    .config(require('./chat-config'))
    .controller('ChatController', require('./chat-controller'))
    .factory('ChatFactory', require('./chat-factory'))
    .controller('NewModalController',require('./new-chat/NewModalController'))
    .directive('sideBar', require('./directives/sidebar'))
    .directive('messageContainer', require('./directives/messageContainer'));