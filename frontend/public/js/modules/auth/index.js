'use strict';

var angular = require('angular');

angular
    .module('Auth', [])
    .config(require('./config'))
    .constant('authRoles', require('./roles'))
    .directive('checkPasswordDirective', require('../../common/directives/check-password-directive'))
    .controller('authController', require('./controller'))
    .controller('RegisterController', require('./register-controller'))
    .provider('authService', require('./provider'))
    .factory('authFactory', require('./factory'));