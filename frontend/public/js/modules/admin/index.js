'use strict';

var angular = require('angular');

require('./user');

angular
    .module('Admin', ['User'])
    .config(require('./config'))
    .controller('AdminController', require('./controller'));