'use strict';

var angular = require('angular');

angular
    .module('User', [])
    .config(require('./user-config'))
    .controller('UserController', require('./user-controller'))
    .factory('UserFactory', require('./user-factory'));
