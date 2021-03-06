'use strict';

var domready = require('domready');
var angular = require('angular');

//require common modules
require('./common/ita-embedded-data');
require('./common/ita-request');
require('./common/ita-loading');
require('./common/directives');
require('./common/settings');

//require project modules
require('./modules/home');
require('./modules/admin');
require('./modules/auth');
require('./modules/chat');
require('./modules/user');

var initInject = angular.injector(['ng']);
var $http = initInject.get('$http');

$http.get('http://slack.dev/api/v1/user/current').then(function (response) {
    domready(function () {
        angular
            .module('PHPLabs', [
                'ui.router',
                'ui.bootstrap',
                'ui.select',
                'picardy.fontawesome',
                'ngFileUpload',
                'angular-md5',
                'angular-loading-bar',
                'luegg.directives',

                'ITA.EmbeddedData',
                'ITA.Request',
                'ITA.Loading',
                'Common.Directive',

                'Auth',
                'Home',
                'Chat',
                'User',
                'Settings',
                'angular-loading-bar',
                'duScroll'
            ])
            .config([
                'itaEmbeddedDataServiceProvider',
                'itaRequestServiceProvider',
                '$urlRouterProvider',
                'authServiceProvider',
                'cfpLoadingBarProvider',
                function (itaEmbeddedDataServiceProvider, itaRequestServiceProvider, $urlRouterProvider, authServiceProvider, cfpLoadingBarProvider) {
                    itaEmbeddedDataServiceProvider.init(window.embeddedData);
                    itaRequestServiceProvider.baseUrl(window.embeddedData.api.url);

                    $urlRouterProvider.otherwise('/');

                    authServiceProvider.authData = response.data;

                    cfpLoadingBarProvider.includeSpinner = false;
                }
            ])
            .run(require('./app-run'));

        angular.bootstrap(document, ['PHPLabs']);

    });
}, function(){

});