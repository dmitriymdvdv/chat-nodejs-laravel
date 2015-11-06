'use strict';

var angular = require('angular');

angular
    .module('Auth', [])
    .config('authConfig', require('./config'))
    .constant('authRoles', require('./roles'))
    .controller('authController', require('./controller'))
    .provider('authService', require('./provider'))
    .factory('authFactory', require('./factory'));
