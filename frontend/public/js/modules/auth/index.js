'use strict';

var angular = require('angular');

angular
    .module('Auth', [])
    .config(require('./config'))
    .constant('authRoles', require('./roles'))
    .controller('AuthController', require('./controller'))
    .controller('RegisterController', require('./register-controller'))
    .provider('authService', require('./provider'))
    .factory('authFactory', require('./factory'));