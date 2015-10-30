'use strict';

var angular = require('angular');

angular
    .module('User', [])
    .config(require('./config'))
    .controller('UserController', require('./controller'))
    .controller('ProfileController', require('./profile/controller'))
    .service('userService', require('./user-service'))
    .factory('userRoleService', require('./user-role-service'))
    .constant('userRoles', require('./user-roles'))
    .value('defaultUserRole', 1)
    .directive('userLink', require('./user-link'));