'use strict';

var angular = require('angular');

angular.module('Common.Directive', [])
    .directive('isEqual', require('./isEqual/is-equal'))
