'use strict';

var angular = require('angular');

angular
    .module('Auth', [])
    .provider('authService', require('./provider'))
    .factory('authFactory', require('./factory'));
//TODO add config;
