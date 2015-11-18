'use strict';

var domready = require('domready');
var angular = require('angular');

//require common modules
require('./common/ita-embedded-data');
require('./common/ita-request');
require('./common/ita-loading');

//require project modules
require('./modules/home');
require('./modules/admin');
require('./modules/auth');
require('./modules/chat');

var initInject = angular.injector(['ng']);
var $http = initInject.get('$http');

$http.get('http://slack.dev/api/v1/user/1').then(function (response) {
    domready(function () {
        angular
            .module('PHPLabs', [
                'ui.router',
                'ui.bootstrap',
                'ui.select',
                'picardy.fontawesome',

                'ITA.EmbeddedData',
                'ITA.Request',
                'ITA.Loading',

                'Home',
                'Admin',
                'Auth',
                'Chat'
            ])
            .config([
                'itaEmbeddedDataServiceProvider',
                'itaRequestServiceProvider',
                '$urlRouterProvider',
                'authServiceProvider',
                function (itaEmbeddedDataServiceProvider, itaRequestServiceProvider, $urlRouterProvider, authServiceProvider) {
                    itaEmbeddedDataServiceProvider.init(window.embeddedData);
                    itaRequestServiceProvider.baseUrl(window.embeddedData.api.url);

                    $urlRouterProvider.otherwise('/');

                    authServiceProvider.authData = response.data;


                }
            ]);
            //.run(require('./app-run'));

        angular.bootstrap(document, ['PHPLabs']);

    });
});