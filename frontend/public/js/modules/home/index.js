'use strict';

var angular = require('angular');

angular
    .module('Home', ['ui.router'])
    .config(require('./config'))
    .controller('HomeController', require('./controller'));