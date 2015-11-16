'use strict';

var angular = require('angular');

angular
    .module('User', [])
    .config(require('./user-config'))
    .controller('ProfileController', require('./profile/profile-controller'))
    .controller('UserInfoController', require('./profile/user-info-controller'))
    .controller('UserController', require('./user-controller'))
    .factory('UserFactory', require('./user-factory'));
