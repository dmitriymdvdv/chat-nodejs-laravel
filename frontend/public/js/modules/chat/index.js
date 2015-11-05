'use strict';

var angular = require('angular');

angular
    .module('Chat', ['ngCookies', 'ui.router'])
    .config(require('./chat-config'))
    .run(require('./chat-run'))
    .controller('ChatController', require('./chat-controller'))
    .factory('ChatFactory', require('./chat-factory'));