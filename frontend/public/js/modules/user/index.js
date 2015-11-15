'use strict';

var angular = require('angular');

angular
    .module('User', [])
    .config(require('./user-config'))
    .controller('ProfileController', require('./profile/profile-controller'))
    .controller('UserController', require('./user-controller'))
    .factory('UserFactory', require('./user-factory'));
