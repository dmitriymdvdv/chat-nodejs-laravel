'use strict';

var angular = require('angular');

angular.module('Common.Directive', [])
    .directive('isEqual', require('./isEqual/is-equal'))
    .directive('okPhone', require('./okPhone/ok-phone'))
    .directive('okEmail', require('./okEmail/ok-email'))


