'use strict';

var angular = require('angular');

angular.module('Common.Directive', [])
    .directive('checkPasswordDirective', require('./isEqual/check-password-directive'))
